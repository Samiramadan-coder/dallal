import { LabeledField } from "../form/input";

// LabeledField with the auth pages' label and error text styles
export default function AuthField(
  props: React.ComponentProps<typeof LabeledField>,
) {
  return (
    <LabeledField
      labelClassName="text-xs font-semibold text-[#4A4840]"
      errorClassName="text-xs"
      {...props}
    />
  );
}
