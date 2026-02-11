"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", applied: 42, interviews: 3 },
  { name: "Feb", applied: 57, interviews: 4 },
  { name: "Mar", applied: 51, interviews: 5 },
  { name: "Apr", applied: 63, interviews: 6 },
  { name: "May", applied: 39, interviews: 2 },
  { name: "Jun", applied: 58, interviews: 4 },
];

export default function ChartCard() {
  return (
    <div className="bg-darkBackground rounded-xl p-6 shadow-xl w-full max-w-3xl text-white relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
          <p className="text-sm font-medium">Application pipeline overview</p>
        </div>
        <span className="text-xs text-gray-400">Last 6 Months</span>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3e" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelStyle={{ color: "#9ca3af" }}
            />
            <Bar dataKey="applied" fill="#34d399" radius={[6, 6, 0, 0]} />
            <Bar dataKey="interviews" fill="#fbbf24" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Text (optional) */}
      <div className="absolute bottom-4 right-4 text-xs text-green-400">
        ▲ +12.5% this month
      </div>
    </div>
  );
}
