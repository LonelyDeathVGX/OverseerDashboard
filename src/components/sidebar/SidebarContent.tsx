import type { APIGuild } from "discord-api-types/v10";
import { SidebarCategories } from "#lib/constants/SidebarCategories";
import { SidebarAccordionComponent } from "./SidebarAccordion";

export const SidebarContentComponent = ({
  guild,
}: {
  guild: APIGuild;
}) => {
  return SidebarCategories(guild.id).map((category) => (
    <SidebarAccordionComponent category={category} key={category.name} />
  ));
};
