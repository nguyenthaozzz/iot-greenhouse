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




Về phần mô phỏng dữ liệu, nhóm mong muốn có thể mô phỏng sát nhất với hoạt động thực tế của phần cứng về việc gửi dữ liệu lên Firebase thông qua MQTT broker. Tuy nhiên vì hiện tại file serviveAccountkey.jon đã cũ, khiến cho file giả lập mqtt_simulation.py không thể hoạt động đúng được nữa. Nhóm đã thử up lại key mới lên tuy nhiên vì chính sách bảo mật của Github mà file key mới không thể được push lên. Tuy vậy nhóm vẫn còn một file giả lập khác là simulator.htm nên nếu bạn muốn giả lập số liệu, có thế chạy file simulator.htm trên. Xin cảm ơn!!! 
