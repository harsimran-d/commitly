"use client";

import { motion } from "motion/react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Entrepreneur",
    image: "https://cal.com/ewa.jpg",
    quote:
      "AAAS helped me stay focused on my business goals. The daily check-ins and human accountability made all the difference. I've achieved 3x more in the last quarter!",
    rating: 5,
    delay: 0,
  },
  {
    name: "Michael Chen",
    role: "Fitness Enthusiast",
    image:
      "https://www.datocms-assets.com/77432/1734384543-man-profile-picture-4.jpg",
    quote:
      "The automated reminders kept me consistent with my workout routine. I've never stuck to a fitness plan this long before. Thank you AAAS!",
    rating: 5,
    delay: 0.2,
  },
  {
    name: "Emily Rodriguez",
    role: "Student",
    image:
      "https://ik.imagekit.io/senja/tr:f-jpeg/Avatars/avatar_aOgsMJ-eZ.png",
    quote:
      "The premium plan's human accountability coach helped me stay on track with my thesis. I finished ahead of schedule!",
    rating: 5,
    delay: 0.4,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-neutral-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Success Stories
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300">
            Join thousands who have transformed their lives with AAAS
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="rounded-xl bg-neutral-800 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: testimonial.delay,
              }}
            >
              <div className="mb-6 flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-neutral-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="mb-4 text-neutral-300">{testimonial.quote}</p>
              <div className="text-primary flex">
                {"★".repeat(testimonial.rating)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        >
          <a
            href="#pricing"
            className="bg-primary hover:bg-secondary inline-flex animate-pulse items-center justify-center rounded-lg px-8 py-4 font-semibold text-white transition-all duration-300"
          >
            Join Our Success Stories
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
