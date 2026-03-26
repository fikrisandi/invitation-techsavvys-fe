"use client";

import { createContext, useContext } from "react";
import type { InvitationData } from "@/lib/types";

const InvitationContext = createContext<InvitationData | null>(null);

export function InvitationProvider({ data, children }: { data: InvitationData; children: React.ReactNode }) {
  return <InvitationContext.Provider value={data}>{children}</InvitationContext.Provider>;
}

export function useInvitation(): InvitationData {
  const ctx = useContext(InvitationContext);
  if (!ctx) throw new Error("useInvitation must be used within InvitationProvider");
  return ctx;
}
