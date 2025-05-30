import { Link } from 'react-router-dom';
import Button from '../../components/Button';

export default function Login() {
  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-purple-800 text-center mb-8">
          Acesse sua conta
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="exemplo@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <Button variant="primary" className="w-full py-3">
            Entrar
          </Button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Não tem conta? {' '}
          <Link to="/register" className="text-purple-700 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}