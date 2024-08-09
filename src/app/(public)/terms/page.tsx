import type { Metadata } from "next";
import { NavbarComponent } from "#components/navbar/Navbar";
import { BASE_URL } from "#lib/Constants";
import { createMetadata } from "#metadata";
import TermsOfService from "./_lib/components/Terms-Of-Service.mdx";

export const metadata: Metadata = createMetadata({
  canonical: `${BASE_URL}/terms`,
  description: "These Terms of Service indicate the rights and obligations of users with the use of our services.",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
    },
    index: true,
  },
  title: "Terms of Service - Overseer",
});

export default () => {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-8">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-8 [&>ul>li>span]:text-cyan-400">
          <TermsOfService />
        </div>
      </div>
    </main>
  );
};
