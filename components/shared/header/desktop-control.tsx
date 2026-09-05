import { Button } from "../../ui/button";
import { Link } from "@/i18n/navigation";

export function DesktopControl() {
  return (
    <div>
      <Button asChild variant="ghost" className="hover:bg-transparent">
        <Link href="/auth?action=sign-in">
          <span className="whitespace-nowrap text-[11px] tracking-[0.08em] text-[rgba(245,240,232,0.7)] hover:text-primary transition-colors px-3 py-2 uppercase font-semibold">
            Sign In
          </span>
        </Link>
      </Button>

      <Button
        asChild
        className="h-9.5 px-4 py-2.5 rounded bg-primary hover:bg-[#E8D5A0] transition-all duration-200 shadow-[0_4px_16px_rgba(201,164,69,0.28)]"
      >
        <Link href="/post-listing">
          <span className="whitespace-nowrap text-[11px] xl:text-[12px] tracking-widest font-bold uppercase  text-primary-foreground">
            Post a Listing
          </span>
        </Link>
      </Button>
    </div>
  );
}
