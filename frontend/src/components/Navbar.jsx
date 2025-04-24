import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Context/store';

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/playlist" className="mr-4">Playlists</Link>
        <Link to="/songs">Songs</Link>
      </div>
      <div>
        {user ? (
          <button onClick={handleLogout} className="p-2 bg-red-500 rounded">
            Logout
          </button>
        ) : (
          <Link to="/login" className="p-2 bg-blue-500 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;