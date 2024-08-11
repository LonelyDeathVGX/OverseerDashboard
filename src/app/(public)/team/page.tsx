import type { Metadata } from "next";
import { NavbarComponent } from "#components/navbar/Navbar";
import { BASE_URL } from "#lib/Constants";
import { createMetadata } from "#metadata";
import { MemberComponent } from "./_lib/components/Member";

export const metadata: Metadata = createMetadata({
  canonical: `${BASE_URL}/team`,
  description: "Meet the core team behind Overseer, the Discord bot that enhances server management.",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
    },
    index: true,
  },
  title: "Meet the Team - Overseer",
});

const CoreTeamMembers: Member[] = [
  {
    name: "LonelyDeath",
    roles: ["Founder", "Main Developer"],
    userID: "945029082314338407",
  },
  {
    name: "Dymidless",
    roles: ["Developer"],
    userID: "749895975694499930",
  },
];

export default () => {
  return (
    <main className="flex min-h-screen flex-col">
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-8">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-8">
          <h1 className="font-bold text-3xl">Core Team</h1>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {CoreTeamMembers.map((member) => (
              <MemberComponent key={member.userID} member={member} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export interface Member {
  name: string;
  roles: string[];
  userID: string;
}
