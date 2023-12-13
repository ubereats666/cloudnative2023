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
    <div className="flex flex-row gap-8">
      {data.map((space) => {
        return (
          <Button
            key={space.key}
            size="xs"
            variant="white"
            className="flex grow items-center justify-around rounded-2xl"
          >
            <h2 className="text-24 text-t-title ">{space.floor}</h2>
            <div
              className={`flex flex-col ${getRemainSpaceColor(
                space.num_parking_space
              )}`}
            >
              <p className={cn("text-24")}>{space.num_parking_space}</p>
              <p className="text-12 text-t-subtitle">available</p>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
