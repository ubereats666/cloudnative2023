"use client";

import Hero from "@/components/landing/hero";
import LandingNavbar from "@/components/landing/landing-navbar";
import Feature from "@/components/landing/feature";

export default function Landing() {
  return (
    <section className="relative flex flex-col w-full overflow-x-hidden">
      <div className="gradient-background" />
      <LandingNavbar />
      <Hero />
      <Feature />
    </section>
  );
}
