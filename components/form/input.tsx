"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Input as UiInput } from "@/components/ui/input";

import {
  get,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  className?: string;
  inputClassName?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  description?: ReactNode;
  labelClassName?: string;
};

export default function Input<T extends FieldValues>({
  name,
  label,
  placeholder,
  required,
  register,
  errors,
  className,
  inputClassName,
  type = "text",
  disabled = false,
  prefix,
  suffix,
  description,
  labelClassName,
}: InputProps<T>) {
  const error = get(errors, name);

  const inputRegister =
    type === "number"
      ? register(name, {
          valueAsNumber: true,
        })
      : register(name);

  const hasAddon = Boolean(prefix || suffix);

  return (
    <Field className={className} data-invalid={!!error}>
      {label && (
        <FieldLabel
          htmlFor={name}
          className={cn(
            "text-xs font-semibold tracking-wider text-[#4A4840] uppercase",
            required && "after:ms-1 after:text-destructive after:content-['*']",
            labelClassName,
          )}
        >
          {label}
        </FieldLabel>
      )}

      <FieldContent>
        <div className="space-y-1.5">
          {hasAddon ? (
            <div
              className={cn(
                "flex h-11 overflow-hidden rounded-xl border border-[rgba(27,107,74,0.18)] bg-white",
                "focus-within:ring-ring/50 focus-within:border-ring focus-within:ring-[3px]",
                error && "border-destructive focus-within:ring-destructive/20",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {prefix && (
                <div className="flex items-center px-3 text-xs text-muted-foreground">
                  {prefix}
                </div>
              )}

              <UiInput
                {...inputRegister}
                id={name}
                type={type}
                placeholder={placeholder}
                aria-invalid={!!error}
                disabled={disabled}
                className={cn(
                  "h-full min-w-0 flex-1 rounded-none border-0 bg-transparent shadow-none placeholder:text-sm",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  inputClassName,
                )}
              />

              {suffix && (
                <div className="flex items-center px-3 text-xs text-muted-foreground">
                  {suffix}
                </div>
              )}
            </div>
          ) : (
            <UiInput
              {...inputRegister}
              id={name}
              type={type}
              placeholder={placeholder}
              aria-invalid={!!error}
              disabled={disabled}
              className={cn(
                "h-11 border-[rgba(27,107,74,0.18)] placeholder:text-sm bg-white rounded-xl",
                inputClassName,
              )}
            />
          )}

          <FieldError errors={[error]} />
          {description && <FieldDescription>{description}</FieldDescription>}
        </div>
      </FieldContent>
    </Field>
  );
}
