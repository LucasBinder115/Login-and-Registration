import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadSong() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('artist', artist);

    try {
      await axios.post('YOUR_API_URL/upload-song', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/songs');
    } catch (error) {
      console.error('Failed to upload song:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Song</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadSong;