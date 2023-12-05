import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "./logo";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-30 flex-between w-full px-8 py-6">
      <Logo />
      <Button size="full" variant="white" className="gap-4">
        <Avatar>
          <AvatarImage src="/images/login-cover.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-t-paragraph text-20">User Profile</p>
        <ChevronDown color={"#484848"} size={24} />
      </Button>
    </nav>
  );
};

export default Navbar;
