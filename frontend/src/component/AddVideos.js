import React, { useState } from "react";
import axios from "axios";  
import SidebarList from "./SidebarList";
import '../style.css';
import { Link, useNavigate } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css';

const AddVideos = () => {
    const [sub_judul, setSubJudul] = useState("");
    const [video_files, setVideoFiles] = useState(null); // Mengubah ini menjadi null untuk menyimpan file
    const navigate = useNavigate();

    const saveVideos = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("sub_judul", sub_judul);
        formData.append("video_files", video_files);

        try {
            await axios.post("http://localhost:8082/api/videos", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set header untuk multipart/form-data
                },
            });
            navigate ("/videos");
        } catch (error) {
            console.log(error.response.data); // Tampilkan data error jika ada
        }
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <SidebarList />
            
            <div className="content" style={{ padding: '30px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <Link to="/video">
                        <button className="button is-warning">Kembali</button>
                    </Link>
                </div>
                <h2 className="text-center">Form Tambah Video</h2>
                <form onSubmit={saveVideos}>
                    <div className="form-group">
                        <label>Sub Judul Video</label>
                        <input
                            type="text"
                            className="form-control"
                            value={sub_judul}
                            onChange={(e) => setSubJudul(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>File Video</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setVideoFiles(e.target.files[0])} // Ambil file pertama
                            required
                        />
                    </div>

                    <button type="submit" className="button is-primary mt-3">
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddVideos;
