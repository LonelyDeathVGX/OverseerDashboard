import { Unlink } from "lucide-react";
import Link from "next/link";
import { bold } from "#components/Fonts";
import { Button } from "#ui/Button";

export default function Page() {
  return (
    <main>
      <div className="flex full-screen:h-[650px] h-dvh items-center justify-center py-8">
        <div className=" flex w-full max-w-[1024px] flex-col items-center justify-center gap-6 px-7">
          <div className="rounded-lg border border-default-700 p-6">
            <Unlink className="size-10" />
          </div>
          <h1 className={`${bold.className} text-center text-xl`}>This page could not be found</h1>
          <Button asChild={true} variant="outline">
            <Link target="_self" href="/" aria-label="Go to Main Page">
              Go to Main Page
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
