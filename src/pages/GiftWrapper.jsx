import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

const GiftWrapper = () => {
  const { width, height } = useWindowSize()
  const [isUnwrapping, setIsUnwrapping] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [countdownFinished, setCountdownFinished] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const navigate = useNavigate()

  // Check if countdown is finished (August 10, 2025)
  useEffect(() => {
    const checkCountdown = () => {
      const targetDate = new Date('2025-10-04T00:00:00')
      const now = new Date()
      if (now >= targetDate) {
        setCountdownFinished(true)
      }
    }

    checkCountdown()
    const timer = setInterval(checkCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleUnwrap = () => {
    if (!countdownFinished) {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000)
      return
    }

    setIsUnwrapping(true)
    setTimeout(() => {
      setShowConfetti(true)
      setTimeout(() => navigate('/celebration'), 1500)
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-4">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="relative"
      >
        <AnimatePresence>
          {!isUnwrapping && (
            <motion.div
              key="gift"
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative cursor-pointer"
              onClick={handleUnwrap}
            >
              {/* Gift box */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-64 h-64 bg-red-500 rounded-lg shadow-xl relative"
              >
                {/* Ribbon */}
                <div className="absolute top-1/2 left-0 right-0 h-8 bg-yellow-300 transform -translate-y-1/2"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-yellow-300 transform -translate-x-1/2"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xl text-pink-600">Klik untuk membuka hadiah spesial!</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {isUnwrapping && (
          <motion.div
            key="unwrapping"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity 
              }}
              className="text-6xl mb-4"
            >
              🎁
            </motion.div>
            <p className="text-2xl text-pink-600 font-bold">Membuka hadiah...</p>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 bg-white rounded-lg shadow-md max-w-md text-center"
          >
            <p className="text-pink-600">Hadiah belum bisa dibuka sampai 4 Oktober 2025!</p>
            <p className="text-sm text-gray-500 mt-2">Tunggu sampai hari ulang tahun tiba ❤️</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!countdownFinished && (
        <div className="mt-8 p-4 bg-white bg-opacity-80 rounded-lg shadow-md max-w-md text-center">
          <p className="text-pink-600">Hadiah ini terkunci sampai:</p>
          <p className="text-xl font-bold text-purple-600">4 Oktober 2025</p>
        </div>
      )}
    </div>
  )
}

export default GiftWrapper