import HomePage from "@/components/HomePage";
import { getHeroSection } from "@/lib/actions/hero";
import { listStatistics } from "@/lib/actions/stats";
import { listNews } from "@/lib/actions/news";
import { listPartners } from "@/lib/actions/partners";
import { getFooterSection } from "@/lib/actions/footer";

export default async function Page() {
  // Fetch all data from database in parallel
  const [heroResult, statsResult, newsResult, partnersResult, footerResult] =
    await Promise.all([
      getHeroSection(),
      listStatistics(),
      listNews({ limit: 6 }), // Get latest 6 news articles
      listPartners(),
      getFooterSection(),
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
  const footerData =
    footerResult.success && footerResult.data ? footerResult.data : null;

  return (
    <HomePage
      hero={heroData}
      stats={statsData}
      news={newsData}
      partners={partnersData}
      footer={footerData}
    />
  );
}
