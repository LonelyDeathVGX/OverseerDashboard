import { Unlink2 } from "@/components/Icons";
import { NavbarComponent } from "@/components/common/main/navbar/Navbar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="full-page flex items-center justify-center py-12">
        <div className=" flex w-full max-w-[1024px] flex-col items-center justify-center gap-6 px-7">
          <div className="rounded-lg border border-default-800 p-6">
            <Unlink2 className="size-36 text-white" />
          </div>
          <h1 className="text-center font-bold text-white text-xl">This page could not be found</h1>
          <Button asChild={true} variant="outline">
            <Link target="_self" href="/">
              Go to main page
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
