import React from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-12">
          Bem-vindo ao RYTHMO
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card do Player */}
          <Link 
            to="/player" 
            className="home-card group"
          >
            <div className="card-content">
              <FaMusic className="card-icon" />
              <h2 className="card-title">Reprodutor de Música</h2>
              <p className="card-description">
                Acesse nosso player avançado e gerencie suas faixas
              </p>
            </div>
          </Link>

          {/* Card de Login */}
          <Link 
            to="/login" 
            className="home-card group"
          >
            <div className="card-content">
              <FaSignInAlt className="card-icon" />
              <h2 className="card-title">Acesso à Conta</h2>
              <p className="card-description">
                Faça login para acessar recursos exclusivos
              </p>
            </div>
          </Link>

          {/* Card de Registro */}
          <Link 
            to="/register" 
            className="home-card group"
          >
            <div className="card-content">
              <FaUserPlus className="card-icon" />
              <h2 className="card-title">Criar Conta</h2>
              <p className="card-description">
                Cadastre-se para começar a usar a plataforma
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <p className="text-purple-200 text-lg">
            Explore nossas funcionalidades e transforme sua experiência musical
          </p>
        </div>
      </div>
    </div>
  );
}