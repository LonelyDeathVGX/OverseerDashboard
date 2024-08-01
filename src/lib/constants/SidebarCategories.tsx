import { Bolt, CircuitBoard, Home, Mailbox, MessageSquareCode, NotepadText, SquareMousePointer } from "lucide-react";
import type { HTMLAttributeAnchorTarget, ReactElement } from "react";
import { Badge } from "#components/ui/Badge";

export const SidebarCategories: (guildID: string) => Category[] = (guildID) => [
  {
    items: [
      {
        ariaLabel: "Main Dashboard Page",
        href: `/dashboard/${guildID}`,
        icon: <Home className="size-5 text-default-400" />,
        name: "Dashboard",
        target: "_self",
      },
      {
        ariaLabel: "Configuration Page",
        href: `/dashboard/${guildID}/general/configuration`,
        icon: <Bolt className="size-5 text-default-400" />,
        name: "Configuration",
        target: "_self",
      },
    ],
    name: "General",
  },
  {
    items: [
      {
        ariaLabel: "Suggestions Page",
        badge: <Badge variant="fuchsia">WIP</Badge>,
        href: `/dashboard/${guildID}/management/suggestions`,
        icon: <Mailbox className="size-5 text-default-400" />,
        name: "Suggestions",
        target: "_self",
      },
      {
        ariaLabel: "Automations Page",
        badge: <Badge variant="fuchsia">WIP</Badge>,
        href: `/dashboard/${guildID}/management/automations`,
        icon: <CircuitBoard className="size-5 text-default-400" />,
        name: "Automations",
        target: "_self",
      },
      {
        ariaLabel: "Forms Page",
        badge: <Badge variant="fuchsia">WIP</Badge>,
        href: `/dashboard/${guildID}/management/forms`,
        icon: <NotepadText className="size-5 text-default-400" />,
        name: "Forms",
        target: "_self",
      },
    ],
    name: "Management",
  },
  {
    items: [
      {
        ariaLabel: "Embed Messages Page",
        badge: <Badge variant="fuchsia">WIP</Badge>,
        href: `/dashboard/${guildID}/components/embed-messages`,
        icon: <MessageSquareCode className="size-5 text-default-400" />,
        name: "Embed Messages",
        target: "_self",
      },
      {
        ariaLabel: "Buttons Page",
        badge: <Badge variant="fuchsia">WIP</Badge>,
        href: `/dashboard/${guildID}/components/buttons`,
        icon: <SquareMousePointer className="size-5 text-default-400" />,
        name: "Buttons",
        target: "_self",
      },
    ],
    name: "Components",
  },
];

export interface Category {
  items: CategoryItem[];
  name: string;
}

interface CategoryItem {
  ariaLabel: string;
  badge?: ReactElement;
  href: string;
  icon: ReactElement;
  name: string;
  target: HTMLAttributeAnchorTarget;
}
