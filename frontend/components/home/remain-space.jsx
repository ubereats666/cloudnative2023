"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { getRemainSpaceColor } from "@/constants/function";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { FLOOR_LIST } from "@/constants";
import { Skeleton } from "../ui/skeleton";

const RemainSpaceSkeleton = () => {
  return <Skeleton className="h-40 w-full rounded-3xl" />;
};

const RemainSpaceButton = ({ space, index }) => {
  return (
    <Button
      key={space.key}
      variant="white"
      className="flex items-start justify-center w-full px-3 py-6 gap-6 rounded-3xl"
    >
      <h2 className="text-20 lg:text-40 text-t-title">{FLOOR_LIST[index]}</h2>
      <div className="flex-center flex-col">
        <p
          className={`flex flex-col text-36 lg:text-64
                     ${getRemainSpaceColor(space.num_parking_space)}`}
        >
          {space.num_parking_space}
        </p>
        <p className="text-14 lg:text-20 text-t-subtitle">剩餘車位</p>
      </div>
    </Button>
  );
};

export default function RemainSpace() {
  const { isLoaded, userId } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  const { data, isLoading, error } = useFetch("get_empty_parking_space", {
    userId: userId,
  });

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div className="flex-between w-full gap-24">
      <Image
        src={"/home-car.png"}
        width={1440}
        height={0}
        alt="bg"
        className="hidden sm:block h-[200px] w-auto"
      />

      <div className="flex-col flex-between grow gap-4">
        <h1 className="w-full text-20 md:text-24 lg:text-28">剩餘車位</h1>

        <div className="grid grid-cols-2 w-full gap-4 md:gap-6 lg:grid-cols-4 lg:gap-12">
          {isLoading &&
            FLOOR_LIST.map((floor) => {
              return <RemainSpaceSkeleton key={floor} />;
            })}
          {!isLoading &&
            data.map((space, index) => {
              return (
                <RemainSpaceButton
                  key={space.key}
                  space={space}
                  index={index}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
