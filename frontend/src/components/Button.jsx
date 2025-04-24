// src/components/Button.jsx
function Button({ children, variant = 'primary', onClick, className = '' }) {
    const baseStyles = 'p-2 rounded';
    const variants = {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
      danger: 'bg-red-500 text-white',
    };
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }
  
  export default Button;