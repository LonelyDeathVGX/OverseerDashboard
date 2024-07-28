"use client";

import { cutText } from "@sapphire/utilities";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "#ui/Accordion";
import { Button } from "#ui/Button";
import type { Category } from "./SidebarContent";

export function SidebarAccordionComponent({
  data,
}: {
  data: Category;
}) {
  const pathname = usePathname();

  return (
    <Accordion collapsible={true} type="single" defaultValue={data.name}>
      <AccordionItem value={data.name}>
        <AccordionTrigger className="px-3 font-extrabold text-xs">{data.name.toUpperCase()}</AccordionTrigger>
        <AccordionContent>
          {data.items.map((item, _) => (
            <Button
              key={item.name}
              asChild={true}
              variant={pathname === item.href ? "default" : "ghost"}
              className="flex w-full justify-start"
            >
              <Link href={item.href} aria-label={`${item.name} Page`} className="flex items-center gap-2">
                {item.icon}
                {cutText(item.name, 17)}
                {item.badge && <span className="flex w-full justify-end">{item.badge}</span>}
              </Link>
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
