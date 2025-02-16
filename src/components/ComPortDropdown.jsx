import { useState, useEffect } from 'react';
import './ComPortDropdown.css';

const ComPortConfig = ({ onConnect, rain }) => {
  const [ports, setPorts] = useState([]);
  const [uavPort, setUavPort] = useState('');
  const [trackerPort, setTrackerPort] = useState('');
  const [uavBaudRate, setUavBaudRate] = useState('9600');
  const [trackerBaudRate, setTrackerBaudRate] = useState('9600');

  useEffect(() => {
    // Fetch available COM ports
    const fetchPorts = async () => {
      try {
        const response = await fetch('http://localhost:5000/com-ports');
        const data = await response.json();
        setPorts(data);
      } catch (error) {
        console.error('Error fetching COM ports:', error);
      }
    };

    fetchPorts();
  }, []);

  const handleConnectUAV = async () => {
    try {
      const response = await fetch('http://localhost:5000/connect-uav', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ portPath: uavPort, baudRate: uavBaudRate }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        onConnect(uavPort, uavBaudRate);
      } else {
        console.error('Failed to connect to UAV');
      }
    } catch (error) {
      console.error('Error connecting to UAV port:', error);
    }
  };

  const handleConnectTracker = async () => {
    try {
      const response = await fetch('http://localhost:5000/connect-tracker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ portPath: trackerPort, baudRate: trackerBaudRate }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        onConnect(trackerPort, trackerBaudRate);
      } else {
        console.error('Failed to connect to Tracker');
      }
    } catch (error) {
      console.error('Error connecting to Tracker port:', error);
    }
  };

  const downloadCSV = () => {
    const link = document.createElement('a');
    link.href = 'http://localhost:5000/download-csv';
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const hujan = rain > 0 ? 'RAIN' : 'CERAH';
  const terbang = rain > 0 ? 'RTL' : 'FLIGHT';

  return (
    <div className='grid grid-cols-6 gap-4 px-5'>
      <div className='col-span-2 h-32 text-center font-bold pt-12 text-6xl drop-shadow-2xl'>{hujan}</div>
      <div className='col-span-2 text-center  font-bold pt-12 text-6xl drop-shadow-2xl'><p>ISPU</p></div>
      <div className='col-span-2 text-center  font-bold pt-12 text-6xl drop-shadow-2xl'>{terbang}</div>

      {/* UAV Connection Section */}
      <p className='w-24 text-white font-bold text-md'>UAV CONNECT</p>
      <select className='w-24 mt-1 h-10 rounded-lg text-black font-semibold'
        id="com-port-uav"
        value={uavPort}
        onChange={(e) => setUavPort(e.target.value)}
      >
        <option value="">COM</option>
        {ports.map((port) => (
          <option key={port} value={port}>
            {port}
          </option>
        ))}
      </select>
      <select className='w-24 mt-1 h-10 rounded-lg text-black font-semibold'
        id="baud-rate-uav"
        value={uavBaudRate}
        onChange={(e) => setUavBaudRate(e.target.value)}
      >
        <option value="9600">9600</option>
        <option value="14400">14400</option>
        <option value="19200">19200</option>
        <option value="38400">38400</option>
        <option value="57600">57600</option>
        <option value="115200">115200</option>
      </select>

      <button className='mt-1 h-10 col-span-1 btn-connect mr-5' onClick={handleConnectUAV} disabled={!uavPort}>
        Connect UAV
      </button>

      <button  className='col-span-2 row-span-2 mt-10 btn-connect ml-12' onClick={downloadCSV}>
        Download
      </button>

      {/* Tracker Connection Section */}
      <p className='w-24 text-white font-bold text-md'>TRACKER CONNECT</p>
      <select className='w-24 mt-1 h-10 rounded-lg text-black font-semibold'
        id="com-port-tracker"
        value={trackerPort}
        onChange={(e) => setTrackerPort(e.target.value)}
      >
        <option value="">COM</option>
        {ports.map((port) => (
          <option key={port} value={port}>
            {port}
          </option>
        ))}
      </select>
      <select className='w-24 mt-1 h-10 rounded-lg text-black font-semibold'
        id="baud-rate-tracker"
        value={trackerBaudRate}
        onChange={(e) => setTrackerBaudRate(e.target.value)}
      >
        <option value="9600">9600</option>
        <option value="14400">14400</option>
        <option value="19200">19200</option>
        <option value="38400">38400</option>
        <option value="57600">57600</option>
        <option value="115200">115200</option>
      </select>

      <button className='mt-1 h-10 col-span-1 btn-connect mr-5' onClick={handleConnectTracker} disabled={!trackerPort}>
        Connect Tracker
      </button>
    </div>
  );
};

export default ComPortConfig;
