import Image from "next/image";
import Options from "@/components/home/options";
import RemainSpace from "@/components/home/remain-space";

import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function Home() {
  const isUser = true;

  if (!isUser) {
    redirect("/login");
  }

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
              "relative flex-center w-full h-[180px] overflow-hidden",
              "md:rounded-[32px] md:h-full md:w-full"
            )}
          >
            <div className="gradient-section" />
            <Image
              src={"/home-welcome.png"}
              width={1440}
              height={0}
              alt="welcome"
              className="absolute top-4 w-full h-auto"
            />
            <h1 className="text-32 text-t-title text-center z-10 ">
              早安！ <br />
              準備好開啟新的一天了嗎？
            </h1>
          </div>

          <Options />
        </div>

        <RemainSpace />

        {/* <Image
          src={"/oasis.png"}
          width={1440}
          height={0}
          alt="welcome"
          className="fixed bottom-0 translate-y-24 w-full h-auto -z-30"
        /> */}
      </div>
    </section>
  );
}
