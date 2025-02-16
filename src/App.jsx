import { Suspense, useEffect, useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';
import Data from './components/Data.jsx';
import Chart from './components/Chart.jsx';
import ComPortDropDown from './components/ComPortDropdown.jsx';
import Scene from './components/Scene.jsx';
import AltitudeBar from './components/AltitudeBar.jsx';
import FlightMode from './components/FlightMode.jsx'; 

function App() {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState({});

  const handleConnect = (port, baudRate) => {
    console.log(`Connected to ${port} at baud rate ${baudRate}`);
    setConnected(true);
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setData(receivedData);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const { latitude, longitude } = data;

  return (
    <>
      <div className='grid grid-rows-1 pb-2'>
        <div className='h-24 bg-[#29374e]'>
          <Header />
        </div>
      </div>
      <div className='relative grid grid-cols-3 gap-2'>
        <div className='relative h-72 rounded-lg bg-[#1E293B]'>
          <Canvas shadows className='relative z-0'>
            <Suspense fallback={null}>
              <Scene roll={data.roll} pitch={data.pitch} yaw={data.yaw} />
            </Suspense>
          </Canvas>
          <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10'>
            <FlightMode mode={data.flightmode} />
          </div>
          <div className='absolute right-0 top-0 h-full'>
            <AltitudeBar altitude={data.altitude || 0} />
          </div>
          <div className='absolute bottom-2 left-2 z-10'>
            <h2 className='text-white text-lg font-bold'>Batt: {data.voltage} V</h2>
            <h2 className='text-white text-lg font-bold'>Curr: {data.current} mA</h2>
          </div>
        </div>
        <div className='rounded-lg col-span-2 row-span-2'>
          <Map latitude={latitude} longitude={longitude} />
        </div>
        <div className='h-72 rounded-lg bg-[#1E293B] text-[#b4b5b9] drop-shadow-2xl'>
          {connected && <Data data={data} />}
        </div>
        <div className='text-center h-64 rounded-lg bg-[#1E293B] text-white'>
          <ComPortDropDown onConnect={handleConnect} rain={data.rain} />
        </div>
        <div className='rounded-lg h-64 col-span-2 bg-[#1E293B] flex flex-row'>
          <Chart dataKey="PM2.5" label="PM2.5" dataValue={data.pm25}/>
          <Chart dataKey="CO" label="CO" dataValue={data.co}/>
          <Chart dataKey="Temperature" label="Temperature" dataValue={data.temperature}/>
        </div>
      </div>
    </>
  );
}

export default App;
