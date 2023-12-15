"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";
import Form from "./form";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useFetchSetting from "./useFetchSetting";

const Setting = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    isLoading: isUserSettingLoading,
    error,
    userId,
    plate,
    floor,
    setPlate,
    setFloor,
  } = useFetchSetting();

  if (isUserSettingLoading) {
    return (
      <div className="pt-28 lg:pt-32 px-8 lg:px-16 pb-8 w-screen h-screen">
        <Skeleton className="w-full h-full" />
      </div>
    );
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

  return (
    <div className="flex flex-col-reverse gap-y-5 lg:flex-row w-screen h-fit lg:gap-x-16 pt-28 lg:pt-32 px-8 lg:px-16 pb-8">
      <Form
        userId={userId}
        plate={plate}
        floor={floor}
        setPlate={setPlate}
        setFloor={setFloor}
        toast={toast}
        router={router}
      />
      <div className="flex flex-1 justify-center items-start">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/images/setting.png"
            fill={true}
            alt="Image"
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default Setting;
