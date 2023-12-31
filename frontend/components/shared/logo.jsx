import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/home" className="flex items-center">
      <Image
        src="./logo.svg"
        className="w-6 h-6 sm:w-8 sm:h-8"
        width={32}
        height={32}
        alt="Logo"
      />
      <h1 className="logo-text">Parkoasis</h1>
    </Link>
  );
};

export default Logo;
