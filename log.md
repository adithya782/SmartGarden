# Day-To-Day Log

> This document tracks the daily progress of the project from Day 1 to completion.

## DAY - 1 🧠

- Read sensor data from the `Soil Moisture Sensor` using `ESP32`.
- Transmitted sensor readings from `ESP32` to a `Flask Backend` via `HTTP POST`.
- Stored incoming sensor data into the `PostgreSQL database`.

> **Data Flow:** Soil Moisture Sensor → ESP32 → Flask → Database

## DAY - 2

- Tried reading the Server Sent Events in react native using `EventSource`
- This just displays the realtime sensor reading / Soil Moisture
  > **Data Flow:** Soil Moisture Sensor -> ESP32 -> Flask -> Database and React Web Application
