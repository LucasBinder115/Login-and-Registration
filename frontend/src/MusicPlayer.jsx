import { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Aqui você pode adicionar lógica para tocar/pausar áudio
  };

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex items-center justify-between">
      <div>
        <p className="font-bold">Now Playing: Song Title</p>
        <p className="text-sm">Artist Name</p>
      </div>
      <button onClick={togglePlay} className="text-2xl">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
}

export default MusicPlayer;