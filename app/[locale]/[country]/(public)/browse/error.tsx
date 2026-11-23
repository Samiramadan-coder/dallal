"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { RotateCw, TriangleAlert } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const t = useTranslations("Browse.error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-card-foreground px-4 pt-30 pb-16">
      <div className="w-full max-w-md rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-[rgba(217,181,90,0.15)]">
          <TriangleAlert className="size-6 text-[#D9B55A]" aria-hidden />
        </div>
        <h1 className="mb-2 text-lg font-bold text-foreground">
          {t("title")}
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1B6B4A] px-5 py-2.5 text-sm font-semibold text-card-foreground transition-opacity hover:opacity-90"
          >
            <RotateCw className="size-4" aria-hidden />
            {t("retry")}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-[rgba(27,107,74,0.2)] px-5 py-2.5 text-sm font-semibold text-[#1B6B4A] transition-colors hover:border-[#1B6B4A]"
          >
            {t("home")}
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 font-mono text-[10px] text-muted-foreground">
            {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
