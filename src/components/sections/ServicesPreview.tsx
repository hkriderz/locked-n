"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calendar, Users, Trophy, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Calendar,
    title: "Gym Rentals",
    description: "Flexible hourly and daily rentals for individuals and groups. Perfect for training sessions, events, and practice.",
    features: ["Hourly & Daily Rates", "Group Discounts", "Equipment Included", "Flexible Scheduling"],
    price: "Starting at $25/hour",
    href: "/services#gym-rentals",
    color: "blue",
  },
  {
    icon: Users,
    title: "Training Programs",
    description: "Professional coaching and personalized training programs for all skill levels and age groups.",
    features: ["Personal Training", "Group Classes", "Youth Programs", "Skill Development"],
    price: "Starting at $50/session",
    href: "/services#training",
    color: "green",
  },
  {
    icon: Trophy,
    title: "Tournaments & Events",
    description: "Competitive tournaments, leagues, and special events throughout the year with prizes and recognition.",
    features: ["Monthly Tournaments", "Seasonal Leagues", "Championship Events", "Prize Pools"],
    price: "Entry fees vary",
    href: "/services#tournaments",
    color: "purple",
  },
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      border: "border-green-200",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
    },
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export function ServicesPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive sports facility services designed to meet all your training, 
            competition, and recreational needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorClasses = getColorClasses(service.color);
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${colorClasses.border} hover:border-primary`}
              >
                <div className={`w-16 h-16 ${colorClasses.bg} rounded-lg flex items-center justify-center mb-6`}>
                  <Icon className={`h-8 w-8 ${colorClasses.text}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-lg font-semibold text-primary mb-6">
                  {service.price}
                </div>
                
                <Button asChild className="w-full">
                  <Link href={service.href}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Book your session today and experience the Locked N difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
              <Link href="/booking">
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



