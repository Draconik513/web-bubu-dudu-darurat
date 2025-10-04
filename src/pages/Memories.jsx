import { motion } from "framer-motion";
import { useState } from "react";
import vidioBunga from "../assets/videos/vidioBungadudu.mp4";
import fotoKenangan from "../assets/images/couple.jpg";

const Memories = ({ isIOS }) => {
  const [flowerBloom, setFlowerBloom] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 p-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full text-center"
      >
        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Kenangan Indah Kita
        </h1>

        <motion.div whileHover={{ scale: isIOS ? 1 : 1.02 }} className="mb-8">
          <img
            src={fotoKenangan}
            alt="Kita Berdua"
            className="w-full max-w-md mx-auto rounded-xl shadow-2xl border-4 border-white"
            style={{ transform: "translateZ(0)" }}
          />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 border border-pink-100"
        >
          <h2 className="text-2xl font-semibold text-rose-600 mb-4">
            Permintaan maafku di hari ulang tahunmu
          </h2>

          <div className="text-left text-pink-800 space-y-4 leading-relaxed">
            <p>
              💌 <strong>Untuk Aa tersayang...</strong>
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              🌟 Maafkan aku Aa, jika selama ini ada salah kata atau sikap yang
              membuatmu terluka. Di hari spesialmu ini aku hanya ingin melihat
              senyum bahagiamu. 🌟
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Terima kasih karena selalu sabar dan setia menemani. Semoga tahun
              ini membawa kebahagiaan, kesehatan, dan keberkahan untukmu. 💫
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              Aku sayang Aa selalu 💖
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.4 }}
            >
              💖 Dengan penuh cinta,
              <strong>[Adi Yusuf Maulana]</strong>
            </motion.p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: isIOS ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFlowerBloom(!flowerBloom)}
          className="relative overflow-hidden bg-rose-600 text-white px-6 py-3 rounded-full shadow-lg mb-8 border border-white/30"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <span className="button-text">
            {flowerBloom ? "Tutup Bunga" : "Buka Bunga Cinta"}
          </span>
        </motion.button>

        {flowerBloom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative flex flex-col md:flex-row items-center justify-center gap-6 mt-8"
            style={{
              WebkitTransform: "translate3d(0,0,0)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Romantic Video Bubble */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="rounded-xl overflow-hidden shadow-xl border-4 border-rose-200"
              style={{ backfaceVisibility: "hidden" }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline="true"
                x-webkit-airplay="allow"
                className="w-72 h-72 object-cover"
              >
                <source src={vidioBunga} type="video/mp4" />
              </video>
            </motion.div>

            {/* Realistic Blooming Flower */}
            <motion.div
              initial={{ y: 200, scale: 0 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-64 h-64 overflow-visible"
              style={{
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
            >
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-48 bg-green-600 rounded-full"></div>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full"
                  style={{
                    top: `${Math.cos((i / 5) * 2 * Math.PI) * 40 + 40}px`,
                    left: `${Math.sin((i / 5) * 2 * Math.PI) * 40 + 40}px`,
                    transform: "translateZ(0)",
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                />
              ))}
              <motion.div
                className="absolute w-14 h-14 bg-yellow-300 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 }}
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              />
            </motion.div>
          </motion.div>
        )}

        {flowerBloom && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="text-center text-pink-600 mt-6 italic text-lg"
          >
            🌸 Bunga ini sebagai hadiah dari permintaan maafku, sayang... Tolong
            diterima ya 🥺❤️
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Memories;
