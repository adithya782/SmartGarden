import React, { useState, useEffect } from "react";

import {
  LineChart,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function MyChart({ data }) {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="soilGlow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="#f3f4f6"
            strokeDasharray="4 4"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <Tooltip formatter={(val) => [`${val}%`, "Moisture"]} />
          <Area
            type="monotone"
            dataKey="moisture"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#soilGlow)"
            dot={false}
            activeDot={{
              r: 6,
              stroke: "#ffffff",
              strokeWidth: 2,
              fill: "#3b82f6",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Live() {
  const [liveData, setLiveData] = useState(null);
  const [status, setStatus] = useState("Connecting....");
  const [fullData, setFulldata] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/stream");

    eventSource.onmessage = (event) => {
      const value = Number(JSON.parse(event.data));
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      // const value = Math.round(((4095 - reading) / 4095) * 100);
      // console.log(typeof event.data);
      // console.log(JSON.stringify(event.data));
      // console.log(value);
      setLiveData(value);
      setFulldata((prev) => [...prev, { time: timestamp, moisture: value }]);
      setStatus("Connected");
    };

    eventSource.onerror = (error) => {
      console.error("SSE error: ", error);
      setStatus("Disconnected, Reconnecting...");
    };

    return () => {
      eventSource.close();
      console.log("Connection Closed");
    };
  }, []);

  useEffect(() => {
    console.log("--- STATE COMPLETED AN UPDATE ---");
    console.log("Real-time liveData state:", liveData);
    console.log("Real-time fullData history array:", fullData);
  }, [liveData, fullData]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ margin: "20px" }}>Live Backend Stream</h2>
      <p>
        Status: <strong>{status}</strong>
      </p>

      {liveData !== null ? (
        <p>
          Current Value:{" "}
          <strong style={{ fontSize: "1.5rem" }}>{liveData}%</strong>
        </p>
      ) : (
        <p>Waiting for data...</p>
      )}
      <h2 style={{ margin: "20px" }}>Live Stream</h2>
      <p style={{ marginBottom: "30px" }}>
        Status: <strong>{status}</strong>
      </p>

      {/* {fullData?.map((reading, index) => (
        <div key={index}>
          <p>Soil Moisture: {reading}</p>
        </div>
      ))} */}
      <MyChart data={fullData} />
    </div>
  );
}
