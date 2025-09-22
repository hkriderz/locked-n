"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Users, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Choose Date & Time",
    description: "Select your preferred date and time slot from our available schedule.",
    color: "blue"
  },
  {
    icon: Users,
    title: "Select Service",
    description: "Choose from gym rentals, training sessions, or tournament participation.",
    color: "green"
  },
  {
    icon: CreditCard,
    title: "Payment & Confirmation",
    description: "Complete your booking with secure payment and receive instant confirmation.",
    color: "purple"
  },
  {
    icon: CheckCircle,
    title: "Ready to Go",
    description: "Arrive at your scheduled time and enjoy your session at Locked N.",
    color: "orange"
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
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      border: "border-orange-200"
    }
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export function BookingSteps() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Book Your Session
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Easy online booking in just a few simple steps. Choose your service, 
            pick your time, and get instant confirmation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colorClasses = getColorClasses(step.color);
            
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative">
                  <div className={`w-20 h-20 ${colorClasses.bg} rounded-full flex items-center justify-center mx-auto mb-6 ${colorClasses.border} border-2`}>
                    <Icon className={`h-10 w-10 ${colorClasses.text}`} />
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Book Online?
            </h3>
            <p className="text-gray-600">
              Our online booking system makes it easy and convenient to schedule your sessions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Confirmation</h4>
              <p className="text-gray-600 text-sm">Get immediate confirmation and booking details via email.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-Time Availability</h4>
              <p className="text-gray-600 text-sm">See live availability and book your preferred time slot.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure Payment</h4>
              <p className="text-gray-600 text-sm">Safe and secure payment processing with multiple options.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}






