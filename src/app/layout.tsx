import "./Global.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AdSenseComponent } from "#components/AdSense";
import { medium } from "#components/Fonts";
import { BASE_URL } from "#lib/Constants";
import { Toaster } from "#ui/Toaster";

export function generateMetadata(): Metadata {
  return {
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
  };
}
export function generateViewport(): Viewport {
  return {
    themeColor: "#2b2d31",
  };
}

export const runtime = "edge";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${medium.className} bg-black antialiased`}>
      <head>
        <AdSenseComponent />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
