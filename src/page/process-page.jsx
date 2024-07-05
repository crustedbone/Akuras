import React, { useEffect, useState } from 'react';
import '../App.css';

function Processing() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <img src="akuras.png" alt="Akuras" className="logo" />
        <h1>Processing...</h1>
        <div className="progress-circle">
          <svg>
            <circle cx="50" cy="50" r="45"></circle>
            <circle
              cx="50"
              cy="50"
              r="45"
              style={{ strokeDashoffset: 282.6 - (282.6 * progress) / 100 }}
            ></circle>
          </svg>
          <div className="progress-value">{progress}%</div>
        </div>
      </header>
    </div>
  );
}

export default Processing;
