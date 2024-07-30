import type { Metadata } from "next";
import { NavbarComponent } from "#components/navbar/Navbar";
import { BASE_URL } from "#lib/Constants";
import { metadata } from "#metadata";

export function generateMetadata(): Metadata {
  return metadata({
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
}

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-8">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-8 [&>ul>li>span]:text-cyan-400">
          <h1 className="font-bold text-3xl">Terms of Service</h1>
          <p className="text-default-400">
            Welcome to Overseer, our Discord bot. By using our services, you agree to these Terms of Service. If you do
            not agree with any of the terms set forth, please do not use our services.
          </p>
          <h2 className="font-bold text-3xl">Definitions</h2>
          <ul className="list-inside list-disc text-default-400">
            <li>
              <span className="font-bold">Overseer</span>: Refers to the Discord bot provided by us.
            </li>
            <li>
              <span className="font-bold">We</span>: Refers to the developers of Overseer.
            </li>
            <li>
              <span className="font-bold">User</span>: Refers to any individual who uses the Overseer services.
            </li>
            <li>
              <span className="font-bold">Services</span>: Refers to all functionalities and features provided by
              Overseer.
            </li>
            <li>
              <span className="font-bold">Account</span>: Refers to the user account created to access and use Overseer.
            </li>
          </ul>
          <h2 className="font-bold text-3xl">Acceptance of Terms</h2>
          <p className="text-default-400">
            By accessing or using Overseer, you agree to comply with and be bound by these Terms of Service. These terms
            may be updated from time to time, and your continued use of the services signifies your acceptance of the
            updated terms.
          </p>
          <h2 className="font-bold text-3xl">Use of Services</h2>
          <p className="text-default-400">
            You agree to use Overseer only for lawful purposes and in accordance with these Terms of Service. You are
            responsible for ensuring that your use of the services does not violate any applicable laws or regulations.
          </p>
          <h2 className="font-bold text-3xl">Account Responsibilities</h2>
          <p className="text-default-400">
            If you create an account, you are responsible for maintaining the confidentiality of your account
            information and for all activities that occur under your account. You agree to notify us immediately of any
            unauthorized use of your account or any other breach of security.
          </p>
          <h2 className="font-bold text-3xl">Prohibited Activities</h2>
          <p className="text-default-400">
            You agree not to engage in any activities that may harm, disrupt, or interfere with the services or the
            experience of other users. Prohibited activities include but are not limited to: attempting to gain
            unauthorized access to any part of the services, transmitting harmful or malicious software, and engaging in
            any form of harassment.
          </p>
          <h2 className="font-bold text-3xl">Termination</h2>
          <p className="text-default-400">
            We reserve the right to suspend or terminate your access to Overseer at our discretion, without notice, if
            we believe you have violated these Terms of Service or any applicable laws. Upon termination, all provisions
            of these Terms of Service that by their nature should survive will remain in effect.
          </p>
          <h2 className="font-bold text-3xl">Disclaimer of Warranties</h2>
          <p className="text-default-400">
            Overseer is provided on an "as-is" and "as-available" basis. We make no warranties, express or implied,
            regarding the reliability, accuracy, or availability of the services. We disclaim all warranties not
            expressly stated in these Terms of Service.
          </p>
          <h2 className="font-bold text-3xl">Limitation of Liability</h2>
          <p className="text-default-400">
            To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from or related to your use of Overseer. Our total liability will
            not exceed the amount paid by you, if any, for accessing the services.
          </p>
          <h2 className="font-bold text-3xl">Governing Law</h2>
          <p className="text-default-400">
            These Terms of Service will be governed by and construed in accordance with the laws of the jurisdiction in
            which we operate, without regard to its conflict of laws principles.
          </p>
          <h2 className="font-bold text-3xl">Contact Information</h2>
          <p className="text-default-400">
            If you have any questions or concerns regarding these Terms of Service, please contact us through the
            support channels provided on our website.
          </p>
        </div>
      </div>
    </main>
  );
}
