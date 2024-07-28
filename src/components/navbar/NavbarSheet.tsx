import type { Nullish } from "@sapphire/utilities";
import { Menu } from "lucide-react";
import Link from "next/link";
import { LogoComponent } from "#components/Logo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "#components/ui/Accordion";
import { Button } from "#components/ui/Button";
import { Separator } from "#components/ui/Separator";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "#components/ui/Sheet";
import type { Session } from "#lib/Server";
import { Items } from "./Navbar";
import { NavbarLoginComponent } from "./NavbarLogin";
import { NavbarLogoutComponent } from "./NavbarLogout";

export function NavbarSheetComponent({
  session,
}: {
  session: Session | Nullish;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <Button variant="outline" size="icon">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader className="px-3">
          <SheetTitle>
            <LogoComponent />
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <Accordion collapsible={true} type="single" defaultValue="Links">
          <AccordionItem value="Links">
            <AccordionTrigger className="px-3 font-extrabold text-xs">{"Useful Links".toUpperCase()}</AccordionTrigger>
            <AccordionContent>
              <ul>
                {Items(true).map((item) => (
                  <li key={item.name}>
                    <Button asChild={true} variant="ghost" className="justify-start">
                      <Link
                        target={item.target}
                        href={item.href}
                        aria-label={`${item.name} ${item.target === "_self" ? "Page" : "Link"}`}
                        className="flex w-full items-center gap-2"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator />
        <SheetFooter className="px-3">{session ? <NavbarLogoutComponent /> : <NavbarLoginComponent />}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
