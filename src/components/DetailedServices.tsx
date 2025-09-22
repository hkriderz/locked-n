"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calendar, Users, Trophy, Clock, Shield, Star, ArrowRight } from "lucide-react";

const services = [
  {
    id: "court-rentals",
    icon: Calendar,
    title: "Court Rentals",
    subtitle: "Full & Half Court Access",
    description: "Rent our premium basketball and volleyball courts for practice sessions, training, or games. Available in 1-hour and 2-hour sessions.",
    features: [
      "Full court basketball rentals",
      "Half court basketball rentals",
      "Volleyball practice courts",
      "1-hour and 2-hour sessions",
      "All court equipment included",
      "Flexible scheduling available"
    ],
    pricing: {
      "1h Full Court": "$105",
      "2h Full Court": "$170",
      "1h Half Court": "$80"
    },
    color: "blue",
    image: "🏟️"
  },
  {
    id: "dish-training",
    icon: Users,
    title: "Dr. Dish Training",
    subtitle: "State-of-the-Art Shooting",
    description: "Experience our Dr. Dish CT+ shooting machines - the most advanced basketball training technology. Perfect for individual or group training sessions.",
    features: [
      "Dr. Dish CT+ shooting machines",
      "Up to 4 shooters per session",
      "1-hour and 2-hour sessions",
      "Full court with equipment",
      "Half court with equipment",
      "Professional training environment"
    ],
    pricing: {
      "1h Shooting": "$45",
      "2h Full Court": "$215",
      "2h Half Court": "$90"
    },
    color: "green",
    image: "🎯"
  },
  {
    id: "private-training",
    icon: Shield,
    title: "Private Training",
    subtitle: "One-on-One Coaching",
    description: "Personalized training sessions with Coach Chris. Get individual attention and customized training programs designed for your specific needs.",
    features: [
      "1-hour private sessions",
      "Personalized coaching",
      "Skill-specific training",
      "Performance analysis",
      "Custom training plans",
      "Progress tracking"
    ],
    pricing: {
      "1hr Private": "$225",
      "Personalized": "Training Plans",
      "Progress": "Tracking Included"
    },
    color: "purple",
    image: "👨‍🏫"
  },
  {
    id: "volleyball-rentals",
    icon: Trophy,
    title: "Volleyball Rentals",
    subtitle: "Practice & Game Courts",
    description: "Dedicated volleyball court rentals for practice sessions and games. Available in 1-hour practice sessions and 2.5-hour game rentals.",
    features: [
      "Volleyball practice courts",
      "1-hour practice sessions",
      "2.5-hour game rentals",
      "Professional volleyball setup",
      "All volleyball equipment included",
      "Flexible scheduling"
    ],
    pricing: {
      "1h Practice": "$110",
      "2h Practice": "$170",
      "2.5h Game": "$250"
    },
    color: "orange",
    image: "🏐"
  }
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
      accent: "bg-blue-50"
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      border: "border-green-200",
      accent: "bg-green-50"
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
      accent: "bg-purple-50"
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      border: "border-orange-200",
      accent: "bg-orange-50"
    }
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export function DetailedServices() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive sports facility services designed to meet all your training, 
            competition, and recreational needs. From individual sessions to group events, 
            we provide the perfect solution for every athlete.
          </p>
        </motion.div>

        <div className="space-y-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorClasses = getColorClasses(service.color);
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`rounded-2xl overflow-hidden shadow-lg ${colorClasses.border} border-2`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Content */}
                  <div className={`p-8 lg:p-12 ${colorClasses.accent}`}>
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 ${colorClasses.bg} rounded-lg flex items-center justify-center mr-4`}>
                        <Icon className={`h-8 w-8 ${colorClasses.text}`} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                        <p className={`text-lg ${colorClasses.text} font-medium`}>{service.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" asChild className="text-lg px-8 py-4">
                        <Link href="/booking">
                          Book Now
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4">
                        <Link href="/pricing">
                          View Pricing
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Pricing & Image */}
                  <div className="bg-white p-8 lg:p-12">
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-4">{service.image}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h3>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {Object.entries(service.pricing).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-semibold text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Shield className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-semibold text-gray-900">Safety Guaranteed</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        All equipment regularly maintained and safety protocols strictly followed.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 bg-gray-50 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional Services</h3>
            <p className="text-gray-600">We also offer these specialized services to enhance your experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Game Rentals</h4>
              <p className="text-sm text-gray-600">Extended 2.5-hour game rentals for basketball and volleyball.</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Dr. Dish Equipment</h4>
              <p className="text-sm text-gray-600">State-of-the-art Dr. Dish CT+ shooting machines with training equipment.</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Private Sessions</h4>
              <p className="text-sm text-gray-600">One-on-one training with Coach Chris for personalized development.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}





