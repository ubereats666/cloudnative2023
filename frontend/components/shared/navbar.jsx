"use client";

import { useUser } from "@clerk/nextjs";
import Logo from "./logo";
import UserDropdown from "./user-dropdown";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="navbar">
      <Logo />

      {isSignedIn && <UserDropdown />}
    </nav>
  );
};

export default Navbar;
