import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <section className="full-screen-container">
      <Image
        src={"/city.jpg"}
        width={1400}
        height={0}
        alt="cover"
        className="w-full "
      />
    </section>
  );
}
