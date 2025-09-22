"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    details: "909-287-1268",
    description: "Call us for immediate assistance",
    action: "tel:909-287-1268",
    color: "blue"
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@lockedninc.com",
    description: "Send us a message anytime",
    action: "mailto:info@lockedninc.com",
    color: "green"
  },
  {
    icon: MapPin,
    title: "Training Location",
    details: "10838 Bellcourt\nRancho Cucamonga, CA 91730",
    description: "Visit our facility",
    action: "https://maps.google.com",
    color: "purple"
  },
  {
    icon: Clock,
    title: "Hours",
    details: "Appointment/Booking Only",
    description: "Schedule your session online",
    action: "/booking",
    color: "orange"
  }
];

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/lockedn",
    color: "text-blue-600"
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/LOCKEDN_LAB760/",
    color: "text-pink-600"
  }
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      hover: "hover:bg-blue-200"
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      hover: "hover:bg-green-200"
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      hover: "hover:bg-purple-200"
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      hover: "hover:bg-orange-200"
    }
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export function ContactInfo() {
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
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our team for bookings, questions, facility tours, 
            or any other inquiries. We're here to help you get the most out of your experience.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const colorClasses = getColorClasses(method.color);
            
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-20 h-20 ${colorClasses.bg} rounded-lg flex items-center justify-center mx-auto mb-6 ${colorClasses.hover} transition-colors`}>
                  <Icon className={`h-10 w-10 ${colorClasses.text}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {method.title}
                </h3>
                
                <div className="text-gray-600 mb-2 whitespace-pre-line">
                  {method.details}
                </div>
                
                <p className="text-sm text-gray-500 mb-4">
                  {method.description}
                </p>
                
                {method.action && (
                  <a
                    href={method.action}
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${colorClasses.bg} ${colorClasses.text} ${colorClasses.hover}`}
                  >
                    {method.title === "Phone" ? "Call Now" : 
                     method.title === "Email" ? "Send Email" : 
                     method.title === "Address" ? "Get Directions" : "Learn More"}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gray-50 rounded-2xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <p className="text-gray-600">
              Get started with these common actions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-lg">📅</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Book Court Rental</h4>
              <p className="text-gray-600 text-sm mb-4">
                Reserve full or half court rentals for basketball and volleyball.
              </p>
              <a
                href="/booking"
                className="text-primary font-semibold hover:underline"
              >
                Book Now
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-lg">🏢</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Dr. Dish Training</h4>
              <p className="text-gray-600 text-sm mb-4">
                Book Dr. Dish CT+ shooting sessions for up to 4 shooters.
              </p>
              <a
                href="/booking"
                className="text-primary font-semibold hover:underline"
              >
                Book Dr. Dish
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-lg">💬</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Private Training</h4>
              <p className="text-gray-600 text-sm mb-4">
                Schedule one-on-one training sessions with Coach Chris.
              </p>
              <a
                href="/booking"
                className="text-primary font-semibold hover:underline"
              >
                Book Training
              </a>
            </div>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Follow Us
          </h3>
          <p className="text-gray-600 mb-6">
            Stay connected and see what's happening at Locked N
          </p>
          
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.name}
                  variant="outline"
                  size="icon"
                  asChild
                  className={`w-12 h-12 bg-gray-100 hover:bg-gray-200 border-gray-200 ${social.color}`}
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                </Button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}



