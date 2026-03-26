"use client";
import { createContext, useContext } from "react";
import type { InvitationData } from "@/lib/types";
const Ctx = createContext<InvitationData | null>(null);
export function InvitationProvider({ data, children }: { data: InvitationData; children: React.ReactNode }) {
  return <Ctx.Provider value={data}>{children}</Ctx.Provider>;
}
export function useInvitation(): InvitationData {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useInvitation must be used within InvitationProvider");
  return ctx;
}
