"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Professional Athlete",
    content: "Locked N has transformed my training routine. The state-of-the-art equipment and professional coaching have taken my performance to the next level. The facility is always clean, well-maintained, and the staff is incredibly supportive.",
    rating: 5,
    image: "👩‍💼",
  },
  {
    name: "Mike Chen",
    role: "Youth Coach",
    content: "As a coach, I've been bringing my youth teams here for months. The academy programs are outstanding, and the kids love the interactive training sessions. The tournament organization is top-notch, and the prizes really motivate the young athletes.",
    rating: 5,
    image: "👨‍🏫",
  },
  {
    name: "Emily Rodriguez",
    role: "Recreational Player",
    content: "I started as a complete beginner and the staff made me feel comfortable from day one. The flexible scheduling works perfectly with my busy lifestyle, and I've seen incredible improvement in my skills. Highly recommend!",
    rating: 5,
    image: "👩‍🎓",
  },
  {
    name: "David Thompson",
    role: "Tournament Participant",
    content: "The tournaments at Locked N are professionally run with fair competition and great prizes. The facility is spacious, well-equipped, and the atmosphere is electric during events. I've made great friends here and improved my game significantly.",
    rating: 5,
    image: "👨‍💻",
  },
  {
    name: "Lisa Park",
    role: "Parent",
    content: "My son has been part of the youth academy for over a year now. The coaches are patient, knowledgeable, and really care about each child's development. The facility is safe, clean, and the programs are well-structured. Worth every penny!",
    rating: 5,
    image: "👩‍👦",
  },
  {
    name: "James Wilson",
    role: "Group Trainer",
    content: "I rent the facility regularly for my training groups. The equipment is always in perfect condition, the staff is accommodating, and the pricing is fair. The flexible booking system makes it easy to plan our sessions. Excellent facility overall.",
    rating: 5,
    image: "👨‍🏋️",
  },
];

export function TestimonialsSection() {
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
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our community has to say 
            about their experience at Locked N.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-gray-200">
                <Quote className="h-8 w-8" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="text-3xl mr-4">{testimonial.image}</div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Tournaments Hosted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-600">Training Sessions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}






