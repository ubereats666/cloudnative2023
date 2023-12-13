"use client";

import { Button } from "@/components/ui/button";
import { getRemainSpaceColor } from "@/constants/function";
import useFetch from "@/hooks/useFetch";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function RemainSpace() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  const { data, isLoading, error } = useFetch("get_empty_parking_space", {
    userId: userId,
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

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
          {data.map((space) => {
            return (
              <Button
                key={space.key}
                variant="white"
                className="flex items-start justify-center w-full px-3 py-2 gap-2"
              >
                <h2 className="text-20 lg:text-28 text-t-title">
                  {space.floor}
                </h2>
                <div className="flex-center flex-col">
                  <p
                    className={`flex flex-col text-36 lg:text-48
                     ${getRemainSpaceColor(space.num_parking_space)}`}
                  >
                    {space.num_parking_space}
                  </p>
                  <p className="text-14 text-t-subtitle">剩餘車位</p>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
