import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import RemainSpace from "@/components/home/remain-space";
import Options from "@/components/home/options";

export default function Home() {
  return (
    <section className="relative flex w-full">
      <div className="flex-col flex-between w-full px-8 pt-24 pb-16 gap-8 md:gap-12">
        <div className="flex flex-col gap-6 w-full">
          <div
            className={cn(
              "relative flex-center w-full aspect-[2] bg-green-1 overflow-hidden rounded-lg"
            )}
          >
            <Image
              src={"/IMG_6677.jpg"}
              width={1920}
              height={0}
              className="absolute -top-8 w-full object-top"
            />
            <h1 className="text-32 text-t-title text-center z-10 ">
              早安！ <br />
              準備好開啟新的一天了嗎？
            </h1>
          </div>

          <Options />
        </div>

        <RemainSpace />
      </div>
    </section>
  );
}
