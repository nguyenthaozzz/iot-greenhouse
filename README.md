<div align="center">

# 🌿 IoT Greenhouse Monitoring System

[![ESP32](https://img.shields.io/badge/ESP32-Simulated-blue?style=for-the-badge&logo=espressif&logoColor=white)](https://www.espressif.com/)
[![MQTT](https://img.shields.io/badge/MQTT-Mosquitto-purple?style=for-the-badge&logo=eclipsemosquitto&logoColor=white)](https://mosquitto.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-orange?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Android](https://img.shields.io/badge/Android-APK-green?style=for-the-badge&logo=android&logoColor=white)](https://www.android.com/)

> Real-time IoT greenhouse system using MQTT, Firebase & ESP32 simulation. Bidirectional Python bridge syncs sensor data to cloud; web dashboard + Android APK for remote monitoring and actuator control.

[⚙️ Architecture](#️-system-architecture) · [🧪 Simulators](#-simulation-strategy) · [🚀 Getting Started](#-getting-started) · [🛠️ Tech Stack](#️-tech-stack)

</div>

---

## 📌 Overview

Modern agriculture demands precision. This project delivers a complete **IoT greenhouse management system** that monitors critical environmental parameters and automates actuator control — all accessible from a web dashboard and mobile app in real time.

Rather than relying on physical hardware, the system ships with **two interchangeable simulators**:
- **`mqtt_simutlation.py`** — Python CLI simulator, publishes sensor data every 3 seconds
- **`simulator.htm`** — browser-based MQTT publisher, no terminal needed

A Python **`bridge.py`** then syncs data **bidirectionally** between MQTT and Firebase Realtime Database, while the web dashboard and Android APK provide live monitoring and remote control.
<img width="1004" height="565" alt="image" src="https://github.com/user-attachments/assets/38ba6d66-9f70-4949-8999-86010b6f59f4" />
<img width="1004" height="565" alt="image" src="https://github.com/user-attachments/assets/cd05f429-e746-4e88-844c-683cd60b8534" />

---

## ✨ Features

| Feature | Description |
|---|---|
| 📡 **Real-time Monitoring** | Live sensor data pushed via MQTT — sub-second latency, no polling |
| 🌡️ **Multi-sensor Support** | Temperature, air humidity, soil moisture, light intensity |
| 🤖 **Automated Control** | Rule-based actuator triggers for fan, water pump, grow light |
| 🕹️ **Remote Control** | Manual override of devices via web dashboard |
| 📈 **Data Visualization** | Interactive time-series charts for historical analysis |
| 💾 **Cloud Storage** | Persistent logging to Firebase Realtime Database |
| 🧪 **Dual Simulator** | Python CLI + browser-based HTML — full pipeline testing without hardware |
| 📱 **Mobile App** | Android APK (`web_app.apk`) for on-the-go monitoring |
| 🔄 **Bidirectional Bridge** | `bridge.py` syncs MQTT → Firebase (sensor) and Firebase → MQTT (control) |

---

## ⚙️ System Architecture
System Specification Diagram
<img width="1004" height="468" alt="image" src="https://github.com/user-attachments/assets/3fa9188b-9b1d-4187-8919-ce325cf9135c" />

Block Diagram
<img width="861" height="659" alt="image" src="https://github.com/user-attachments/assets/92a1c3f3-ca9a-4d81-9c45-b416bf614441" />

---

## 📡 MQTT Topic Architecture

| Topic | Direction | Description |
|---|---|---|
| `greenhouse/sensor` | Subscribe | Incoming JSON sensor payload from simulator |
| `greenhouse/control/fan` | Publish | Fan ON/OFF command → device / simulator |
| `greenhouse/control/pump` | Publish | Water pump ON/OFF command |
| `greenhouse/control/light` | Publish | Grow light ON/OFF command |
| `greenhouse/control/#` | Subscribe | Wildcard — simulator listens for all commands |

**Sensor payload format:**
```json
{
  "temperature": 28.3,
  "humidity": 72.1,
  "soil": 65,
  "light": 3200
}
```

---

## 📊 Monitored Parameters

| Parameter | Sensor | Simulated Range | Device Range | Accuracy |
|---|---|---|---|---|
| 🌡️ Temperature | DHT11 | 25 – 35 °C | 0 – 50 °C | ±2 °C |
| 💧 Air Humidity | DHT11 | 50 – 90 %RH | 20 – 90 %RH | ±5 %RH |
| 🌱 Soil Moisture | Capacitive | 60 – 80 % | 0 – 100 % | ±5 % |
| ☀️ Light Intensity | BH1750 | 2,000 – 5,000 lux | 1 – 65,535 lux | ±7 lux |

---

## 🧪 Simulation Strategy

A core design decision was to fully decouple software development from physical hardware. Two complementary simulators cover different use cases:

### 1. `mqtt_simutlation.py` — Python CLI Simulator

- Generates randomized sensor readings and publishes to `greenhouse/sensor` **every 3 seconds**
- Simultaneously subscribes to `greenhouse/control/#` to receive and log actuator commands
- Ideal for automated testing, scripted scenarios, and headless environments

```bash
python mqtt_simutlation.py
# Sent sensor data: {"temperature": 28.3, "humidity": 72.1, "soil": 65, "light": 3200}
# [COMMAND RECEIVED] Topic: greenhouse/control/fan | Command: ON
#  -> FAN switching to: ON
```

### 2. `simulator.htm` — Browser-based Simulator

- Standalone HTML file — open directly in any modern browser, **no install required**
- Connects to Mosquitto via **MQTT over WebSocket** (port 9001)
- Provides a visual UI to configure and trigger sensor data publication
- Enables full pipeline testing without any terminal or Python environment

> Both simulators produce identical data formats — the rest of the system cannot distinguish them from a real ESP32 device.

---

## 📁 Repository Structure

```
iot-greenhouse/
├── web_iot_greenhouse/       # Web monitoring dashboard (HTML / CSS / JS)
├── bridge.py                 # Python: bidirectional MQTT ↔ Firebase bridge
├── mqtt_simutlation.py       # Python: CLI sensor data simulator
├── simulator.htm             # HTML: browser-based MQTT simulator
├── serviceAccountKey.json    # Firebase service account credentials (⚠️ keep private)
├── web_app (3).apk           # Android APK — mobile dashboard
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology | Role |
|---|---|---|
| **Communication** | MQTT · Mosquitto Broker | Lightweight pub/sub messaging protocol |
| **Communication** | MQTT over WebSocket | Browser-native MQTT for `simulator.htm` |
| **Simulator (CLI)** | Python · paho-mqtt | `mqtt_simutlation.py` — random data every 3s |
| **Simulator (Web)** | HTML5 · JavaScript | `simulator.htm` — browser MQTT publisher |
| **Bridge** | Python · paho-mqtt · firebase-admin | `bridge.py` — bidirectional MQTT ↔ Firebase |
| **Dashboard** | HTML · CSS · JavaScript | `web_iot_greenhouse/` — real-time monitoring UI |
| **Mobile** | Android APK | `web_app.apk` — mobile access |
| **Cloud** | Firebase Realtime Database | Time-series sensor data persistence |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+ (`paho-mqtt`, `firebase-admin`)
- [Mosquitto MQTT Broker](https://mosquitto.org/download/) with WebSocket enabled
- Firebase project with Realtime Database + `serviceAccountKey.json`
- Modern browser (Chrome / Firefox / Edge)

### 1. Clone the repository

```bash
git clone https://github.com/nguyenthaozzz/iot-greenhouse.git
cd iot-greenhouse
```

### 2. Install Python dependencies

```bash
pip install paho-mqtt firebase-admin
```

### 3. Configure Mosquitto with WebSocket support

```conf
# mosquitto.conf
listener 1883
protocol mqtt

listener 9001
protocol websockets
```

```bash
mosquitto -c mosquitto.conf
```

### 4. Place Firebase credentials

Put your `serviceAccountKey.json` in the project root. The database URL is already set in `bridge.py`:

```python
'databaseURL': 'https://iot-green-house-ebeaf-default-rtdb.firebaseio.com'
```

### 5. Start the bridge

```bash
python bridge.py
# Listening for Firebase changes...
```

The bridge will:
- **Receive** sensor data from MQTT → write to Firebase
- **Listen** for control changes in Firebase → forward to MQTT actuator topics

### 6. Run a simulator

**Option A — Python CLI:**
```bash
python mqtt_simutlation.py
```

**Option B — Browser simulator:**

Open `simulator.htm` directly in your browser → set broker IP → click **Start**.

### 7. Open the dashboard

```bash
cd web_iot_greenhouse
python -m http.server 8080
# Open http://localhost:8080
```

### 8. Mobile (optional)

Install `web_app (3).apk` on your Android device for mobile access to the dashboard.

---

## 📖 What I Learned

- Designing a **layered IoT architecture** — perception, network, and application layers
- Implementing **MQTT pub/sub** for low-latency, real-time data streaming
- Building a **bidirectional Python bridge** between MQTT and Firebase using event stream listeners
- Developing **two complementary simulators** (CLI + browser) to decouple development from hardware
- Working with **Firebase Realtime Database** for live data sync and time-series storage
- Packaging a web app as an **Android APK** for cross-platform mobile access
- Thinking through **threshold logic** and automated actuator decision rules

---

## ⚠️ Security Note

`serviceAccountKey.json` contains sensitive Firebase credentials. It is included here for demonstration purposes only. In production, this file should be added to `.gitignore` and managed via environment variables or a secrets manager.

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Made with ☕ and 🌱 — *Building smarter agriculture, one sensor at a time.*

</div>
