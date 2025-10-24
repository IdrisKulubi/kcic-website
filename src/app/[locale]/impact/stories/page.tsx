"use client";

import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  ArrowRight,
  MapPin,
  Calendar,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const stories = [
  {
    id: 1,
    title: "SolarTech Kenya: Powering Rural Communities",
    company: "SolarTech Kenya",
    founder: "Jane Wanjiku",
    sector: "Renewable Energy",
    location: "Nairobi, Kenya",
    year: "2022",
    image: "/images/stories/solartech.jpg",
    impact: {
      jobs: "150+",
      investment: "$2.5M",
      communities: "50+",
    },
    description:
      "SolarTech Kenya has revolutionized access to clean energy in rural communities by developing affordable solar home systems with mobile payment integration.",
    fullStory:
      "Starting as a small pilot project in 2019, SolarTech Kenya has grown into one of the leading solar energy providers in East Africa. Through KCIC's incubation programme, founder Jane Wanjiku developed a unique business model that combines affordable solar technology with innovative financing options. Today, the company serves over 50 rural communities, providing clean energy access to more than 10,000 households.",
    achievements: [
      "Deployed 5,000+ solar home systems",
      "Created 150+ green jobs",
      "Reduced CO2 emissions by 15,000 tons annually",
      "Secured $2.5M in Series A funding",
    ],
    quote:
      "KCIC provided the perfect platform to transform our idea into a scalable business. Their mentorship and network connections were invaluable in our journey.",
    tags: [
      "Solar Energy",
      "Rural Development",
      "Financial Inclusion",
      "Climate Impact",
    ],
  },
  {
    id: 2,
    title: "AgroTech Solutions: Smart Farming for Food Security",
    company: "AgroTech Solutions",
    founder: "David Kimani",
    sector: "Sustainable Agriculture",
    location: "Nakuru, Kenya",
    year: "2021",
    image: "/images/stories/agrotech.jpg",
    impact: {
      jobs: "200+",
      investment: "$1.8M",
      farmers: "2,000+",
    },
    description:
      "AgroTech Solutions uses IoT sensors and mobile technology to help smallholder farmers optimize crop yields while reducing water usage and chemical inputs.",
    fullStory:
      "David Kimani's journey began when he witnessed his family's farm struggling with unpredictable weather patterns and declining productivity. Through KCIC's acceleration programme, he developed a comprehensive digital farming platform that provides real-time soil monitoring, weather predictions, and personalized farming advice. The solution has helped thousands of farmers increase their yields by up to 40% while reducing water consumption by 30%.",
    achievements: [
      "Supported 2,000+ smallholder farmers",
      "Increased average crop yields by 40%",
      "Reduced water usage by 30%",
      "Created 200+ direct and indirect jobs",
    ],
    quote:
      "The technical assistance and market linkages from KCIC helped us scale our solution across multiple counties. We're now making a real difference in food security.",
    tags: ["AgTech", "IoT", "Food Security", "Water Conservation"],
  },
  {
    id: 3,
    title: "WasteWise: Circular Economy Champion",
    company: "WasteWise Limited",
    founder: "Sarah Muthoni",
    sector: "Waste Management",
    location: "Mombasa, Kenya",
    year: "2023",
    image: "/images/stories/wastewise.jpg",
    impact: {
      jobs: "80+",
      investment: "$900K",
      waste: "500 tons/month",
    },
    description:
      "WasteWise transforms plastic waste into construction materials, creating a circular economy solution that addresses both waste management and affordable housing.",
    fullStory:
      "Sarah Muthoni started WasteWise after seeing the massive plastic waste problem in coastal Kenya. With support from KCIC's sector-specific programme, she developed innovative technology to convert plastic waste into durable construction bricks and tiles. The company now processes over 500 tons of plastic waste monthly, providing affordable building materials while creating employment opportunities for waste collectors.",
    achievements: [
      "Processes 500+ tons of plastic waste monthly",
      "Produces 50,000+ eco-bricks per month",
      "Created 80+ direct jobs in waste collection and processing",
      "Reduced construction costs by 25% for local builders",
    ],
    quote:
      "KCIC's sector expertise in waste management was crucial in helping us refine our technology and connect with key stakeholders in the construction industry.",
    tags: [
      "Circular Economy",
      "Plastic Recycling",
      "Construction Materials",
      "Job Creation",
    ],
  },
  {
    id: 4,
    title: "CleanWater Innovations: Safe Water for All",
    company: "CleanWater Innovations",
    founder: "Peter Ochieng",
    sector: "Water & Sanitation",
    location: "Kisumu, Kenya",
    year: "2022",
    image: "/images/stories/cleanwater.jpg",
    impact: {
      jobs: "120+",
      investment: "$1.2M",
      people: "25,000+",
    },
    description:
      "CleanWater Innovations developed low-cost water purification systems powered by solar energy, providing safe drinking water to underserved communities.",
    fullStory:
      "Inspired by his community's struggle with waterborne diseases, Peter Ochieng created an innovative solar-powered water purification system. Through KCIC's incubation programme, he refined the technology and developed a sustainable business model. The company now operates 150 water kiosks across Western Kenya, providing clean water access to over 25,000 people daily.",
    achievements: [
      "Installed 150+ solar-powered water kiosks",
      "Serves 25,000+ people with clean water daily",
      "Reduced waterborne diseases by 70% in target areas",
      "Created 120+ jobs in installation and maintenance",
    ],
    quote:
      "The mentorship and technical support from KCIC helped us overcome critical challenges in product development and market entry. We couldn't have succeeded without them.",
    tags: [
      "Water Purification",
      "Solar Power",
      "Public Health",
      "Community Impact",
    ],
  },
  {
    id: 5,
    title: "EcoTransport: Green Mobility Revolution",
    company: "EcoTransport Kenya",
    founder: "Grace Njeri",
    sector: "Green Transportation",
    location: "Nairobi, Kenya",
    year: "2023",
    image: "/images/stories/ecotransport.jpg",
    impact: {
      jobs: "300+",
      investment: "$3.2M",
      vehicles: "500+",
    },
    description:
      "EcoTransport Kenya is transforming urban mobility with electric motorcycles and bikes, reducing emissions while providing affordable transportation solutions.",
    fullStory:
      "Grace Njeri launched EcoTransport Kenya to address Nairobi's air pollution and traffic congestion challenges. With KCIC's acceleration support, she developed a comprehensive electric mobility ecosystem including vehicle manufacturing, charging infrastructure, and financing solutions. The company has deployed over 500 electric vehicles and established 50 charging stations across the city.",
    achievements: [
      "Deployed 500+ electric motorcycles and bikes",
      "Established 50+ charging stations",
      "Reduced CO2 emissions by 8,000 tons annually",
      "Created 300+ jobs in manufacturing and services",
    ],
    quote:
      "KCIC's network opened doors to investors and partners that were crucial for scaling our electric mobility solutions. Their support was transformational for our business.",
    tags: [
      "Electric Vehicles",
      "Urban Mobility",
      "Clean Transport",
      "Infrastructure",
    ],
  },
];

const sectors = [
  "All",
  "Renewable Energy",
  "Sustainable Agriculture",
  "Waste Management",
  "Water & Sanitation",
  "Green Transportation",
];

export default function StoriesPage() {
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  const filteredStories =
    selectedSector === "All"
      ? stories
      : stories.filter((story) => story.sector === selectedSector);

  return (
    <PageLayout
      title="Impact Stories"
      subtitle="Celebrating climate innovation success"
      description="Discover inspiring stories of entrepreneurs who are transforming Kenya's climate landscape through innovation, determination, and KCIC's support."
      breadcrumb={[{ label: "Impact", href: "/impact" }, { label: "Stories" }]}
    >
      <div className="py-16">
        {/* Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedSector === sector
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-green-300 hover:text-green-600"
                }`}
              >
                {sector}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Stories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredStories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Story Header */}
                <div className="relative h-64 bg-gradient-to-br from-green-400 to-blue-500">
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded-full">
                      {story.sector}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                    <div className="flex items-center text-sm opacity-90">
                      <MapPin className="w-4 h-4 mr-1" />
                      {story.location}
                      <Calendar className="w-4 h-4 ml-4 mr-1" />
                      {story.year}
                    </div>
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-6">
                  {/* Founder Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {story.founder}
                      </p>
                      <p className="text-sm text-gray-600">
                        Founder, {story.company}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {story.description}
                  </p>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {story.impact.jobs}
                      </div>
                      <div className="text-xs text-gray-600">Jobs Created</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {story.impact.investment}
                      </div>
                      <div className="text-xs text-gray-600">Investment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {story.impact.communities ||
                          story.impact.farmers ||
                          story.impact.waste ||
                          story.impact.people ||
                          story.impact.vehicles}
                      </div>
                      <div className="text-xs text-gray-600">
                        {story.impact.communities
                          ? "Communities"
                          : story.impact.farmers
                          ? "Farmers"
                          : story.impact.waste
                          ? "Waste/Month"
                          : story.impact.people
                          ? "People Served"
                          : "Vehicles"}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {story.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="bg-green-50 rounded-lg p-4 mb-6">
                    <p className="text-green-800 italic text-sm leading-relaxed">
                      &quot;{story.quote}&quot;
                    </p>
                    <p className="text-green-600 text-xs font-medium mt-2">
                      - {story.founder}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() =>
                      setSelectedStory(
                        selectedStory === story.id ? null : story.id
                      )
                    }
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                  >
                    {selectedStory === story.id
                      ? "Show Less"
                      : "Read Full Story"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>

                  {/* Expanded Content */}
                  {selectedStory === story.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        The Full Story
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {story.fullStory}
                      </p>

                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2 mb-6">
                        {story.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-center text-gray-700"
                          >
                            <Award className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex justify-center">
                        <a
                          href="#"
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          Visit Company Website
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center bg-green-50 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community of climate innovators and let us help you
              transform your idea into impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/how-we-work/programmes"
                className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Explore Our Programmes
              </Link>
              <Link
                href="/apply"
                className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg border border-green-600 hover:bg-green-50 transition-colors duration-200"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
