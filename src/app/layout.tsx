import "./globals.css";

import { BASE_URL } from "@/lib/Constants";
import type { Metadata } from "next";
import type { ReactNode } from "react";

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
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body>{children}</body>
    </html>
  );
}
