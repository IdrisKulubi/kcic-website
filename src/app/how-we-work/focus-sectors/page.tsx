"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  SunIcon,
  DropIcon,
  PlantIcon,
  RecycleIcon,
  TreeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  LightbulbIcon,
  CarIcon,
} from "@phosphor-icons/react/dist/ssr";

// Updated Data based on the provided image
const focusSectors = [
  {
    id: 1,
    name: "Renewable Energy",
    icon: SunIcon,
    description:
      "Powering the future through clean, sustainable energy solutions and efficiency.",
    color: "amber", // Orange/Yellow
    gradient: "from-amber-400 to-orange-600",
    bgLight: "bg-amber-50",
    textLight: "text-amber-600",
    borderLight: "border-amber-200",
    keyAreas: [
      "Off-grid solar & mini-grids",
      "Productive use of energy",
      "Clean cooking technologies",
      "Bioenergy & waste-to-energy systems",
      "Energy efficiency & demand-side management",
      "Green financing for energy solutions",
    ],
  },
  {
    id: 2,
    name: "Agriculture",
    icon: PlantIcon, // Plant icon
    description:
      "Transforming food systems with climate-smart technologies and agribusiness innovation.",
    color: "orange", // Earthy/Brown/Orange
    gradient: "from-orange-500 to-amber-700",
    bgLight: "bg-orange-50",
    textLight: "text-orange-700",
    borderLight: "border-orange-200",
    keyAreas: [
      "Climate-smart Agriculture",
      "Agribusiness development & Value Addition",
      "Irrigation & water-use efficiency",
      "Post-harvest management & storage",
      "Agri-tech (e.g precision farming, drone use)",
      "Market access & financing",
    ],
  },
  {
    id: 3,
    name: "Water",
    icon: DropIcon,
    description:
      "Ensuring water security through innovative harvesting, treatment, and management.",
    color: "cyan", // Blue/Cyan
    gradient: "from-cyan-400 to-blue-600",
    bgLight: "bg-cyan-50",
    textLight: "text-cyan-600",
    borderLight: "border-cyan-200",
    keyAreas: [
      "Water harvesting & storage technologies",
      "Wastewater recycling & reuse",
      "WASH Innovations",
      "Smart Irrigation systems",
      "Water quality monitoring & purification tech",
      "Integrated water resource management",
    ],
  },
  {
    id: 4,
    name: "Circular Economy",
    icon: RecycleIcon,
    description:
      "Redefining waste as a resource through recycling, upcycling, and eco-design.",
    color: "teal", // Teal/Green-Blue
    gradient: "from-teal-400 to-emerald-600",
    bgLight: "bg-teal-50",
    textLight: "text-teal-600",
    borderLight: "border-teal-200",
    keyAreas: [
      "Solid waste management & recycling",
      "Green manufacturing & product lifecycle extension",
      "Upcycling and eco-design",
      "Plastic alternatives & biodegradable materials",
      "Industrial symbiosis & resource recovery",
    ],
  },
  {
    id: 5,
    name: "Nature Based Solutions",
    icon: TreeIcon,
    description:
      "Harnessing nature to restore ecosystems, conserve biodiversity, and sequester carbon.",
    color: "green", // Pure Green
    gradient: "from-green-500 to-emerald-700",
    bgLight: "bg-green-50",
    textLight: "text-green-700",
    borderLight: "border-green-200",
    keyAreas: [
      "Ecosystem restoration & afforestation",
      "Sustainable forestry & agroforestry",
      "Blue economy & ecosystem restoration",
      "Biodiversity conservation & ecotourism",
      "Carbon credits generation",
      "Community-based natural resource management",
    ],
  },
  {
    id: 6,
    name: "Mobility",
    icon: CarIcon,
    description:
      "Driving the transition to clean, efficient, and sustainable transport systems.",
    color: "lime", // Dark Green/Lime
    gradient: "from-lime-600 to-green-800",
    bgLight: "bg-lime-50",
    textLight: "text-lime-700",
    borderLight: "border-lime-200",
    keyAreas: [
      "E-mobility (EVs, e-bikes, e-boda)",
      "Sustainable public transport systems",
      "Mobility-as-a-service (MaaS) & digital platforms",
      "Non-motorized transport infrastructure",
      "Logistics & freight optimization",
      "Battery charging & swapping infrastructure",
    ],
  },
];

export default function FocusSectorsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <PageLayout
      title="Key Sectors & Themes"
      subtitle="Catalyzing Innovation Across the Climate Spectrum"
      description="Our work is anchored on six strategic pillars designed to address the most pressing climate challenges while unlocking economic opportunities in Africa."
    >
      <div className="min-h-screen bg-gray-50/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-6">
              <LightbulbIcon className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Six Pillars of Impact
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We support innovative enterprises operating at the intersection of climate action and economic growth.
            </p>
          </motion.div>

          {/* Sectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relarive z-10">
            {focusSectors.map((sector, index) => {
              const checkIsSelected = selectedId === sector.id;

              return (
                <motion.div
                  key={sector.id}
                  layoutId={`card-${sector.id}`} // Helper for layout animations
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedId(checkIsSelected ? null : sector.id)}
                  className={`
                    group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 ease-out border
                    ${checkIsSelected
                      ? "ring-4 ring-offset-4 ring-green-100 border-transparent shadow-2xl scale-[1.02]"
                      : "border-gray-200 bg-white hover:shadow-xl hover:-translate-y-1"
                    }
                  `}
                >
                  {/* Card Background Gradient (Visible on Hover/Active) */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${sector.gradient}`}
                  />

                  <div className={`h-1.5 w-full bg-gradient-to-r ${sector.gradient}`} />

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300
                        bg-gradient-to-br ${sector.gradient} text-white
                      `}>
                        <sector.icon className="w-6 h-6" />
                      </div>
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
                        ${checkIsSelected ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600"}
                      `}>
                        <ArrowRightIcon className={`w-4 h-4 transition-transform duration-300 ${checkIsSelected ? "rotate-90" : ""}`} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      {sector.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {sector.description}
                    </p>

                    {/* Expandable Content (Key Areas) */}
                    <AnimatePresence>
                      {checkIsSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className={`pt-6 border-t ${sector.borderLight}`}>
                            <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${sector.textLight}`}>
                              Focus Areas
                            </h4>
                            <ul className="space-y-3">
                              {sector.keyAreas.map((area, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex items-start text-sm text-gray-700"
                                >
                                  <CheckCircleIcon className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${sector.textLight}`} />
                                  <span>{area}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Decorative Element */}
          <div className="mt-20 text-center">
            <p className="inline-block px-6 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-500">
              Building a sustainable future, one sector at a time.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

