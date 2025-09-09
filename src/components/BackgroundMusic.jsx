import { useState, useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Fungsi untuk mengontrol mute/unmute
    const updateAudio = () => {
      if (iframeRef.current) {
        const iframe = iframeRef.current;
        try {
          // Mengubah parameter mute pada URL
          iframe.src = `https://www.youtube.com/embed/kygrxgKPLCo?autoplay=1&loop=1&playlist=kygrxgKPLCo&enablejsapi=1&${isMusicPlaying ? 'mute=0' : 'mute=1'}`;
        } catch (error) {
          console.log('Error updating audio:', error);
        }
      }
    };

    updateAudio();
  }, [isMusicPlaying]);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <>
      {/* Iframe yang sangat kecil dan diposisikan di luar layar */}
      <div style={{ 
        position: 'absolute', 
        top: '-100px', 
        left: '-100px', 
        width: '1px', 
        height: '1px', 
        overflow: 'hidden' 
      }}>
        <iframe
          ref={iframeRef}
          width="1"
          height="1"
          src={`https://www.youtube.com/embed/kygrxgKPLCo?autoplay=1&loop=1&playlist=kygrxgKPLCo&enablejsapi=1&mute=0`}
          title="Background Music"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>
      
      {/* Tombol kontrol yang terlihat */}
      <div className="fixed bottom-20 right-4 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg flex items-center border border-pink-200">
          <button 
            onClick={toggleMusic}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-md hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
          >
            {isMusicPlaying ? '🔊' : '🔇'}
          </button>
          <span className="ml-2 text-sm text-pink-600 font-medium">
            {isMusicPlaying ? 'Music ON' : 'Music OFF'}
          </span>
        </div>
      </div>
    </>
  );
};

export default BackgroundMusic;
