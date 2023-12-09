"use client";

import { Button } from "@/components/ui/button";
import { getRemainSpaceColor } from "@/constants/function";
import useFetch from "@/hooks/useFetch";
import { cn } from "@/lib/utils";

export default function RemainSpace() {
  const { data, isLoading, error } = useFetch("get_empty_parking_space");

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div className="flex-col flex-between w-full gap-4">
      <h1 className="w-full text-24">剩餘車位</h1>

      <div className="grid grid-cols-2 w-full gap-6">
        {data.map((space) => {
          return (
            <Button
              key={space.key}
              size="md"
              variant="white"
              className="flex items-start justify-between"
            >
              <h2 className="text-28 text-t-title">{space.floor}</h2>
              <div
                className={`flex flex-col grow ${getRemainSpaceColor(
                  space.num_parking_space
                )}`}
              >
                <p className={cn("text-48")}>{space.num_parking_space}</p>
                <p className="text-14 text-t-subtitle">剩餘車位</p>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
