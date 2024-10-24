import React from 'react'
import SidebarList from './SidebarList';

const PageKelas = () => {
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
          </table>
      </div>
    </div>
  )
}

export default PageKelas