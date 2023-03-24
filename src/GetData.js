import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {data.map((row) => (
        <div key={row.id}>{row.name}</div>
      ))}
    </div>
  );
}

export default App;
