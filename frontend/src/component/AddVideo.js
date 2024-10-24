import React, { useState } from "react";
import axios from "axios";  
import SidebarList from "./SidebarList";
import '../style.css';
import { Link, useNavigate } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css';

const AddVideo = () => {
  // State untuk menyimpan input data
  const [judul_video, setJudul] = useState("");
  const [keterangan_video, setKeterangan] = useState("");
  const [harga_video, setHarga] = useState("");
  const [sampul_video, setSampul] = useState(null); 
  const [videoFiles, setVideoFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Handle perubahan file
  const handleSampulChange = (e) => {
    setSampul(e.target.files[0]);
  };

  const handleVideoFilesChange = (e) => {
    setVideoFiles([...e.target.files]); // Bisa upload multiple files
  };

  // Handle submit form
  const saveVideo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("judul_video", judul_video);
    formData.append("keterangan_video", keterangan_video);
    formData.append("harga_video", harga_video);
    formData.append("sampul_video", sampul_video);

    // Ganti nama field ini
    videoFiles.forEach((file) => {
      formData.append("video_files", file); 
    });

    try {
        await axios.post("http://localhost:8082/api/videos", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        
        setMessage("Video created successfully!");
        navigate("/video");

        // Reset form setelah submit
        setJudul("");
        setKeterangan("");
        setHarga("");
        setSampul(null);
        setVideoFiles([]);
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data);
            setMessage(`Error: ${error.response.data.message || 'Terjadi kesalahan'}`);
        } else {
            console.error('Error:', error.message);
            setMessage('Error: Tidak ada respon dari server');
        }
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="dashboard">
      {/* Sidebar */}
      <SidebarList/>
        
      <div className="content" style={{ padding: '30px' }}>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/video">
            <button className="button is-warning">Kembali</button>
          </Link>
        </div>
        <h2 className="text-center">Form Tambah Video</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={saveVideo}>
          <div className="form-group">
            <label>Judul Video</label>
            <input
              type="text"
              className="form-control"
              value={judul_video}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Keterangan Video</label>
            <textarea
              className="form-control"
              value={keterangan_video}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Harga Video</label>
            <input
              type="number"
              className="form-control"
              value={harga_video}
              onChange={(e) => setHarga(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Sampul Video</label>
            <input
              type="file"
              className="form-control"
              onChange={handleSampulChange}
              required
            />
          </div>

          <div className="form-group">
            <label>File Video</label>
            <input
              type="file"
              className="form-control"
              name="video_files"
              onChange={handleVideoFilesChange}
              multiple
            />
            <small className="form-text text-muted">
              {videoFiles.length > 0 && `${videoFiles.length} file dipilih`}
            </small>
          </div>

          <button type="submit" className="button is-primary mt-3" disabled={loading}>
            {loading ? 'Loading...' : 'Add Video'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;
