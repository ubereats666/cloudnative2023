'use client'
import { useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from '@/components/ui/skeleton';

import Graph from "./graph";
// import { SPACE_DATA } from "@/constants";

const Reservation = () => {
  const [current, setCurrent] = useState("2F");
  const [selected, setSelected] = useState(undefined);

  const { toast } = useToast();
  const router = useRouter();

  const { data, isLoading, error } = useFetch("get_empty_parking_space");

  if (isLoading) {
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

  const getRemain = (f) => data.filter(d => d.floor === f)[0].num_parking_space;

  const remainColorMapping = (remain) => (
    remain <= 5
      ? "text-red-500"
      : remain <= 10
        ? "text-amber-400"
        : "text-green-600"
  );

  const getRemainCN = (floor) => {
    const remain = getRemain(floor);
    return "text-36 font-normal " + remainColorMapping(remain);
  };

  const getGraphData = (data) => {
    let graphData = new Object();
    graphData["2F"] = data.filter(d => d.floor === "2F")[0].list_of_status;
    graphData["1F"] = data.filter(d => d.floor === "1F")[0].list_of_status;
    graphData["B1"] = data.filter(d => d.floor === "B1")[0].list_of_status;
    graphData["B2"] = data.filter(d => d.floor === "B2")[0].list_of_status;
    return graphData;
  };

  const graphData = getGraphData(data);

  const onReserve = () => {
    console.log(current, selected);

    // TODO: POST create_record

    const isSuccess = false;

    if (isSuccess) {
      toast({
        description: "預約成功",
      });
      router.replace("/reserve-info");
    } else {
      toast({
        variant: "destructive",
        description: "發生錯誤，請稍後再試",
      });
      router.replace("/home");
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
                onValueChange={(value) => { setCurrent(value) }}
              >
                <div>
                  <RadioGroupItem value="2F" id="2F" className="peer sr-only" />
                  <Label
                    htmlFor="2F"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl w-[136px] p-2 lg:px-9 lg:py-3 lg:w-60"
                  >
                    <p className="text-36 font-normal">2F</p>
                    <div className="flex flex-col items-center">
                      <p className={getRemainCN("2F")}>{getRemain("2F")}</p>
                      <p className="text-12 font-light">available</p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="1F" id="1F" className="peer sr-only" />
                  <Label
                    htmlFor="1F"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl w-[136px] p-2 lg:px-9 lg:py-3 lg:w-60"
                  >
                    <p className="text-36 font-normal">1F</p>
                    <div className="flex flex-col items-center">
                      <p className={getRemainCN("1F")}>{getRemain("1F")}</p>
                      <p className="text-12 font-light">available</p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="B1" id="B1" className="peer sr-only" />
                  <Label
                    htmlFor="B1"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl w-[136px] p-2 lg:px-9 lg:py-3 lg:w-60"
                  >
                    <p className="text-36 font-normal">B1</p>
                    <div className="flex flex-col items-center">
                      <p className={getRemainCN("B1")}>{getRemain("B1")}</p>
                      <p className="text-12 font-light">available</p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="B2" id="B2" className="peer sr-only" />
                  <Label
                    htmlFor="B2"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl w-[136px] p-2 lg:px-9 lg:py-3 lg:w-60"
                  >
                    <p className="text-36 font-normal">B2</p>
                    <div className="flex flex-col items-center">
                      <p className={getRemainCN("B2")}>{getRemain("B2")}</p>
                      <p className="text-12 font-light">available</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <Graph data={graphData} current={current} setSelected={setSelected} />
      </div>
      <div className="flex w-full justify-center items-center">
        <Button
          variant="setting"
          size="none"
          disabled={!selected}
          onClick={onReserve}
        >
          <p className="text-20">確認車位</p>
        </Button>
      </div>
    </div>
  );
};

export default Reservation;
