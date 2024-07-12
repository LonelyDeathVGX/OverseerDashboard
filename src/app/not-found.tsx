import { House, Unlink } from "lucide-react";
import Link from "next/link";
import { NavbarComponent } from "#components/navbar/Navbar";
import { Button } from "#ui/Button";

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="full-page flex items-center justify-center py-12">
        <div className=" flex w-full max-w-[1024px] flex-col items-center justify-center gap-6 px-7">
          <div className="rounded-lg border border-default-700 p-6">
            <Unlink className="size-36 text-white" />
          </div>
          <h1 className="text-center font-bold text-white text-xl">This page could not be found</h1>
          <Button asChild={true} variant="outline">
            <Link target="_self" href="/" className="flex items-center gap-2">
              <House className="size-5" />
              <span>Go to main page</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
