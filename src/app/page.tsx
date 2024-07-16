import { CircleAlert, Info } from "lucide-react";
import Link from "next/link";
import { bold } from "#components/Fonts";
import { NavbarComponent } from "#components/navbar/Navbar";
import { Alert, AlertDescription } from "#components/ui/Alert";
import { SUPPORT_SERVER_URL } from "#lib/Constants";

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-8">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-8">
          <div className="flex flex-col gap-6">
            <Alert variant="amber">
              <CircleAlert className="size-5" />
              <AlertDescription>This page is under construction.</AlertDescription>
            </Alert>
            <Alert variant="cyan">
              <Info className="size-5" />
              <AlertDescription>
                Join our{" "}
                <Link href={SUPPORT_SERVER_URL} className={bold.className}>
                  support server
                </Link>{" "}
                for updates.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </main>
  );
}
