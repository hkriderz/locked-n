"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, X, Star } from "lucide-react";

const comparisonData = [
  {
    feature: "Facility Access",
    basic: true,
    training: true,
    academy: true,
    description: "Access to main training facility"
  },
  {
    feature: "Equipment Included",
    basic: true,
    training: true,
    academy: true,
    description: "All necessary equipment provided"
  },
  {
    feature: "Personal Training",
    basic: false,
    training: true,
    academy: false,
    description: "One-on-one coaching sessions"
  },
  {
    feature: "Group Training",
    basic: false,
    training: true,
    academy: true,
    description: "Group training sessions"
  },
  {
    feature: "Progress Tracking",
    basic: false,
    training: true,
    academy: true,
    description: "Regular progress assessments"
  },
  {
    feature: "Custom Training Plan",
    basic: false,
    training: true,
    academy: true,
    description: "Personalized training programs"
  },
  {
    feature: "Nutrition Guidance",
    basic: false,
    training: true,
    academy: false,
    description: "Diet and nutrition advice"
  },
  {
    feature: "Priority Booking",
    basic: false,
    training: true,
    academy: true,
    description: "Priority access to time slots"
  },
  {
    feature: "Parent Reports",
    basic: false,
    training: false,
    academy: true,
    description: "Regular progress reports for parents"
  },
  {
    feature: "Character Development",
    basic: false,
    training: false,
    academy: true,
    description: "Focus on character and values"
  },
  {
    feature: "Competition Prep",
    basic: false,
    training: true,
    academy: true,
    description: "Tournament and competition training"
  },
  {
    feature: "Unlimited Access",
    basic: false,
    training: true,
    academy: false,
    description: "Unlimited facility access"
  }
];

const plans = [
  {
    name: "Basic Rental",
    price: "$25/hour",
    color: "blue",
    popular: false
  },
  {
    name: "Training Package",
    price: "$200/month",
    color: "green",
    popular: true
  },
  {
    name: "Youth Academy",
    price: "$150/month",
    color: "purple",
    popular: false
  }
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200"
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      border: "border-green-200"
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200"
    }
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export function PricingComparison() {
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
            Compare Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See exactly what's included in each plan to make the best choice for your needs.
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 border-b">
            <div className="font-semibold text-gray-900">Features</div>
            {plans.map((plan, index) => {
              const colorClasses = getColorClasses(plan.color);
              return (
                <div key={plan.name} className="text-center">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${colorClasses.bg} ${colorClasses.text} mb-2`}>
                    {plan.name}
                    {plan.popular && <Star className="h-4 w-4 ml-1" />}
                  </div>
                  <div className="text-lg font-bold text-gray-900">{plan.price}</div>
                </div>
              );
            })}
          </div>

          {/* Features */}
          <div className="divide-y divide-gray-200">
            {comparisonData.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="grid grid-cols-4 gap-4 p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="font-medium text-gray-900">{item.feature}</div>
                  <div className="ml-2 text-xs text-gray-500 hidden sm:block">
                    ({item.description})
                  </div>
                </div>
                
                <div className="text-center">
                  {item.basic ? (
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  ) : (
                    <X className="h-6 w-6 text-gray-400 mx-auto" />
                  )}
                </div>
                
                <div className="text-center">
                  {item.training ? (
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  ) : (
                    <X className="h-6 w-6 text-gray-400 mx-auto" />
                  )}
                </div>
                
                <div className="text-center">
                  {item.academy ? (
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  ) : (
                    <X className="h-6 w-6 text-gray-400 mx-auto" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">B</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Basic Rental</h3>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Perfect for occasional users who want flexibility and don't need coaching.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg ring-2 ring-primary">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">T</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Training Package</h3>
              <div className="inline-flex items-center px-2 py-1 bg-primary text-white text-xs rounded-full mt-2">
                <Star className="h-3 w-3 mr-1" />
                Recommended
              </div>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Best value for serious athletes who want comprehensive training and coaching.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">Y</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Youth Academy</h3>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Ideal for young athletes who need structured development and character building.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



