import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import happybirthday from '../assets/audio/happybirthday.mp3';

const CakeCelebration = () => {
  const { width, height } = useWindowSize();
  const [isExtinguished, setIsExtinguished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const flameRef = useRef(null);
  const fireParticlesRef = useRef(null);
  const smokePuffRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micSourceRef = useRef(null);
  const birthdaySongRef = useRef(null);
  const particleIntervalRef = useRef(null);
  const blowDetectedTimerRef = useRef(null);
  const containerRef = useRef(null);

  // Initialize audio and check for iOS
  useEffect(() => {
    // Detect iOS device
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

    // Initialize audio
    birthdaySongRef.current = new Audio(happybirthday);
    birthdaySongRef.current.preload = 'auto';
    birthdaySongRef.current.load();

    // iOS requires user interaction to play audio
    const handleFirstInteraction = () => {
      setUserInteracted(true);
      // Try to play audio silently to unlock audio context
      birthdaySongRef.current.volume = 0;
      birthdaySongRef.current.play().then(() => {
        birthdaySongRef.current.pause();
        birthdaySongRef.current.currentTime = 0;
        birthdaySongRef.current.volume = 1;
      }).catch(e => console.log("Audio warmup failed:", e));
      
      // Remove event listeners after first interaction
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
      if (containerRef.current) {
        containerRef.current.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    // Add event listeners for first interaction
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('click', handleFirstInteraction, { once: true });
    if (containerRef.current) {
      containerRef.current.addEventListener('touchstart', handleFirstInteraction, { once: true });
    }

    // Initialize microphone
    initMic();

    return () => {
      // Cleanup
      if (particleIntervalRef.current) clearInterval(particleIntervalRef.current);
      if (blowDetectedTimerRef.current) clearTimeout(blowDetectedTimerRef.current);
      if (micSourceRef.current) micSourceRef.current.disconnect();
      if (analyserRef.current) analyserRef.current.disconnect();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
      if (containerRef.current) {
        containerRef.current.removeEventListener('touchstart', handleFirstInteraction);
      }
    };
  }, []);

  const initMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      detectBlow(stream);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      // Fallback for iOS if microphone access is denied
      if (isIOS) {
        const handleInteraction = () => {
          setUserInteracted(true);
          document.removeEventListener('touchstart', handleInteraction);
        };
        document.addEventListener('touchstart', handleInteraction, { once: true });
      }
    }
  };

  const createFireParticle = () => {
    if (!fireParticlesRef.current) return;
    
    const particle = document.createElement('div');
    particle.classList.add('fire-particle');
    const startX = Math.random() * 10 - 5;
    const startY = Math.random() * 5;
    particle.style.left = `${50 + startX / 15 * 100}%`;
    particle.style.top = `${-15 + startY}px`;
    particle.style.width = `${Math.random() * 5 + 3}px`;
    particle.style.height = `${Math.random() * 8 + 5}px`;

    const dx = (Math.random() - 0.5) * 60;
    const dy = -(Math.random() * 40 + 30);
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);

    fireParticlesRef.current.appendChild(particle);

    particle.addEventListener('animationend', () => {
      particle.remove();
    });
  };

  const emitParticles = () => {
    clearInterval(particleIntervalRef.current);
    particleIntervalRef.current = setInterval(createFireParticle, 55);
  };

  const stopEmittingParticles = () => {
    clearInterval(particleIntervalRef.current);
  };

  const detectBlow = (stream) => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    micSourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;
    analyserRef.current.smoothingTimeConstant = 0.7;

    micSourceRef.current.connect(analyserRef.current);

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const analyze = () => {
      if (isExtinguished) return;

      analyserRef.current.getByteFrequencyData(dataArray);
      const volume = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;

      if (volume > 27) {
        if (flameRef.current && !flameRef.current.classList.contains('blowing')) {
          flameRef.current.classList.add('blowing');
          emitParticles();
          blowDetectedTimerRef.current = setTimeout(() => {
            extinguishFlame();
          }, 600);
        }
      } else {
        if (flameRef.current && flameRef.current.classList.contains('blowing')) {
          flameRef.current.classList.remove('blowing');
          stopEmittingParticles();
          clearTimeout(blowDetectedTimerRef.current);
        }
      }

      requestAnimationFrame(analyze);
    };

    analyze();
  };

  const extinguishFlame = () => {
    if (isExtinguished) return;

    if (flameRef.current) {
      flameRef.current.classList.remove('blowing');
      flameRef.current.classList.add('extinguished');
    }
    
    setIsExtinguished(true);
    stopEmittingParticles();

    setTimeout(() => {
      setShowConfetti(true);
    }, 500);

    // Play birthday song with iOS handling
    const playBirthdaySong = () => {
      if (!birthdaySongRef.current) return;
      
      birthdaySongRef.current.play()
        .then(() => console.log("Birthday song playing"))
        .catch(error => {
          console.warn("Audio play failed:", error);
          if (isIOS) {
            // Show iOS-specific instructions
            const playButton = document.createElement('button');
            playButton.textContent = 'Tap to Play Music';
            playButton.style.position = 'fixed';
            playButton.style.bottom = '20px';
            playButton.style.left = '50%';
            playButton.style.transform = 'translateX(-50%)';
            playButton.style.padding = '10px 20px';
            playButton.style.backgroundColor = '#ec4899';
            playButton.style.color = 'white';
            playButton.style.borderRadius = '9999px';
            playButton.style.zIndex = '1000';
            playButton.style.border = 'none';
            playButton.style.fontWeight = 'bold';
            playButton.onclick = () => {
              birthdaySongRef.current.play();
              playButton.remove();
            };
            document.body.appendChild(playButton);
          }
        });
    };

    if (userInteracted || !isIOS) {
      playBirthdaySong();
    } else {
      // Wait for user interaction on iOS
      const handleInteraction = () => {
        setUserInteracted(true);
        playBirthdaySong();
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('click', handleInteraction);
      };
      document.addEventListener('touchstart', handleInteraction, { once: true });
      document.addEventListener('click', handleInteraction, { once: true });
    }

    if (smokePuffRef.current) {
      smokePuffRef.current.style.opacity = 1;
      smokePuffRef.current.style.animation = 'smoke-rise 1s forwards ease-out';
    }

    if (micSourceRef.current) micSourceRef.current.disconnect();
    if (analyserRef.current) analyserRef.current.disconnect();
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-pink-900 to-purple-900 flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-pink-300 mb-8 neon-text">
          🎉 Happy Birthday <span className="text-white">My Love</span>! 🎉
        </h1>
        
        <p className="text-xl text-pink-200 mb-12">
          Make a wish and blow the candle 🎂 (use your voice!)
        </p>

        <div className="relative mx-auto w-[120px] h-[160px] mb-16">
          {/* Cake */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[100px] h-[30px] bg-blue-200 border-2 border-black rounded-t-md z-0"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[20px] w-[110px] h-[50px] bg-pink-300 border-2 border-black z-10"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[60px] w-[120px] h-[70px] bg-pink-100 border-2 border-black rounded-b-lg z-20"></div>
          
          {/* Candle */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[-30px] z-30 overflow-visible">
            <div 
              ref={flameRef}
              className="absolute top-[-15px] left-11/8 transform -translate-x-1/2 w-[20px] h-[35px] bg-radial-flame rounded-flame shadow-flame animate-flicker"
            ></div>
            <div className="w-[10px] h-[40px] bg-pink-500 rounded-md mx-auto"></div>
            <div 
              ref={fireParticlesRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            ></div>
            <div 
              ref={smokePuffRef}
              className="absolute top-[-5px] left-1/2 transform -translate-x-1/2 w-[20px] h-[10px] bg-radial-smoke rounded-full opacity-0"
            ></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isExtinguished ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl text-cyan-300 font-bold mb-8 animate-glow"
        >
          Hore! Lilinnya padam! Selamat Ulang Tahun Sayang!
        </motion.div>

        {!userInteracted && isIOS && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-pink-200 bg-pink-800/50 p-4 rounded-lg mb-4"
          >
            Tap anywhere to enable audio
          </motion.div>
        )}
      </motion.div>

      <style jsx global>{`
        .bg-radial-flame {
          background: radial-gradient(
            circle at 50% 80%,
            rgba(255, 255, 100, 0.9),
            rgba(255, 165, 0, 0.7),
            rgba(255, 0, 0, 0.5)
          );
        }
        
        .rounded-flame {
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        }
        
        .shadow-flame {
          box-shadow: 0 0 15px 8px rgba(255, 215, 0, 0.7);
        }
        
        .bg-radial-smoke {
          background: radial-gradient(
            circle,
            rgba(150, 150, 150, 0.8),
            rgba(100, 100, 100, 0.5),
            transparent
          );
        }
        
        @keyframes flicker {
          0% {
            transform: translateX(-50%) scaleY(1) scaleX(1);
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            transform: translateX(-50%) scaleY(1.1) scaleX(0.9);
            opacity: 0.95;
            filter: brightness(1.1);
          }
          100% {
            transform: translateX(-50%) scaleY(1) scaleX(1);
            opacity: 1;
            filter: brightness(1);
          }
        }
        
        .animate-flicker {
          animation: flicker 0.4s infinite alternate ease-in-out;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from {
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ff, 0 0 20px #0ff;
          }
          to {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff, 0 0 40px #0ff;
          }
        }
        
        .fire-particle {
          position: absolute;
          background-color: orange;
          border-radius: 30%;
          opacity: 0;
          pointer-events: none;
          animation: fire-particle-fly 0.5s forwards ease-out;
          z-index: 3;
        }
        
        @keyframes fire-particle-fly {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
            background-color: orange;
          }
          50% {
            transform: translate(var(--dx), var(--dy)) scale(0.7);
            opacity: 0.7;
            background-color: yellow;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) scale(0);
            opacity: 0;
            background-color: red;
          }
        }
        
        @keyframes smoke-rise {
          0% {
            transform: translateX(-50%) translateY(0) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(-50px) scale(1.5);
            opacity: 0;
          }
        }
        
        .blowing {
          animation: none !important;
          transform: translateX(-50%) scaleY(0.7) scaleX(1.5) rotate(0deg) !important;
          opacity: 0.7 !important;
          box-shadow: 0 0 10px 5px rgba(255, 165, 0, 0.4) !important;
          transition: transform 0.1s ease-out, opacity 0.1s ease-out, box-shadow 0.1s ease-out !important;
        }
        
        .extinguished {
          background: transparent !important;
          box-shadow: none !important;
          animation: none !important;
          opacity: 0 !important;
          transform: translateX(-50%) scaleY(0) scaleX(0) !important;
          transition: all 0.3s ease-in !important;
        }
        
        .neon-text {
          animation: neon 1.5s ease-in-out infinite alternate;
        }
        
        @keyframes neon {
          from {
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #f43f5e, 0 0 20px #f43f5e;
          }
          to {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #f43f5e, 0 0 40px #f43f5e;
          }
        }
      `}</style>
    </div>
  );
};

export default CakeCelebration;