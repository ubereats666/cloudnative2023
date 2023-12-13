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
  const [current, setCurrent] = useState("4");
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
    graphData["4"] = data.filter(d => d.floor === "4")[0].list_of_status;
    graphData["3"] = data.filter(d => d.floor === "3")[0].list_of_status;
    graphData["2"] = data.filter(d => d.floor === "2")[0].list_of_status;
    graphData["1"] = data.filter(d => d.floor === "1")[0].list_of_status;
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
                  <RadioGroupItem value="4" id="4" className="peer sr-only" />
                  <Label
                    htmlFor="4"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl w-[136px] p-2 lg:px-9 lg:py-3 lg:w-60"
                  >
                    <p className="text-36 font-normal">4F</p>
                    <div className="flex flex-col items-center">
                      <p className={getRemainCN("4")}>{getRemain("4")}</p>
                      <p className="text-12 font-light">剩餘車位</p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="3" id="3" className="peer sr-only" />
                  <Label
                    htmlFor="3"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl w-[136px] p-2 lg:px-9 lg:py-3 lg:w-60"
                  >
                    <p className="text-36 font-normal">3F</p>
                    <div className="flex flex-col items-center">
                      <p className={getRemainCN("3")}>{getRemain("3")}</p>
                      <p className="text-12 font-light">剩餘車位</p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="2" id="2" className="peer sr-only" />
                  <Label
                    htmlFor="2"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl w-[136px] p-2 lg:px-9 lg:py-3 lg:w-60"
                  >
                    <p className="text-36 font-normal">2F</p>
                    <div className="flex flex-col items-center">
                      <p className={getRemainCN("2")}>{getRemain("2")}</p>
                      <p className="text-12 font-light">剩餘車位</p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="1" id="1" className="peer sr-only" />
                  <Label
                    htmlFor="1"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl w-[136px] p-2 lg:px-9 lg:py-3 lg:w-60"
                  >
                    <p className="text-36 font-normal">1F</p>
                    <div className="flex flex-col items-center">
                      <p className={getRemainCN("1")}>{getRemain("1")}</p>
                      <p className="text-12 font-light">剩餘車位</p>
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
