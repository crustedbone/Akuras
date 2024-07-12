import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import "../App.css";
import { ClusterContext } from "../context/cluster-context";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function FileUploaded({ file }) {
  const [clustersInput, setClustersInput] = useState("");
  const navigate = useNavigate();
  const { setClusters } = useContext(ClusterContext);

  const handleProcess = async () => {
    if (clustersInput) {
      if (clustersInput < 2) {
        alert("Jumlah Cluster Minimal Diisi 2");
      } else {
        setClusters(clustersInput);
        let val = true;
        try {
          const formData = new FormData();
          formData.append("file", file);

          const uploadResponse = await axios.post(
            "http://localhost:8000/uploadfile/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (uploadResponse.status !== 200) {
            alert("Gagal Upload!");
            return;
          }

          const processResponse = await axios.post(
            "http://localhost:8000/proses/",
            `kvalue=${clustersInput}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          if (processResponse.status === 200) {
            setClusters(processResponse.data.hasil);
            navigate("/processing");
            setTimeout(() => {
              navigate("/result");
            }, 1000);
          } else {
            alert("Gagal Proses.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        }
      }
    } else {
      alert("Jumlah Cluster Belum Diisi");
    }
  };

  const handleDelete = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <header className="text-center my-4">
        <img src="akuras.png" alt="Akuras" className="logo  mb-5" />
        <h1 style={{ margin: 0 }}>
          <UploadFileIcon
            style={{ color: "#fd8500", fontSize: "8rem", margin: 0 }}
          />
        </h1>
      </header>
      <div className="file-uploaded text-center">
        <h2>
          {file.name}{" "}
          <DeleteOutlineIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={handleDelete}
          />
        </h2>
        <div className="mb-0">
          <label htmlFor="clusters" className="me-2"><b>Jumlah Cluster:</b></label>
          <input
            type="number"
            id="clusters"
            value={clustersInput}
            onChange={(e) => setClustersInput(e.target.value)}
            required
          />
        </div>
        <br />
        <input
          type="button"
          onClick={handleProcess}
          id="proses"
          style={{ display: "none" }}
        />
        <label htmlFor="proses" className="process-button ">
          <h3>
            <b>
              Process
            </b>
          </h3>
        </label>
      </div>
      <p class="copyright text-center" style={{ marginTop: "6rem" }}>
        &copy; 2024 - Kelompok 5 (Helmi, Raihan, Lukman, Riski, Perdly)
      </p>
    </div>
  );
}

export default FileUploaded;
