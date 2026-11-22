// Shared between the proxy and server code, so it must stay free of
// `server-only` and request-time APIs

// httpOnly cookie holding the Laravel API Bearer token. Kept as "token"
// (the name this project already used) so existing sessions stay valid
export const AUTH_COOKIE_NAME = "token";

// Lifetime of the auth cookie (7 days)
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

// `?session=expired` marks a redirect caused by a 401 from the API.
// The proxy treats it as signed out and deletes the cookie
export const SESSION_PARAM = "session";
export const SESSION_EXPIRED = "expired";
