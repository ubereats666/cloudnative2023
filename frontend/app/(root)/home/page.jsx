import Image from "next/image";
import Options from "@/components/home/options";
import RemainSpace from "@/components/home/remain-space";

import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className="full-screen-container">
      <div className="flex-col flex-between w-full h-full px-12 pt-28 pb-16 gap-8 md:gap-10">
        {/* Welcome & Options */}
        <div
          className={cn(
            "flex flex-col gap-6 w-full",
            "md:h-full md:flex-row md:gap-8",
            "lg:gap-12 d"
          )}
        >
          {/* Welcome */}
          <div
            className={cn(
              "relative flex justify-center items-start w-full h-[180px] overflow-hidden",
              "md:rounded-[32px] md:h-full md:w-full md:py-28"
            )}
          >
            <div className="gradient-section" />
            <Image
              src={"/home-welcome.png"}
              width={1440}
              height={0}
              alt="welcome"
              priority={true}
              className="absolute bottom-0 w-full h-auto"
            />
            <h1 className="text-48 text-t-title text-center z-10 ">
              在<span className="logo-text text-48"> Parkoasis </span>
              <br />
              開啟新的一天！
            </h1>
          </div>

          <Options />
        </div>

        <RemainSpace />
      </div>
    </section>
  );
}
