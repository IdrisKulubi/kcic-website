import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import Footer from "@/components/layout/Footer";
import { homePageData } from "@/data/home";
import { navData } from "@/lib/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Procurement - KCIC",
  description: "Learn about KCIC's procurement policies, opportunities, and guidelines for suppliers and partners.",
};

export default function ProcurementPage() {
  return (
    <div className="min-h-screen">
      <MinimalNavbar {...navData} />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Procurement</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              KCIC is committed to transparent, fair, and sustainable procurement practices that support our mission of climate innovation.
            </p>
          </div>

          {/* Pre-Qualification Announcement */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 mb-16 shadow-lg">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">PRE-QUALIFICATION OF SUPPLIERS FOR GOODS, WORKS AND SERVICES</h2>
              
              <div className="space-y-4 text-green-50">
                <p className="text-lg leading-relaxed">
                  The Kenya Climate Innovation Center (KCIC) is a social impact organization operating in the climate space, committed to supporting micro and small enterprises and driven by innovation. The KCIC provides incubation, capacity-building services, and financing to Kenyan entrepreneurs and new ventures that are developing innovative solutions in renewable energy and energy efficiency, water management, agribusiness, waste management, and commercial forestry in a bid to address climate change challenges.
                </p>
                
                <p className="text-lg font-semibold text-white">
                  Kenya Climate Innovation Center is in the process of pre-qualifying suppliers for various goods, services and works for the calendar year 2026 to June 2028.
                </p>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">How to Apply</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Detailed pre-qualification documents can be downloaded from <a href="#" className="underline hover:text-green-200">Here</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Alternatively, interested firms may send an email to <a href="mailto:procurement@kenyacic.org" className="underline hover:text-green-200">procurement@kenyacic.org</a> requesting for the pre-qualification document</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Payment of a non-refundable fee of <strong className="text-white">Kshs. 2,000.00</strong> per document will apply</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Payment can be made via Mpesa Paybill <strong className="text-white">880100</strong>, Account number <strong className="text-white">2594680245</strong></span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-yellow-400 text-gray-900 rounded-lg p-6 mt-6">
                  <h3 className="text-xl font-bold mb-3">SUBMISSION PROCESS</h3>
                  <p className="mb-3">
                    Completed pre-qualification documents accompanied by proof of payment (receipt from KCIC) should be submitted through email address <a href="mailto:procurement@kenyacic.org" className="font-semibold underline">procurement@kenyacic.org</a>.
                  </p>
                  <p className="font-semibold">
                    Please include "Prequalification of goods, works and services 2026" (Indicate category number & item) no later than <span className="text-red-700">Wednesday 24th September 2025 by 5:00pm East African time</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer data={homePageData.footer} />
    </div>
  );
}