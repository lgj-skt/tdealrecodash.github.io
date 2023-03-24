import './App.css';
import React from 'react';
import Chart from './chart.js';



// console.log(data)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://play-lh.googleusercontent.com/oE2loQat2xmqykAUh5nXhAIcJya7Cr1aE5SW7kdlajvehPO7CqJ4UkBYsCVA3P7DMgI" alt="logo" heigth="200" width="100" />
        <div className="chart-container">
          <div className="chart">
            <h3>오늘의 티딜</h3>
            <Chart />
            <h3>연관 상품 추천</h3>
            <Chart />
          </div>
          <div className="chart">
            <h3>티딜 베스트</h3>
            <Chart />
            <h3>신규 상품</h3>
            <Chart />
          </div>
        </div>
        
      </header>
    </div>
  );
}

export default App;
