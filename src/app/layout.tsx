import "./Global.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AdSenseComponent } from "#components/AdSense";
import { DevToolsComponent } from "#components/DevTools";
import { BASE_URL } from "#lib/Constants";
import { metadata } from "#metadata";
import { Toaster } from "#ui/Toaster";
import { TanStackQueryProvider } from "../providers/TanStackQuery";

export function generateMetadata(): Metadata {
  return metadata({
    canonical: BASE_URL,
    description:
      "Overseer is a Discord bot created with the purpose of being robust and manage Discord Servers in a better and easy way.",
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
      },
      index: true,
    },
    title: "Overseer - A better way to manage Discord Servers",
  });
}
export function generateViewport(): Viewport {
  return {
    themeColor: "#2b2d31",
  };
}
// export const runtime = "edge";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className="bg-black font-medium font-poppins text-white leading-relaxed tracking-wide antialiased" lang="en">
      <head>
        <AdSenseComponent />
      </head>
      <body>
        <TanStackQueryProvider>
          {children}
          <Toaster />
          <DevToolsComponent />
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
