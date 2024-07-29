import type { APIGuild } from "discord-api-types/v10";
import { Bolt, CircuitBoard, Home, Mailbox, MessageSquareCode, NotepadText, SquareMousePointer } from "lucide-react";
import type { ReactElement } from "react";
import { Badge } from "#components/ui/Badge";
import { SidebarAccordionComponent } from "./SidebarAccordion";

const Categories: (guildID: string) => Category[] = (guildID) => [
  {
    items: [
      {
        href: `/dashboard/${guildID}`,
        icon: <Home className="size-5 text-default-400" />,
        name: "Dashboard",
      },
      {
        badge: <Badge variant="emerald">New</Badge>,
        href: `/dashboard/${guildID}/general/configuration`,
        icon: <Bolt className="size-5 text-default-400" />,
        name: "Configuration",
      },
    ],
    name: "General",
  },
  {
    items: [
      {
        badge: <Badge variant="fuchsia">Soon</Badge>,
        href: `/dashboard/${guildID}/management/suggestions`,
        icon: <Mailbox className="size-5 text-default-400" />,
        name: "Suggestions",
      },
      {
        badge: <Badge variant="fuchsia">Soon</Badge>,
        href: `/dashboard/${guildID}/management/automations`,
        icon: <CircuitBoard className="size-5 text-default-400" />,
        name: "Automations",
      },
      {
        badge: <Badge variant="fuchsia">Soon</Badge>,
        href: `/dashboard/${guildID}/management/forms`,
        icon: <NotepadText className="size-5 text-default-400" />,
        name: "Forms",
      },
    ],
    name: "Management",
  },
  {
    items: [
      {
        badge: <Badge variant="fuchsia">Soon</Badge>,
        href: `/dashboard/${guildID}/components/embed-messages`,
        icon: <MessageSquareCode className="size-5 text-default-400" />,
        name: "Embed Messages",
      },
      {
        badge: <Badge variant="fuchsia">Soon</Badge>,
        href: `/dashboard/${guildID}/components/buttons`,
        icon: <SquareMousePointer className="size-5 text-default-400" />,
        name: "Buttons",
      },
    ],
    name: "Components",
  },
];

export function SidebarContentComponent({
  guild,
}: {
  guild: APIGuild;
}) {
  return Categories(guild.id).map((category) => (
    <SidebarAccordionComponent
      key={category.name}
      data={{
        ...category,
      }}
    />
  ));
}

export interface Category {
  items: CategoryItem[];
  name: string;
}

export interface CategoryItem {
  badge?: ReactElement;
  href: string;
  icon: ReactElement;
  name: string;
}
