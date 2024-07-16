import type { Metadata } from "next";
import { Suspense } from "react";
import { NavbarComponent } from "#components/navbar/Navbar";
import { BASE_URL } from "#lib/Constants";
import { GuildListComponent } from "./components/GuildList";
import { GuildListSkeletonComponent } from "./components/GuildListSkeleton";

export function generateMetadata(): Metadata {
  return {
    title: "Manage a Server - Overseer",
    alternates: {
      canonical: `${BASE_URL}/dashboard`,
    },
    openGraph: {
      title: "Manage a Server - Overseer",
    },
  };
}

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-8">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-8">
          <h1 className="font-bold text-3xl text-white">Manage a Server</h1>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            <Suspense fallback={<GuildListSkeletonComponent />}>
              <GuildListComponent />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
