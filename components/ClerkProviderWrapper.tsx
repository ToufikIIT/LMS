"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

// A small wrapper to place ClerkProvider at the root of the App Router.
// Keeps this component client-side as Clerk React components rely on the browser.
export default function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
