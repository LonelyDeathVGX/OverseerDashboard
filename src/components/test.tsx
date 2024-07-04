"use client";

import { Button } from "@nextui-org/react";
import { toast } from "sonner";

export function Test() {
  return (
    <Button
      onClick={() => {
        toast("The changes have been saved", {
          unstyled: true,
          classNames: {
            toast: "dark bg-content1 border-transparent rounded-large shadow-medium p-4 w-full h-auto text-sm",
            title: "text-foreground font-medium",
          },
        });
      }}
    >
      Toast
    </Button>
  );
}
