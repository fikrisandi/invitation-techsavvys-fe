export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getInvitation } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
};

export default async function SlugRedirect({ params, searchParams }: Props) {
  const { slug } = await params;
  const { to } = await searchParams;

  const data = await getInvitation(slug);
  if (!data) {
    const { notFound } = await import("next/navigation");
    notFound();
  }

  const query = to ? `?to=${encodeURIComponent(to)}` : "";
  redirect(`/${data.theme}/${slug}${query}`);
}
