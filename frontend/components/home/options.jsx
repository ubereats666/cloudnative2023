import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Options() {
  return (
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
  );
}
