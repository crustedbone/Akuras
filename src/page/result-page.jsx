import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ClusterContext } from '../context/cluster-context'; 
import '../css/result.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const data = {
  datasets: [
    {
      label: "Car",
      data: [
        { x: 10, y: 20, r: 15 },
        { x: 15, y: 10, r: 10 },
        { x: 25, y: 15, r: 20 },
      ],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
    {
      label: "Motorcycles",
      data: [
        { x: 20, y: 30, r: 25 },
        { x: 30, y: 20, r: 15 },
        { x: 35, y: 25, r: 30 },
      ],
      backgroundColor: "rgba(153, 102, 255, 0.6)",
    },
  ],
};

const options = {
  scales: {
    x: {
      type: "linear",
      position: "bottom",
    },
  },
};

function Result() {
  const { clusters } = useContext(ClusterContext);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const renderTable = (clusterNumber) => (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4, 5].map((row) => (
          <tr key={row}>
            <td>{row}</td>
            <td>{clusterNumber}</td>
            <td>{clusterNumber}</td>
            <td>{clusterNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="result-container">
      <header>
        <img src="akuras.png" alt="Akuras" className="logo" />
        <h1>Result</h1>
        <p>Cluster of Rice Quality K= {clusters}</p>
      </header>
      <div className="chart-section">
        <Bubble data={data} options={options} />
      </div>
      <div className="table-section">
        <div>
          <h3>Cluster 1</h3>
          {renderTable(1)}
        </div>
        <div>
          <h3>Cluster 2</h3>
          {renderTable(2)}
        </div>
        <div>
          <h3>Cluster 3</h3>
          {renderTable(3)}
        </div>
        <div>
          <h3>Cluster 4</h3>
          {renderTable(4)}
        </div>
      </div>
      <button onClick={handleBack} className="back-button">
        Kembali
      </button>
      <p class="copyright" style={{marginTop: '6rem'}}>&copy; 2024 - Kelompok 5 (Helmi, Raihan, Lukman, Riski, Perdly)</p>
    </div>
  );
}

export default Result;
