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
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { deletePhone } from "@/lib/profile";
import { useTranslations } from "next-intl";

export default function DeletePhone({ phoneId }: { phoneId: number }) {
  const t = useTranslations("Profile.myPhones");
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const result = await deletePhone(phoneId);
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      return;
    }

    if (result.message) {
      toast.error(result.message);
      return;
    }

    toast.error(t("errorDeleting"));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="hover:bg-primary/90">
          <Trash />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("delete")}</DialogTitle>
          <DialogDescription>{t("deleteConfirmation")}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>
          <Button onClick={handleDelete}>
            {loading && <Spinner className="size-4" />}
            {t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
