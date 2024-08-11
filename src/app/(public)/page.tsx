import Link from "next/link";
import { NavbarComponent } from "#components/navbar/Navbar";
import { Button } from "#components/ui/Button";
import { ADD_TO_DISCORD_URL } from "#lib/Constants";

export default () => {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex full-screen:h-[calc(650px_-_64px)] h-[calc(100dvh_-_64px)] flex-col items-center justify-center gap-6 px-8">
        <div className="rounded-full bg-amber-950 p-3 text-center text-amber-400 text-xs">
          Overseer is in Alpha phase. There may be bugs
        </div>
        <h1 className="max-w-xl text-center font-bold text-5xl">
          A better way to manage <br />
          Discord Servers
        </h1>
        <p className="max-w-xl text-center text-default-400">
          Overseer is a Discord bot created with the purpose of being robust and manage Discord Servers in a better and
          easy way
        </p>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
          <Button asChild={true} variant="white">
            <Link aria-label="Add to Discord Link" href={ADD_TO_DISCORD_URL} target="_self">
              Add to Discord
            </Link>
          </Button>
          <Button asChild={true} variant="outline">
            <Link aria-label="Manage Servers Link" href="/dashboard" target="_self">
              Manage Servers
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};
