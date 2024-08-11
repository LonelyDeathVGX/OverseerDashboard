import { Unlink } from "lucide-react";
import Link from "next/link";
import { Button } from "#ui/Button";

export default () => {
  return (
    <main>
      <div className="flex full-screen:h-[650px] h-dvh items-center justify-center py-8">
        <div className=" flex w-full max-w-[1024px] flex-col items-center justify-center gap-6 px-7">
          <div className="rounded-lg border border-default-700 p-6">
            <Unlink className="size-10" />
          </div>
          <h1 className="text-center font-bold text-xl">This page could not be found</h1>
          <Button asChild={true} variant="outline">
            <Link aria-label="Go to Main Page" href="/" target="_self">
              Go to Main Page
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};
