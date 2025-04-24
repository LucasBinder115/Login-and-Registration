import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user ? user.name : 'Guest'}!
      </h1>
      <div className="space-y-4">
        <Link to="/create-playlist" className="block p-4 bg-blue-500 text-white rounded">
          Create Playlist
        </Link>
        <Link to="/playlist" className="block p-4 bg-green-500 text-white rounded">
          View Playlists
        </Link>
        <Link to="/songs" className="block p-4 bg-purple-500 text-white rounded">
          View Songs
        </Link>
        <Link to="/upload-song" className="block p-4 bg-yellow-500 text-white rounded">
          Upload Song
        </Link>
      </div>
    </div>
  );
}

export default Home;