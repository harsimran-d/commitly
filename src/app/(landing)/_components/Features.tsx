"use client";

import { Clock, MessageCircle, ShieldCheck, VideoIcon } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    title: "Automated Accountability",
    description:
      "Get timely reminders via WhatsApp, SMS, Email, or Telegram to stay on track.",
    icon: MessageCircle,
    delay: 0,
  },
  {
    title: "Human Check-ins",
    description:
      "Get personal accountability with real human follow-ups and support.",
    icon: VideoIcon,
    delay: 0.2,
  },
  {
    title: "Custom Scheduling",
    description:
      "Seamlessly sync with your calendar for perfect timing of check-ins.",
    icon: Clock,
    delay: 0.4,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your consistency and success rate with detailed analytics.",
    icon: ShieldCheck,
    delay: 0.6,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            Stay on Track with Powerful Features
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Everything you need to maintain accountability and achieve your
            goals
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-xl bg-neutral-50 p-6 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: feature.delay,
              }}
            >
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <feature.icon className="text-black" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-neutral-900">
                {feature.title}
              </h3>
              <p className="text-neutral-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Bar */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        >
          <a
            href="#pricing"
            className="bg-primary hover:bg-secondary inline-flex animate-pulse items-center justify-center rounded-lg px-8 py-4 font-semibold text-black transition-all duration-300"
          >
            Start Achieving More
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

export default FeaturesSection;
