"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check, Star, ArrowRight, Clock, Users, Trophy } from "lucide-react";

const pricingPlans = [
  {
    name: "Court Rentals",
    price: "$80",
    period: "starting at",
    description: "Full and half court rentals for basketball and volleyball practice.",
    icon: Clock,
    features: [
      "1 Hour Full Court - $105",
      "1 Hour Half Court - $80", 
      "2 Hour Full Court - $170",
      "All court equipment included",
      "Flexible scheduling",
      "Professional-grade flooring"
    ],
    popular: false,
    color: "blue",
    cta: "Book Court"
  },
  {
    name: "Dr. Dish Training",
    price: "$45",
    period: "starting at",
    description: "State-of-the-art Dr. Dish CT+ shooting machines with precision training.",
    icon: Users,
    features: [
      "1 Hour Shooting - $45 (up to 4 people)",
      "1 Hour Full Court w/ Dr. Dish - $160",
      "Private Half Court w/ Dr. Dish - $55",
      "2 Hour Full Court w/ Dr. Dish - $215",
      "Private 2Hr Half Court w/ Dr. Dish - $90",
      "Real-time feedback technology"
    ],
    popular: true,
    color: "green",
    cta: "Book Dr. Dish"
  },
  {
    name: "Private Training",
    price: "$225",
    period: "per hour",
    description: "One-on-one coaching sessions with Coach Chris for personalized development.",
    icon: Trophy,
    features: [
      "Personalized training plans",
      "Skill-specific coaching",
      "Performance analysis",
      "Progress tracking",
      "Flexible scheduling",
      "Professional expertise"
    ],
    popular: false,
    color: "purple",
    cta: "Book Training"
  }
];

const additionalServices = [
  {
    name: "Volleyball Rentals",
    price: "$110",
    period: "starting at",
    description: "Practice and game court rentals for volleyball sessions.",
    features: ["1 Hour Practice - $110", "2 Hour Practice - $170", "2.5 Hour Game - $250", "All volleyball equipment included"]
  },
  {
    name: "Game Rentals",
    price: "$250",
    period: "per session",
    description: "Extended game sessions for basketball and volleyball.",
    features: ["2.5 Hour Basketball Game - $250", "2.5 Hour Volleyball Game - $250", "Full court access", "All equipment included"]
  },
  {
    name: "Dr. Dish Equipment",
    price: "Included",
    period: "with training",
    description: "State-of-the-art Dr. Dish CT+ shooting machines and training equipment.",
    features: ["CT+ Technology", "Real-time feedback", "Up to 4 shooters", "Professional maintenance"]
  },
  {
    name: "Private Sessions",
    price: "$225",
    period: "per hour",
    description: "One-on-one training with Coach Chris for personalized development.",
    features: ["Personalized coaching", "Skill development", "Progress tracking", "Flexible scheduling"]
  }
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
      button: "bg-blue-600 hover:bg-blue-700"
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      border: "border-green-200",
      button: "bg-green-600 hover:bg-green-700"
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
      button: "bg-purple-600 hover:bg-purple-700"
    }
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export function PricingTables() {
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
            Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Choose from 13 available booking options with clear, transparent pricing. 
            From court rentals to Dr. Dish training and private coaching, we offer 
            flexible options for every athlete and team.
          </p>
        </motion.div>

        {/* Main Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const colorClasses = getColorClasses(plan.color);
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                  plan.popular ? 'ring-2 ring-primary scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${colorClasses.bg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`h-8 w-8 ${colorClasses.text}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  size="lg" 
                  asChild 
                  className={`w-full text-lg py-4 ${plan.popular ? 'bg-primary hover:bg-primary/90' : colorClasses.button}`}
                >
                  <Link href="/booking">
                    {plan.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600">
              Complete your training experience with these specialized services and equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <div className="text-2xl font-bold text-primary mb-2">
                  {service.price}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {service.period}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Discounts & Special Offers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-primary text-white rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Booking Information
            </h3>
            <p className="text-lg opacity-90">
              All services are available by appointment only. Book online anytime for your convenience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">13</div>
              <div className="text-sm opacity-90">Booking Options</div>
              <div className="text-xs opacity-80">Available online</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Online Booking</div>
              <div className="text-xs opacity-80">Schedule anytime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Dr. Dish</div>
              <div className="text-sm opacity-90">CT+ Technology</div>
              <div className="text-xs opacity-80">State-of-the-art</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Coach</div>
              <div className="text-sm opacity-90">Chris Available</div>
              <div className="text-xs opacity-80">Private training</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}





