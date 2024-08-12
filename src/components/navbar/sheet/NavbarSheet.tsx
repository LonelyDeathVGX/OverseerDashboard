import type { Nullish } from "@sapphire/utilities";
import { Menu } from "lucide-react";
import { LogoComponent } from "#components/Logo";
import { Button } from "#components/ui/Button";
import { Separator } from "#components/ui/Separator";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "#components/ui/Sheet";
import type { Session } from "#lib/Server";
import { LoginComponent } from "../../buttons/Login";
import { LogoutComponent } from "../../buttons/Logout";
import { NavbarSheetLinksComponent } from "./NavbarSheetLinks";

export const NavbarSheetComponent = ({
  session,
}: {
  session: Session | Nullish;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <Button size="icon" variant="outline">
          <Menu className="size-5" />
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
            <NavbarSheetLinksComponent />
            <Separator />
            <SheetFooter className="px-3">{session ? <LogoutComponent /> : <LoginComponent />}</SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
