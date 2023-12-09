'use client'

import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import Image from 'next/image';
import StaticGraph from "./staticGraph";

import useFetch from "@/hooks/useFetch";

const ReserveInfo = () => {
  const [remainingTime, setRemainingTime] = useState(undefined)
  // const [remainingTime, setRemainingTime] = useState(30 * 60)


  const { data, isLoading, error } = useFetch("get_reserve_info");

  useEffect(() => {
    if (data && data.expire_time) {
      const expireTime = new Date(data.expire_time);
      const currentTime = new Date();
      const diff = expireTime - currentTime;
      if (diff > 0) {
        const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((diff % (60 * 1000)) / 1000);
        setRemainingTime(minutes * 60 + seconds);
      } else {
        setRemainingTime(0)
      }
    }
  }, [data]);


  if (isLoading) {
    return (
      <div className="pt-28 lg:pt-32 px-8 lg:px-16 pb-8 w-screen h-screen">
        <Skeleton className="w-full h-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-28 lg:pt-32 px-8 lg:px-16 pb-8 w-screen h-screen">
        <div className="bg-slate-200 rounded-3xl text-20 font-normal h-full w-full flex justify-center items-center">
          發生錯誤，請稍後再試
        </div>
      </div>
    );
  }

  if (remainingTime > 0) {
    return (
      <div className="flex flex-col-reverse gap-y-5 lg:flex-row w-screen h-fit lg:gap-x-16 pt-28 lg:pt-32 px-8 lg:px-16 pb-8">
        <div className="flex-col gap-y-5">
          <h2 className="text-24 p-3">我的預約</h2>
          <Card variant="reservation" className="w-full">
            <CardContent className="flex justify-center">
              <CountdownCircleTimer
                isPlaying
                duration={30 * 60}
                initialRemainingTime={remainingTime}
                colors={"#278E0E"}
                onComplete={() => setRemainingTime(0)}    // TODO: delete reservation
              >
                {({ remainingTime }) => {
                  const minutes = Math.floor(remainingTime / 60)
                  const seconds = remainingTime % 60

                  return (
                    <div className="flex flex-col items-center text-20 font-normal">
                      <p>剩餘時間</p>
                      <p>{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</p>
                    </div>
                  )
                }}
              </CountdownCircleTimer>
            </CardContent>
            <CardFooter className="flex text-20 font-normal items-start justify-between">
              <p>樓層: {data.floor}</p>
              <p>車位: {data.number}</p>
            </CardFooter>
          </Card>
          <div className="flex justify-center px-9 py-6 w-full">
            <Button
              variant="setting"
              size="none"
            // onClick={() => router.back()} // TODO: delete reservation
            >
              <p className="text-20">取消預約</p>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-start">
          <StaticGraph number={data.number}></StaticGraph>
        </div>
      </div>
    )
  }
  else if (remainingTime === 0) {
    return (
      <div className="pt-28 lg:pt-32 px-8 lg:px-16 pb-8 w-screen h-screen">
        <div className="bg-slate-200 rounded-3xl text-20 font-normal h-full w-full flex justify-center items-center">
          您的預約已逾期，請重新選擇車位
        </div>
      </div>
    )
  } else {
    return (
      <div className="pt-28 lg:pt-32 px-8 lg:px-16 pb-8 w-screen h-screen">
        <div className="bg-slate-200 rounded-3xl text-20 font-normal h-full w-full flex justify-center items-center">
          發生錯誤，請稍後再試
        </div>
      </div>
    )
  }
}

export default ReserveInfo;