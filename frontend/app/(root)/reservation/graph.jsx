import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Graph = ({ data, current, setSelected }) => {
  const spaces = data[current];
  const floor_name = { 1: "B2", 2: "B1", 3: "1F", 4: "2F" }

  return (
    <div className="rounded-3xl bg-neutral-200 p-3 lg:p-5 flex-1 flex flex-col justify-center">
      <RadioGroup
        className="flex justify-between items-center"
        onValueChange={(value) => {
          setSelected(value);
        }}
      >
        <div className="flex flex-col">
          {Object.keys(spaces)
            .slice(0, 6)
            .map((key) => (
              <div key={key}>
                <RadioGroupItem
                  value={
                    floor_name[current] + (parseInt(key) + 1).toString().padStart(2, "0")
                  }
                  id={key}
                  className="peer sr-only"
                  disabled={!spaces[key]}
                />
                <Label
                  htmlFor={key}
                  className="lg:w-28 bg-[#CFE8C6] peer-disabled:bg-neutral-400 rounded text-[#75B066] peer-disabled:text-neutral-300 flex justify-center px-1 py-2 lg:p-2 border-4 border-neutral-200 peer-data-[state=checked]:border-[#75B066]"
                >
                  <p className="text-[18px] lg:text-32">
                    {floor_name[current] + (parseInt(key) + 1).toString().padStart(2, "0")}
                  </p>
                </Label>
              </div>
            ))}
        </div>
        <div className="flex">
          <div className="flex flex-col">
            {Object.keys(spaces)
              .slice(6, 10)
              .map((key) => (
                <div key={key}>
                  <RadioGroupItem
                    value={
                      floor_name[current] + (parseInt(key) + 1).toString().padStart(2, "0")
                    }
                    id={key}
                    className="peer sr-only"
                    disabled={!spaces[key]}
                  />
                  <Label
                    htmlFor={key}
                    className="lg:w-28 bg-[#CFE8C6] peer-disabled:bg-neutral-400 rounded text-[#75B066] peer-disabled:text-neutral-300 flex justify-center px-1 py-2 lg:p-2 border-4 border-neutral-200 peer-data-[state=checked]:border-[#75B066]"
                  >
                    <p className="text-[18px] lg:text-32">
                      {floor_name[current] +
                        (parseInt(key) + 1).toString().padStart(2, "0")}
                    </p>
                  </Label>
                </div>
              ))}
          </div>
          <div className="flex flex-col">
            {Object.keys(spaces)
              .slice(10, 14)
              .map((key) => (
                <div key={key}>
                  <RadioGroupItem
                    value={
                      floor_name[current] + (parseInt(key) + 1).toString().padStart(2, "0")
                    }
                    id={key}
                    className="peer sr-only"
                    disabled={!spaces[key]}
                  />
                  <Label
                    htmlFor={key}
                    className="lg:w-28 bg-[#CFE8C6] peer-disabled:bg-neutral-400 rounded text-[#75B066] peer-disabled:text-neutral-300 flex justify-center px-1 py-2 lg:p-2 border-4 border-neutral-200 peer-data-[state=checked]:border-[#75B066]"
                  >
                    <p className="text-[18px] lg:text-32">
                      {floor_name[current] +
                        (parseInt(key) + 1).toString().padStart(2, "0")}
                    </p>
                  </Label>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col">
          {Object.keys(spaces)
            .slice(14, 20)
            .map((key) => {
              const cn_normal = "lg:w-28 bg-[#CFE8C6] peer-disabled:bg-neutral-400 rounded text-[#75B066] peer-disabled:text-neutral-300 flex justify-center px-1 py-2 lg:p-2 border-4 border-neutral-200 peer-data-[state=checked]:border-[#75B066]";
              const cn_priority = "lg:w-28 bg-blue-100 peer-disabled:bg-neutral-400 rounded text-sky-600 peer-disabled:text-neutral-300 flex justify-center px-1 py-2 lg:p-2 border-4 border-neutral-200 peer-data-[state=checked]:border-sky-600"

              return (
                <div key={key}>
                  <RadioGroupItem
                    value={
                      floor_name[current] + (parseInt(key) + 1).toString().padStart(2, "0")
                    }
                    id={key}
                    className="peer sr-only"
                    disabled={!spaces[key]}
                  />
                  <Label
                    htmlFor={key}
                    className={["18", "19"].includes(key) ? cn_priority : cn_normal}
                  >
                    <p className="text-[18px] lg:text-32">
                      {floor_name[current] + (parseInt(key) + 1).toString().padStart(2, "0")}
                    </p>
                  </Label>
                </div>
              )
            })}
        </div>
      </RadioGroup>
    </div>
  );
};

export default Graph;
