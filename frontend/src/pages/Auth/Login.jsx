import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Context/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  EnvelopeIcon, 
  LockClosedIcon 
} from '@heroicons/react/24/outline';

// Logo component placeholder
const Logo = (props) => (
  <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

// Social logos
const GoogleLogo = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="currentColor"/>
  </svg>
);

const MicrosoftLogo = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" fill="currentColor"/>
  </svg>
);

// Input Component
const Input = ({ label, icon, error, endAdornment, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className={`relative rounded-md shadow-sm ${error ? 'animate-shake' : ''}`}>
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border ${
          error ? 'border-red-300' : 'border-gray-300'
        } rounded-md focus:outline-none focus:ring-2 ${
          error ? 'focus:ring-red-500' : 'focus:ring-purple-500'
        }`}
      />
      {endAdornment}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('YOUR_API_URL/login', { email, password });
      dispatch(login({ token: response.data.token }));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full px-8 py-12 bg-white rounded-xl shadow-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo className="mx-auto h-12 w-auto" />
          <h1 className="text-4xl font-bold text-gray-900">RYTHMO</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            FAÇA SEU LOGIN
          </h2>
        </div>

        {/* Formulário */}
        <form onSubmit={onSubmit} className="space-y-6">
          <Input 
            label="EMAIL"
            type="email"
            placeholder="exemplo@gmail.com"
            icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
            value={email}
            onChange={(e) => setEmail(e.value)}
            required
          />
          
          <Input 
            label="SENHA"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            endAdornment={
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            }
          />

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-3 text-lg font-medium"
            isLoading={isSubmitting}
            loadingText="Autenticando..."
          >
            ENTRAR
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continue com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" icon={<GoogleLogo />}>
              Google
            </Button>
            <Button variant="secondary" icon={<MicrosoftLogo />}>
              Microsoft
            </Button>
          </div>
        </form>

        {/* Links adicionais */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <a href="#" className="text-purple-600 hover:text-purple-800">
            Esqueceu sua senha?
          </a>
          <span className="mx-2">•</span>
          <a href="#" className="text-purple-600 hover:text-purple-800">
            Criar conta
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;