import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Graph from "./graph";
import { SPACE_DATA } from "@/constants";

const Reservation = () => {
  const remainColorMapping = (remain) =>
    remain <= 5
      ? "text-red-500"
      : remain <= 10
      ? "text-amber-400"
      : "text-green-600";

  const remains = Object.keys(SPACE_DATA).reduce((result, key) => {
    const remain = Object.values(SPACE_DATA[key]).filter(
      (value) => value === true
    ).length;
    result[key] = remain;
    return result;
  }, {});

  const remainsClassName = {};
  for (const floor in remains) {
    const remain = remains[floor];
    remainsClassName[floor] =
      "text-36 font-normal " + remainColorMapping(remain);
  }

  const current = "B2";

  return (
    <div className="flex flex-col h-screen">
      <div className="flex gap-x-16 w-screen">
        <div>
          <h2 className="text-24 p-3">自訂車位</h2>
          <Card variant="reservation">
            <CardContent className="p-0">
              <RadioGroup defaultValue="2F" className="flex flex-col gap-y-3">
                <div>
                  <RadioGroupItem value="2F" id="2F" className="peer sr-only" />
                  <Label
                    htmlFor="2F"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl px-9 py-3 w-60"
                  >
                    <p className="text-36 font-normal">2F</p>
                    <div className="flex flex-col items-center">
                      <p className={remainsClassName["2F"]}>{remains["2F"]}</p>
                      <p className="text-12 font-light">available</p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="1F" id="1F" className="peer sr-only" />
                  <Label
                    htmlFor="1F"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl px-9 py-3 w-60"
                  >
                    <p className="text-36 font-normal">1F</p>
                    <div className="flex flex-col items-center">
                      <p className={remainsClassName["1F"]}>{remains["1F"]}</p>
                      <p className="text-12 font-light">available</p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="B1" id="B1" className="peer sr-only" />
                  <Label
                    htmlFor="B1"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl px-9 py-3 w-60"
                  >
                    <p className="text-36 font-normal">B1</p>
                    <div className="flex flex-col items-center">
                      <p className={remainsClassName["B1"]}>{remains["B1"]}</p>
                      <p className="text-12 font-light">available</p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="B2" id="B2" className="peer sr-only" />
                  <Label
                    htmlFor="B2"
                    className="bg-white border-4 border-white peer-data-[state=checked]:border-[#75B066] flex items-center justify-between rounded-2xl px-9 py-3 w-60"
                  >
                    <p className="text-36 font-normal">B2</p>
                    <div className="flex flex-col items-center">
                      <p className={remainsClassName["B2"]}>{remains["B2"]}</p>
                      <p className="text-12 font-light">available</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <Graph data={SPACE_DATA} current={current} />
      </div>
      <div className="flex flex-auto w-screen justify-center items-center">
        <Button variant="setting" size="none">
          <p className="text-20">確認車位</p>
        </Button>
      </div>
    </div>
  );
};

export default Reservation;
