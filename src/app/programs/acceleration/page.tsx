import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import Footer from "@/components/layout/Footer";
import { homePageData } from "@/data/home";
import { navData } from "@/lib/navigation";
import { Metadata } from "next";
import { Target, Users, Building2, Lightbulb, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Acceleration Program - KCIC",
  description: "Scale-up support for growing climate ventures at Kenya Climate Innovation Centre.",
};

export default function AccelerationPage() {
  return (
    <div className="min-h-screen">
      <MinimalNavbar {...navData} />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Acceleration Program</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accelerating growth-stage climate ventures with advanced support, strategic partnerships, and investment readiness to scale their impact.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Program Overview</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our 6-month acceleration program is designed for growth-stage climate ventures that have validated their business models and are ready to scale. We focus on rapid growth, market expansion, and investment readiness.
                </p>
                <p>
                  Participants receive intensive mentorship, strategic partnerships, and direct access to investors and corporate partners to accelerate their growth trajectory.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Acceleration Benefits</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <Target className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    Strategic growth planning and execution
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    Access to investor networks and funding
                  </li>
                  <li className="flex items-start">
                    <Building2 className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    Corporate partnership opportunities
                  </li>
                  <li className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    Market expansion and internationalization
                  </li>
                  <li className="flex items-start">
                    <FileText className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    Investment readiness and due diligence prep
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Program Structure</h2>
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Month 1: Assessment & Strategy</h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive business assessment, growth strategy development, and goal setting.
                  </p>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Months 2-3: Execution</h3>
                  <p className="text-gray-600 text-sm">
                    Implementation of growth strategies, product optimization, and market expansion.
                  </p>
                </div>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Months 4-5: Scaling</h3>
                  <p className="text-gray-600 text-sm">
                    Partnership development, team scaling, and operational optimization.
                  </p>
                </div>
                
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6">
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">Month 6: Investment Ready</h3>
                  <p className="text-gray-600 text-sm">
                    Investor pitch preparation, demo day, and funding facilitation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Selection Criteria</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Venture Requirements</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Proven climate impact and traction
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Revenue generation or clear path to revenue
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experienced management team
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Scalable technology or business model
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Readiness</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Seeking Series A or growth funding
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Clear financial projections
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Intellectual property protection
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Market validation and customer base
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 mr-4">
                Apply for Acceleration
              </button>
              <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200">
                Program Details
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600 mb-8">
              Our acceleration program has helped numerous climate ventures achieve significant milestones and secure funding.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">SolarTech Kenya</h3>
                <p className="text-gray-600 text-sm mb-3">Raised $2M Series A funding</p>
                <p className="text-gray-500 text-xs">Solar energy solutions for rural communities</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AgroClimate</h3>
                <p className="text-gray-600 text-sm mb-3">Expanded to 5 African countries</p>
                <p className="text-gray-500 text-xs">Climate-smart agriculture platform</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WaterWise</h3>
                <p className="text-gray-600 text-sm mb-3">Partnership with major utility</p>
                <p className="text-gray-500 text-xs">Smart water management systems</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer data={homePageData.footer} />
    </div>
  );
}