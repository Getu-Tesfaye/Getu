"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function RevenueChart({ data }) {
  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="neighbourhood" />
          <YAxis
            width={90}
            tickFormatter={(value) => `${value.toLocaleString()} ETB`}
          />
          <Tooltip formatter={(value) => `${value.toLocaleString()} ETB`} />
          <Bar dataKey="revenue" fill="#e0a800" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OrdersLineChart({ data }) {
  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#e0a800" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}