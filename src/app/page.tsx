import Link from "next/link";
import { NavbarComponent } from "#components/navbar/Navbar";
import { Button } from "#components/ui/Button";
import { ADD_TO_DISCORD_URL, OAUTH2_URL } from "#lib/Constants";
import { fetchSession } from "#lib/Server";

export default async function Page() {
  const session = await fetchSession();

  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex full-screen:h-[calc(650px_-_64px)] h-[calc(100dvh_-_64px)] flex-col items-center justify-center gap-6 px-8">
        <div className="rounded-full bg-amber-950 p-3 text-center text-amber-400 text-xs">
          Overseer is in Alpha phase. There may be bugs
        </div>
        <h1 className="max-w-xl text-center font-extrabold text-5xl">
          A better way to manage <br />
          Discord Servers
        </h1>
        <p className="max-w-xl text-center text-default-400">
          Overseer is a Discord bot created with the purpose of being robust and manage Discord Servers in a better and
          easy way
        </p>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
          <Button variant="white" asChild={true}>
            <Link target="_self" href={ADD_TO_DISCORD_URL} aria-label="Add to Discord Link">
              Add to Discord
            </Link>
          </Button>
          <Button variant="outline" asChild={true}>
            <Link
              target="_self"
              href={session ? "/dashboard" : OAUTH2_URL}
              aria-label={session ? "Manage Servers Link" : "Login with Discord Link"}
            >
              {session ? "Manage Servers" : "Login with Discord"}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
