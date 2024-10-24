import SidebarList from './SidebarList';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageDetailVideo = () => {

    const [videos, setDetails] = useState([]);

    useEffect(() => {
        getDetails();
    }, []);

    const getDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/videos');
            setDetails(response.data);
            console.log(response.data); 
        } catch (error) {
            console.error('Error fetching videos:', error); 
        }
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <SidebarList />

            {/* Content Area */}
            <div className="content" style={{ backgroundColor: 'white', padding: '20px' }}>
                <h1 className="has-text-black text-center">Daftar Video (Detail)</h1>
                
                <div style={{ marginBottom: '20px' }}>
                    <Link to="/video">
                        <button className="button is-warning">Kembali</button>
                    </Link>
                    <Link to="">
                        <button className="button is-primary ml-3">Tambah Video</button>
                    </Link>
                </div>

                {/* Tabel Data Video */}
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Sub Judul</th>
                            <th>File Video</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video, index) => (
                            <React.Fragment key={video.id_video}>
                                {video.VideoFiles.map((file, fileIndex) => (
                                    <tr key={file.id_file}>
                                        <td>{index + 1}</td>
                                        <td>{file.sub_judul}</td>
                                        <td>
                                            <video width="320" height="240" controls>
                                                <source src={file.video_file} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </td>
                                        <td>
                                            <button className="button is-small is-info">Edit</button>
                                            <button className="button is-small is-danger">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PageDetailVideo;
