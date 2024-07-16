import { Unlink } from "lucide-react";
import Link from "next/link";
import { Button } from "#ui/Button";

export default function Page() {
  return (
    <main>
      <div className="flex full-screen:h-[650px] h-screen items-center justify-center py-8">
        <div className=" flex w-full max-w-[1024px] flex-col items-center justify-center gap-6 px-7">
          <div className="rounded-lg border border-default-700 p-6">
            <Unlink className="size-36 text-white" />
          </div>
          <h1 className="text-center font-bold text-white text-xl">This page could not be found</h1>
          <Button asChild={true} variant="link">
            <Link target="_self" href="/" aria-label="Go to Main Page" className="flex items-center gap-2">
              Go to Main Page
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
