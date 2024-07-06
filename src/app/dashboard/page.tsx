import { GuildListComponent } from "@/components/common/main/dashboard/GuildList";
import { GuildListSkeletonComponent } from "@/components/common/main/dashboard/GuildListSkeleton";
import { NavbarComponent } from "@/components/common/main/navbar/Navbar";
import { Suspense } from "react";

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="py-12 flex items-center justify-center">
        <div className="max-w-[1024px] w-full px-7 flex flex-col gap-6">
          <h1 className="font-bold text-3xl text-white text-center">Manage a server</h1>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <Suspense fallback={<GuildListSkeletonComponent />}>
              <GuildListComponent />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
