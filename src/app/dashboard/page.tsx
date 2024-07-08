import { GuildListComponent } from "@/components/common/main/dashboard/GuildList";
import { GuildListSkeletonComponent } from "@/components/common/main/dashboard/GuildListSkeleton";
import { NavbarComponent } from "@/components/common/main/navbar/Navbar";
import { Suspense } from "react";

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-12">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-5">
          <h1 className="font-bold text-3xl text-white">Manage a server</h1>
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
