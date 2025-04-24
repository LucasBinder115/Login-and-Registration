import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePlaylist() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('YOUR_API_URL/playlists', { name }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/playlist');
    } catch (error) {
      console.error('Failed to create playlist:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Playlist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreatePlaylist;