"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Star, Users, Zap } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We're driven by our love for sports and our commitment to helping others discover their potential.",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    icon: Star,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from equipment maintenance to customer service.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in building strong relationships and supporting each other's growth and success.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously invest in the latest technology and training methods to stay ahead of the curve.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

export function ValuesSection() {
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
            Our Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These core values guide everything we do at Locked N and shape the 
            experience we provide to our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className={`w-16 h-16 ${value.bgColor} rounded-lg flex items-center justify-center mx-auto mb-6`}>
                  <Icon className={`h-8 w-8 ${value.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Story
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Locked N was founded by a group of passionate athletes and coaches who 
                recognized the need for a world-class training facility in our community. 
                What started as a vision to provide better training opportunities has 
                grown into a comprehensive sports facility that serves athletes of all levels.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we're proud to be the go-to destination for serious athletes, 
                recreational players, and families looking to improve their skills and 
                have fun in a safe, professional environment.
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📈</div>
                  <p>Growth Timeline</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}






