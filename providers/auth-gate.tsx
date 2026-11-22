"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  clearPendingAction,
  savePendingAction,
  takePendingAction,
  type GatedAction,
} from "@/lib/auth-gate";
import { Country } from "@/types/global";
import { useRouter } from "@/i18n/navigation";
import { useUser } from "@/providers/user-data";
import AuthGateDialog from "@/components/auth/auth-gate-dialog";

type AuthGateContext = {
  // False outside the provider, where there's no modal to open
  enabled: boolean;
  // Runs `run` for a signed-in user. For a guest, remembers `action` and
  // opens the sign-up modal; the action resumes after sign-in
  requireAuth: (action: GatedAction, run: () => void) => void;
};

const AuthGateContext = createContext<AuthGateContext | null>(null);

export function AuthGateProvider({
  countries,
  defaultCountryId,
  children,
}: {
  countries: Country[];
  defaultCountryId?: number;
  children: ReactNode;
}) {
  const router = useRouter();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  // A new key per opening, so the modal starts on sign-up every time
  const [session, setSession] = useState(0);

  const requireAuth = useCallback(
    (action: GatedAction, run: () => void) => {
      if (user) {
        run();
        return;
      }
      savePendingAction(action);
      setSession((s) => s + 1);
      setOpen(true);
    },
    [user],
  );

  // Dismissed without signing in: forget the action
  function handleOpenChange(next: boolean) {
    if (!next) clearPendingAction();
    setOpen(next);
  }

  // The cookie is set; reload the server data so `user` updates, which
  // resumes the pending action (see useResumeAction)
  function handleAuthenticated() {
    setOpen(false);
    router.refresh();
  }

  // Page actions (Sell, Post listing) resume here; others in their component
  useResumeAction(
    (action) => action.type === "navigate",
    (action) => {
      if (action.type === "navigate") router.push(action.href);
    },
  );

  return (
    <AuthGateContext.Provider value={{ enabled: true, requireAuth }}>
      {children}
      <AuthGateDialog
        key={session}
        open={open}
        onOpenChange={handleOpenChange}
        onAuthenticated={handleAuthenticated}
        countries={countries}
        defaultCountryId={defaultCountryId}
      />
    </AuthGateContext.Provider>
  );
}

// Outside the provider (e.g. on the auth pages) actions just run
const ungated: AuthGateContext = {
  enabled: false,
  requireAuth: (_action, run) => run(),
};

export function useAuthGate(): AuthGateContext {
  return useContext(AuthGateContext) ?? ungated;
}

// Runs `run` once the user is signed in, if the pending action was started
// on this page and `matches` it. Each gated component resumes its own action
export function useResumeAction(
  matches: (action: GatedAction) => boolean,
  run: (action: GatedAction) => void,
) {
  const { user } = useUser();
  const matchesRef = useRef(matches);
  const runRef = useRef(run);

  useEffect(() => {
    matchesRef.current = matches;
    runRef.current = run;
  });

  useEffect(() => {
    if (!user) return;
    const action = takePendingAction(matchesRef.current);
    if (action) runRef.current(action);
  }, [user]);
}
