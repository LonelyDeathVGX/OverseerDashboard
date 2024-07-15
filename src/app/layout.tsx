import "./Global.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdSenseComponent } from "#components/AdSense";
import { BASE_URL } from "#lib/Constants";
import { Toaster } from "#ui/Toaster";

export const metadata: Metadata = {
  title: "Overseer",
  description: "A better way to manage Discord communities",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Overseer",
    description: "A better way to manage Discord communities",
    images: {
      url: "/assets/Logo.webp",
      alt: "Overseer Logo",
    },
  },
};
export const runtime = "edge";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
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
