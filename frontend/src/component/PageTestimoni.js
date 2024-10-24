import React from 'react'
import SidebarList from './SidebarList';

const PageTestimoni = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <SidebarList />

      {/* Content Area */}
      <div className="content" style={{ backgroundColor: 'white', padding: '20px' }}>
        <h1 className="has-text-black">Daftar Testimoni / Feedback</h1>
        
        {/* Button Add Video */}
        <div style={{ marginBottom: '20px' }}>
          <button className="button is-primary">Add Testimoni</button>
        </div>

        {/* Tabel Data Testimoni */}
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Sampul</th>
              <th>Feedback</th>
              <th>Aksi</th>
            </tr>
          </thead>
          </table>
      </div>
    </div>
  )
}

export default PageTestimoni