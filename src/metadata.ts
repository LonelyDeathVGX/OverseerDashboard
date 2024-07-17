import type { Metadata } from "next";
import { BASE_URL } from "#lib/Constants";

const metadataBase: Metadata = {
  applicationName: "Overseer",
  authors: [
    {
      name: "FancyStudio",
    },
  ],
  creator: "FancyStudio",
  keywords: ["Overseer", "FancyStudio", "Discord", "Bot", "Discord Bot", "Overseer Bot"],
  openGraph: {
    siteName: "Overseer",
    authors: ["FancyStudio"],
    creators: ["FancyStudio"],
  },
};

export const layout: Metadata = {
  ...metadataBase,
  title: "Overseer - A better way to manage Discord Servers",
  description:
    "Overseer is a Discord bot created with the purpose of being robust and manage Discord Servers in a better and easy way.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Overseer - A better way to manage Discord Servers",
    description:
      "Overseer is a Discord bot created with the purpose of being robust and manage Discord Servers in a better and easy way.",
  },
  robots: {
    index: true,
  },
};

export const privacy: Metadata = {
  ...metadataBase,
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

export const terms: Metadata = {
  ...metadataBase,
  title: "Terms of Service - Overseer",
  description: "These Terms of Service indicate the rights and obligations of users with the use of our services.",
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
  openGraph: {
    title: "Terms of Service - Overseer",
    description: "These Terms of Service indicate the rights and obligations of users with the use of our services.",
  },
};
