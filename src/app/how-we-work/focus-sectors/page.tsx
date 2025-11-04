"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import {
  Sun,
  Droplets,
  Leaf,
  Recycle,
  Zap,
  Car,
  ArrowRight,
} from "lucide-react";

const focusSectors = [
  {
    id: 1,
    name: "Renewable Energy",
    icon: Sun,
    description:
      "Supporting clean energy solutions including solar, wind, hydro, and biomass technologies to power Kenya's sustainable future.",
    color: "yellow",
    keyAreas: [
      "Solar Home Systems",
      "Mini-grid Development",
      "Wind Energy Solutions",
      "Biomass & Biogas",
      "Energy Storage Systems",
    ],
    featured: true,
  },
  {
    id: 2,
    name: "Sustainable Agriculture",
    icon: Leaf,
    description:
      "Supporting climate-smart agricultural technologies that increase productivity while protecting the environment.",
    color: "green",
    keyAreas: [
      "Precision Agriculture",
      "Climate-Smart Farming",
      "Agricultural IoT Systems",
      "Sustainable Irrigation",
      "Post-Harvest Solutions",
    ],
    featured: true,
  },
  {
    id: 3,
    name: "Water & Sanitation",
    icon: Droplets,
    description:
      "Developing innovative solutions for clean water access, water treatment, and sanitation systems.",
    color: "blue",
    keyAreas: [
      "Water Purification Systems",
      "Smart Water Management",
      "Wastewater Treatment",
      "Sanitation Solutions",
      "Water Quality Monitoring",
    ],
    featured: false,
  },
  {
    id: 4,
    name: "Waste Management",
    icon: Recycle,
    description:
      "Promoting circular economy solutions that turn waste into valuable resources and reduce environmental impact.",
    color: "emerald",
    keyAreas: [
      "Plastic Recycling",
      "Organic Waste Processing",
      "E-waste Management",
      "Waste-to-Energy Systems",
      "Circular Economy Models",
    ],
    featured: true,
  },
  {
    id: 5,
    name: "Green Transportation",
    icon: Car,
    description:
      "Accelerating the adoption of clean mobility solutions including electric vehicles and sustainable transport systems.",
    color: "indigo",
    keyAreas: [
      "Electric Vehicles",
      "Charging Infrastructure",
      "Battery Technology",
      "Fleet Management Systems",
      "Micro-mobility Solutions",
    ],
    featured: false,
  },
  {
    id: 6,
    name: "Energy Efficiency",
    icon: Zap,
    description:
      "Implementing smart energy solutions that reduce consumption and optimize energy use across sectors.",
    color: "purple",
    keyAreas: [
      "Smart Building Systems",
      "Industrial Energy Optimization",
      "Energy Management Software",
      "LED Lighting Solutions",
      "HVAC Optimization",
    ],
    featured: false,
  },
];

export default function FocusSectorsPage() {
  const [selectedSector, setSelectedSector] = useState<number | null>(null);

  const selectedSectorData = selectedSector
    ? focusSectors.find((sector) => sector.id === selectedSector)
    : null;

  return (
    <PageLayout
      title="Focus Sectors"
      subtitle="Key climate sectors driving our innovation"
      description="Discover the strategic climate sectors where KCIC concentrates its efforts to accelerate sustainable development and environmental impact across Kenya."
      breadcrumb={[
        { label: "How we work", href: "/how-we-work" },
        { label: "Focus sectors" },
      ]}
    >
      <div className="py-16">
        {/* Sector Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Strategic Sectors
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
              KCIC focuses on six key climate sectors that offer the greatest
              potential for environmental impact, economic growth, and job
              creation in Kenya and across East Africa.
            </p>
          </motion.div>

          {/* Sector Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {focusSectors.map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() =>
                  setSelectedSector(
                    selectedSector === sector.id ? null : sector.id
                  )
                }
                className={`cursor-pointer bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  selectedSector === sector.id
                    ? "border-green-500 ring-2 ring-green-200"
                    : "border-gray-100 hover:border-green-300"
                }`}
              >
                {/* Sector Header */}
                <div
                  className={`h-32 bg-gradient-to-br ${
                    sector.color === "yellow"
                      ? "from-yellow-400 to-orange-500"
                      : sector.color === "green"
                      ? "from-green-400 to-emerald-500"
                      : sector.color === "blue"
                      ? "from-blue-400 to-cyan-500"
                      : sector.color === "emerald"
                      ? "from-emerald-400 to-teal-500"
                      : sector.color === "indigo"
                      ? "from-indigo-400 to-purple-500"
                      : "from-purple-400 to-pink-500"
                  } relative rounded-t-xl`}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-t-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <sector.icon className="w-12 h-12 text-white opacity-90" />
                  </div>
                </div>

                {/* Sector Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {sector.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {sector.description}
                  </p>

                  <div className="flex items-center justify-end text-green-600 text-sm font-medium">
                    {selectedSector === sector.id ? "Show Less" : "Learn More"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sector Details */}
        {selectedSectorData && (
          <div className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                {/* Sector Header */}
                <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${
                      selectedSectorData.color === "yellow"
                        ? "from-yellow-400 to-orange-500"
                        : selectedSectorData.color === "green"
                        ? "from-green-400 to-emerald-500"
                        : selectedSectorData.color === "blue"
                        ? "from-blue-400 to-cyan-500"
                        : selectedSectorData.color === "emerald"
                        ? "from-emerald-400 to-teal-500"
                        : selectedSectorData.color === "indigo"
                        ? "from-indigo-400 to-purple-500"
                        : "from-purple-400 to-pink-500"
                    } rounded-xl flex items-center justify-center mr-5`}
                  >
                    <selectedSectorData.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedSectorData.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedSectorData.description}
                    </p>
                  </div>
                </div>

                {/* Key Focus Areas */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Key Focus Areas
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedSectorData.keyAreas.map((area, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-50 rounded-lg p-3"
                      >
                        <ArrowRight className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-green-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Innovate in Climate Solutions?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join our ecosystem of climate innovators working across these
                strategic sectors to create sustainable impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/how-we-work/programmes"
                  className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Explore Our Programmes
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
