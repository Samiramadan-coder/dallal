"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useUser } from "@/providers/user-data";
import {
  PERSONAL_MENU,
  storeMenu,
  type AccountMenuItem,
} from "@/constants/account-menu";

export type AccountMode = "personal" | "store";

// A per-browser preference, so localStorage is enough
const STORAGE_KEY = "dallal:account-mode";
const CHANGE_EVENT = "dallal:account-mode-change";

function readMode(): AccountMode {
  try {
    return localStorage.getItem(STORAGE_KEY) === "store" ? "store" : "personal";
  } catch {
    return "personal";
  }
}

function subscribe(onChange: () => void) {
  // Same tab (CHANGE_EVENT) and other tabs (storage)
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function writeAccountMode(mode: AccountMode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Storage blocked: the mode lasts until the next reload
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Personal or store mode for the header. Store mode only applies to users
// who own a store; everyone else is always "personal"
export function useAccountMode() {
  const { user } = useUser();
  const stored = useSyncExternalStore(
    subscribe,
    readMode,
    () => "personal" as const,
  );

  const store = user?.store ?? null;
  const mode: AccountMode = store && stored === "store" ? "store" : "personal";
  const items: readonly AccountMenuItem[] =
    mode === "store" && store ? storeMenu(store.id) : PERSONAL_MENU;

  const setMode = useCallback(
    (next: AccountMode) => writeAccountMode(next),
    [],
  );

  return { mode, setMode, store, items };
}
