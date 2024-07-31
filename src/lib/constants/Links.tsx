import { CirclePlus, Gavel, LayoutDashboard, LifeBuoy, LockKeyhole, Users } from "lucide-react";
import type { HTMLAttributeAnchorTarget, ReactElement } from "react";
import { ADD_TO_DISCORD_URL, SUPPORT_SERVER_URL } from "#lib/Constants";

export const Links: ({
  useLongText,
}: {
  useLongText: boolean;
}) => Record<"useful_links" | "about_us", Link[]> = (useLongText) => ({
  useful_links: [
    {
      href: ADD_TO_DISCORD_URL,
      icon: <CirclePlus className="size-5 text-default-400" />,
      name: useLongText ? "Add to Discord" : "Invite",
      target: "_blank",
    },
    {
      href: SUPPORT_SERVER_URL,
      icon: <LifeBuoy className="size-5 text-default-400" />,
      name: useLongText ? "Support Server" : "Discord",
      target: "_blank",
    },
    {
      href: "/dashboard",
      icon: <LayoutDashboard className="size-5 text-default-400" />,
      name: useLongText ? "Manage Servers" : "Dashboard",
      target: "_self",
    },
  ],
  about_us: [
    {
      href: "/terms",
      icon: <Gavel className="size-5 text-default-400" />,
      name: useLongText ? "Terms of Service" : "Terms",
      target: "_self",
    },
    {
      href: "/privacy",
      icon: <LockKeyhole className="size-5 text-default-400" />,
      name: useLongText ? "Privacy Policy" : "Privacy",
      target: "_self",
    },
    {
      href: "/team",
      icon: <Users className="size-5 text-default-400" />,
      name: useLongText ? "Meet the Team" : "Team",
      target: "_self",
    },
  ],
});

interface Link {
  href: string;
  icon: ReactElement;
  name: string;
  target: HTMLAttributeAnchorTarget;
}
