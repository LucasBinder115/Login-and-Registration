import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    tipo: 'comum',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending formData:', formData);
    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const text = await response.text();
      console.log('Raw response:', text);
      if (!response.ok) {
        try {
          const result = JSON.parse(text);
          setError(result.error || `Erro: ${response.status}`);
        } catch {
          setError(`Erro: Resposta inválida do servidor (${response.status})`);
        }
        return;
      }
      const result = JSON.parse(text);
      setSuccess('Registro bem-sucedido!');
      setError(null);
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      setError('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-purple-800 text-center mb-8">
          Crie sua conta
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Nome de usuário</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <Button variant="primary" className="w-full py-3" type="submit">
            Registrar
          </Button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Já tem conta?{' '}
          <Link to="/login" className="text-purple-700 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}