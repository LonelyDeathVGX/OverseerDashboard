import type { APIGuild } from "discord-api-types/v10";
import { Bolt, CircuitBoard, Home, Mailbox, MessageSquareCode, NotepadText, SquareMousePointer } from "lucide-react";
import type { ReactElement } from "react";
import { Badge } from "#ui/Badge";
import { SidebarAccordionComponent } from "./SidebarAccordion";

export const Categories: (guildID: string) => Category[] = (guildID) => [
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
        href: `/dashboard/${guildID}/configuration`,
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
        href: `/dashboard/${guildID}/suggestions`,
        icon: <Mailbox className="size-5 text-default-400" />,
        badge: <Badge variant="fuchsia">Soon</Badge>,
      },
      {
        name: "Automations",
        href: `/dashboard/${guildID}/automations`,
        icon: <CircuitBoard className="size-5 text-default-400" />,
        badge: <Badge variant="fuchsia">Soon</Badge>,
      },
      {
        name: "Forms",
        href: `/dashboard/${guildID}/forms`,
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
        href: `/dashboard/${guildID}/embeds-messages`,
        icon: <MessageSquareCode className="size-5 text-default-400" />,
        badge: <Badge variant="fuchsia">Soon</Badge>,
      },
      {
        name: "Buttons",
        href: `/dashboard/${guildID}/buttons`,
        icon: <SquareMousePointer className="size-5 text-default-400" />,
        badge: <Badge variant="fuchsia">Soon</Badge>,
      },
    ],
  },
];

export function SidebarComponent({ guild }: { guild: APIGuild }) {
  return (
    <aside className="fixed top-16 flex h-screen w-80 flex-col border-default-700 border-r">
      <div className="flex flex-col gap-4 p-8">
        {Categories(guild.id).map((category) => (
          <SidebarAccordionComponent
            key={category.name}
            data={{
              ...category,
            }}
          />
        ))}
      </div>
    </aside>
  );
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
