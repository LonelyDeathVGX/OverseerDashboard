import type { APIGuild } from "discord-api-types/v10";
import { SidebarContentComponent } from "./SidebarContent";

export const SidebarComponent = ({
  guild,
}: {
  guild: APIGuild;
}) => {
  return (
    <aside className="fixed top-16 flex h-screen w-80 flex-col border-default-700 border-r">
      <div className="flex flex-col gap-4 p-8">
        <SidebarContentComponent guild={guild} />
      </div>
    </aside>
  );
};
