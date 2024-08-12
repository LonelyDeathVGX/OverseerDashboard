"use client";

import { cutText } from "@sapphire/utilities";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "#lib/constants/SidebarCategories";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "#ui/Accordion";
import { Button } from "#ui/Button";

export const SidebarAccordionComponent = ({
  category,
}: {
  category: Category;
}) => {
  const pathname = usePathname();

  return (
    <Accordion collapsible={true} defaultValue={category.name} type="single">
      <AccordionItem value={category.name}>
        <AccordionTrigger className="px-3 font-bold text-xs">{category.name.toUpperCase()}</AccordionTrigger>
        <AccordionContent>
          {category.items.map((item, _) => (
            <Button
              asChild={true}
              className="flex w-full justify-start"
              key={item.name}
              variant={pathname === item.href ? "default" : "ghost"}
            >
              <Link
                aria-label={item.ariaLabel}
                className="flex items-center gap-2"
                href={item.href}
                target={item.target}
              >
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
};
