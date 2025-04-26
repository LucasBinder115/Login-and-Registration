import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AudioPlayer from "./components/AudioPlayer";
import Uploader from "./components/Uploader";
import "./App.css";

// Função para obter dados do localStorage
const getLocalStorage = () => {
  const filePath = localStorage.getItem("filePath");
  return filePath ? JSON.parse(filePath) : "";
};

function App() {
  const [path, setPath] = useState(getLocalStorage());

  // Atualiza o caminho no state e localStorage
  const handlePathUpdate = (newPath) => {
    localStorage.setItem("filePath", JSON.stringify(newPath));
    setPath(newPath);
  };

  return (
    <Router>
      <Routes>
        {/* Rota Principal */}
        <Route path="/" element={<Home />} />

        {/* Rotas de Autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas de Funcionalidades */}
        <Route
          path="/upload"
          element={<Uploader onPathUpdate={handlePathUpdate} />}
        />
        <Route
          path="/player"
          element={<AudioPlayer filePath={path} />}
        />

        {/* Rota para Página Não Encontrada */}
        <Route path="*" element={<div>ERROR. PAGE NOT FOUND.</div>} />
      </Routes>
    </Router>
  );
}

export default App;