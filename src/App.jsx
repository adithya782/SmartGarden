import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Live from "./data";

function App() {
  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#111827",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <Live />
    </main>
  );
}
export default App;
