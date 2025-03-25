"use client";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  open: number;
  close: number;
  inProgress: number;
}

const CustomersChart = ({ open, close, inProgress }: Props) => {
  const data = [
    { label: "Open Services", value: open },
    { label: "Close Services", value: close },
    { label: "In-progress services", value: inProgress },
  ];
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <XAxis
          dataKey="label"
          tick={{ fill: "#FFFFFF" }}
          axisLine={{ stroke: "#FFFFFF" }}
        />
        <YAxis tick={{ fill: "#FFFFFF" }} axisLine={{ stroke: "#FFFFFF" }} />
        <Bar
          dataKey="value"
          fill="#fff" // Gold color for contrast
          barSize={60}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomersChart;
