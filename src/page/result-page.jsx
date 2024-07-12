import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ClusterContext } from '../context/cluster-context'; 
import '../css/result.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Result() {
  const { clusters } = useContext(ClusterContext);
  const [processedClusters, setProcessedClusters] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState({ datasets: [] });

  useEffect(() => {
    if (clusters) {
      const keys = Object.keys(clusters.rice_brand);
      const data = keys.map(key => ({
        no: key,
        rice_brand: clusters.rice_brand[key],
        sosoh_degree: clusters.sosoh_degree[key],
        water_content: clusters.water_content[key],
        broken_item: clusters.broken_item[key],
        cluster: clusters.cluster[key]
      }));
      setProcessedClusters(data);

      const clusterGroups = data.reduce((acc, row) => {
        acc[row.cluster] = acc[row.cluster] || [];
        acc[row.cluster].push({
          x: row.sosoh_degree,
          y: row.water_content,
          r: row.broken_item * 150, 
          label: row.rice_brand
        });
        return acc;
      }, {});

      const datasets = Object.keys(clusterGroups).map(cluster => ({
        label: `Cluster ${cluster}`,
        data: clusterGroups[cluster],
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
      }));

      setData({ datasets });
    }
  }, [clusters]);

  const handleBack = () => {
    navigate("/");
  };

  if (!Array.isArray(processedClusters) || processedClusters.length === 0) {
    return <div>Error: No cluster data available.</div>;
  }

  const renderTable = (data, clusterNumber) => (
    <div key={clusterNumber}>
      <h3>Cluster {clusterNumber}</h3>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Rice Brand</th>
            <th>Sosoh Degree</th>
            <th>Water Content</th>
            <th>Broken Item</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.no}</td>
              <td>{row.rice_brand}</td>
              <td>{row.sosoh_degree}</td>
              <td>{row.water_content}</td>
              <td>{row.broken_item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const clusterGroups = processedClusters.reduce((acc, row) => {
    acc[row.cluster] = acc[row.cluster] || [];
    acc[row.cluster].push(row);
    return acc;
  }, {});

  const clusterEntries = Object.entries(clusterGroups);

  return (
    <div className="result-container">
      <header>
        <img src="akuras.png" alt="Akuras" className="logo  mb-5" />
        <h1>Result</h1>
        <p>Cluster of Rice Quality K= {clusterEntries.length}</p>
      </header>
      <div className="chart-section">
        <Bubble data={data} options={{ scales: { x: { type: 'linear', position: 'bottom' } } }} />
      </div>
      <div className="table-section">
        {clusterEntries.map(([clusterNumber, data]) => renderTable(data, clusterNumber))}
      </div>
      <button onClick={handleBack} className="back-button">
        Kembali
      </button>
      <p class="copyright" style={{marginTop: '6rem'}}>&copy; 2024 - Kelompok 5 (Helmi, Raihan, Lukman, Riski, Perdly)</p>
    </div>
  );
}

export default Result;
