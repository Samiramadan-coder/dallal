"use client";

import { useCallback, useEffect, useState } from "react";

export const RESEND_SECONDS = 60;

// 59 → "0:59"
export function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Seconds until a code can be resent; starts counting on mount, since a
// code was just sent
export function useResendCountdown(seconds = RESEND_SECONDS) {
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  const restart = useCallback(() => setSecondsLeft(seconds), [seconds]);

  return {
    secondsLeft,
    canResend: secondsLeft <= 0,
    // "0:59"
    label: formatCountdown(secondsLeft),
    restart,
  };
}
