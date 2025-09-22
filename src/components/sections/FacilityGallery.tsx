"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Camera, MapPin, Clock } from "lucide-react";

const galleryItems = [
  {
    title: "Main Training Area",
    description: "Spacious facility with state-of-the-art shooting machines and professional-grade equipment.",
    image: "🏟️",
    features: ["Professional Equipment", "Climate Controlled", "Safety Protocols"],
  },
  {
    title: "Youth Academy Space",
    description: "Dedicated area designed specifically for our youth programs and training sessions.",
    image: "👨‍👩‍👧‍👦",
    features: ["Age-Appropriate Equipment", "Supervised Training", "Skill Development"],
  },
  {
    title: "Tournament Arena",
    description: "Competition-ready space for tournaments, leagues, and special events.",
    image: "🏆",
    features: ["Competition Setup", "Spectator Seating", "Professional Lighting"],
  },
  {
    title: "Equipment Storage",
    description: "Secure storage and maintenance area for all facility equipment and gear.",
    image: "🔧",
    features: ["Secure Storage", "Regular Maintenance", "Equipment Care"],
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
                <h3 className="text-xl font-semibold text-gray-900">Facility Size</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">15,000 sq ft</div>
              <p className="text-gray-600">Total training space</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Location</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">Downtown</div>
              <p className="text-gray-600">Easy access & parking</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Hours</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">Extended</div>
              <p className="text-gray-600">Flexible scheduling</p>
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
              Want to See More?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Schedule a facility tour and experience Locked N firsthand. 
              Our team will show you around and answer any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Tour
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Virtual Tour
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



