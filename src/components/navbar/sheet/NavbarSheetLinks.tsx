import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "#components/ui/Accordion";
import { Button } from "#components/ui/Button";
import { Links } from "#lib/constants/Links";

export function NavbarSheetLinksComponent() {
  return (["useful_links", "about_us"] as const).map((group) => (
    <Accordion collapsible={true} defaultValue={group} key={group} type="single">
      <AccordionItem value={group}>
        <AccordionTrigger className="px-3 font-bold text-xs">
          {group.replaceAll("_", " ").toUpperCase()}
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {Links({
              useLongText: true,
            })[group].map((link) => (
              <li key={link.name}>
                <Button asChild={true} className="justify-start" variant="ghost">
                  <Link
                    aria-label={link.ariaLabel}
                    className="flex w-full items-center gap-2"
                    href={link.href}
                    target={link.target}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ));
}
