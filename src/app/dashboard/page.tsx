import { Suspense } from "react";
import { NavbarComponent } from "#components/navbar/Navbar";
import { GuildListComponent } from "./_lib/components/GuildList";
import { GuildListSkeletonComponent } from "./_lib/components/GuildListSkeleton";

export default () => {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-8">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-8">
          <h1 className="font-bold text-3xl">Manage a Server</h1>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            <Suspense fallback={<GuildListSkeletonComponent />}>
              <GuildListComponent />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
};
