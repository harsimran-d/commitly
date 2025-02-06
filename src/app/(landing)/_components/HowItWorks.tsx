"use client";

import { Clock10, LucideFileLineChart, UserCheck } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    title: "Set Your Goals",
    description:
      "Define your objectives and choose your preferred accountability methods and frequency.",
    icon: LucideFileLineChart,
    delay: 0,
  },
  {
    title: "Connect Calendar",
    description:
      "Sync your calendar and set your preferred check-in times and communication channels.",
    icon: Clock10,
    delay: 0.2,
  },
  {
    title: "Stay Accountable",
    description:
      "Receive regular check-ins and track your progress towards achieving your goals.",
    icon: UserCheck,
    delay: 0.4,
  },
];

const HowItWorks = () => {
  return (
    <section id="howitworks" className="bg-neutral-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300">
            Get started with AAAS in three simple steps
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connection Line for Desktop */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-neutral-700 lg:block"></div>

          <div className="relative grid gap-12 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative rounded-xl bg-neutral-800 p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: step.delay,
                }}
              >
                {/* Step Number */}
                <div className="bg-primary absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold">
                  {index + 1}
                </div>

                {/* Step Content */}
                <div className="mt-6">
                  <step.icon className="text-primary mb-4" />
                  <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                  <p className="text-neutral-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call-to-Action */}
        <motion.div
          className="mx-auto mt-16 max-w-3xl rounded-xl bg-neutral-800 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        >
          <h3 className="mb-4 text-2xl font-bold">
            Ready to Start Your Journey?
          </h3>
          <p className="mb-6 text-neutral-300">
            Join thousands of others who are achieving their goals with AAAS.
          </p>
          <a
            href="#pricing"
            className="bg-primary hover:bg-secondary inline-flex items-center justify-center rounded-lg px-8 py-4 font-semibold text-white transition-all duration-300"
          >
            Get Started Now
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

export default HowItWorks;
