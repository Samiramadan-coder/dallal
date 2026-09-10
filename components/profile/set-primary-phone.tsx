"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { setPrimaryPhone } from "@/lib/profile";
import { useTranslations } from "next-intl";

export default function SetPrimaryPhone({ phoneId }: { phoneId: number }) {
  const t = useTranslations("Profile.myPhones");
  const [loading, setLoading] = useState(false);

  async function handleSetPrimary() {
    setLoading(true);
    const result = await setPrimaryPhone(phoneId);
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      return;
    }

    if (result.message) {
      toast.error(result.message);
      return;
    }

    toast.error(t("errorSettingPrimary"));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="font-normal">
          {t("setPrimary")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("setPrimary")}</DialogTitle>
          <DialogDescription>{t("setPrimaryConfirmation")}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>
          <Button onClick={handleSetPrimary}>
            {loading && <Spinner className="size-4" />}
            {t("setPrimary")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
