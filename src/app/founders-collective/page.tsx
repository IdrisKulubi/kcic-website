import type { Metadata } from "next";
import FoundersCollectivePage from "@/components/sections/FoundersCollectivePage";
import { foundersCollectiveMeta } from "@/data/founders-collective";

export const metadata: Metadata = {
  title: `${foundersCollectiveMeta.title} | KCIC`,
  description: `${foundersCollectiveMeta.tagline} ${foundersCollectiveMeta.description}`,
  openGraph: {
    title: foundersCollectiveMeta.title,
    description: foundersCollectiveMeta.description,
  },
};

export default function FoundersCollectiveRoute() {
  return <FoundersCollectivePage />;
}
