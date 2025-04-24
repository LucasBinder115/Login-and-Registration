// src/components/SongCard.jsx
import { FaPlay } from 'react-icons/fa';

function SongCard({ song, onPlay }) {
  return (
    <div className="p-4 bg-gray-100 rounded flex justify-between items-center">
      <div>
        <p className="font-bold">{song.title}</p>
        <p className="text-sm">{song.artist}</p>
      </div>
      <button onClick={() => onPlay(song)} className="p-2 bg-blue-500 text-white rounded">
        <FaPlay />
      </button>
    </div>
  );
}

export default SongCard;