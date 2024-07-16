import type { Metadata } from "next";
import { bold } from "#components/Fonts";
import { NavbarComponent } from "#components/navbar/Navbar";
import { BASE_URL } from "#lib/Constants";

export function generateMetadata(): Metadata {
  return {
    title: "Privacy Policy - Overseer",
    description: "This Privacy Policy indicates how we collect, use and protect users' personal information.",
    alternates: {
      canonical: `${BASE_URL}/privacy`,
    },
    openGraph: {
      title: "Privacy Policy - Overseer",
      description: "This Privacy Policy indicates how we collect, use and protect users' personal information.",
    },
  };
}

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-8">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-8">
          <h1 className={`${bold.className} text-3xl`}>Privacy Policy</h1>
          <div className="flex flex-col gap-6">
            <p className=" text-default-400">
              We value the privacy of our users and are committed to protecting it. This privacy policy describes how we
              collect, use and protect users' personal information. When you use the bot, you agree to the terms and
              conditions of this privacy policy.
            </p>
            <h2 className={`${bold.className} text-3xl`}>Definitions</h2>
            <ul className="list-inside list-disc text-default-400">
              <li>
                <span className={bold.className}>Overseer</span>: Refers to the Discord bot.
              </li>
              <li>
                <span className={bold.className}>We</span>: Refers to the developers of Overseer.
              </li>
              <li>
                <span className={bold.className}>Personal Information</span>: Refers to any data that can directly or
                indirectly identify a user.
              </li>
            </ul>
            <h2 className={`${bold.className} text-3xl`}>Stored information</h2>
            <p className=" text-default-400">
              We store the following information for the proper functioning of our services:
            </p>
            <ul className="list-inside list-disc text-default-400">
              <li>
                <span className={bold.className}>User IDs</span>: To link stored user configurations.
              </li>
              <li>
                <span className={bold.className}>Server IDs</span>: To link stored server configurations.
              </li>
              <li>
                <span className={bold.className}>Channel IDs</span>: To link stored channel configurations.
              </li>
              <li>
                <span className={bold.className}>Channel IDs</span>: To link stored channel configurations.
              </li>
              <li>
                <span className={bold.className}>Message IDs</span>: To link stored message configurations.
              </li>
              <li>
                <span className={bold.className}>Roles IDs</span>: To link stored role configurations.
              </li>
            </ul>
            <h2 className={`${bold.className} text-3xl`}>IP Addresses</h2>
            <p className=" text-default-400">
              In addition to the above information, we may collect IP addresses for analytical and operational purposes,
              and to ensure the security of our services.
            </p>
            <h2 className={`${bold.className} text-3xl`}>Cookies</h2>
            <p className=" text-default-400">
              We use Cookies for authentication purposes on our dashboard, making it possible for users to access the
              dashboard securely. We do not use Cookies for tracking or advertising purposes, and we do not share Cookie
              data with third party services. When you use the dashboard, you agree the use of Cookies for
              authentication.
            </p>
            <h2 className={`${bold.className} text-3xl`}>Data Retention and Protection Policy</h2>
            <p className=" text-default-400">
              We only retain the information collected for as long as necessary to provide our service. The data we
              collect is protected using reasonable means to prevent loss, theft, unauthorized access, disclosure,
              copying, use or modification.
            </p>
            <h2 className={`${bold.className} text-3xl`}>Disclosure of Information</h2>
            <p className=" text-default-400">
              Overseer does not solicit, share or sell users' personal information to third parties, except for legal
              compliance.
            </p>
            <h2 className={`${bold.className} text-3xl`}>User Rights</h2>
            <ul className="list-inside list-disc text-default-400">
              <li>
                <span className={bold.className}>Access and Rectification</span>: The users can access and correct their
                personal information provided voluntarily through our support
              </li>
              <li>
                <span className={bold.className}>Account Deletion</span>: Users can request the deletion of their
                account and associated information through our support.
              </li>
            </ul>
            <h2 className={`${bold.className} text-3xl`}>Changes in the Privacy Policy</h2>
            <p className=" text-default-400">
              We reserve the right to update or modify our Privacy Policy at any time. We encourage you to periodically
              review this policy to stay informed about how we protect and use your personal information.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
