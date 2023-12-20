"use client";

import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import StaticGraph from "./staticGraph";

import useFetchReserveInfo from "./useFetchReserveInfo";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";

import deleteRecord from "./deleteRecord";

const floor_name = { 1: "B2", 2: "B1", 3: "1F", 4: "2F" };

const ReserveInfo = () => {
  const [remainingTime, setRemainingTime] = useState(undefined);
  const [isCanceling, setIsCanceling] = useState(false);
  // const [remainingTime, setRemainingTime] = useState(30 * 60)

  const { toast } = useToast();
  const router = useRouter();
  const { userId } = useAuth();

  const {
    isLoading: isReserveInfoLoading,
    error,
    floor,
    number,
    expireTime,
  } = useFetchReserveInfo();

  useEffect(() => {
    if (floor && number && expireTime) {
      const currentTime = new Date();
      const diff = new Date(expireTime) - currentTime;

      if (diff > 0) {
        const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((diff % (60 * 1000)) / 1000);
        setRemainingTime(minutes * 60 + seconds);
      } else {
        setRemainingTime(0);
      }
    }
  }, [floor, number, expireTime]);

  if (error) {
    return (
      <div className="pt-28 lg:pt-32 px-8 lg:px-16 pb-8 w-screen h-screen">
        <div className="bg-slate-200 rounded-3xl text-20 font-normal h-full w-full flex justify-center items-center">
          發生錯誤，請稍後再試
        </div>
      </div>
    );
  }

  const onCancel = async () => {
    // delete reservation
    setIsCanceling(true);
    const { isSuccess } = await deleteRecord({ userId });

    if (isSuccess) {
      toast({
        description: "您的預約已取消",
      });
      router.replace("/home");
    } else {
      toast({
        variant: "destructive",
        description: "發生錯誤，請稍後再試",
      });
    }

    setIsCanceling(false);
  };

  const onComplete = async () => {
    setRemainingTime(0);
    // delete reservation
    const { isSuccess } = await deleteRecord({ userId });

    if (isSuccess) {
      toast({
        description: "預約逾期，已為您取消",
      });
      router.replace("/home");
    }
  };

  if (!isReserveInfoLoading && !remainingTime) {
    return (
      <div className="pt-28 lg:pt-32 px-8 lg:px-16 pb-8 w-screen h-screen">
        <div className="bg-slate-200 rounded-3xl text-20 font-normal h-full w-full flex justify-center items-center">
          尚無預約
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-y-5 lg:flex-row w-screen h-fit lg:gap-x-16 pt-28 lg:pt-32 px-8 lg:px-16 pb-8">
      <div className="flex-col gap-y-5">
        <h2 className="text-24 p-3">
          {isReserveInfoLoading ? "正在載入您的預約..." : "我的預約"}
        </h2>
        {isReserveInfoLoading && (
          <Skeleton className="w-[320px] h-[320px] rounded-2xl" />
        )}
        {!isReserveInfoLoading && remainingTime > 0 && (
          <Card variant="reservation" className="w-full">
            <CardContent className="flex justify-center">
              <CountdownCircleTimer
                isPlaying
                duration={30 * 60}
                initialRemainingTime={remainingTime}
                colors={"#278E0E"}
                onComplete={onComplete}
              >
                {({ remainingTime }) => {
                  const minutes = Math.floor(remainingTime / 60);
                  const seconds = remainingTime % 60;

                  return (
                    <div className="flex flex-col items-center text-20 font-normal">
                      <p>剩餘時間</p>
                      <p>{`${String(minutes).padStart(2, "0")}:${String(
                        seconds
                      ).padStart(2, "0")}`}</p>
                    </div>
                  );
                }}
              </CountdownCircleTimer>
            </CardContent>
            <CardFooter className="flex text-20 font-normal justify-center">
              <p>車位編號: {floor_name[floor] + number.padStart(2, "0")}</p>
            </CardFooter>
          </Card>
        )}
        {!isReserveInfoLoading && remainingTime === 0 && (
          <div className="bg-slate-200 rounded-3xl text-20 font-normal h-full w-full flex justify-center items-center">
            您的預約已逾期，請重新選擇車位
          </div>
        )}
        <div className="flex justify-center px-9 py-6 w-full">
          <Button
            variant="setting"
            size="none"
            disabled={isReserveInfoLoading || isCanceling}
            onClick={onCancel}
          >
            <p className="text-20">取消預約</p>
          </Button>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-start">
        {isReserveInfoLoading && (
          <Skeleton className="w-full h-[560px] rounded-2xl" />
        )}
        {!isReserveInfoLoading && (
          <StaticGraph floor={floor} number={number}></StaticGraph>
        )}
      </div>
    </div>
  );
};

export default ReserveInfo;
