"use client";

import { useRef } from "react";
import { motion, useScroll, easeInOut, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { grechen_fuemen } from "@/lib/fonts";

const animationOrder = {
  initial: 0,
  backgroundFadeInStart: 0.05,
  backgroundFadeInEnd: 0.09,
  backgroundMoveToLeftStart: 0.13,
  backgroundMoveToLeftEnd: 0.18,
  titleFadeInStart: 0.13,
  titleFadeInEnd: 0.18,
  backgroundMoveToRightStart: 0.3,
  backgroundMoveToRightEnd: 0.35,
  content1FadeInStart: 0.3,
  content1FadeInEnd: 0.35,
  content2FadeInStart: 0.47,
  content2FadeInEnd: 0.52,
  content3FadeInStart: 0.64,
  content3FadeInEnd: 0.69,
  backgroundMoveToCenterStart: 0.81,
  backgroundMoveToCenterEnd: 0.88,
  footerFadeInStart: 0.9,
  footerFadeInEnd: 0.93,
  animationEnd: 1,
};

const Feature = () => {
  const targetRef = useRef();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [
      animationOrder.backgroundFadeInStart - 0.03,
      animationOrder.backgroundFadeInEnd - 0.03,
      animationOrder.backgroundMoveToCenterStart,
      animationOrder.backgroundMoveToCenterEnd,
    ],
    [0, 1, 1, 0]
  );

  const backgroundX = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.backgroundMoveToLeftStart,
      animationOrder.backgroundMoveToLeftEnd,
      animationOrder.backgroundMoveToRightStart,
      animationOrder.backgroundMoveToRightEnd,
      animationOrder.backgroundMoveToCenterStart,
      animationOrder.backgroundMoveToCenterEnd,
    ],
    ["-50%", "-50%", "-130%", "-130%", "30%", "30%", "-50%"],
    { ease: easeInOut }
  );

  const backgroundScale = useTransform(
    scrollYProgress,
    [
      animationOrder.backgroundFadeInStart,
      animationOrder.backgroundFadeInEnd,
      animationOrder.backgroundMoveToLeftStart,
      animationOrder.backgroundMoveToLeftEnd,
      animationOrder.backgroundMoveToCenterStart,
      animationOrder.backgroundMoveToCenterEnd,
    ],
    [0.5, 1, 1, 1.2, 1.2, 0.5],
    { ease: easeInOut }
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [
      animationOrder.titleFadeInStart,
      animationOrder.titleFadeInEnd,
      animationOrder.backgroundMoveToRightStart - 0.03,
      animationOrder.backgroundMoveToRightEnd - 0.03,
    ],
    [0, 1, 1, 0]
  );

  const content1Opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.content1FadeInStart,
      animationOrder.content1FadeInEnd,
      animationOrder.content2FadeInStart,
      animationOrder.content2FadeInEnd,
    ],
    [0, 0, 1, 1, 0]
  );

  const content1Y = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.content2FadeInStart,
      animationOrder.content2FadeInEnd,
    ],
    ["-50%", "-50%", "-150%"],
    { ease: easeInOut }
  );

  const content2Opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.content2FadeInStart,
      animationOrder.content2FadeInEnd,
      animationOrder.content3FadeInStart,
      animationOrder.content3FadeInEnd,
    ],
    [0, 1, 1, 0]
  );

  const content2Y = useTransform(
    scrollYProgress,
    [
      animationOrder.content2FadeInStart,
      animationOrder.content2FadeInEnd,
      animationOrder.content3FadeInStart,
      animationOrder.content3FadeInEnd,
    ],
    ["150%", "-50%", "-50%", "-150%"],
    { ease: easeInOut }
  );

  const content3Opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.content3FadeInStart,
      animationOrder.content3FadeInEnd,
      animationOrder.backgroundMoveToCenterStart,
      animationOrder.backgroundMoveToCenterEnd,
    ],
    [0, 1, 1, 0]
  );

  const content3Y = useTransform(
    scrollYProgress,
    [animationOrder.content3FadeInStart, animationOrder.content3FadeInEnd],
    ["150%", "-50%"],
    { ease: easeInOut }
  );

  const footerOpacity = useTransform(
    scrollYProgress,
    [animationOrder.footerFadeInStart, animationOrder.footerFadeInEnd],
    [0, 1]
  );

  const footerScale = useTransform(
    scrollYProgress,
    [
      animationOrder.footerFadeInStart,
      animationOrder.footerFadeInEnd,
      animationOrder.animationEnd,
    ],
    [1.2, 1.08, 1]
  );

  const footerY = useTransform(
    scrollYProgress,
    [
      animationOrder.footerFadeInStart,
      animationOrder.footerFadeInEnd,
      animationOrder.animationEnd,
    ],
    ["50%", "30%", "20%"]
  );

  const footerTextY = useTransform(
    scrollYProgress,
    [animationOrder.footerFadeInStart, animationOrder.footerFadeInEnd],
    ["-50%", "0%"]
  );

  return (
    <section>
      <div ref={targetRef} className="relative h-[600vh]">
        <motion.img
          style={{
            opacity: backgroundOpacity,
            x: backgroundX,
            y: "-50%",
            scale: backgroundScale,
          }}
          src="/landing-feature.png"
          alt="background"
          className="fixed top-1/2 left-1/2 w-[32vw] h-auto object-cover z-10"
        />

        <motion.h1
          style={{ opacity: titleOpacity, y: "-50%" }}
          className="fixed top-1/2 left-1/2 text-32 lg:text-48"
        >
          立即使用
          <span className="logo-text text-32 lg:text-48"> Parkoasis </span>{" "}
          <br />
          量身打造您的停車體驗！
        </motion.h1>

        {/* Feature 1 */}
        <motion.div
          style={{ opacity: content1Opacity, y: content1Y }}
          className="fixed top-1/2 right-1/2 w-[32vw] flex flex-col gap-6"
        >
          <h2 className="text-24 lg:text-36 text-green-9">Your Time</h2>
          <p className="text-16 lg:text-24">
            <span className="logo-text text-16 lg:text-24"> Parkoasis </span>
            提供即時停車位預約的便利體驗。僅需點擊幾下，即可輕鬆地保留您的停車位，為您省下大量時間。
          </p>
          <Button variant="primary" className="gap-2 w-fit">
            開始體驗 <ArrowRight size={20} />
          </Button>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          style={{ opacity: content2Opacity, y: content2Y }}
          className="fixed top-1/2 right-1/2 w-[32vw] flex flex-col gap-6"
        >
          <h2 className="text-24 lg:text-36 text-green-9">Your Space</h2>
          <p className="text-16 lg:text-24">
            使用<span className="logo-text text-16 lg:text-24">Parkoasis </span>
            定制專屬於您的停車體驗。自定義您偏好的停車位，確保提供個性化且舒適的停車解決方案。
          </p>
          <Button variant="primary" className="gap-2 w-fit">
            開始體驗 <ArrowRight size={20} />
          </Button>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          style={{ opacity: content3Opacity, y: content3Y }}
          className="fixed top-1/2 right-1/2 w-[32vw] flex flex-col gap-6"
        >
          <h2 className="text-24 lg:text-36 text-green-9">Your Parkoasis</h2>
          <p className="text-16 lg:text-24">
            探索您在
            <span className="logo-text text-16 lg:text-24">Parkoasis </span>
            的停車之旅。存取詳盡的停車歷史記錄，為您提供過去預約的有價值見解。
          </p>
          <Button variant="primary" className="gap-2 w-fit">
            開始體驗 <ArrowRight size={20} />
          </Button>
        </motion.div>

        {/* Footer Image */}
        <motion.img
          style={{ opacity: footerOpacity, y: footerY, scale: footerScale }}
          src="/landing-oasis.png"
          alt="background"
          className="fixed bottom-0 w-full h-auto object-cover z-10"
        />

        {/* Footer Text */}
        <motion.div
          style={{ opacity: footerOpacity, y: footerTextY, x: "-50%" }}
          className="fixed flex-center flex-col top-[16vh] left-1/2"
        >
          <h1
            className={`${grechen_fuemen.className} logo-text text-[3rem] md:text-[6rem] lg:text-[8rem]`}
          >
            Parkoasis
          </h1>
          <h2 className="text-24 lg:text-36 text-green-9">
            即刻開啟您的停車旅程！
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature;
