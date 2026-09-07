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
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Controller,
  get,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";

export type SelectOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

type SelectProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  control: Control<T>;
  errors?: FieldErrors<T>;
  options: SelectOption[];
  className?: string;
  triggerClassName?: string;
  disabled?: boolean;
  description?: ReactNode;
};

export default function Select<T extends FieldValues>({
  name,
  label,
  placeholder,
  required,
  control,
  errors,
  options,
  className,
  triggerClassName,
  disabled = false,
  description,
}: SelectProps<T>) {
  const error = get(errors, name);

  return (
    <Field className={className} data-invalid={!!error}>
      {label && (
        <FieldLabel
          htmlFor={name}
          className={cn(
            "text-xs font-semibold tracking-wider text-[#4A4840] uppercase",
            required && "after:ms-1 after:text-destructive after:content-['*']",
          )}
        >
          {label}
        </FieldLabel>
      )}

      <FieldContent>
        <div className="space-y-1.5">
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <UiSelect
                value={field.value ?? ""}
                onValueChange={field.onChange}
                onOpenChange={(open) => {
                  if (!open) field.onBlur();
                }}
                disabled={disabled}
                name={field.name}
              >
                <SelectTrigger
                  id={name}
                  ref={field.ref}
                  aria-invalid={!!error}
                  className={cn(
                    "min-h-11 w-full rounded-xl border-[rgba(27,107,74,0.18)] bg-white",
                    triggerClassName,
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                  {options.map(
                    ({
                      value,
                      label: optionLabel,
                      disabled: optionDisabled,
                    }) => (
                      <SelectItem
                        key={value}
                        value={value}
                        disabled={optionDisabled}
                      >
                        {optionLabel}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </UiSelect>
            )}
          />

          <FieldError errors={[error]} />
          {description && <FieldDescription>{description}</FieldDescription>}
        </div>
      </FieldContent>
    </Field>
  );
}
