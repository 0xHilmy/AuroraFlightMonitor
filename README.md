# UAV Air Quality Monitoring

## Overview
This project is a UAV-based air quality monitoring system that visualizes real-time air pollution data using React Three.js. The UAV collects air quality data using sensors and transmits the information for 3D visualization and analysis.

## Features
- **Real-time Air Quality Monitoring:** Captures and displays PM10, PM2.5, and gas concentration data.
- **3D Visualization:** Uses React Three.js to represent air quality data in an interactive 3D environment.
- **Live Data Transmission:** Utilizes WebSockets for real-time updates.
- **Customizable UI:** Adjustable settings for data visualization and filtering.
- **Historical Data Logging:** Stores past measurements for trend analysis.
- **UAV Integration:** Supports wireless communication with the UAV.

## Technology Stack
### Frontend
- **React.js** - Core framework for the user interface
- **Three.js** - 3D rendering and visualization
- **Tailwind CSS** - Styling and UI design
- **WebSockets** - Real-time communication

### Backend
- **Node.js** - Server-side logic
- **Express.js** - API handling
- **MongoDB** - Database for storing air quality data
- **MQTT** - Message protocol for sensor data transmission

### Hardware
- **UAV (Drone Platform)** - Custom UAV for airborne monitoring
- **Microcontroller (ESP32 or similar)** - Processes and transmits sensor data

### Sensors
- **ZH03B** - Measures PM10 and PM2.5 air quality levels
- **MQ Series (e.g., MQ-135, MQ-7)** - Detects gas concentration (CO, CO2, NH3, etc.)

## Installation
### Prerequisites
- Node.js and npm installed
- MongoDB instance running
- MQTT broker setup (e.g., Mosquitto)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   node server.js
   ```
4. Start the frontend:
   ```sh
   npm start
   ```
5. Connect the UAV and ensure sensor data is being transmitted.

## Usage
- Launch the web interface and monitor real-time air quality data.
- Adjust visualization settings for better insights.
- View historical data and trends.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

## License
This project is licensed under the MIT License.

