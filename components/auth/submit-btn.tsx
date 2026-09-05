import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function SubmitBtn({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  return (
    <Button
      type="submit"
      variant="ghost"
      className="h-12 mt-2 w-full py-3.5 rounded-xl bg-[#1B6B4A] hover:bg-secondary text-white hover:text-white text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-[0_4px_20px_rgba(27,107,74,0.3)] hover:shadow-[0_6px_28px_rgba(27,107,74,0.4)] active:scale-[0.99]"
    >
      {loading && <Spinner className="size-3 text-primary" />}
      {children}
    </Button>
  );
}
