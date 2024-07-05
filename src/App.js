import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Upload from './page/upload-page';
import FileUploaded from './page/file-upload-page';
import Processing from './page/process-page';
import Result from './page/result-page';
import './App.css';
import { ClusterProvider } from './context/cluster-context';

function App() {
  const [file, setFile] = useState(null);

  return (
    <ClusterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Upload onFileSelect={setFile} />} />
          <Route path="/file-uploaded" element={<FileUploaded file={file} />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </ClusterProvider>
  );
}

export default App;
