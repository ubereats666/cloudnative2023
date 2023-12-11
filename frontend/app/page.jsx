"use client";

import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import Hero from "@/components/landing/hero";
import LandingNavbar from "@/components/landing/landing-navbar";
import Feature from "@/components/landing/feature";
import Image from "next/image";

export default function Landing() {
  const { data: userData, isLoading, error } = useFetch("");

  if (userData) {
    redirect("/home");
  }

  return (
    <section className="relative flex flex-col w-full overflow-x-hidden">
      <div className="gradient-background" />
      <LandingNavbar />
      <Hero />
      <Feature />
    </section>
  );
}
