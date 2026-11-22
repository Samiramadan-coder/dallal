"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";

export const CODE_LENGTH = 6;

// The six code boxes (OTP verify, reset password): auto-advance, paste,
// and SMS auto-fill come from input-otp
export default function CodeBoxes({
  value,
  onChange,
  onBlur,
  onComplete,
  inputRef,
  name,
  label,
  invalid = false,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  // Called once all six digits are entered
  onComplete?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  name?: string;
  // Accessible name, e.g. "Verification code"
  label: string;
  invalid?: boolean;
  disabled?: boolean;
}) {
  return (
    <InputOTP
      ref={inputRef}
      name={name}
      maxLength={CODE_LENGTH}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onComplete={onComplete}
      disabled={disabled}
      autoFocus
      inputMode="numeric"
      autoComplete="one-time-code"
      aria-label={label}
      containerClassName="justify-center"
    >
      {/* Digits read left to right in both languages */}
      <InputOTPGroup dir="ltr" className="gap-2">
        {Array.from({ length: CODE_LENGTH }, (_, i) => (
          <InputOTPSlot
            key={i}
            index={i}
            aria-invalid={invalid ? true : undefined}
            className={cn(
              "h-13 w-11 rounded-xl border bg-white font-serif text-xl font-bold text-[#1A1A14] first:rounded-xl last:rounded-xl sm:w-12",
              "border-[rgba(27,107,74,0.18)] data-[active=true]:border-[#1B6B4A] data-[active=true]:shadow-[0_0_0_3px_rgba(27,107,74,0.1)] data-[active=true]:ring-0",
              "aria-invalid:border-[#C0453B] aria-invalid:shadow-[0_0_0_3px_rgba(192,69,59,0.1)] data-[active=true]:aria-invalid:border-[#C0453B] data-[active=true]:aria-invalid:ring-0",
            )}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}

// The red message under the boxes
export function CodeError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="flex items-start justify-center gap-1.5 text-center text-xs text-[#C0453B]"
    >
      <CircleAlert size={13} className="mt-px shrink-0" />
      {message}
    </p>
  );
}
