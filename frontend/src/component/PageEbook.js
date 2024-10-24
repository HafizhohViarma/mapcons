import React from 'react'
import SidebarList from './SidebarList';

const PageEbook = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <SidebarList />

      {/* Content Area */}
      <div className="content" style={{ backgroundColor: 'white', padding: '20px' }}>
        <h1 className="has-text-black">Daftar E-Book</h1>
        
        {/* Button Add E-Book */}
        <div style={{ marginBottom: '20px' }}>
          <button className="button is-primary">Add E-Book</button>
        </div>

        {/* Tabel Data Video */}
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Sampul</th>
              <th>File E-Book</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          </table>
      </div>
    </div>
  )
}

export default PageEbook