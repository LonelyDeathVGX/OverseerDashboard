import type { Metadata } from "next";
import Image from "next/image";
import { NavbarComponent } from "#components/navbar/Navbar";
import { Badge } from "#components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/Card";

export function generateMetadata(): Metadata {
  return {
    title: "Team - Overseer",
    description: "Meet the core team behind Overseer.",
  };
}

export default function TeamPage() {
  const coreTeamMembers = [
    {
      id: "945029082314338407",
      username: "lonelydeath",
      avatarUrl: "/assets/lonelydeath.png",
    },
    {
      id: "749895975694499930",
      username: "dymidless",
      avatarUrl: "/assets/dymidless.png",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <NavbarComponent isDashboard={false} />
      <div className="flex flex-grow flex-col items-center px-4 py-8">
        <h1 className="mb-6 text-center font-extrabold text-4xl">Meet the Core Team</h1>
        <div className="flex max-w-screen-xl flex-wrap justify-center gap-8">
          {coreTeamMembers.map((member) => (
            <Card key={member.id} className="mx-2 mb-6 max-w-xs sm:max-w-sm">
              <CardHeader className="mb-4 flex justify-center">
                <div className="h-32 w-32">
                  <Image
                    src={member.avatarUrl}
                    alt={`${member.username}'s avatar`}
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <CardTitle className="mb-2 text-center">{member.username}</CardTitle>
                <Badge variant="cyan" className="px-4 py-1">
                  Core Team
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
