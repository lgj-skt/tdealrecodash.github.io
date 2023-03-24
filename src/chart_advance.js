import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [];
for (let i = 1; i <= 31; i++) {
  const CTR = Math.random() * 0.05 + 0.02;
  const CVR = Math.random() * 0.01 + 0.001;
  const date = `202303${i.toString().padStart(2, '0')}`;
  data.push({ date, CTR, CVR });
}

const model2_data = [];
for (let i = 1; i <= 31; i++) {
  const CTR = Math.random() * 0.05 + 0.02;
  const CVR = Math.random() * 0.01 + 0.001;
  const date = `202303${i.toString().padStart(2, '0')}`;
  model2_data.push({ date, CTR, CVR });
}

const CustomXAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-20} y={-15} width={40} height={30} fill="#8884d8" rx={10} />
    <text x={0} y={0} dy={6} textAnchor="middle" fill="#fff" fontSize={14}>
      {payload.value}
    </text>
  </g>
);

const Chart_advance = () => {
  const [width, setWidth] = useState(window.innerWidth * 0.4);
  const [height, setHeight] = useState(window.innerHeight * 0.3);
  const [startDate, setStartDate] = useState('2023-03-01');
  const [endDate, setEndDate] = useState('2023-03-31');

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth * 0.4);
      setHeight(window.innerHeight * 0.3);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const startDateString = new Date(startDate).toISOString().slice(0, 10).replace(/-/g, '');
  const endDateString = new Date(endDate).toISOString().slice(0, 10).replace(/-/g, '');

  const filteredData = data.filter((d) => d.date >= startDateString && d.date <= endDateString).map((d) => ({
    date: d.date,
    model1_CTR: d.CTR,
    model1_CVR: d.CVR,
  }));

  model2_data.filter((d) => d.date >= startDateString && d.date <= endDateString).map((d) => ({
    date: d.date,
    model2_CTR: d.CTR,
    model2_CVR: d.CVR,
    }));
    
        
    return (
    <>
        <h2>Performance Chart</h2>
        <div>
        <label htmlFor="start-date">Start Date:</label>
        <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
        <label htmlFor="end-date">End Date:</label>
        <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
        </div>
        <LineChart width={width} height={height} data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={<CustomXAxisTick />} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="model1_CTR" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="model1_CVR" stroke="#82ca9d" />
        <Line type="monotone" dataKey="model2_CTR" stroke="#FF8C00" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="model2_CVR" stroke="#ff7300" />
        </LineChart>
    </>
    );
};
    
export default Chart_advance;