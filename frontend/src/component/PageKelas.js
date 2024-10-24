import SidebarList from './SidebarList';
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PageKelas = () => {
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    getKelas();
  }, []);

  const getKelas = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/kelas');
      setKelas(response.data); // Simpan data ke state
      console.log(response.data); // Debugging untuk melihat data yang diterima
    } catch (error) {
      console.error('Error fetching videos:', error); // Tangani error
    }
  };
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <SidebarList />

      {/* Content Area */}
      <div className="content" style={{ backgroundColor: 'white', padding: '20px' }}>
        <h1 className="has-text-black">Daftar Kelas</h1>
        
        {/* Button Add Video */}
        <div style={{ marginBottom: '20px' }}>
          <button className="button is-primary">Add Kelas</button>
        </div>

        {/* Tabel Data Kelas */}
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Sampul</th>
              <th>Jadwal</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
          {kelas.map((kelas, index) => (
            <tr key={kelas.id_kelas}> {/* Menggunakan id_video dari database */}
              <td>{index + 1}</td>
              <td>{kelas.judul_kelas}</td>
              <td>{kelas.deskripsi_kelas}</td>
              <td>
                <img src={kelas.sampul_kelas} alt="Sampul" width="100" />
              </td>
              <td>{`Rp ${kelas.jadwal}`}</td> 
              <td>{`Rp ${kelas.harga_kelas}`}</td> 
              <td>
              <Link to={`/edit-kelas/${kelas.id_kelas}`}>
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
  )
}

export default PageKelas