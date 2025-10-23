import { getHeroSection } from "@/lib/actions/hero";
import { listStatistics } from "@/lib/actions/stats";
import { listNews } from "@/lib/actions/news";
import { listPartners } from "@/lib/actions/partners";
import { listProgrammes } from "@/lib/actions/programmes";
import { getFooterSection } from "@/lib/actions/footer";
import { getCTABanner } from "@/lib/actions/cta";
import HomePage from "../components/HomePage";

export default async function Page() {
  // Fetch all data from database in parallel
  const [
    heroResult,
    statsResult,
    newsResult,
    partnersResult,
    programmesResult,
    footerResult,
    ctaResult,
  ] = await Promise.all([
    getHeroSection(),
    listStatistics(),
    listNews({ limit: 6 }), // Get latest 6 news articles
    listPartners(),
    listProgrammes(),
    getFooterSection(),
    getCTABanner(),
  ]);

  // Extract data or use fallbacks
  const heroData =
    heroResult.success && heroResult.data ? heroResult.data : null;
  const statsData =
    statsResult.success && statsResult.data ? statsResult.data : [];
  const newsData =
    newsResult.success && newsResult.data?.articles
      ? newsResult.data.articles
      : [];
  const partnersData =
    partnersResult.success && partnersResult.data ? partnersResult.data : [];
  const programmesData =
    programmesResult.success && programmesResult.data
      ? programmesResult.data
      : [];
  const footerData =
    footerResult.success && footerResult.data ? footerResult.data : null;
  const ctaData = ctaResult.success && ctaResult.data ? ctaResult.data : null;

  return (
    <HomePage
      hero={heroData}
      stats={statsData}
      news={newsData}
      partners={partnersData}
      programmes={programmesData}
      footer={footerData}
      cta={ctaData}
    />
  );
}
