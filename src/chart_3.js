import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import Select from 'react-select';


const data = [];
for (let i = 1; i <= 31; i++) {
  const CTR = Math.random() * 0.05 + 0.02; // 0.02 ~ 0.07 사이의 랜덤값 생성
  const CVR = Math.random() * 0.01 + 0.001; // 0.001 ~ 0.01 사이의 랜덤값 생성
  const date = `202303${i.toString().padStart(2, '0')}`; // 20230301 ~ 20230331 까지의 날짜 생성
  data.push({ date, CTR, CVR });
}



// const options = [
//   { value: 'CTR', label: 'CTR' },
//   { value: 'CVR', label: 'CVR' },
// ];


const CustomXAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-20} y={-15} width={40} height={30} fill="#8884d8" rx={10} />
    <text x={0} y={0} dy={6} textAnchor="middle" fill="#fff" fontSize={14}>
      {payload.value}
    </text>
  </g>
);

const Chart = () => {
  const [width, setWidth] = useState(window.innerWidth * 0.4);
  const [height, setHeight] = useState(window.innerHeight * 0.3);
  // const [selectedOption, setSelectedOption] = useState(options[0]);
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

  // const handleChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);
  // };
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // startDate를 'YYYYMMDD' 형태의 string으로 변환
  const startDateString = new Date(startDate).toISOString().slice(0, 10).replace(/-/g, '');
  // endDate를 'YYYYMMDD' 형태의 string으로 변환
  const endDateString = new Date(endDate).toISOString().slice(0, 10).replace(/-/g, '');

  const filteredData = data.filter((d) => d.date >= startDateString && d.date <= endDateString).map((d) => ({
    date: d.date,
    CTR: d.CTR,
    CVR: d.CVR,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          {payload.map((data, i) => (
          <p key={i}>{`${data.dataKey}: ${(data.value * 100).toFixed(2)}%`}</p>
        ))}
          <p>{`Date: ${label}`}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
  <>
    <input type="date" value={startDate} onChange={handleStartDateChange} />
    <input type="date" value={endDate} onChange={handleEndDateChange} />
    <LineChart width={width} height={height} data={filteredData}>
      <CartesianGrid strokeDasharray="3 3" tick={<CustomXAxisTick />}/>
      <XAxis dataKey="date" />
      <YAxis />
      <Legend />
      <Line type="monotone" dataKey="CTR" stroke="#8884d8" />
      <Line type="monotone" dataKey="CVR" stroke="#82ca9d" />
      <Tooltip content={<CustomTooltip />} />
    </LineChart>
    </>
  );
};

export default Chart;
