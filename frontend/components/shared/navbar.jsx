"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, MenuIcon } from "lucide-react";

import { motion, useScroll, useTransform, easeInOut } from "framer-motion";
import Logo from "./logo";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";

const NAV_LINKS = [
  { key: "nav-about", label: "關於", variant: "ghost", href: "/" },
  { key: "nav-contact", label: "聯絡我們", variant: "ghost", href: "/" },
  { key: "nav-login", label: "登入", variant: "primary", href: "/login" },
];

const Navbar = () => {
  const [isUser, setIsUser] = useState(false);

  return (
    <nav className="fixed top-0 z-30 flex-between w-full px-8 py-6">
      <Logo />

      {isUser && (
        <Button size="full" variant="white" className="gap-4">
          <Avatar>
            <AvatarImage src="/images/login-cover.png" />
            <AvatarFallback>
              <Image
                src="/google.svg"
                width={0}
                height={0}
                alt="user photo"
                className="h-6 w-6"
              />
            </AvatarFallback>
          </Avatar>
          <p className="hidden md:inline text-t-paragraph text-20">
            User Profile
          </p>
          <ChevronDown color={"#484848"} size={24} />
        </Button>
      )}

      {!isUser && (
        <>
          <div className="hidden md:flex flex-row gap-8">
            {NAV_LINKS.map((navLink) => (
              <Button key={navLink.key} variant={navLink.variant}>
                <p>{navLink.label}</p>
              </Button>
            ))}
          </div>

          <Sheet className="hidden">
            <SheetTrigger asChild>
              <Button variant="ghost" size="square" className="md:hidden">
                <MenuIcon size={32} />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[240px]">
              <div className="relative top-20 flex-center items-center flex-col gap-8">
                {NAV_LINKS.map((navLink) => (
                  <Link key={navLink.key} href={navLink.href}>
                    <SheetClose asChild>
                      <motion.p
                        whileHover={{ scale: 1.05, color: "#FFFFFF" }}
                        whileTap={{ scale: 0.95 }}
                        className="text-20 text-t-primary"
                      >
                        {navLink.label}
                      </motion.p>
                    </SheetClose>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </nav>
  );
};

export default Navbar;
