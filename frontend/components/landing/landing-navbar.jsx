"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Logo from "@/components/shared/logo";
import { NAV_LINKS } from "@/constants";
import { Home, MenuIcon } from "lucide-react";

const LandingNavbar = () => {
  const { isSignedIn } = useUser();

  const opacityVariant = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.nav
      variants={opacityVariant}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.2, delay: 1 }}
      className="navbar"
    >
      <Logo />

      {isSignedIn && (
        <div className="flex gap-6">
          <Link href={"/home"}>
            <Button variant="primary" className="gap-2">
              <Home size={20} /> 我的首頁
            </Button>
          </Link>
          <SignOutButton>
            <Button variant="ghost">
              <p>登出</p>
            </Button>
          </SignOutButton>
        </div>
      )}

      {!isSignedIn && (
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
