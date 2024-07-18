"use client";

import { Bug } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { bold } from "#components/Fonts";
import { SUPPORT_SERVER_URL } from "#lib/Constants";
import { Button } from "#ui/Button";

export default function Page({
  error,
}: {
  error: Error & {
    digest?: string;
  };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <div className="flex full-screen:h-[650px] h-dvh items-center justify-center py-8">
        <div className=" flex w-full max-w-[1024px] flex-col items-center justify-center gap-6 px-7">
          <div className="rounded-lg border border-default-700 p-6">
            <Bug className="size-10" />
          </div>
          <h1 className={`${bold.className} text-center text-xl`}>Something went wrong...</h1>
          <Button asChild={true} variant="outline">
            <Link target="_self" href={SUPPORT_SERVER_URL} aria-label="Support Server Link">
              Support Server
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
