import Image from "next/image";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

import Logo from "./logo";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-30 flex-between w-full px-8 py-6">
      <Logo />

      <Button size="full" variant="white" className="gap-4">
        <Avatar>
          <AvatarImage src="/images/login-cover.png" />
          <AvatarFallback>
            <Image
              src="/google.svg"
              width={0}
              height={0}
              alt="user photo"
              objectFit="contain"
              className="h-6 w-6"
            />
          </AvatarFallback>
        </Avatar>
        <p className="hidden md:inline text-t-paragraph text-20">
          User Profile
        </p>
        <ChevronDown color={"#484848"} size={24} />
      </Button>
    </nav>
  );
};

export default Navbar;
