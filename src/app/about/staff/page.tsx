import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import Footer from "@/components/layout/Footer";
import { homePageData } from "@/data/home";
import { navData } from "@/lib/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team - KCIC",
  description: "Meet the dedicated team members driving climate innovation at Kenya Climate Innovation Centre.",
};

export default function StaffPage() {
  return (
    <div className="min-h-screen">
      <MinimalNavbar {...navData} />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals driving climate innovation and sustainable development across Kenya and Africa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-green-600 text-2xl font-bold">JD</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">John Doe</h3>
              <p className="text-green-600 font-medium mb-3">Executive Director</p>
              <p className="text-gray-600 text-sm">
                Leading KCIC&apos;s strategic vision and partnerships to accelerate climate innovation across the region.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-green-600 text-2xl font-bold">JS</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Jane Smith</h3>
              <p className="text-green-600 font-medium mb-3">Program Manager</p>
              <p className="text-gray-600 text-sm">
                Overseeing incubation and acceleration programs for climate-focused startups and SMEs.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-green-600 text-2xl font-bold">MK</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Michael Kimani</h3>
              <p className="text-green-600 font-medium mb-3">Innovation Lead</p>
              <p className="text-gray-600 text-sm">
                Driving technology development and innovation initiatives for sustainable climate solutions.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer data={homePageData.footer} />
    </div>
  );
}