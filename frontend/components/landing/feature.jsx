import Image from "next/image";
import React from "react";

const Feature = () => {
  return (
    <section className="flex flex-col gap-12 py-16 px-12">
      <h1 className="text-32">
        使用<span className="logo-text text-32"> Parkoasis </span> <br />
        量身打造您的停車體驗
      </h1>
      <div className="flex flex-col gap-12">
        <div className="flex gap-6">
          <Image
            src={"/your-time.png"}
            width={1920}
            height={0}
            alt="your-time"
            className="w-36 h-36 rounded-3xl"
          />
          <div className="flex flex-col justify-between h-full">
            <h2 className="text-24 text-green-9">Your Time</h2>
            <p className="text-16">
              <span className="logo-text text-16">Parkoasis </span>
              提供即時停車位預約的便利體驗。僅需點擊幾下，即可輕鬆地保留您的停車位，為您省下大量時間。
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col justify-between h-full">
            <h2 className="text-24 text-green-9">Your Space</h2>
            <p className="text-16">
              使用<span className="logo-text text-16"> Parkoasis </span>
              定制專屬於您的停車體驗。自定義您偏好的停車位，確保提供個性化且舒適的停車解決方案
            </p>
          </div>
          <Image
            src={"/your-space.png"}
            width={1920}
            height={0}
            alt="your-space"
            className="w-36 h-36 rounded-3xl"
          />
        </div>

        <div className="flex gap-6">
          <Image
            src={"/your-parkoasis.png"}
            width={1920}
            height={0}
            alt="your-parkoasis"
            className="w-36 h-36 rounded-3xl"
          />
          <div className="flex flex-col justify-between h-full">
            <h2 className="text-24 text-green-9">
              Your <span className="logo-text text-24">Parkoasis</span>
            </h2>
            <p className="text-16">
              探索您在<span className="logo-text text-16">Parkoasis </span>
              的停車之旅。存取詳盡的停車歷史記錄，為您提供過去預約的有價值見解。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
