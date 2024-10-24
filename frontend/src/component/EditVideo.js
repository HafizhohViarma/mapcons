import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarList from './SidebarList';
import { Link } from 'react-router-dom';

const EditVideo = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate();
    const [videoData, setVideoData] = useState({
        judul_video: '',
        keterangan_video: '',
        sampul_video: null, // Ubah ini menjadi null untuk menampung file
        harga_video: ''
    });
    

    // Mengambil data video berdasarkan ID
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/videos/${id}`);
                setVideoData(response.data);
            } catch (error) {
                console.error('Error fetching video details:', error);
            }
        };
        fetchVideo();
    }, [id]);

    // Menangani perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Menangani perubahan file untuk sampul_video
    const handleFileChange = (e) => {
        setVideoData((prevData) => ({
            ...prevData,
            sampul_video: e.target.files[0], // Simpan file yang diupload
        }));
    };

    // Menangani submit formulir
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Menambahkan data ke FormData
        formData.append('judul_video', videoData.judul_video);
        formData.append('keterangan_video', videoData.keterangan_video);
        formData.append('harga_video', videoData.harga_video);
        
        // Jika ada file yang diupload, tambahkan ke FormData
        if (videoData.sampul_video) {
            formData.append('sampul_video', videoData.sampul_video);
        }

        try {
            await axios.put(`http://localhost:8082/api/videos/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Mengatur header untuk form data
                }
            });
            navigate('/videos'); // Kembali ke halaman daftar video setelah sukses
        } catch (error) {
            console.error('Error updating video:', error.response.data); // Tampilkan respons dari server
        }
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <SidebarList />
            <div className="content" style={{ backgroundColor: 'white', padding: '20px' }}>
                <Link to="/video">
                        <button className="button is-warning">Kembali</button>
                </Link>
                <h1 className="has-text-black text-center">Form Edit Video</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Judul Video</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="judul_video"
                                value={videoData.judul_video}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Keterangan Video</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="keterangan_video"
                                value={videoData.keterangan_video}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Sampul Video (Upload File)</label>
                        <div className="control">
                            <input
                                type="file"
                                className="input"
                                name="sampul_video"
                                onChange={handleFileChange} // Panggil handleFileChange
                                accept="image/*" // Hanya menerima file gambar
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Harga Video</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="harga_video"
                                value={videoData.harga_video}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVideo;

///ARRRGGHHHHHHHH
