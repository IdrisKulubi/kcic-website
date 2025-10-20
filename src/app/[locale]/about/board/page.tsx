import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import Footer from "@/components/layout/Footer";
import { homePageData } from "@/data/home";
import { navData } from "@/lib/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board of Directors - KCIC",
  description: "Meet our board of directors and advisors guiding KCIC's strategic direction in climate innovation.",
};

export default function BoardPage() {
  return (
    <div className="min-h-screen">
      <MinimalNavbar {...navData} />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Board of Directors</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our distinguished board members bring decades of experience in climate innovation, sustainable development, and strategic leadership.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-32 h-32 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-green-600 text-3xl font-bold">DR</span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Dr. Robert Kiprotich</h3>
                <p className="text-green-600 font-medium mb-4">Board Chairman</p>
                <p className="text-gray-600 mb-4">
                  Former Director of Climate Change at Ministry of Environment. Over 20 years of experience in environmental policy and sustainable development.
                </p>
                <div className="text-sm text-gray-500">
                  <p>PhD Environmental Science, University of Nairobi</p>
                  <p>MSc Climate Change Policy, Oxford University</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-32 h-32 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-green-600 text-3xl font-bold">AM</span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Dr. Alice Muthoni</h3>
                <p className="text-green-600 font-medium mb-4">Vice Chairman</p>
                <p className="text-gray-600 mb-4">
                  Renewable energy expert and former CEO of Kenya Renewable Energy Association. Pioneer in clean energy solutions across East Africa.
                </p>
                <div className="text-sm text-gray-500">
                  <p>PhD Renewable Energy Systems, MIT</p>
                  <p>MBA Strategic Management, Strathmore University</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-green-600 text-2xl font-bold">PW</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prof. Peter Wanyama</h3>
              <p className="text-green-600 font-medium mb-3">Board Member</p>
              <p className="text-gray-600 text-sm">
                Climate finance expert and former World Bank consultant specializing in green investment strategies.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-green-600 text-2xl font-bold">GN</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Grace Nyong&apos;o</h3>
              <p className="text-green-600 font-medium mb-3">Board Member</p>
              <p className="text-gray-600 text-sm">
                Social entrepreneur and advocate for women in climate innovation with 15+ years in sustainable development.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-green-600 text-2xl font-bold">SO</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Samuel Ochieng</h3>
              <p className="text-green-600 font-medium mb-3">Board Member</p>
              <p className="text-gray-600 text-sm">
                Technology innovation leader and former CTO of leading fintech company, focusing on climate-tech solutions.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer data={homePageData.footer} />
    </div>
  );
}