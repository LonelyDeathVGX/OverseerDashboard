import type { APIGuild } from "discord-api-types/v10";
import { Bolt, CircuitBoard, Home, Mailbox, MessageSquareCode, NotepadText, SquareMousePointer } from "lucide-react";
import type { ReactElement } from "react";
import { Badge } from "#components/ui/Badge";
import { SidebarAccordionComponent } from "./SidebarAccordion";

const Categories: (guildID: string) => Category[] = (guildID) => [
  {
    name: "General",
    items: [
      {
        name: "Dashboard",
        href: `/dashboard/${guildID}`,
        icon: <Home className="size-5 text-default-400" />,
      },
      {
        name: "Configuration",
        href: `/dashboard/${guildID}/general/configuration`,
        icon: <Bolt className="size-5 text-default-400" />,
        badge: <Badge variant="emerald">New</Badge>,
      },
    ],
  },
  {
    name: "Management",
    items: [
      {
        name: "Suggestions",
        href: `/dashboard/${guildID}/management/suggestions`,
        icon: <Mailbox className="size-5 text-default-400" />,
        badge: <Badge variant="fuchsia">Soon</Badge>,
      },
      {
        name: "Automations",
        href: `/dashboard/${guildID}/management/automations`,
        icon: <CircuitBoard className="size-5 text-default-400" />,
        badge: <Badge variant="fuchsia">Soon</Badge>,
      },
      {
        name: "Forms",
        href: `/dashboard/${guildID}/management/forms`,
        icon: <NotepadText className="size-5 text-default-400" />,
        badge: <Badge variant="fuchsia">Soon</Badge>,
      },
    ],
  },
  {
    name: "Components",
    items: [
      {
        name: "Embed Messages",
        href: `/dashboard/${guildID}/components/embed-messages`,
        icon: <MessageSquareCode className="size-5 text-default-400" />,
        badge: <Badge variant="fuchsia">Soon</Badge>,
      },
      {
        name: "Buttons",
        href: `/dashboard/${guildID}/components/buttons`,
        icon: <SquareMousePointer className="size-5 text-default-400" />,
        badge: <Badge variant="fuchsia">Soon</Badge>,
      },
    ],
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
  name: string;
  items: CategoryItem[];
}

export interface CategoryItem {
  name: string;
  href: string;
  icon: ReactElement;
  badge?: ReactElement;
}
