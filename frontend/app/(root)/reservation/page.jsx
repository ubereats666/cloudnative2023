"use client";

import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";

import Graph from "./graph";
import { getRemainSpaceColor } from "@/constants/function";
import useFetchSetting from "../setting/useFetchSetting";
import { FLOOR_LIST } from "@/constants";
import useCustomReserve from "./useCustomReserve";
// import { SPACE_DATA } from "@/constants";

const FloorRadioButton = ({ data, index }) => {
  return (
    <div>
      <RadioGroupItem
        value={index + 1}
        id={data.key}
        className="peer sr-only"
      />
      <Label
        htmlFor={data.key}
        className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl w-[136px] p-2 lg:px-9 lg:py-3 lg:w-60"
      >
        <p className="text-36 font-normal">{FLOOR_LIST[index]}</p>
        <div className="flex flex-col items-center gap-2">
          <p
            className={`text-36 font-normal ${getRemainSpaceColor(
              data.num_parking_space
            )}`}
          >
            {data.num_parking_space}
          </p>
          <p className="text-14 font-light">剩餘車位</p>
        </div>
      </Label>
    </div>
  );
};

const FloorRadioButtonSkeleton = () => (
  <Skeleton className="h-24 w-60 rounded-2xl" />
);

const Reservation = () => {
  const [current, setCurrent] = useState(4);
  const [selected, setSelected] = useState(null);

  const { toast } = useToast();
  const router = useRouter();

  const { priority } = useFetchSetting();
  const { data, isLoading, error } = useFetch("get_empty_parking_space");
  const { isLoading: isReserveHandling, customReserve } = useCustomReserve();

  if (error) {
    return (
      <div className="pt-28 lg:pt-32 px-8 lg:px-16 pb-8 w-screen h-screen">
        <div className="bg-slate-200 rounded-3xl text-20 font-normal h-full w-full flex justify-center items-center">
          發生錯誤，請稍後再試
        </div>
      </div>
    );
  }

  const onReserve = async () => {
    // TODO: POST create_record
    // const parking_space_id = "1F14"

    const { isSuccess, message } = await customReserve(selected);
    // const res = await customizeReserve({
    //   user_id: userId,
    //   parking_space_id: selected,
    // });
    // console.log(res);

    if (isSuccess) {
      toast({
        description: message,
      });
      router.replace("/reserve-info");
    } else {
      toast({
        variant: "destructive",
        description: message,
      });
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen pt-28 md:pt-32 px-8 md:px-16 pb-8 gap-y-10">
      <div className="flex flex-col lg:flex-row gap-x-16 gap-y-6 w-full">
        <div>
          <h2 className="text-24 p-3">自訂車位</h2>
          <Card variant="reservation">
            <CardContent className="p-0">
              <RadioGroup
                defaultValue={current}
                className="flex flex-wrap justify-between lg:flex-col lg:w-fit gap-y-3"
                onValueChange={(value) => {
                  setCurrent(value);
                }}
              >
                {isLoading &&
                  FLOOR_LIST.map((floor) => (
                    <FloorRadioButtonSkeleton key={floor} />
                  ))}
                {!isLoading &&
                  data.map((floorData, index) => (
                    <FloorRadioButton
                      key={floorData.key}
                      data={floorData}
                      index={index}
                    />
                  ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        {isLoading && <Skeleton className="h-[540px] w-full rounded-3xl" />}
        {!isLoading && (
          <Graph
            priority={priority}
            data={data}
            current={current}
            setSelected={setSelected}
          />
        )}
      </div>
      <div className="flex w-full justify-center items-center">
        <Button
          variant="setting"
          size="none"
          disabled={!selected || isReserveHandling}
          onClick={() => onReserve(selected)}
        >
          <p className="text-20">確認車位</p>
        </Button>
      </div>
    </div>
  );
};

export default Reservation;
