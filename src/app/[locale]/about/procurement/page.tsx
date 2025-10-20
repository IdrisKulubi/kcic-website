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
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Procurement Policy</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our procurement policy ensures transparency, accountability, and value for money in all our purchasing decisions. We prioritize suppliers who demonstrate commitment to environmental sustainability and social responsibility.
                </p>
                <p>
                  All procurement activities are conducted in accordance with international best practices and comply with relevant Kenyan laws and regulations.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Principles</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Transparency in all procurement processes
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Fair competition among qualified suppliers
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Value for money and cost-effectiveness
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Environmental and social sustainability
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Compliance with legal and regulatory requirements
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Current Opportunities</h2>
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">IT Services & Equipment</h3>
                  <p className="text-green-700 text-sm mb-3">Deadline: March 15, 2025</p>
                  <p className="text-gray-600 text-sm">
                    Seeking suppliers for IT infrastructure, software licenses, and technical support services.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Training & Capacity Building</h3>
                  <p className="text-blue-700 text-sm mb-3">Deadline: February 28, 2025</p>
                  <p className="text-gray-600 text-sm">
                    Professional development and training services for climate innovation programs.
                  </p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Consulting Services</h3>
                  <p className="text-purple-700 text-sm mb-3">Deadline: April 10, 2025</p>
                  <p className="text-gray-600 text-sm">
                    Strategic consulting for program evaluation and impact assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Supplier Registration</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Register</h3>
                <ol className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">1</span>
                    Complete the supplier registration form
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">2</span>
                    Submit required documentation
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">3</span>
                    Await verification and approval
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">4</span>
                    Receive notification of registration status
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Certificate of incorporation
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Tax compliance certificate
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Business permit/license
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Bank statements (last 6 months)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Professional references
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                Register as Supplier
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer data={homePageData.footer} />
    </div>
  );
}