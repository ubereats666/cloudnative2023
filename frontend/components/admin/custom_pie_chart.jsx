import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F"];

const CustomPieChart = ({ floorData, floorName, width, height }) => {
  const pieData = [
    { name: "Occupied", value: floorData.occupied },
    { name: "Vacant", value: floorData.vacant },
  ];

  return (
    <PieChart width={width} height={height}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
      >
        {pieData.map((entry, index) => (
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
        {floorName}
      </text>
      <Tooltip />
      <Legend
        verticalAlign="bottom"
        align="center"
        layout="horizontal"
        wrapperStyle={{
          paddingTop: "20px",
          margin: "0 auto",
        }}
      />
    </PieChart>
  );
};

export default CustomPieChart;
