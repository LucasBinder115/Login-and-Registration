import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreatePlaylist from './pages/CreatePlaylist.jsx';
import Playlist from './pages/Playlist.jsx';
import Songs from './pages/Songs.jsx';
import UploadSong from './pages/UploadSong.jsx';
import Home from './pages/Home.jsx';
import MusicPlayer from './MusicPlayer.jsx';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-playlist" element={<CreatePlaylist />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/upload-song" element={<UploadSong />} />
      </Routes>
      <MusicPlayer />
    </div>
  );
}

export default App;