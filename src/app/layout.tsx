import "./Global.css";

import type { ReactNode } from "react";
import { AdSenseComponent } from "#components/AdSense";
import { Toaster } from "#ui/Toaster";

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
