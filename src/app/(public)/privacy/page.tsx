import type { Metadata } from "next";
import { NavbarComponent } from "#components/navbar/Navbar";
import { BASE_URL } from "#lib/Constants";
import { createMetadata } from "#metadata";
import PrivacyPolicy from "./_lib/components/Privacy-Policy.mdx";

export const metadata: Metadata = createMetadata({
  canonical: `${BASE_URL}/privacy`,
  description: "This Privacy Policy indicates how we collect, use and protect users' personal information.",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
    },
    index: true,
  },
  title: "Privacy Policy - Overseer",
});

export default () => {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-8">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-8 [&>ul>li>span]:text-cyan-400">
          <PrivacyPolicy />
        </div>
      </div>
    </main>
  );
};
