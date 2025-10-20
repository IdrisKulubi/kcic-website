import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import Footer from "@/components/layout/Footer";
import { homePageData } from "@/data/home";
import { navData } from "@/lib/navigation";
import { Metadata } from "next";
import { Lightbulb, Users, Target, Building2, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Incubation Program - KCIC",
  description: "Early-stage support for climate innovation startups at Kenya Climate Innovation Centre.",
};

export default function IncubationPage() {
  return (
    <div className="min-h-screen">
      <MinimalNavbar {...navData} />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Incubation Program</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nurturing early-stage climate innovation startups with comprehensive support, mentorship, and resources to transform ideas into viable solutions.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Program Overview</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our 12-month incubation program is designed for early-stage climate innovation startups with promising ideas but limited resources. We provide comprehensive support to help entrepreneurs develop their concepts into market-ready solutions.
                </p>
                <p>
                  Through our structured approach, startups receive mentorship, technical assistance, business development support, and access to funding opportunities.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Offer</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    Business model development and validation
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    One-on-one mentorship with industry experts
                  </li>
                  <li className="flex items-start">
                    <Target className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    Market research and customer discovery
                  </li>
                  <li className="flex items-start">
                    <Building2 className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    Access to co-working space and facilities
                  </li>
                  <li className="flex items-start">
                    <FileText className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    Legal and regulatory guidance
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Program Timeline</h2>
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Months 1-3: Foundation</h3>
                  <p className="text-gray-600 text-sm">
                    Business model canvas development, market validation, and team building.
                  </p>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Months 4-6: Development</h3>
                  <p className="text-gray-600 text-sm">
                    Product development, prototype creation, and initial customer feedback.
                  </p>
                </div>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Months 7-9: Testing</h3>
                  <p className="text-gray-600 text-sm">
                    Pilot testing, market entry strategy, and business plan refinement.
                  </p>
                </div>
                
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6">
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">Months 10-12: Launch</h3>
                  <p className="text-gray-600 text-sm">
                    Go-to-market execution, investor readiness, and graduation preparation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Eligibility Criteria</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Startup Requirements</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Climate-focused innovation or solution
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Early-stage (pre-seed to seed)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Committed founding team
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Scalable business model potential
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Focus Areas</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Renewable energy solutions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Sustainable agriculture
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Water and waste management
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Clean transportation
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 mr-4">
                Apply Now
              </button>
              <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer data={homePageData.footer} />
    </div>
  );
}