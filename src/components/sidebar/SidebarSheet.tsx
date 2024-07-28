import type { APIGuild } from "discord-api-types/v10";
import { SquareChevronRight } from "lucide-react";
import { LogoComponent } from "#components/Logo";
import { Button } from "#components/ui/Button";
import { Separator } from "#components/ui/Separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "#components/ui/Sheet";
import { SidebarContentComponent } from "./SidebarContent";

export function SidebarSheetComponent({
  guild,
}: {
  guild: APIGuild;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <Button variant="outline" size="icon">
          <SquareChevronRight className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <LogoComponent />
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="overflow-y-auto">
          <div className="flex flex-col gap-4">
            <SidebarContentComponent guild={guild} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}