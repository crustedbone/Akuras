import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Upload({ onFileSelect }) {
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    onFileSelect(event.target.files[0]);
    navigate('/file-uploaded');
  };

  return (
    <div className="container text-center">
      <header className="my-4">
        <img src="akuras.png" alt="Akuras" className="logo  mb-0" />
        <p className="text-center mb-4 logo-text">Analisa Kualitas Beras</p>
        <h1 className='mb-2'><b>Upload Data Set</b></h1>
        <h5 className='mb-3'>Please upload file with EXCEL/CSV format.</h5>
        <input 
          type="file" 
          accept=".csv, .xlsx" 
          onChange={handleFileChange} 
          id="file-upload"
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload" className="upload-button mb-3">
          <h3><b>Select EXCEL/CSV file</b></h3>
        </label>
        <p class="copyright" style={{marginTop: '6rem'}}>&copy; 2024 - Kelompok 5 (Helmi, Raihan, Lukman, Riski, Perdly)</p>
      </header>
    </div>
  );
}

export default Upload;
