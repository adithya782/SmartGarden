import React, { useState, useEffect } from "react";

export default function Live() {
  const [liveData, setLiveData] = useState(null);
  const [status, setStatus] = useState("Connecting....");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/stream");

    eventSource.onmessage = (event) => {
      setLiveData(event.data);
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

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Live Backend Stream</h2>
      <p>
        Status: <strong>{status}</strong>
      </p>

      {liveData ? (
        <p>
          Current Value:{" "}
          <strong style={{ fontSize: "1.5rem" }}>{liveData}</strong>
        </p>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
}
