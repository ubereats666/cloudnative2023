"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { getRemainSpaceColor } from "@/constants/function";
import useFetch from "@/hooks/useFetch";
import { cn } from "@/lib/utils";

const floor_name = { 1: "B2", 2: "B1", 3: "1F", 4: "2F" }

export default function RemainSpace() {
  const { data, isLoading, error } = useFetch("get_empty_parking_space");

  if (isLoading) {
    return (
      <Skeleton className="w-full h-14" />
    );
  }

  if (error) {
    return (
      <div className="bg-slate-200 rounded-xl font-normal h-14 w-full flex justify-center items-center">
        發生錯誤，請稍後再試
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-8">
      {data.map((space) => {
        return (
          <Button
            key={space.key}
            size="xs"
            variant="white"
            className="flex items-center justify-around rounded-2xl w-1/4"
          >
            <h2 className="text-24 text-t-title ">{floor_name[space.floor]}</h2>
            <div
              className={`flex flex-col ${getRemainSpaceColor(
                space.num_parking_space
              )}`}
            >
              <p className={cn("text-24")}>{space.num_parking_space}</p>
              <p className="text-12 text-t-subtitle">剩餘車位</p>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
