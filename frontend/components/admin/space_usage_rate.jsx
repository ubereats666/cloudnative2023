import React from "react";
import CustomPieChart from "./custom_pie_chart"; // 引入自定義元件的正確路徑
import useFetch from "@/hooks/useFetch";

const SpaceUsageRate = () => {
  const { data, isLoading, error } = useFetch("get_space_usage_rate");

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  const floorConfigs = [
    {
      floorName: "all",
      width: 300,
      height: 300,
      outerRadius: 80,
      fontSize: 24,
    },
    { floorName: "2F", width: 250, height: 250, outerRadius: 70, fontSize: 20 },
    { floorName: "1F", width: 200, height: 200, outerRadius: 60, fontSize: 16 },
    { floorName: "B1", width: 200, height: 200, outerRadius: 60, fontSize: 16 },
    { floorName: "B2", width: 200, height: 200, outerRadius: 60, fontSize: 16 },
  ];

  return (
    <div className="w-screen h-screen flex">
      {floorConfigs.map((floorConfig, index) => {
        const { floorName, width, height, outerRadius, fontSize } = floorConfig;
        const floorData = data.find((entry) => entry.floor === floorName);
        if (!floorData) return null;

        return (
          <CustomPieChart
            key={`pie-${index}`}
            floorData={floorData}
            floorName={floorName}
            width={width}
            height={height}
            outerRadius={outerRadius}
            fontSize={fontSize}
          />
        );
      })}
    </div>
  );
};

export default SpaceUsageRate;
