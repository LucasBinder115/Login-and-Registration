import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentSong } from '../Context/store';

function Songs() {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('YOUR_API_URL/songs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSongs(response.data);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    };
    fetchSongs();
  }, []);

  const playSong = (song) => {
    dispatch(setCurrentSong(song));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Songs</h2>
      <ul className="space-y-4">
        {songs.map((song) => (
          <li
            key={song.id}
            className="p-4 bg-gray-100 rounded flex justify-between items-center"
          >
            <span>{song.title} - {song.artist}</span>
            <button
              onClick={() => playSong(song)}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Songs;