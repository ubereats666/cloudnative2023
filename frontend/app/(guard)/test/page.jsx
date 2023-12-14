"use client";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import React from "react";
import useFetch from "@/hooks/useFetch";

const data = [
  { name: "occupied", value: 63 },
  { name: "vacant", value: 37 },
];

const COLORS = ["#7CA9ED", "#93E5AF"];

const RenderLineChart = () => {
  // const handleMouseEnter = () => {
  //   // 空函數 - 不做任何事情
  // };
  const { data, isLoading, error } = useFetch("get_space_usage_rate");

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  // 獲取all_floor的usage rate
  const all_floor_data = data.find((entry) => entry.floor === "all");

  if (!all_floor_data) {
    return null; // 若找不到符合條件的數據，也可以返回null或其他UI
  }

  const all_pie_data = [
    { name: "Occupied", value: all_floor_data.occupied },
    { name: "Vacant", value: all_floor_data.vacant },
  ];
  // 獲取f2_floor的usage rate
  const f2_floor_data = data.find((entry) => entry.floor === "2F");

  if (!f2_floor_data) {
    return null; // 若找不到符合條件的數據，也可以返回null或其他UI
  }

  const f2_pie_data = [
    { name: "Occupied", value: f2_floor_data.occupied },
    { name: "Vacant", value: f2_floor_data.vacant },
  ];
  // 獲取f1_floor的usage rate
  const f1_floor_data = data.find((entry) => entry.floor === "1F");

  if (!f1_floor_data) {
    return null; // 若找不到符合條件的數據，也可以返回null或其他UI
  }

  const f1_pie_data = [
    { name: "Occupied", value: f1_floor_data.occupied },
    { name: "Vacant", value: f1_floor_data.vacant },
  ];
  // 獲取b1_floor的usage rate
  const b1_floor_data = data.find((entry) => entry.floor === "B1");

  if (!b1_floor_data) {
    return null; // 若找不到符合條件的數據，也可以返回null或其他UI
  }

  const b1_pie_data = [
    { name: "Occupied", value: b1_floor_data.occupied },
    { name: "Vacant", value: b1_floor_data.vacant },
  ];
  // 獲取b2_floor的usage rate
  const b2_floor_data = data.find((entry) => entry.floor === "B2");

  if (!b2_floor_data) {
    return null; // 若找不到符合條件的數據，也可以返回null或其他UI
  }

  const b2_pie_data = [
    { name: "Occupied", value: b2_floor_data.occupied },
    { name: "Vacant", value: b2_floor_data.vacant },
  ];

  return (
    <div className="flex flex-row items-center justify-center w-screen h-screen bg-danger">
      <PieChart width={250} height={250}>
        <Pie
          data={all_pie_data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          // onMouseEnter={handleMouseEnter} // 設置為空函數
        >
          {all_pie_data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text
          x="50%"
          y="42%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: "24px",
            fontFamily: "serif",
            fontWeight: "bold",
            fill: "#696969",
          }}
        >
          All
        </text>
        <Tooltip />
        <Legend
          verticalAlign="bottom" // 設置圖例在底部
          align="center" // 水平居中對齊
          layout="horizontal" // 使用水平排列方式
          wrapperStyle={{
            paddingTop: "20px", // 調整圖例與圓餅圖的垂直距離
            margin: "0 auto", // 調整圖例的外邊距，使其水平居中
          }}
        />
      </PieChart>
      <div className="flex flex-col items-center justify-center bg-amber-300">
        <div className="flex flex-row items-center justify-center bg-green-4">
          <PieChart width={175} height={175}>
            <Pie
              data={f2_pie_data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={40}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              // onMouseEnter={handleMouseEnter} // 設置為空函數
            >
              {f2_pie_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <text
              x="50%"
              y="42%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "12px",
                fontFamily: "serif",
                fontWeight: "bold",
                fill: "#696969",
              }}
            >
              2F
            </text>
            <Tooltip />
          </PieChart>
          <PieChart width={175} height={175}>
            <Pie
              data={f1_pie_data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={40}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              // onMouseEnter={handleMouseEnter} // 設置為空函數
            >
              {f1_pie_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <text
              x="50%"
              y="42%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "12px",
                fontFamily: "serif",
                fontWeight: "bold",
                fill: "#696969",
              }}
            >
              F1
            </text>
            <Tooltip />
          </PieChart>
        </div>
        <div className="flex flex-row items-center justify-center">
          <PieChart width={175} height={175}>
            <Pie
              data={b1_pie_data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={40}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              // onMouseEnter={handleMouseEnter} // 設置為空函數
            >
              {b1_pie_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <text
              x="50%"
              y="42%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "12px",
                fontFamily: "serif",
                fontWeight: "bold",
                fill: "#696969",
              }}
            >
              B1
            </text>
            <Tooltip />
          </PieChart>
          <PieChart width={175} height={175}>
            <Pie
              data={b2_pie_data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={40}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              // onMouseEnter={handleMouseEnter} // 設置為空函數
            >
              {b2_pie_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <text
              x="50%"
              y="42%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "12px",
                fontFamily: "serif",
                fontWeight: "bold",
                fill: "#696969",
              }}
            >
              B2
            </text>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default RenderLineChart;
