import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import RemainSpace from "@/components/home/remain-space";

export default function Home() {
  return (
    <section className="relative flex w-full">
      <div className="flex-col flex-between grow px-8 pt-24 pb-16 gap-8 md:gap-12">
        <div className="flex flex-col gap-8 w-full md:flex-row md:grow">
          <div
            className={cn(
              "relative flex-center w-full aspect-[2] bg-green-1 overflow-hidden rounded-2xl",
              "md:aspect-[0]"
            )}
          >
            <Image
              src={"/IMG_6677.jpg"}
              width={1920}
              height={0}
              className="absolute -top-8 w-full object-top"
            />
            <h1 className="z-10">早安</h1>
          </div>

          <div className="flex-between w-full gap-6">
            <Link
              href="/reservation"
              className={cn(
                "relative flex-center w-full aspect-[2] bg-white overflow-hidden shadow-md rounded-lg",
                "md:aspect-[0] md:h-full"
              )}
            >
              <Image
                src={"/IMG_6679.jpg"}
                width={1920}
                height={0}
                className="absolute -top-4 w-full object-top"
              />
              <p className=" z-10">快速停車</p>
            </Link>

            <Link
              href="/reservation"
              className={cn(
                "relative flex-center w-full aspect-[2] bg-white overflow-hidden shadow-md rounded-lg",
                "md:aspect-[0] md:h-full"
              )}
            >
              <Image
                src={"/IMG_6680.jpg"}
                width={1920}
                height={0}
                className="absolute -top-4 w-full object-top"
              />
              <p className=" z-10">自訂停車</p>
            </Link>
          </div>
        </div>

        <RemainSpace />
      </div>
    </section>
  );
}
