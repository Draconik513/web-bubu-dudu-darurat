import { useEffect, useState } from 'react'

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const createHeart = () => {
      const heart = {
        id: Date.now(),
        x: Math.random() * 100,
        y: 110,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5
      }
      setHearts(prev => [...prev, heart])
    }

    const interval = setInterval(createHeart, 300)

    const moveHearts = () => {
      setHearts(prev => 
        prev.map(heart => ({
          ...heart,
          y: heart.y - heart.speed
        })).filter(heart => heart.y > -10)
    )

      requestAnimationFrame(moveHearts)
    }

    moveHearts()

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-pink-400"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            transform: `rotate(${Math.random() * 30 - 15}deg)`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts