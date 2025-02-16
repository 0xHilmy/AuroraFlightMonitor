// src/Chart.jsx
import  { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ dataKey, label, dataValue }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataValue !== undefined) {
      // Add the new data point to the chart's dataset
      setData((currentData) => [
        ...currentData,
        { time: new Date().toLocaleTimeString(), [dataKey]: dataValue }
      ]);

      // Limit the number of data points to maintain performance
      if (data.length > 60) {
        setData((currentData) => currentData.slice(1));
      }
    }
  }, [dataValue]); // Run this effect whenever dataValue changes

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
