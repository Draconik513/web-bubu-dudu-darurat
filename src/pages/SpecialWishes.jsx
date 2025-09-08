import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import vidioWishes from '../assets/videos/Wishes.mp4'

const SpecialWishes = ({ isIOS }) => {
  const [showHeart, setShowHeart] = useState(false)

  const wishes = `
haiii sayanggg! 🙋🏻‍♀️💕 aku gatau harus mulai cerpen panjang ini darimana sayang hihi ^_^

aku mau ucapin.. selamat ulangtahun 🥳🎂 dan selamat bertumbuh jauh lebih baik 🌱 sayanganku kecintaanku 💖, panjang umur, a wish for u on ur birthday 🎁✨, whatever u ask may u receive 🙏🏻, whatever u seek may u find 🌟, whatever u wish may it be fulfilled on ur birthday 🎉 and together, i hope u will walk on this journey knowing that u belong babe 🤍

i hope even if things sometime do not go ur way 🚧, u will stop trying, u will not give up on urself 💪🏻 and on ur thoughest days, i hope u will reminding your self of this word:
"u deserve better ✨, kamu layak dicintai 💕 dan dirayakan dalam hal apapun!!"

aku sangat berharap dan berdoa untuk kamu 🙏🏻, mudah mudahan kamu terus diberi kesehatan 🩵, semoga semesta selalu memberimu kemudahan atas segala usahamu 🌌, semoga doamu selalu terkabul satu persatu 🌠, semoga langkah kakimu selalu diringankan 🚶🏻‍♂️, semoga pundakmu dikuatkan 🛡️, semoga segala urusanmu dipermudah 🌿, semoga hatimu dilapangkan 🕊️ atas segala takdir yang di luar rencanamu, dan semoga kamu selalu dikelilingi orang-orang baik di mana pun kamu berada 🌍 sayangkuu.

semangat berproses lelaki baikku 🫶🏻🔥!! step by step yaa, nikmati anak tangganya satu persatu 🪜, kamu ga lagi balapan sama siapapun dalam hidup ini 🏁🚫. so, enjoy ur process 🌷. apapun yang lagi kamu usahakan, semoga selalu dilancarkan 💗✨

nanti setelah kamu selesai berproses dan mencapai semua targetmu 🏆, semoga aku masih menjadi perempuan yang kamu inginkan yaa 🫂🤍

aku akan jadi orang yang paling keras teriak "congrats 🥳🎊 and proud of you 💐" ketika kamu berhasil meraih mimpi ituu 👮🏻‍♂️🚓.
  `

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
            {wishes.split('\n').map((paragraph, i) => (
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
              {showHeart ? 'Sembunyikan Cintaku' : 'Lihat Cintaku'}
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
                <div className="text-[12rem] select-none text-center">
                  ❤️
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold drop-shadow-lg">
                  Hendry 💖
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
  )
}

export default SpecialWishes