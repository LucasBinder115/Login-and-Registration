import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Context/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('YOUR_API_URL/login', { email, password });
      dispatch(login({ token: response.data.token }));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Logo */}
      <div className="absolute left-[2vh] top-[2vh] text-white text-[2rem] font-bold">
        itar
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="pt-10">
        <h2 className="ml-[20vh] text-[#f1f1f1] font-['Alatsi'] font-normal text-[10vh] leading-none mb-8">
          LOGIN NO RYTHMO
        </h2>
        <div className="mb-8">
          <label className="ml-[20vh] block text-[#f1f1f1] font-['Alatsi'] font-normal text-[4vh] mb-2">
            INSIRA SEU EMAIL:
          </label>
          <input
            type="email"
            placeholder="@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ml-[20vh] h-[7vh] w-[60vh] rounded-[30px] text-[40px] border-none focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500"
            required
          />
        </div>
        <div className="mb-8">
          <label className="ml-[20vh] block text-[#f1f1f1] font-['Alatsi'] font-normal text-[4vh] mb-2">
            INSIRA SUA SENHA:
          </label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="ml-[20vh] h-[7vh] w-[60vh] rounded-[30px] text-[40px] border-none focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500"
            required
          />
        </div>
        <div className="mt-[2vh] ml-[20vh]">
          <Button type="submit" variant="primary">
            LOGAR
          </Button>
        </div>
      </form>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full flex justify-center py-[10px] z-[1000]">
        <button className="footer-button">Sobre</button>
        <button className="footer-button">Central de ajuda</button>
        <button className="footer-button">Política de privacidade</button>
        <button className="footer-button">Acessibilidade</button>
      </footer>
    </div>
  );
}

export default Login;