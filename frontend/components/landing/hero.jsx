"use client";

import { useRef } from "react";
import { ArrowRight, Wand2 } from "lucide-react";
import { Button } from "../ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { grechen_fuemen } from "@/lib/fonts";

const animationOrder = {
  initial: 0,
  logoFadeOutStart: 0.3,
  logoFadeOutEnd: 0.5,
  backgroundFadeOutStart: 0.55,
  backgroundFadeOutEnd: 0.6,
  contentFadeInStart: 0.64,
  contentFadeInEnd: 0.7,
  contentFadeOutStart: 0.9,
  animationEnd: 0.96,
};

const Hero = () => {
  const targetRef = useRef();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const backgroundImageY = useTransform(
    scrollYProgress,
    [
      animationOrder.logoFadeOutStart,
      animationOrder.backgroundFadeOutStart,
      animationOrder.backgroundFadeOutEnd,
    ],
    ["4rem", "8rem", "16rem"]
  );

  const backgroundImageOpacity = useTransform(
    scrollYProgress,
    [
      animationOrder.backgroundFadeOutStart + 0.04,
      animationOrder.backgroundFadeOutEnd,
    ],
    [1, 0]
  );

  const backgroundScale = useTransform(
    scrollYProgress,
    [
      animationOrder.backgroundFadeOutStart,
      animationOrder.backgroundFadeOutEnd,
    ],
    [1, 1.5]
  );

  const TitleOpacity = useTransform(
    scrollYProgress,
    [animationOrder.logoFadeOutStart, 0.5],
    [1, 0]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [
      animationOrder.contentFadeInStart,
      animationOrder.contentFadeInEnd,
      animationOrder.contentFadeOutStart,
      animationOrder.animationEnd,
    ],
    [0, 1, 1, 0]
  );

  const contentTitleOpacity = useTransform(
    scrollYProgress,
    [
      animationOrder.contentFadeInStart + 0.03,
      animationOrder.contentFadeInStart + 0.05,
      animationOrder.contentFadeOutStart,
      animationOrder.animationEnd,
    ],
    [0, 1, 1, 0]
  );

  const contentParagraphOpacity = useTransform(
    scrollYProgress,
    [
      animationOrder.contentFadeInStart + 0.06,
      animationOrder.contentFadeInStart + 0.08,
      animationOrder.contentFadeOutStart,
      animationOrder.animationEnd,
    ],
    [0, 1, 1, 0]
  );

  const contentButtonOpacity = useTransform(
    scrollYProgress,
    [
      animationOrder.contentFadeInStart + 0.1,
      animationOrder.contentFadeInStart + 0.12,
      animationOrder.contentFadeOutStart,
      animationOrder.animationEnd,
    ],
    [0, 1, 1, 0]
  );

  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed"
  );

  return (
    <section>
      <div ref={targetRef} className="h-[600vh]">
        <motion.img
          style={{
            y: backgroundImageY,
            scale: backgroundScale,
            opacity: backgroundImageOpacity,
          }}
          src="/oasis.png"
          alt="background"
          className="fixed bottom-0 h-auto w-full object-cover -z-10"
        />

        <motion.div
          style={{ position }}
          className="fixed top-[36vh] w-full flex-center -z-20"
        >
          <motion.h1
            style={{ position, opacity: TitleOpacity }}
            className={`${grechen_fuemen.className} logo-text text-[3rem] md:text-[6rem] lg:text-[8rem]`}
          >
            Parkoasis
          </motion.h1>
        </motion.div>

        <motion.img
          style={{ position, opacity: contentOpacity, y: "-50%" }}
          src="/landing-car.png"
          alt="background"
          className="fixed left-[8vw] top-1/2 h-auto w-[36vw] object-cover -z-10"
        />

        <motion.article
          style={{ position, y: "-50%" }}
          className="fixed right-[8vw] top-1/2 w-[36vw] flex flex-col gap-8"
        >
          <motion.h1
            style={{ opacity: contentTitleOpacity }}
            className="text-36 lg:text-48 text-green-8"
          >
            <span className="text-green-4">彈指</span>之間
            <br />
            車位預約新體驗
          </motion.h1>

          <motion.p
            style={{ opacity: contentParagraphOpacity }}
            className="text-16 lg:text-24"
          >
            告別漫長的等待，盡情享受輕鬆預約停車位的流暢體驗。
            <span className="logo-text text-16 lg:text-24">Parkoasis </span>
            的使命是在預約與實際停車之間實現極速匹配，讓您專注於更重要的事務。
          </motion.p>

          <motion.div
            style={{ opacity: contentButtonOpacity }}
            className="flex gap-6 lg:gap-10"
          >
            <Button variant="primary" className="gap-2">
              開始體驗 <ArrowRight size={20} />
            </Button>
            <Button variant="white" className="gap-2">
              <Wand2 size={20} /> 其他特色
            </Button>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Hero;
