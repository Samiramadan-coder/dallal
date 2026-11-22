import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import {
  AUTH_COOKIE_NAME,
  SESSION_EXPIRED,
  SESSION_PARAM,
} from "./lib/api/auth-cookie";
import {
  CALLBACK_URL_PARAM,
  HOME_PATH,
  PATHNAME_HEADER,
  SIGN_IN_PATH,
  isGuestOnlyRoute,
  isProtectedRoute,
  localizePath,
  safeCallbackUrl,
  splitPath,
} from "./lib/auth-routes";
import {
  COUNTRY_COOKIE,
  COUNTRY_HEADER,
  DEFAULT_COUNTRY,
  isCountrySegment,
} from "./lib/country";
import { routing } from "./i18n/routing";
import { suggestCountry } from "./lib/api/geo-suggest";

const intlMiddleware = createMiddleware(routing);

const OVERRIDE_HEADERS = "x-middleware-override-headers";
const REQUEST_HEADER_PREFIX = "x-middleware-request-";

// Adds a request header for the server without dropping the ones next-intl
// already forwards (it overrides request headers via NextResponse.next/rewrite)
function forwardRequestHeader(
  request: NextRequest,
  response: NextResponse,
  name: string,
  value: string,
) {
  const existing = response.headers.get(OVERRIDE_HEADERS);
  const names = existing
    ? existing.split(",").map((header) => header.trim())
    : // No override yet: an override list replaces all request headers,
      // so carry over the original ones
      [...request.headers.keys()].map((header) => {
        response.headers.set(
          `${REQUEST_HEADER_PREFIX}${header}`,
          request.headers.get(header) ?? "",
        );
        return header;
      });

  if (!names.includes(name)) names.push(name);
  response.headers.set(OVERRIDE_HEADERS, names.join(","));
  response.headers.set(`${REQUEST_HEADER_PREFIX}${name}`, value);
}

// Visitor's IP as reported by the hosting proxy / CDN in front of Next
function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim() || null;
  return request.headers.get("x-real-ip");
}

// Arabic is the default for everyone: only the URL or the visitor's own
// choice (the `lang` cookie) picks English, never the browser's language
function withoutBrowserLanguage(request: NextRequest): NextRequest {
  if (!request.headers.has("accept-language")) return request;
  const headers = new Headers(request.headers);
  headers.delete("accept-language");
  return new NextRequest(request, { headers });
}

export default async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const sessionExpired =
    nextUrl.searchParams.get(SESSION_PARAM) === SESSION_EXPIRED;
  // Only checks that the cookie exists; the API decides if it's still valid
  const isSignedIn =
    !sessionExpired && Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);

  let response = intlMiddleware(withoutBrowserLanguage(request));
  const isRedirect = response.headers.has("location");

  // Let next-intl's own redirects (e.g. adding the locale prefix) run first;
  // past this point the URL's locale is the final one
  if (!isRedirect) {
    const { locale, country, pathname } = splitPath(nextUrl.pathname);

    if (!country || country !== country.toLowerCase()) {
      // No country in the URL ("/", "/browse"): use the remembered one,
      // else the one suggested for the visitor's location, else the default.
      // An upper-case one ("/SA/browse") is sent to its canonical form
      const remembered = request.cookies.get(COUNTRY_COOKIE)?.value;
      let suggested: string | null = null;
      if (!country && !isCountrySegment(remembered)) {
        suggested = await suggestCountry(getClientIp(request));
      }

      const target =
        country?.toLowerCase() ??
        (isCountrySegment(remembered)
          ? remembered!.toLowerCase()
          : (suggested ?? DEFAULT_COUNTRY));

      const url = new URL(localizePath(pathname, locale, target), request.url);
      url.search = nextUrl.search;
      response = NextResponse.redirect(url, country ? 308 : 307);

      // Remember it right away, so the API is asked once per visitor (the
      // page then remembers whichever country is visited, see CountrySuggestion)
      if (suggested) {
        response.cookies.set(COUNTRY_COOKIE, suggested, {
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "lax",
        });
      }
    } else if (!isSignedIn && isProtectedRoute(nextUrl.pathname)) {
      const callbackSearch = new URLSearchParams(nextUrl.search);
      callbackSearch.delete(SESSION_PARAM);
      const query = callbackSearch.toString();

      const url = new URL(
        localizePath(SIGN_IN_PATH, locale, country),
        request.url,
      );
      url.searchParams.set(
        CALLBACK_URL_PARAM,
        `${nextUrl.pathname}${query ? `?${query}` : ""}`,
      );
      response = NextResponse.redirect(url);
    } else if (isSignedIn && isGuestOnlyRoute(nextUrl.pathname)) {
      const target = safeCallbackUrl(
        nextUrl.searchParams.get(CALLBACK_URL_PARAM),
        localizePath(HOME_PATH, locale, country),
      );
      response = NextResponse.redirect(new URL(target, request.url));
    } else {
      // Always overwritten, so clients can't spoof it
      forwardRequestHeader(
        request,
        response,
        PATHNAME_HEADER,
        `${nextUrl.pathname}${nextUrl.search}`,
      );
      forwardRequestHeader(request, response, COUNTRY_HEADER, country);
    }
  }

  if (sessionExpired) response.cookies.delete(AUTH_COOKIE_NAME);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
