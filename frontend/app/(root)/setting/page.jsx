'use client'

import React, { useState, useEffect } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

import Image from 'next/image';

import Form from "./form";

import useFetch from '@/hooks/useFetch'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"


const Setting = () => {
  const [plate, setPlate] = useState("")
  const [floor, setFloor] = useState("2F")

  const { toast } = useToast();
  const router = useRouter();

  const { data, isLoading, error } = useFetch("get_user_info");

  useEffect(() => {
    if (data) {
      setPlate(data.plate)
      setFloor(data.preference_floor)
    }
  }, [data])

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
    )
  }

  return (
    <div className="flex flex-col-reverse gap-y-5 lg:flex-row w-screen h-fit lg:gap-x-16 pt-28 lg:pt-32 px-8 lg:px-16 pb-8">
      <Form
        plate={plate}
        floor={floor}
        setPlate={setPlate}
        setFloor={setFloor}
        toast={toast}
        router={router}
      />
      <div className="flex flex-1 justify-center items-start">
        <AspectRatio ratio={16 / 9}>
          <Image src="/images/setting.png" fill={true} alt="Image" className="rounded-md object-cover" />
        </AspectRatio>
      </div>
    </div>
  );
};

export default Setting;
