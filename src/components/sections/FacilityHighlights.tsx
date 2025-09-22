"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Trophy, Users, Zap, Shield, Clock } from "lucide-react";

const highlights = [
  {
    icon: Target,
    title: "Dr. Dish CT+ Technology",
    description: "State-of-the-art Dr. Dish CT+ shooting machines with precision targeting and real-time feedback for up to 4 shooters.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Trophy,
    title: "Court Rentals",
    description: "Full and half court basketball rentals with professional-grade equipment and flexible scheduling.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    icon: Users,
    title: "Private Training",
    description: "One-on-one coaching sessions with Coach Chris for personalized skill development and training.",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Zap,
    title: "Volleyball Facilities",
    description: "Dedicated volleyball practice and game courts with professional setup and equipment.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Top-tier safety protocols and equipment maintenance for peace of mind during all sessions.",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    icon: Clock,
    title: "Appointment Booking",
    description: "Easy online booking system with 13 available options and appointment-only scheduling.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

export function FacilityHighlights() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Locked N?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference with our premium facilities, professional training, 
            and commitment to excellence in every aspect of your sports journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`w-16 h-16 ${highlight.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                  <Icon className={`h-8 w-8 ${highlight.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {highlight.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Premium Sports Experience
              </h3>
              <p className="text-gray-600 mb-6">
                Our facility combines cutting-edge Dr. Dish CT+ technology with professional expertise 
                to deliver an unmatched sports experience. From court rentals to private training, 
                we provide the tools and coaching you need to excel.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Dr. Dish CT+ shooting machines with advanced technology
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Private coaching sessions with Coach Chris
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Flexible court rentals for basketball and volleyball
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  13 booking options with easy online scheduling
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📸</div>
                  <p>Facility Photos</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}





