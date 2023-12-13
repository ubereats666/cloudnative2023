import Image from "next/image";
import Link from "next/link";

export default function Options() {
  return (
    <div className="flex-between w-full gap-6 md:gap-8 lg:gap-12">
      <Link href="/reservation" className="home-options-button">
        <div className="gradient-section" />
        <p className="home-options-button-text">快速停車</p>
        <Image
          src={"/home-quick-parking.png"}
          width={1440}
          height={0}
          className="home-options-image"
        />
      </Link>

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
