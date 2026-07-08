# 🪴 SmartGarden IoT Pipeline

An end-to-end IoT sensor data streaming pipeline that tracks garden metrics using an ESP32 microcontroller, logs them via a Flask backend to a PostgreSQL database, and streams updates live to a React.js dashboard.

## 🏗️ System Architecture

1. **Edge Node (ESP32)**: Collects sensor data and transmits HTTP POST requests.
2. **Backend Server (Flask)**: Processes incoming sensor data, records logs into PostgreSQL, and exposes a persistent Server-Sent Events (SSE) data stream.
3. **Database (PostgreSQL)**: Handles persistent, relational time-series storage for sensor analytics.
4. **Frontend Dashboard (React + Vite)**: Listens to live SSE events natively and renders real-time state changes without page reloads.

---

## 🚀 Getting Started

### 1. Hardware Configuration (ESP32)

To protect network credentials, configuration parameters are isolated in a local header file.

1. Navigate to the ESP32 project directory.
2. Create a file named `config.h` (this file is ignored by Git):

   ```cpp
   #ifndef CONFIG_H
   #define CONFIG_H

   const char* ssid = "YOUR_WIFI_SSID";
   const char* password = "YOUR_WIFI_PASSWORD";
   const char* server = "http://YOUR_FLASK_SERVER_IP:5000/data";

   #endif
   ```

3. Compile and flash the `.ino` sketch to your ESP32 board using the Arduino IDE or PlatformIO.

### 2. Backend Setup (Flask & PostgreSQL)

1. Configure your local environment variables in a `.env` file:
   ```env
   DB=smart_garden_db
   DB_user=your_db_user
   DB_password=your_db_password
   DB_host=localhost
   DB_port=5432
   ```
2. Install Python dependencies:
   ```bash
   pip install Flask flask-cors psycopg2 python-dotenv
   ```
3. Start the server:
   ```bash
   python app.py
   ```

### 3. Frontend Setup (React.js + Vite)

1. Navigate to your frontend project directory and install application dependencies:
   ```bash
   npm install
   ```
2. Launch the Vite development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your web browser to view your live data dashboard.

---

## 🔒 Security Best Practices

- Never commit `config.h` or `.env` files to public repository branches.
- Ensure your local `.gitignore` is initialized to actively mask sensitive runtime variables.
