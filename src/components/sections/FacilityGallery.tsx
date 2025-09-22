"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Camera, MapPin, Clock } from "lucide-react";

const galleryItems = [
  {
    title: "Basketball Courts",
    description: "Full and half court basketball rentals with professional-grade flooring and equipment.",
    image: "🏀",
    features: ["Full Court Rentals", "Half Court Rentals", "Professional Equipment"],
  },
  {
    title: "Dr. Dish CT+ Training",
    description: "State-of-the-art Dr. Dish CT+ shooting machines for advanced basketball training.",
    image: "🎯",
    features: ["Up to 4 Shooters", "Advanced Technology", "Performance Tracking"],
  },
  {
    title: "Volleyball Courts",
    description: "Dedicated volleyball practice and game courts with professional setup.",
    image: "🏐",
    features: ["Practice Courts", "Game Rentals", "Professional Setup"],
  },
  {
    title: "Private Training Area",
    description: "One-on-one training space with Coach Chris for personalized development.",
    image: "👨‍🏫",
    features: ["Personal Coaching", "Custom Training", "Skill Development"],
  },
];

export function FacilityGallery() {
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
            Our Facility
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of our state-of-the-art facility and see why 
            Locked N is the premier choice for sports training and competition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-2">{item.image}</div>
                  <p className="text-sm">Facility Photo</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="space-y-2">
                  {item.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Facility Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gray-50 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Training Location</h3>
              </div>
              <div className="text-lg font-bold text-primary mb-2">10838 Bellcourt</div>
              <p className="text-gray-600">Rancho Cucamonga, CA 91730</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Services</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">13</div>
              <p className="text-gray-600">Available booking options</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Booking</h3>
              </div>
              <div className="text-lg font-bold text-primary mb-2">By Appointment</div>
              <p className="text-gray-600">Schedule online anytime</p>
            </div>
          </div>
        </motion.div>

        {/* Virtual Tour CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Book?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Choose from 13 available booking options including court rentals, 
              Dr. Dish training, private coaching, and volleyball sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/booking" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Book Now
              </a>
              <a href="/contact" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}





