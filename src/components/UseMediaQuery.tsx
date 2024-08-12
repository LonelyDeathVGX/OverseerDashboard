"use client";

import type { ReactNode } from "react";
import { useIsClient, useMediaQuery } from "usehooks-ts";

export const UseMediaQueryComponent = ({
  children,
  mediaQuery,
}: {
  children: ReactNode;
  mediaQuery: string;
}) => {
  const isClient = useIsClient();
  const mediaQueryMatches = useMediaQuery(mediaQuery);

  if (!isClient) {
    return null;
  }

  return mediaQueryMatches && children;
};
