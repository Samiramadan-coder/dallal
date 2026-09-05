import Image from "next/image";
import { BadgeCheck, Clock3, Heart, MapPin, TrendingDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { getLocale } from "next-intl/server";
import { Button } from "../ui/button";

export default async function ListItem() {
  const locale = await getLocale();
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <article
      className="
        group
        relative
        grid
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-white
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-accent/20
        hover:shadow-[0_18px_50px_rgba(7,30,20,0.08)]
        md:grid-cols-[185px_1fr]
      "
    >
      {/* Image */}
      <div className="relative min-h-52 overflow-hidden md:min-h-60">
        <Image
          src="/product.png"
          alt="21K Gold Bangle Set"
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        <Badge className="absolute bottom-3 inset-s-3 bg-[#264c3b] text-[10px] font-bold text-white">
          21K
        </Badge>
      </div>

      <div className="flex min-w-0 flex-col p-5">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border border-accent/15 bg-accent/[0.07] text-[9px] font-bold uppercase tracking-widest text-accent">
                Gold
              </Badge>
              <Badge className="border border-accent/15 bg-accent/[0.07] text-[9px] font-semibold text-accent">
                <BadgeCheck className="size-3" />
                Verified
              </Badge>
              <span className="text-[10px] text-muted-foreground">Good</span>
            </div>

            <h3
              className={`mt-3 text-lg font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-accent md:text-xl ${fontClass}`}
            >
              21K Gold Bangle Set × 6 — Geometric Pattern
            </h3>

            <p className="mt-1.5 text-sm text-muted-foreground">
              Matching set of 6 solid 21K bangles with engraved geometric
              pattern.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <p>
                Weight:{" "}
                <span className="font-semibold text-foreground/70">87.2g</span>
              </p>

              <p>
                Karat:{" "}
                <span className="font-semibold text-foreground/70">21K</span>
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="size-9 shrink-0 rounded-full text-muted-foreground transition-all duration-200 hover:bg-destructive/5 hover:text-destructive"
          >
            <Heart className="size-4.5" strokeWidth={1.7} />
          </Button>
        </div>

        <div className="my-5 h-px bg-border" />

        <div className="mt-auto flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-end gap-2">
              <span className="font-playfair text-2xl font-semibold text-foreground">
                AED 19,400
              </span>

              <span className="pb-0.5 text-sm text-muted-foreground line-through">
                AED 20,100
              </span>
            </div>

            <Badge className="mt-2 gap-1 border border-accent/20 bg-accent/8 text-[10px] font-semibold text-accent">
              <TrendingDown className="size-3" />
              3% below market
            </Badge>
          </div>

          {/* Meta */}
          <div className="space-y-2 text-xs text-muted-foreground sm:text-end">
            <div className="flex items-center gap-1.5 sm:justify-end">
              <MapPin className="size-3.5" />
              <span>Sharjah, UAE</span>
            </div>

            <div className="flex items-center gap-1.5 sm:justify-end">
              <Clock3 className="size-3.5" />
              <span>1 day ago</span>
            </div>

            <div className="flex items-center gap-1.5 font-medium text-accent sm:justify-end">
              <BadgeCheck className="size-3.5" />
              <span>Sharjah Gold Souk</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
