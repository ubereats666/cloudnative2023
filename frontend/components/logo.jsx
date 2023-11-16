import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex-start flex-row items-center">
      <Image
        src="./logo.svg"
        className="w-6 h-6 sm:w-8 sm:h-8"
        width={32}
        height={32}
        alt="Logo"
      />
      <h1 className="logo-text">Parkoasis</h1>
    </div>
  );
};

export default Logo;
