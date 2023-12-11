"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, MenuIcon } from "lucide-react";

import { motion } from "framer-motion";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import Logo from "../shared/logo";

const LandingNavbar = () => {
  const [isUser, setIsUser] = useState(false);

  const opacityVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.nav
      variants={opacityVariant}
      initial="hidden"
      animate="visible"
      transition={{ duration: 2, delay: 2 }}
      className="fixed top-0 z-30 flex-between w-full px-12 py-6"
    >
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
              <Link key={navLink.key} href={navLink.href}>
                <Button variant={navLink.variant}>
                  <p>{navLink.label}</p>
                </Button>
              </Link>
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
                      <p className="text-20 text-t-primary">{navLink.label}</p>
                    </SheetClose>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </motion.nav>
  );
};

export default LandingNavbar;
