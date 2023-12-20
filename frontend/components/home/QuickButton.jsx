"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";

import quickReserve from "./quickReserve";

const QuickButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const { userId } = useAuth();

  const onClick = async () => {
    setIsLoading(true);

    const { isSuccess } = await quickReserve({ userId });

    if (isSuccess) {
      toast({
        description: "預約成功",
      });
      router.replace("/reserve-info");
    } else {
      toast({
        variant: "destructive",
        description: "發生錯誤，請稍候再試",
      });
    }

    setIsLoading(false);
  };

  return (
    <Button
      asChild
      variant="transparent"
      size="none"
      className="items-start cursor-pointer hover:scale-105 transition-transform"
      onClick={onClick}
    >
      {isLoading ? (
        <Skeleton className="w-full h-full home-options-button px-0 rounded-2xl md:rounded-[32px]">
          <div className="gradient-section" />
          <div className="flex items-center flex-col">
            <h2 className="home-options-button-text">快速停車</h2>
            <h3 className="home-options-button-subtitle">
              正在為您匹配車位...
            </h3>
          </div>
          <Image
            src={"/home-quick-parking.png"}
            width={1440}
            height={0}
            alt="image"
            priority
            className="home-options-image"
          />
        </Skeleton>
      ) : (
        <div className="home-options-button">
          <div className="gradient-section" />
          <div className="flex items-center flex-col">
            <h2 className="home-options-button-text">快速停車</h2>
            <h3 className="home-options-button-subtitle">Quick Reservation</h3>
          </div>
          <Image
            src={"/home-quick-parking.png"}
            width={1440}
            height={0}
            alt="image"
            priority
            className="home-options-image"
          />
        </div>
      )}
    </Button>
  );
};

export default QuickButton;
