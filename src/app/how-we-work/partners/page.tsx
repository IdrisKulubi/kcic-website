import { PartnersSection, type PartnerData } from "@/components/sections/PartnersSection";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import Footer from "@/components/layout/Footer";
import { listPartners } from "@/lib/actions/partners";
import { navData } from "@/lib/navigation";
import { homePageData } from "@/data/home";

export default async function PartnersPage() {
  const partnersResult = await listPartners();
  const partners: PartnerData[] =
    partnersResult.success && partnersResult.data
      ? partnersResult.data
          .filter((partner) => partner.id)
          .map((partner) => ({
            id: partner.id!,
            name: partner.name,
            logo: partner.logo,
            category: "partner",
            description: partner.name,
            website: partner.website || undefined,
            featured: true,
          }))
      : [];

  return (
    <div className="min-h-screen bg-[#fff7df] text-[#101010]">
      <MinimalNavbar {...navData} />
      <main className="pt-20">
        <PartnersSection
          partners={partners}
          title="Our Partners"
          subtitle="The institutions, funders, and ecosystem allies working with KCIC to move climate enterprises from support to scale."
        />
      </main>
      <Footer data={homePageData.footer} />
    </div>
  );
}
