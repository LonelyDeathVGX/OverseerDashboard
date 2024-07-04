"use client";

import { NextUIProvider } from "@nextui-org/react";
import type { ReactNode } from "react";

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return <NextUIProvider locale="en-US">{children}</NextUIProvider>;
}
