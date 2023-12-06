"use client";

import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, error } = useFetch("get_empty_parking_space");

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <section className="relative flex w-full">
      <div className="flex-col flex-between grow px-8 pt-24 pb-16 gap-8 md:gap-12">
        <div className="flex flex-col gap-8 w-full md:flex-row md:grow">
          <div
            className={cn(
              "flex-center w-full aspect-[2] bg-green-1 rounded-2xl",
              "md:aspect-[0]"
            )}
          >
            <h1>早安</h1>
          </div>

          <div className="flex-between w-full gap-6">
            <Link
              href="/reservation"
              className={cn(
                "flex-center w-full aspect-[2] bg-white shadow-md rounded-lg",
                "md:aspect-[0] md:h-full"
              )}
            >
              快速停車
            </Link>

            <Link
              href="/reservation"
              className={cn(
                "flex-center w-full aspect-[2] bg-white shadow-md rounded-lg",
                "md:aspect-[0] md:h-full"
              )}
            >
              自訂停車
            </Link>
          </div>
        </div>

        <div className="flex-col flex-between w-full gap-4">
          <h1 className="w-full">剩餘車位</h1>

          <div className="grid grid-cols-2 w-full gap-6">
            {data.map((space) => {
              return (
                <Button
                  key={space.key}
                  size="md"
                  className="flex items-start justify-between"
                >
                  <h2 className="text-28">{space.floor}</h2>
                  <div className="flex flex-col grow">
                    <p className="text-48">{space.num_parking_space}</p>
                    <p className="text-12">剩餘車位</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
