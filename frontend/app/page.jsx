"use client";

import { redirect } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import Hero from "@/components/landing/hero";
import LandingNavbar from "@/components/auth/landing-navbar";
import Feature from "@/components/landing/feature";

export default function Landing() {
  const { data: userData, isLoading, error } = useFetch("");

  if (userData) {
    redirect("/home");
  }

  return (
    <>
      {/* <Image
        src={"/city.jpg"}
        width={1400}
        height={0}
        alt="cover"
        className="w-full "
      /> */}
      <LandingNavbar />
      <Hero />
      <Feature />
    </>
  );
}
