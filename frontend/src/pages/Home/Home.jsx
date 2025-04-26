import React, { useState } from "react";
import AudioPlayer from "../components/AudioPlayer";

// Icons imported at component level (moved from AudioPlayer)
import { FaPlay, FaPause } from "react-icons/fa";
import { MdReplay } from "react-icons/md";
import { AiOutlineScissor } from "react-icons/ai";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { BiZoomIn, BiZoomOut } from "react-icons/bi";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayUploader, setDisplayUploader] = useState(true);

  const toggleDisplayUploader = () => {
    setDisplayUploader(!displayUploader);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(URL.createObjectURL(file));
    setDisplayUploader(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">RYTHMO</h1>
        <p className="text-xl text-purple-200 mb-8">Sua plataforma musical</p>

        {/* Audio Player Section */}
        <div className="bg-white p-8 rounded-xl shadow-xl mb-12">
          {displayUploader ? (
            <FileUploader onFileSelect={handleFileSelect} />
          ) : (
            <AudioPlayer
              toggleDisplayUploader={toggleDisplayUploader}
              filePath={selectedFile}
            />
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Catálogo" 
            description="Organize suas músicas e álbuns favoritos em categorias personalizadas."
          />
          <FeatureCard 
            title="Editor de Áudio" 
            description="Edite suas faixas com ferramentas profissionais integradas."
          />
          <FeatureCard 
            title="Compartilhamento" 
            description="Compartilhe suas criações com amigos nas redes sociais."
          />
        </div>
      </div>
    </div>
  );
}

// File Uploader Component
function FileUploader({ onFileSelect }) {
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center p-10 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">
        Carregue seu arquivo de áudio
      </h2>
      <p className="text-gray-600 mb-6">
        Arraste e solte ou selecione um arquivo MP3, WAV ou FLAC
      </p>
      <label className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors">
        Selecionar Arquivo
        <input
          type="file"
          className="hidden"
          accept="audio/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all">
      <h3 className="text-xl font-semibold text-purple-700 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// AudioPlayer Component (moved from the imported content)
function AudioPlayer({ toggleDisplayUploader, filePath }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const [prevSetVol, setPrevSetVol] = useState(1);
  const [isDevMode, setIsDevMode] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const animationRef = React.useRef();
  const volumeRef = React.useRef();
  const waveformRef = React.useRef();
  const zoomRef = React.useRef();

  React.useEffect(() => {
    // Only import WaveSurfer dynamically on client side
    import('wavesurfer.js').then(({ default: WaveSurfer }) => {
      if (waveformRef.current) return; // Avoid re-initialization
      
      waveformRef.current = WaveSurfer.create({
        container: "#waveform",
        waveColor: "rgba(78, 141, 204,0.8)",
        progressColor: "rgb(8, 40, 71)",
        barWidth: 0.5,
        pixelRatio: 3,
        partialRender: true,
        normalize: true,
        minPxPerSec: 5,
        cursorColor: "rgb(8, 40, 71)",
        cursorWidth: 2,
        scrollParent: true,
      });
      
      if (filePath) {
        waveformRef.current.load(filePath);
      }
      
      waveformRef.current.on("ready", handleReady);
    });
    
    return () => {
      if (waveformRef.current) {
        waveformRef.current.destroy();
      }
    };
  }, [filePath]);

  const handleReady = () => {
    setIsReady(true);
  };

  const calculateTime = (secs) => {
    if (!secs) {
      return "00:00";
    }
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs) % 60;
    const returnedSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return returnedMinutes + ":" + returnedSecs;
  };

  const playTime = () => {
    if (waveformRef.current && !waveformRef.current.isPlaying()) {
      setIsPlaying(false);
    }
    if (waveformRef.current) {
      setCurrentTime(waveformRef.current.getCurrentTime());
    }
    animationRef.current = requestAnimationFrame(playTime);
  };

  const changeVolume = () => {
    if (waveformRef.current && volumeRef.current) {
      waveformRef.current.setVolume(volumeRef.current.value / 100);
    }
  };

  const handleZoom = () => {
    if (waveformRef.current && zoomRef.current) {
      const val = Number(zoomRef.current.value);
      waveformRef.current.zoom(val);
    }
  };

  const handlePlayPause = () => {
    if (!waveformRef.current) return;
    
    if (isPlaying) {
      waveformRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      waveformRef.current.play();
      animationRef.current = requestAnimationFrame(playTime);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (!waveformRef.current) return;
    
    waveformRef.current.seekTo(0);
    waveformRef.current.play();
    setIsPlaying(true);
    animationRef.current = requestAnimationFrame(playTime);
  };

  const handleMuteToggle = () => {
    if (!waveformRef.current) return;
    
    const newMuteState = !isMute;
    setIsMute(newMuteState);
    
    if (newMuteState) {
      const currentVolume = waveformRef.current.getVolume();
      setPrevSetVol(currentVolume);
      waveformRef.current.setMute(true);
    } else {
      waveformRef.current.setMute(false);
      waveformRef.current.setVolume(prevSetVol);
    }
  };

  const handleZoomOut = () => {
    if (!zoomRef.current) return;
    
    let val = Number(zoomRef.current.value);
    zoomRef.current.value = Math.max(5, val - 10);
    handleZoom();
  };

  const handleZoomIn = () => {
    if (!zoomRef.current) return;
    
    let val = Number(zoomRef.current.value);
    zoomRef.current.value = Math.min(500, val + 10);
    handleZoom();
  };

  return (
    <div className="audio-player-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-purple-800">
          {isReady ? "Player de Áudio" : "Carregando..."}
        </h2>
        <button
          onClick={toggleDisplayUploader}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Escolher outro arquivo
        </button>
      </div>

      <div className="waveform-container bg-gray-100 rounded-lg shadow-inner p-4 mb-4">
        <div id="waveform"></div>
      </div>

      <div className="timestamps flex justify-between text-gray-600 mb-2">
        <p>{calculateTime(currentTime)}</p>
        <p>
          {waveformRef?.current?.getDuration
            ? calculateTime(waveformRef?.current?.getDuration())
            : "00:00"}
        </p>
      </div>

      <div className="controls flex flex-wrap justify-between items-center">
        {isReady && (
          <div className="flex space-x-3">
            <button
              className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
              onClick={handleRestart}
              aria-label="Restart"
            >
              <MdReplay />
            </button>
            <button
              className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
              aria-label="Cut"
            >
              <AiOutlineScissor />
            </button>
          </div>
        )}

        {isReady && (
          <div className="volume-zoom-controls flex items-center space-x-2 mt-4 md:mt-0">
            <button
              className="text-purple-700 hover:text-purple-900 transition-colors"
              onClick={handleMuteToggle}
              aria-label={isMute ? "Unmute" : "Mute"}
            >
              {isMute ? <BsFillVolumeMuteFill size={20} /> : <BsFillVolumeUpFill size={20} />}
            </button>
            <input
              className="range-slider accent-purple-600"
              type="range"
              min="0"
              max="100"
              defaultValue="100"
              onChange={changeVolume}
              ref={volumeRef}
              aria-label="Volume"
            />
            
            <button
              className="text-purple-700 hover:text-purple-900 transition-colors ml-4"
              onClick={handleZoomOut}
              aria-label="Zoom Out"
            >
              <BiZoomOut size={20} />
            </button>
            <input
              className="range-slider accent-purple-600"
              type="range"
              min="5"
              max="500"
              defaultValue="50"
              onChange={handleZoom}
              ref={zoomRef}
              aria-label="Zoom"
            />
            <button
              className="text-purple-700 hover:text-purple-900 transition-colors"
              onClick={handleZoomIn}
              aria-label="Zoom In"
            >
              <BiZoomIn size={20} />
            </button>
          </div>
        )}
      </div>
      
      {isReady && (
        <div className="dev-mode-toggle flex justify-end mt-4">
          <label className="inline-flex items-center cursor-pointer">
            <span className="mr-3 text-sm text-gray-600">Modo Desenvolvedor</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isDevMode}
                onChange={() => setIsDevMode(!isDevMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}