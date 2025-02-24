import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Autenticação</h1>
      <Login />
      <Register />
    </div>
  );
}

export default App;