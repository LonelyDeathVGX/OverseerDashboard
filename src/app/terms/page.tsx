import { CircleAlert } from "lucide-react";
import type { Metadata } from "next";
import { bold } from "#components/Fonts";
import { NavbarComponent } from "#components/navbar/Navbar";
import { BASE_URL } from "#lib/Constants";
import { Alert, AlertDescription } from "#ui/Alert";

export function generateMetadata(): Metadata {
  return {
    title: "Terms of Service - Overseer",
    description: "These Terms of Service indicate the rights and obligations of users with the use of our services.",
    alternates: {
      canonical: `${BASE_URL}/privacy`,
    },
    openGraph: {
      title: "Terms of Service - Overseer",
      description: "These Terms of Service indicate the rights and obligations of users with the use of our services.",
    },
  };
}

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-8">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-8">
          <h1 className={`${bold.className} text-3xl text-white`}>Terms of Service</h1>
          <div className="flex flex-col gap-6">
            <Alert variant="amber">
              <CircleAlert className="size-5" />
              <AlertDescription>This page is under construction.</AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </main>
  );
}
