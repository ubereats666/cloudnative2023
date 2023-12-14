"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, MenuIcon, UserCog } from "lucide-react";

import { SignOutButton, useUser } from "@clerk/nextjs";

const UserDropdown = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="full" variant="white" className="gap-4">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
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
            {isLoaded ? user?.fullName : "..."}
          </p>
          <ChevronDown color={"#484848"} size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem>
          <Link href="/setting" className="w-full">
            <Button
              variant="transparent"
              size="none"
              textSize="sm"
              className="w-full justify-start gap-2"
            >
              <UserCog size={16} />
              個人設定
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton
            signOutCallback={() => {
              router.replace("/");
            }}
          >
            <Button
              variant="transparent"
              size="none"
              textSize="sm"
              className="w-full justify-start gap-2"
            >
              <LogOut size={16} />
              登出
            </Button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
