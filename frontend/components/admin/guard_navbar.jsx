"use client";

// import { useState } from "react";
import * as React from "react";
import { useState } from "react";
import { isValid, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MenuIcon } from "lucide-react";

// import { motion, useScroll, useTransform, easeInOut } from "framer-motion";
import Logo from "@/components/shared/logo";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = ({ date, setDate }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  // const [date, setDate] = React.useState(new Date());

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    if (isValid(selectedDate)) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      // console.log("Selected Date:", formattedDate);
    } else {
      console.error("Invalid date selected");
    }
  };

  return (
    <nav className="navbar">
      <Logo />

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-fit justify-center text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {isSignedIn && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="full" variant="white" className="gap-4">
              <Avatar>
                <AvatarImage src={user.imageUrl} />
                {/* "/images/login-cover.png" */}
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
                {user.fullName}
              </p>
              <ChevronDown color={"#484848"} size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>
              <Link href="/setting">個人設定</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutButton
                signOutCallback={() => {
                  router.replace("/");
                }}
              >
                登出
              </SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default Navbar;
