"use client";

import { ArrowRight, Wand2 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { easeInOut, motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  return (
    <section className="flex flex-col gap-4">
      <Image
        src={"/city.jpg"}
        width={1920}
        height={0}
        alt="cover"
        className="full aspect-[2.5] object-top object-cover relative -z-50 opacity-80"
      />

      <article className="flex flex-col gap-8 pt-4 px-12">
        <h1 className="text-36 text-green-8">
          <span className="text-green-4">彈指</span>之間
          <br />
          車位預約新體驗
        </h1>

        <p className="text-16">
          告別漫長的等待，盡情享受輕鬆預約停車位的流暢體驗。
          <span className="logo-text text-16">Parkoasis </span>
          的使命是在預約與實際停車之間實現極速匹配，讓您專注於更重要的事務。
        </p>

        <div className="flex gap-6">
          <Button variant="primary" className="gap-2">
            開始體驗 <ArrowRight />
          </Button>
          <Button variant="white" className="gap-2">
            <Wand2 /> 其他特色
          </Button>
        </div>
      </article>
    </section>
  );
};

export default Hero;
