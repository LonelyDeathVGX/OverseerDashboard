"use client";

import { ADD_TO_DISCORD_URL, SUPPORT_SERVER_URL } from "@/lib/Constants";
import { type Session, deleteSession } from "@/lib/Server";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { RouteBases } from "discord-api-types/v10";
import { useRouter } from "next/navigation";

const Items: {
  name: string;
  href: string;
  isExternal?: boolean;
}[] = [
  {
    name: "Add to Discord",
    href: ADD_TO_DISCORD_URL,
    isExternal: true,
  },
  {
    name: "Support Server",
    href: SUPPORT_SERVER_URL,
    isExternal: true,
  },
  {
    name: "Manage Servers",
    href: "/dashboard",
  },
];

export function DropdownComponent({ session }: { session: Session }) {
  const router = useRouter();
  const handleLogout = async () => {
    await deleteSession();
    router.refresh();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered={true}
          as="button"
          size="sm"
          src={`${`${RouteBases.cdn}/avatars/${session.userId}/${session.avatarHash}.png`}`}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownSection showDivider={true}>
          <DropdownItem isReadOnly={true}>
            <User
              name={<h1 className="font-bold">@{session.username}</h1>}
              description={<p className="font-medium text-sm">{session.userId}</p>}
              avatarProps={{
                size: "sm",
                radius: "sm",
                src: `${`${RouteBases.cdn}/avatars/${session.userId}/${session.avatarHash}.png`}`,
              }}
            />
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider={true} title="Links" className="font-medium">
          {Items.map((item) => (
            <DropdownItem
              key={item.name}
              href={item.href}
              target={item.isExternal ? "_blank" : "_self"}
              className="font-medium"
            >
              {item.name}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection title="Actions" className="font-medium">
          <DropdownItem color="danger" className="font-medium text-danger" onPress={handleLogout}>
            Logout
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
