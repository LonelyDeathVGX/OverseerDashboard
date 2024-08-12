import type { APIGuild } from "discord-api-types/v10";
import { SquareChevronRight } from "lucide-react";
import { LogoComponent } from "#components/Logo";
import { Button } from "#components/ui/Button";
import { Separator } from "#components/ui/Separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "#components/ui/Sheet";
import { SidebarContentComponent } from "./SidebarContent";

export const SidebarSheetComponent = ({
  guild,
}: {
  guild: APIGuild;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <Button size="icon" variant="outline">
          <SquareChevronRight className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="overflow-y-auto">
          <div className="flex flex-col gap-4">
            <SheetHeader className="px-3">
              <SheetTitle>
                <LogoComponent />
              </SheetTitle>
            </SheetHeader>
            <Separator />
            <SidebarContentComponent guild={guild} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
