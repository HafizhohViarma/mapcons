import SidebarList from './SidebarList';
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PageVideo = () => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/videos');
      setVideos(response.data); // Simpan data ke state
      console.log(response.data); // Debugging untuk melihat data yang diterima
    } catch (error) {
      console.error('Error fetching videos:', error); // Tangani error
    }
  };
  //inisialisasi
  // const videoData = [
  //   {
  //     id: 1,
  //     judul_video: 'Video 1',
  //     keterangan_video: 'Deskripsi Video 1',
  //     sampul_video: 'sampul1.jpg',
  //     video_file: 'video1.mp4',
  //     harga_video: 'Rp 100,000',
  //   },
  // ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <SidebarList />

      {/* Content Area */}
      <div className="content" style={{ backgroundColor: 'white', padding: '20px' }}>
        <h1 className="has-text-black text-center">Daftar Video</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <Link to="/add-video">
            <button className="button is-primary">Add Video</button>
          </Link>
        </div>

        {/* Tabel Data Video */}
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Sampul</th>
              <th>Video</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
          {videos.map((video, index) => (
            <tr key={video.id_video}> {/* Menggunakan id_video dari database */}
              <td>{index + 1}</td>
              <td>{video.judul_video}</td>
              <td>{video.keterangan_video}</td>
              <td>
                <img src={video.sampul_video} alt="Sampul" width="100" />
              </td>
              <td>
                <Link to="/videos">
                  <button>Detail</button>
                </Link>
              </td>
              <td>{`Rp ${video.harga_video}`}</td> 
              <td>
              <Link to={`/edit-video/${video.id_video}`}>
                  <button className="button is-small is-info">Edit</button>
              </Link>
                <button className="button is-small is-danger">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageVideo;
