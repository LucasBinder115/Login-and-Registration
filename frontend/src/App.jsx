import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AudioPlayerPage from "./components/AudioPlayer/AudioPlayer";
import Uploader from "./components/Uploader/index";
import NotFound from "./pages/NotFound/Notfound";
import "./index.css";

function App() {
  const [audioPath, setAudioPath] = useState(() => {
    // Inicialização lazy do state
    const savedPath = localStorage.getItem("audioPath");
    return savedPath ? JSON.parse(savedPath) : null;
  });

  const handleUploadComplete = (newPath) => {
    localStorage.setItem("audioPath", JSON.stringify(newPath));
    setAudioPath(newPath);
  };

  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rotas Protegidas */}
        <Route path="/player" element={<AudioPlayerPage filePath={audioPath} />} />
        <Route
          path="/upload"
          element={<Uploader onUploadComplete={handleUploadComplete} />}
        />

        {/* Rota Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;