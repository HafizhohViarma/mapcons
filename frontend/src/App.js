import AdminList from "./component/AdminList";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PageVideo from "./component/PageVideo";
import PageEbook from "./component/PageEbook";
import PageKelas from "./component/PageKelas";
import PageUser from "./component/PageUser";
import PageTestimoni from "./component/PageTestimoni";
import PageTransaksi from "./component/PageTransaksi";
import AddVideo from "./component/AddVideo";
import AddVideos from "./component/AddVideos";
import PageDetailVideo from "./component/PageDetailVideo";
import EditVideo from "./component/EditVideo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminList/>}/>
        <Route path="/video" element={<PageVideo/>}/>
        <Route path="/ebook" element={<PageEbook/>}/>
        <Route path="/kelas" element={<PageKelas/>}/>
        <Route path="/user" element={<PageUser/>}/>
        <Route path="/testimoni" element={<PageTestimoni/>}/>
        <Route path="/transaksi" element={<PageTransaksi/>}/>
        <Route path="/videos" element={<PageDetailVideo/>}/>

        {/* add */}
        <Route path="/add-video" element={<AddVideo/>}/>
        <Route path="/edit-video/:id" element={<EditVideo/>}/>
        {/* dihalaman Detail Video */}
        <Route path="/add-videos" element={<AddVideos/>}/>

        {/* Kelas */}
        <Route path="/edit-kelas/:id" element={<EditVideo/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
