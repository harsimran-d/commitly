"use client";

import { useState } from "react";
import { motion } from "motion/react";

const faqs = [
  {
    question: "How does the accountability system work?",
    answer:
      "Our system combines automated reminders with human accountability partners. You'll receive regular check-ins through your preferred communication channels and get support to stay on track with your goals.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take security seriously. All data is encrypted and we comply with GDPR, CCPA, and other privacy regulations to ensure your information stays protected.",
  },
  {
    question: "Can I change my accountability schedule?",
    answer:
      "Absolutely! You can adjust your schedule anytime through our platform. Our Cal.com integration makes it easy to manage your check-in times and frequency.",
  },
  {
    question: "What if I need to cancel my subscription?",
    answer:
      "You can cancel anytime with no questions asked. We offer a 30-day money-back guarantee if you're not satisfied with our service.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Everything you need to know about our accountability service
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-lg border border-neutral-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-black">
                  {faq.question}
                </span>
                <svg
                  className={`h-6 w-6 transform text-black transition-transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <motion.div
                className={`overflow-hidden ${openIndex === index ? "block" : "hidden"}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p className="p-6 pt-0 text-neutral-600">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        >
          <h3 className="mb-4 text-xl font-semibold text-black">
            Still have questions?
          </h3>
          <a
            href="#contact"
            className="inline-flex items-center text-black transition-colors duration-300 hover:text-gray-700"
          >
            <span>Contact our support team</span>
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
        </motion.div> */}
      </div>
    </section>
  );
};

export default FAQ;
