"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Users, Star } from "lucide-react";

const teamMembers = [
  {
    name: "Coach Chris",
    role: "Founder & Head Trainer",
    bio: "Coach Chris is the founder and head trainer of GYFTED Hoops Academy, a program dedicated to helping players elevate their basketball skills. With a focus on building confidence, discipline, and mentorship, Coach Chris develops athletes both on and off the court, empowering them to reach their full potential in the game and in life.",
    image: "🏀",
    certifications: ["GYFTED Hoops Academy", "Basketball Training", "Youth Development", "Mentorship"],
  },
];

export function TeamSection() {
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
            Meet the Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced and passionate team is dedicated to helping players elevate their basketball skills 
            through confidence, discipline, and mentorship.
          </p>
        </motion.div>

        <div className="flex justify-center mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center max-w-md"
            >
              <div className="text-6xl mb-4">{member.image}</div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {member.name}
              </h3>
              
              <div className="text-primary font-medium mb-4">
                {member.role}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {member.bio}
              </p>
              
              <div className="space-y-1">
                {member.certifications.map((cert, certIndex) => (
                  <div key={certIndex} className="flex items-center text-xs text-gray-500">
                    <Award className="h-3 w-3 mr-1" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Team Experience</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">50+ Years</div>
              <p className="text-gray-600">Combined experience</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Certifications</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <p className="text-gray-600">Professional certifications</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Client Satisfaction</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-gray-600">Satisfaction rate</p>
            </div>
          </div>
        </motion.div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Join Our Team
            </h3>
            <p className="text-lg opacity-90 mb-6">
              We're always looking for passionate individuals who share our commitment 
              to excellence in sports training and community building.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Open Positions
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




