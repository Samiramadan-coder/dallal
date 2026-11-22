"use client";

import type { ComponentProps } from "react";
import { useParams } from "next/navigation";
import { base } from "./base-navigation";
import { withCountry } from "./country-href";

type Props = ComponentProps<typeof base.Link> & {
  // Link to another country (defaults to the current one)
  country?: string;
};

// next-intl's Link that also keeps the current country:
// <Link href="/browse" /> → "/sa/browse" (or "/ar/sa/browse")
export function Link({ href, country, ...props }: Props) {
  const params = useParams<{ country?: string }>();
  return (
    <base.Link href={withCountry(href, country ?? params.country)} {...props} />
  );
}
