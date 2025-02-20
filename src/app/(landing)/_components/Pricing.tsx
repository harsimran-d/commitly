"use client";

import { motion } from "motion/react";
import Link from "next/link";

const pricingPlans = [
  {
    title: "Basic Plan",
    price: "$2",
    duration: "/month",
    features: [
      "Automated Reminders",
      "WhatsApp/SMS/Email",
      "Basic Progress Tracking",
    ],
    highlight: false,
    delay: 0,
  },
  {
    title: "Premium Plan",
    price: "$20",
    duration: "/month",
    features: [
      "Human Accountability",
      "All Basic Features",
      "Priority Support",
      "Advanced Analytics",
    ],
    highlight: true,
    delay: 0.2,
  },
  {
    title: "Custom Plan",
    price: "Custom",
    duration: "",
    features: [
      "High-Touch Coaching",
      "Group Accountability",
      "Custom Solutions",
    ],
    highlight: false,
    delay: 0.4,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Choose the plan that fits your accountability needs
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl border p-8 ${
                plan.highlight
                  ? "scale-105 border-primary bg-white text-black shadow-lg"
                  : "border-neutral-200 bg-neutral-50 text-black hover:shadow-xl"
              } transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: plan.delay }}
            >
              {plan.highlight && (
                <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="mb-2 text-xl font-semibold">{plan.title}</h3>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span
                  className={`ml-2 ${plan.highlight ? "text-black/80" : "text-neutral-600"}`}
                >
                  {plan.duration}
                </span>
              </div>
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="mr-3 h-5 w-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.086l6.293-6.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/waitlist">
                <button
                  className={`w-full rounded-lg px-6 py-3 font-semibold transition-colors duration-300 ${
                    plan.highlight
                      ? "bg-black text-white hover:bg-neutral-700"
                      : "bg-neutral-800 text-white hover:bg-neutral-600"
                  }`}
                >
                  {plan.price === "Custom" ? "Join Waitlist" : "Join Waitlist"}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        >
          <div className="inline-flex items-center text-neutral-600">
            <svg
              className="mr-2 h-5 w-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.086l6.293-6.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>30-day money-back guarantee • No credit card required</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
