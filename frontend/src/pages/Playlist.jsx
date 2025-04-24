import { useState, useEffect } from 'react';
import axios from 'axios';

function Playlist() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('YOUR_API_URL/playlists', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
      <ul className="space-y-4">
        {playlists.map((playlist) => (
          <li key={playlist.id} className="p-4 bg-gray-100 rounded">
            {playlist.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;