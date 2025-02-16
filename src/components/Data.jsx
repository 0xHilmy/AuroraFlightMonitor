
import React from 'react';

const thresholds = {
  pm25: 100,
  pm10:100,
  co: 50,
  temperature: 30,
  rh: 70,
  altitude: 200,
};

const getColor = (value, threshold) => {
  return value > threshold ? 'text-red-500' : 'text-green-500';
};



function Data({ data }){
    return(
        <>
        <h2 className='text-center font-bold font-mono text-3xl mb-1'>DATA</h2>
        <div className="grid text-center grid-cols-3">
        <p className={`h-20 p-1 font-bold font-mono text-6xl ${getColor(data.pm25, thresholds.pm25)}`}>{data.pm25}</p>
        <p className={`h-20 p-1 font-bold font-mono text-6xl ${getColor(data.pm10, thresholds.pm10)}`}>{data.pm10}</p>
        <p className={`h-20 p-1 font-bold font-mono text-6xl ${getColor(data.co, thresholds.co)}`}>{data.co}</p>
        <p className="px-2 font-bold font-mono text-2xl mb-3">PM2.5(&micro;g/m<sup>3</sup>)</p>
        <p className="px-2 font-bold font-mono text-2xl mb-3">PM10(&micro;g/m<sup>3</sup>)</p>
        <p className="px-2 font-bold font-mono text-2xl">CO(PPM)</p>
        <p className={`h-20 p-1 font-bold font-mono text-6xl ${getColor(data.temperature, thresholds.temperature)}`}>{data.temperature}</p>
        <p className={`h-20 p-1 font-bold font-mono text-6xl ${getColor(data.humidity, thresholds.rh)}`}>{data.humidity}</p>
        <p className={`h-20 p-1 font-bold font-mono text-6xl ${getColor(data.altitude, thresholds.altitude)}`}>{data.altitude}</p>
        <p className="px-2 font-bold font-mono text-2xl">Suhu(&deg;C)</p>
        <p className="px-2 font-bold font-mono text-2xl">RH(%)</p>
        <p className="px-2 font-bold font-mono text-2xl">altitude(m)</p>
      </div>
    </>
    );
}



export default Data;