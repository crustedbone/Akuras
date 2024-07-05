import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import '../App.css';
import { ClusterContext } from '../context/cluster-context';

function FileUploaded({ file }) {
  const [clustersInput, setClustersInput] = useState('');
  const navigate = useNavigate();
  const { setClusters } = useContext(ClusterContext);

  const handleProcess = () => {
    if (clustersInput) {
      setClusters(clustersInput);
      navigate('/processing');
      setTimeout(() => {
        navigate('/result');
      }, 10); // Simulasi waktu processing
    } else {
      alert('Jumlah Cluster Belum Diisi');
    }
  };

  const handleDelete = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="akuras.png" alt="Akuras" className="logo" />
        <h1 style={{margin: 0}}><UploadFileIcon style={{ color: '#fd8500', fontSize: '8rem', margin: 0}}/></h1>
        <div className="file-uploaded" style={{margin: 0}}>
          <p>{file.name} <DeleteOutlineIcon style={{ color: 'red', cursor: 'pointer' }}
              onClick={handleDelete}/></p>
          <label htmlFor="clusters">Jumlah Cluster:</label>
          <input
            type="number"
            id="clusters"
            value={clustersInput}
            onChange={(e) => setClustersInput(e.target.value)}
            required
          /><br/>
          <input 
            type="button" 
            onClick={handleProcess} 
            id="proses"
            style={{ display: 'none' }}
          /><br/>
          <label htmlFor="proses" className="process-button">
            Process
          </label>
        </div>
        <p class="copyright" style={{marginTop: '6rem'}}>&copy; 2024 - Kelompok 5 (Helmi, Raihan, Lukman, Riski, Perdly)</p>
      </header>
    </div>
  );
}

export default FileUploaded;
