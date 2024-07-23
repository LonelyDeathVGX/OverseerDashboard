import "./Global.css";
import "@fontsource-variable/montserrat";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AdSenseComponent } from "#components/AdSense";
import { layout } from "#metadata";
import { Toaster } from "#ui/Toaster";

export function generateMetadata(): Metadata {
  return layout;
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
    <html
      lang="en"
      className="bg-black font-medium font-montserrat text-white leading-relaxed tracking-wide antialiased"
    >
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
