import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

// Shared with buttons/links that should look like the submit button
export const submitBtnClass =
  "h-12 mt-2 w-full py-3.5 rounded-xl bg-[#1B6B4A] hover:bg-secondary text-[#FAF6EF] hover:text-[#FAF6EF] text-sm font-bold tracking-wide rtl:tracking-normal transition-all duration-200 shadow-[0_4px_20px_rgba(27,107,74,0.3)] hover:shadow-[0_6px_28px_rgba(27,107,74,0.4)] active:scale-[0.99]";

export default function SubmitBtn({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  return (
    <Button type="submit" variant="ghost" className={submitBtnClass}>
      {loading && <Spinner className="size-3 text-primary" />}
      {children}
    </Button>
  );
}
