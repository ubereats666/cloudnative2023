import Image from "next/image";
import Link from "next/link";
import QuickButton from "./QuickButton";

export default function Options() {
  return (
    <div className="flex-between w-full gap-6 md:gap-8 lg:gap-12">
      <QuickButton />

      <Link href="/reservation" className="home-options-button">
        <div className="gradient-section" />
        <p className="home-options-button-text">自訂停車</p>
        <Image
          src={"/home-preference-parking.png"}
          width={1440}
          height={0}
          className="home-options-image"
        />
      </Link>
    </div>
  );
}
