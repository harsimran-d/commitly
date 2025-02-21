"use client";

import { motion } from "motion/react";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://cal.com/squares-footer.png"
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.h1
          className="mb-6 text-4xl font-bold text-white md:text-6xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Stay Accountable.
          <span className="bg-gradient-to-r from-[#ffaaee] to-[#ffeeaa] bg-clip-text text-transparent">
            Achieve More.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="mb-8 text-xl text-neutral-300 md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Get personalized reminders and human follow-ups to keep you on track
          with your goals.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          {/* <MailchimpDialog>
            <div className="w-full transform rounded-lg bg-gray-50 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-secondary sm:w-auto">
              Join Waitlist
            </div>
          </MailchimpDialog> */}

          {/* <Link
            href="#features"
            className="w-full rounded-lg bg-neutral-800 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-neutral-700 sm:w-auto"
          >
            Learn More
          </Link> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
