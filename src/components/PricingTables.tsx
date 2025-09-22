"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check, Star, ArrowRight, Clock, Users, Trophy } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic Rental",
    price: "$25",
    period: "per hour",
    description: "Perfect for individual training sessions and practice.",
    icon: Clock,
    features: [
      "Access to main facility",
      "Basic equipment included",
      "Flexible scheduling",
      "Safety briefing",
      "Equipment orientation",
      "Locker room access"
    ],
    popular: false,
    color: "blue",
    cta: "Book Now"
  },
  {
    name: "Training Package",
    price: "$200",
    period: "per month",
    description: "Comprehensive training program with professional coaching.",
    icon: Users,
    features: [
      "8 personal training sessions",
      "Unlimited facility access",
      "Progress tracking",
      "Custom training plan",
      "Nutrition guidance",
      "Performance analysis",
      "Priority booking",
      "Equipment rental included"
    ],
    popular: true,
    color: "green",
    cta: "Get Started"
  },
  {
    name: "Youth Academy",
    price: "$150",
    period: "per month",
    description: "Complete youth development program with character building.",
    icon: Trophy,
    features: [
      "Age-appropriate training",
      "Character development",
      "Parent progress reports",
      "Safety-first approach",
      "Competition preparation",
      "Team building activities",
      "Equipment included",
      "Certified instructors"
    ],
    popular: false,
    color: "purple",
    cta: "Enroll Now"
  }
];

const additionalServices = [
  {
    name: "Tournament Entry",
    price: "$25-50",
    period: "per event",
    description: "Competitive tournaments with prizes and recognition.",
    features: ["Professional refereeing", "Live scoring", "Prize pools", "Certificates"]
  },
  {
    name: "Group Training",
    price: "$30",
    period: "per session",
    description: "Group training sessions for teams and organizations.",
    features: ["Team discounts", "Custom programs", "Equipment included", "Progress tracking"]
  },
  {
    name: "Equipment Rental",
    price: "$10-25",
    period: "per item",
    description: "Rent specialized equipment for your training needs.",
    features: ["Professional gear", "Maintenance included", "Flexible terms", "Delivery available"]
  },
  {
    name: "Event Hosting",
    price: "$500",
    period: "per day",
    description: "Host your own tournaments and events at our facility.",
    features: ["Full facility access", "Setup assistance", "Staff support", "Equipment included"]
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
            Choose the plan that best fits your needs. All our pricing is transparent 
            with no hidden fees or surprise charges. We offer flexible options for 
            individuals, groups, and organizations.
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
              Enhance your experience with these specialized services and add-ons.
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
              Special Offers & Discounts
            </h3>
            <p className="text-lg opacity-90">
              Take advantage of these special offers and save on your training.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">20%</div>
              <div className="text-sm opacity-90">Group Discount</div>
              <div className="text-xs opacity-80">10+ people</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15%</div>
              <div className="text-sm opacity-90">Student Discount</div>
              <div className="text-xs opacity-80">Valid ID required</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">20%</div>
              <div className="text-sm opacity-90">Military Discount</div>
              <div className="text-xs opacity-80">Active & veteran</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2 Free</div>
              <div className="text-sm opacity-90">Annual Membership</div>
              <div className="text-xs opacity-80">Months included</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



