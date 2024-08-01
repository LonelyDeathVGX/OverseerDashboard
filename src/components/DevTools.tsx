"use client";

import { useState } from "react";
import { useDevTools } from "../hooks/useDevTools";

export function DevToolsComponent() {
  const [_, setDevToolsStatus] = useState<"open" | "closed">("closed");

  useDevTools({
    onOpen: () => setDevToolsStatus("open"),
    onClose: () => setDevToolsStatus("closed"),
  });

  return <></>;
}
