import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Upload({ onFileSelect }) {
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    onFileSelect(event.target.files[0]);
    navigate('/file-uploaded');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="akuras.png" alt="Akuras" className="logo" />
        <h1 style={{margin: 0}}>Upload Data Set</h1>
        <p style={{margin: 0}}>Please upload file with EXCEL/CSV format.</p>
        <input 
          type="file" 
          accept=".csv, .xlsx" 
          onChange={handleFileChange} 
          id="file-upload"
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload" className="upload-button">
          Select EXCEL/CSV file
        </label>
        <p class="copyright" style={{marginTop: '6rem'}}>&copy; 2024 - Kelompok 5 (Helmi, Raihan, Lukman, Riski, Perdly)</p>
      </header>
    </div>
  );
}

export default Upload;
