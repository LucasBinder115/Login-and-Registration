import { Link } from 'react-router-dom';
import Logo from '../assets/LogoRit.png';

export default function Navbar() {
  return (
    <nav className="bg-purple-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <img src={Logo} alt="Logo RYTHMO" className="h-12" />
          </Link>
          <div className="hidden md:block space-x-4">
            <Link 
              to="/login" 
              className="text-white hover:bg-purple-700 px-3 py-2 rounded-md transition-colors"
            >
              Entrar
            </Link>
            <Link
              to="/register"
              className="bg-white text-purple-800 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}