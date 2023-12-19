import Image from "next/image";
import Link from "next/link";
import QuickButton from "./QuickButton";

export default function Options() {
  return (
    <div className="flex-between w-full gap-6 md:gap-8 lg:gap-12">
      <QuickButton />

      <Link href="/reservation" className="home-options-button">
        <div className="gradient-section" />
        <div className="flex items-center flex-col">
          <h2 className="home-options-button-text">自訂停車</h2>
          <h3 className="home-options-button-subtitle">Custom Reservation</h3>
        </div>
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
