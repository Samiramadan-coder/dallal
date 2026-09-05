import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { getLocale } from "next-intl/server";
import { BadgeCheck, Clock3, Heart, MapPin, TrendingDown } from "lucide-react";

export default async function GridItem() {
  const locale = await getLocale();
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:border-accent/40 hover:shadow-[0_18px_45px_rgba(7,30,20,0.10)]">
      <div className="relative aspect-[1.25] overflow-hidden bg-[#f7f7f4]">
        <Image
          src="/product.png"
          alt="22K Gold Pearl Drop Necklace"
          fill
          sizes="310px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <Badge className="absolute inset-s-3 top-3 text-[9px] uppercase font-bold tracking-[0.12em] shadow-sm">
          Featured
        </Badge>
        <Badge className="absolute inset-s-3 top-11 bg-white/95 text-[9px] font-bold text-accent shadow-sm">
          <BadgeCheck className="size-3" />
          Verified
        </Badge>
        <Button className="absolute inset-e-3 top-3 size-9 rounded-full bg-white text-muted-foreground shadow-sm transition-all hover:scale-105 hover:text-destructive">
          <Heart className="size-4" strokeWidth={1.7} />
        </Button>
        <Badge className="absolute bottom-3 inset-s-3 text-[10px] font-bold text-primary-foreground">
          22K
        </Badge>
      </div>

      <div className="px-4 pt-4">
        <div className="flex items-center gap-2">
          <Badge className="border border-accent/15 bg-accent/[0.07] text-[9px] font-bold uppercase tracking-[0.08em] text-accent">
            Necklaces
          </Badge>
          <span className="text-[9px] font-medium text-muted-foreground">
            Like New
          </span>
        </div>

        <h3
          className={`mt-3 text-sm font-semibold leading-5 text-foreground transition-colors duration-300 group-hover:text-accent ${fontClass}`}
        >
          22K Gold Pearl Drop Necklace — Bridal Set
        </h3>

        <p className="mt-2 text-[11px] font-medium text-muted-foreground">
          32.5g · 22K
        </p>

        <Badge className="mt-3 border border-accent/20 bg-accent/8 text-[10px] font-bold text-accent">
          <TrendingDown className="size-3" />
          8% below market
        </Badge>

        <div className="mt-4 flex items-end gap-2">
          <span
            className={`text-xl font-semibold text-foreground ${fontClass}`}
          >
            AED 7,250
          </span>
          <span className="pb-0.5 text-xs text-muted-foreground line-through">
            AED 7,900
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border py-4 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3" />
            <span>Dubai</span>
          </div>

          <div className="flex items-center gap-3">
            <BadgeCheck className="size-3.5 text-accent" />
            <div className="flex items-center gap-1.5">
              <Clock3 className="size-3" />
              <span>2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
