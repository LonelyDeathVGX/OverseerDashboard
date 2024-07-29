import type { Metadata } from "next";
import type { Robots } from "next/dist/lib/metadata/types/metadata-types";
import { BASE_URL } from "#lib/Constants";

export const metadata = ({
  canonical,
  description,
  robots,
  title,
}: {
  canonical: string;
  description: string;
  robots: Robots;
  title: string;
}): Metadata => {
  return {
    alternates: {
      canonical,
    },
    applicationName: "Overseer",
    authors: {
      name: "FancyStudio",
    },
    creator: "FancyStudio",
    description,
    keywords: [
      "Bot",
      "Discord Bot",
      "Discord",
      "FancyStudio",
      "Fancycord Bot",
      "Fancycord",
      "Overseer Bot",
      "Overseer",
    ],
    openGraph: {
      description,
      images: {
        url: `${BASE_URL}/assets/Overseer.webp`,
      },
      locale: "en_US",
      siteName: "Overseer",
      title,
      type: "website",
      url: canonical,
    },
    robots,
    title,
    twitter: {
      card: "summary_large_image",
      creator: "@FancyStudio",
      description,
      images: {
        url: `${BASE_URL}/assets/Overseer.webp`,
      },
      site: "@Overseer",
      title,
    },
  };
};
