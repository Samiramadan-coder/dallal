// What a guest tried to do before being asked to sign in. Kept in
// sessionStorage so it survives the sign-up / OTP steps and a reload, and
// runs once the user is signed in and back on the same page

export type GatedAction =
  | { type: "save-listing"; listingId: string }
  // Opening a page that needs an account (Sell, Post listing)
  | { type: "navigate"; href: string };
// TODO: add chat and make-offer once the listing page exists

type PendingAction = {
  action: GatedAction;
  // Pathname the action was started on
  pathname: string;
  savedAt: number;
};

const STORAGE_KEY = "dallal:pending-action";
// An abandoned sign-up shouldn't fire an action much later
const MAX_AGE_MS = 30 * 60 * 1000;

function read(): PendingAction | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as PendingAction;
    if (
      typeof value?.pathname !== "string" ||
      typeof value?.savedAt !== "number" ||
      typeof value?.action?.type !== "string"
    ) {
      return null;
    }
    return value;
  } catch {
    return null;
  }
}

export function savePendingAction(action: GatedAction): void {
  const value: PendingAction = {
    action,
    pathname: window.location.pathname,
    savedAt: Date.now(),
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage blocked: the action just won't resume after sign-in
  }
}

export function clearPendingAction(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear
  }
}

// Returns (and removes) the pending action when it's fresh, was started on
// this page and `matches` it; otherwise leaves it for another component
export function takePendingAction(
  matches: (action: GatedAction) => boolean,
): GatedAction | null {
  const pending = read();
  if (!pending) return null;

  if (Date.now() - pending.savedAt > MAX_AGE_MS) {
    clearPendingAction();
    return null;
  }
  if (pending.pathname !== window.location.pathname) return null;
  if (!matches(pending.action)) return null;

  clearPendingAction();
  return pending.action;
}
