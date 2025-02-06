"use client";

import { motion } from "motion/react";
import Image from "next/image";

const integrations = [
  {
    name: "Calendar Sync",
    description:
      "Seamless scheduling integration for your accountability sessions",
    logo: "https://cal.com/logo.svg",
    delay: 0,
  },
  {
    name: "Infrastructure",
    description: "Enterprise-grade reliability and performance",
    logo: "https://www.datocms-assets.com/77432/1726142372-vercel-logo.svg",
    delay: 0.2,
  },
  {
    name: "Data Security",
    description: "Enterprise-level data protection and encryption",
    logo: "https://www.datocms-assets.com/77432/1726142372-supabase-logo.svg",
    delay: 0.4,
  },
];

const Integrations = () => {
  return (
    <section id="integrations" className="bg-neutral-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Powerful Integrations
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300">
            Seamlessly connect with your favorite tools and services
          </p>
        </motion.div>

        {/* Integration Grid */}
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              className="rounded-xl bg-neutral-800 p-6 text-center transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: integration.delay,
              }}
            >
              <Image
                src={integration.logo}
                alt={integration.name}
                width={120}
                height={48}
                className="mx-auto mb-4"
              />
              <h3 className="mb-2 font-semibold text-white">
                {integration.name}
              </h3>
              <p className="text-neutral-400">{integration.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Integration CTA */}
        <motion.div
          className="mx-auto mt-16 max-w-3xl rounded-xl bg-neutral-800 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        >
          <h3 className="mb-4 text-2xl font-bold text-white">
            Ready to Get Started?
          </h3>
          <p className="mb-6 text-neutral-300">
            Join thousands of successful professionals using AAAS
          </p>
          <a
            href="#pricing"
            className="bg-primary hover:bg-secondary inline-flex items-center justify-center rounded-lg px-8 py-4 font-semibold text-white transition-all duration-300"
          >
            Start Your Journey
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

export default Integrations;
