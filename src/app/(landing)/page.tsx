import React from "react";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import Pricing from "./_components/Pricing";
// import Testimonials from "./_components/Testimonials";
import FAQ from "./_components/FAQ";
// import Integrations from "./_components/Integrations";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      {/* <Testimonials /> */}
      <FAQ />
      {/* <Integrations /> */}
    </div>
  );
}
