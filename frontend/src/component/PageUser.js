import React from 'react'
import SidebarList from './SidebarList';

const PageUser = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <SidebarList />

      {/* Content Area */}
      <div className="content" style={{ backgroundColor: 'white', padding: '20px' }}>
        <h1 className="has-text-black">Daftar User</h1>
        
        {/* Button Add Video */}
        <div style={{ marginBottom: '20px' }}>
          <button className="button is-primary">Add User</button>
        </div>

        {/* Tabel Data User */}
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Telp</th>
              <th>Level</th>
              <th>Aksi</th>
            </tr>
          </thead>
          </table>
      </div>
    </div>
  )
}

export default PageUser