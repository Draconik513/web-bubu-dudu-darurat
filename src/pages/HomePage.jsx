import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ConfettiBackground from "../components/ConfettiBackground";
import FloatingHearts from "../components/FloatingHearts";
import heartVideo from "../assets/videos/heart-animation.mp4";

const HomePage = ({ isIOS }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <ConfettiBackground />
      <FloatingHearts />

      <div className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-lg text-pink-600 pt-4">Untuk yang tersayang</p>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-pink-400 to-purple-500 text-transparent bg-clip-text drop-shadow-md">
            Revan
          </h1>
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="mb-8"
        >
          <div className="w-64 h-64 mx-auto rounded-full border-4 border-pink-300 shadow-lg overflow-hidden">
            <video
              src={heartVideo}
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              x-webkit-airplay="allow"
              className="w-full h-full object-cover"
              style={{ transform: 'translateZ(0)' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-pink-600">
            Selamat Ulang Tahun Sayang !
          </h2>
          <p className="text-xl text-pink-600">🎉 3 Oktober 2025 🎉</p>

          <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm rounded-lg max-w-md mx-auto border border-pink-200">
            <p className="text-pink-800 italic">
              "Untuk pacarku yang tercinta, di hari spesialmu ini aku ingin
              mengucapkan... Terima kasih telah menjadi cahaya dalam hidupku.
              Setiap detik bersamamu adalah anugerah."
            </p>
            <p className="mt-4 text-right text-pink-600 font-medium">
              - Qila gemoy
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <motion.button
            whileHover={{ scale: isIOS ? 1 : 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/gift")}

            className="relative overflow-hidden bg-pink-500 text-white px-8 py-4 rounded-full shadow-lg text-xl font-bold"

          >
            <span className="button-text flex items-center">
              <span className="mr-2">🎁</span>
              Buka Hadiah Spesial
              <span className="ml-2">🎁</span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
