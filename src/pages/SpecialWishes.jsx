import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import vidioWishes from "../assets/videos/Wishes.mp4";

const SpecialWishes = ({ isIOS }) => {
  const [showHeart, setShowHeart] = useState(false);

  const wishes = `
Hari ini adalah hari spesial... karena orang terspesial di hidup aku lahir hari ini 💗

Terima kasih udah hadir di hidup aku sayangg 😍

Semoga ulang tahun kali ini bikin kamu tambah bahagia, sehat selalu, sukses buat kedepan nyaa dan makin sayang sama aku kalau bisa selamaa nyaa 😋

Dan semoga setiap langkah kmu penuh keberkahan, dan setiap impianmu satu per satu menjadi kenyataan. Kamu punya hati yang tulus, senyum yang menenangkan, dan jiwa yang baik, Dunia butuh lebih banyak orang sepertimu. Jadi jangan pernah ngerasa sendiri apalagi nyerah 🫂

Aku pengen kamu tau kalau aku percaya sama kamu sepenuhnya. Kamu kuat, kamu hebat, dan kamu pantas dapetin yang terbaik, jangan pernah ngeraguin dirimu sendiri, kamu itu cahaya dalam hidup banyak orang, termasuk hidup akuu sendiri 🥺

kalau suatu hari kamu ngerasa ragu atau takut, ingat doa aku ini ”Semoga kamu selalu dikelilingi orang-orang baik, rezeki yang cukup, dan cinta yang tulus dari semua arah.Termasuk dariku 💝”

Jangan lupa tetep jadi kamu yang manis, ngeselin tapi ngangenin, dan selalu bikin aku jatuh cinta tiap hari 🤭

Aku bersyukur banget punya kamu. i love u revan sayangg 🫶🏻

dari qilaa pacar kesayangan kamuu <3
  `;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full"
      >
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
          Pesan Spesial Untukmu
        </h1>

        <div className="mb-8">
          <video
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            x-webkit-airplay="allow"
            className="w-full max-w-md mx-auto rounded-lg shadow-xl"
          >
            <source src={vidioWishes} type="video/mp4" />
          </video>
        </div>

        <motion.div
          whileHover={{ scale: isIOS ? 1 : 1.01 }}
          className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8"
        >
          <div className="prose max-w-none">
            {wishes.split("\n").map((paragraph, i) => (
              <p key={i} className="text-pink-800 mb-4 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: isIOS ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHeart(!showHeart)}
            className="relative overflow-hidden bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <span className="button-text">
              {showHeart ? "Sembunyikan Cintaku" : "Lihat Cintaku"}
            </span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            >
              <motion.div
                className="relative text-pink-500"
                animate={{ scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-[12rem] select-none text-center">❤️</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold drop-shadow-lg">
                  Revan 💖
                </div>
                <div className="text-white text-lg text-center mt-4">
                  Hanya kamu di hatiku, sayang 🥹
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SpecialWishes;
