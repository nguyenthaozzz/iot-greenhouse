<div align="center">

# 🌿 IoT Greenhouse Monitoring System

[![ESP32](https://img.shields.io/badge/ESP32-Simulated-blue?style=for-the-badge&logo=espressif&logoColor=white)](https://www.espressif.com/)
[![MQTT](https://img.shields.io/badge/MQTT-Mosquitto-purple?style=for-the-badge&logo=eclipsemosquitto&logoColor=white)](https://mosquitto.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-orange?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> An end-to-end IoT system for real-time greenhouse environment monitoring and automated control — built with MQTT, Firebase, and a browser-based sensor simulator.

[📺 Demo](#demo) · [⚙️ Architecture](#architecture) · [🚀 Getting Started](#getting-started) · [📊 Features](#features)

</div>

---

## 📌 Overview

Modern agriculture demands precision. This project delivers a complete **IoT greenhouse management system** that monitors critical environmental parameters and automates actuator control — all accessible from a web dashboard in real time.

Rather than relying on physical hardware during development, the system includes a **browser-based sensor simulator** (`simulator.htm`) that mimics ESP32 + sensor behavior, publishing realistic MQTT data streams identical to production deployment. This enables full end-to-end testing of the data pipeline without physical hardware.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📡 **Real-time Monitoring** | Live data updates via MQTT WebSocket — no polling, no delays |
| 🌡️ **Multi-sensor Support** | Temperature, humidity, soil moisture, and light intensity |
| 🤖 **Automated Control** | Rule-based triggers for fan, water pump, and grow lights |
| 🕹️ **Remote Control** | Manual override of actuators via web dashboard |
| 📈 **Data Visualization** | Interactive historical charts with time-series rendering |
| 💾 **Cloud Storage** | Persistent logging to Firebase Realtime Database |
| 🧪 **Hardware Simulator** | `simulator.htm` — full MQTT publisher, no ESP32 required |
| 📶 **LAN Deployment** | Lightweight, self-hosted — runs on any local network |

---

## 🏗️ Architecture
<img width="861" height="659" alt="image" src="https://github.com/user-attachments/assets/9d14adc2-f379-465e-b83c-56a620146936" />

---

## 📊 Monitored Parameters

| Parameter | Sensor | Range | Accuracy |
|---|---|---|---|
| 🌡️ Temperature | DHT11 | 0 – 50 °C | ±2 °C |
| 💧 Air Humidity | DHT11 | 20 – 90 %RH | ±5 %RH |
| 🌱 Soil Moisture | Capacitive | 0 – 100% | ±5% |
| ☀️ Light Intensity | BH1750 | 1 – 65,535 lux | ±7 lux |

---

## 🧪 Sensor Simulator

A key design choice in this project is the **`simulator.htm`** — a standalone HTML file that acts as a virtual ESP32 device running entirely in the browser.

**What it does:**
- Generates realistic sensor data following configurable environmental scenarios
- Publishes data to the MQTT broker via **WebSocket** (MQTT over WS)
- Simulates day/night light cycles, watering events, and temperature fluctuations
- Allows developers to test the full data pipeline without any physical hardware

<img width="1004" height="468" alt="image" src="https://github.com/user-attachments/assets/f4fb27b3-58e4-42b6-8d27-578d8a0c51e0" />
This approach enabled full system validation before hardware procurement, significantly accelerating development.

---

## 🚀 Getting Started

### Prerequisites

- [Mosquitto MQTT Broker](https://mosquitto.org/download/) (with WebSocket enabled)
- [Node.js](https://nodejs.org/) v16+
- [Firebase](https://firebase.google.com/) project with Realtime Database
- A modern browser (Chrome / Firefox / Edge)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/iot-greenhouse.git
cd iot-greenhouse
```

### 2. Configure Mosquitto with WebSocket support

Edit your `mosquitto.conf`:

```conf
listener 1883
protocol mqtt

listener 9001
protocol websockets
```

Start the broker:

```bash
mosquitto -c mosquitto.conf
```

### 3. Configure Firebase

Copy and fill in your credentials:

```bash
cp config/firebase.example.js config/firebase.js
# Edit firebase.js with your Firebase project config
```

### 4. Start the backend bridge

```bash
cd backend
npm install
npm start
```

### 5. Launch the dashboard

Open `dashboard/index.html` in your browser, or serve it locally:

```bash
npx serve dashboard
```

### 6. Run the simulator

Open `simulator/simulator.htm` directly in your browser. Configure the broker IP and click **Start Simulation**.

---

## 📁 Project Structure
iot-greenhouse/
├── 📂 backend/              # Node.js MQTT-to-Firebase bridge
│   ├── index.js
│   └── package.json
├── 📂 dashboard/            # Web monitoring interface
│   ├── index.html
│   ├── app.js
│   └── style.css
├── 📂 simulator/            # Browser-based sensor simulator
│   └── simulator.htm
├── 📂 config/               # Firebase & MQTT configuration
│   └── firebase.example.js
├── 📂 docs/                 # Architecture diagrams & documentation
└── README.md

---

## 🛠️ Tech Stack

**Communication**
- MQTT (Mosquitto Broker) — lightweight pub/sub messaging
- MQTT over WebSocket — browser-native MQTT connectivity

**Frontend**
- Vanilla JavaScript (ES6+) — dashboard & simulator
- Chart.js — real-time time-series visualization
- HTML5 / CSS3

**Backend & Cloud**
- Node.js — MQTT bridge service
- Firebase Realtime Database — cloud data persistence

**Simulated Hardware**
- ESP32 (simulated) — Wi-Fi enabled microcontroller
- DHT11 — temperature & humidity sensor
- BH1750 — light intensity sensor
- Capacitive soil moisture sensor

---

## 📸 Screenshots

> *Dashboard and simulator screenshots coming soon*

---

## 📖 What I Learned

This project gave me hands-on experience with:

- Designing a **layered IoT architecture** (perception → network → application)
- Implementing **MQTT pub/sub** patterns for real-time data streaming
- Building a **browser-to-broker communication** pipeline using WebSocket
- Working with **Firebase Realtime Database** for time-series data storage
- Developing a **hardware simulator** to decouple software from physical devices
- Thinking about **system reliability**, thresholds, and automated decision logic

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ☕ and 🌱 — *Building smarter agriculture, one sensor at a time.*

</div>
