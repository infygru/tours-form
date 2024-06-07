import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Close } from "@radix-ui/react-dialog";

export function DialogOpen({ button, children }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
}
