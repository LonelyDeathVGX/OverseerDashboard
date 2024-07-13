import type { APIGuild } from "discord-api-types/v10";
import { Home, Settings, Sparkles } from "lucide-react";
import type { ReactElement } from "react";
import { Badge } from "#ui/Badge";
import { SidebarAccordionComponent } from "./SidebarAccordion";
import { SidebarDropdownComponent } from "./SidebarDropdown";

const Elements: (guildID: string) => {
  category: string;
  items: {
    name: string;
    href: string;
    icon: ReactElement;
    badge?: ReactElement;
  }[];
}[] = (guildID: string) => [
  {
    category: "general",
    items: [
      {
        name: "Dashboard",
        href: `/dashboard/${guildID}`,
        icon: <Home className="size-5 text-default-400" />,
      },
      {
        name: "Configuration",
        href: `/dashboard/${guildID}/configuration`,
        icon: <Settings className="size-5 text-default-400" />,
        badge: (
          <Badge variant="emerald">
            <Sparkles className="size-3" />
            New
          </Badge>
        ),
      },
    ],
  },
];

export function SidebarComponent({ guild }: { guild: APIGuild }) {
  return (
    <aside className="fixed top-16 hidden h-screen w-80 flex-col border-default-700 border-r md:flex">
      <div className="flex flex-col gap-4 p-8">
        <SidebarDropdownComponent guild={guild} />
        {Elements(guild.id).map((element) => (
          <SidebarAccordionComponent
            key={element.category}
            data={{
              ...element,
            }}
          />
        ))}
      </div>
    </aside>
  );
}
