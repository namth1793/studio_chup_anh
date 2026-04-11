import { useState, useEffect } from 'react'

const PHONE = '0901234567'
const ZALO = '0901234567'

function useShake(interval = 5000, offset = 0) {
  const [shaking, setShaking] = useState(false)

  useEffect(() => {
    const start = setTimeout(() => {
      const trigger = () => {
        setShaking(true)
        setTimeout(() => setShaking(false), 650)
      }
      trigger()
      const id = setInterval(trigger, interval)
      return () => clearInterval(id)
    }, offset)
    return () => clearTimeout(start)
  }, [interval, offset])

  return shaking
}

function ContactBtn({ href, target, rel, color, pingColor, tooltip, label, shaking, children }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="relative flex items-center">
      {/* Tooltip */}
      <span
        className={`absolute right-14 bg-ink text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg transition-all duration-200
          ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`}
      >
        {tooltip}
      </span>

      {/* Ping ring (always subtle) */}
      <span className={`absolute inset-0 rounded-full ${pingColor} opacity-30 animate-ping`}
        style={{ animationDuration: '2.5s' }} />

      <a
        href={href}
        target={target}
        rel={rel}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative w-12 h-12 rounded-full ${color} flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 hover:scale-110 ${shaking ? 'animate-shake' : ''}`}
        aria-label={label}
      >
        {children}
      </a>
    </div>
  )
}

export default function FloatingContact() {
  const phoneShaking = useShake(6000, 500)
  const zaloShaking  = useShake(6000, 3200)

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      <ContactBtn
        href={`tel:${PHONE}`}
        color="bg-green-500 hover:bg-green-600"
        pingColor="bg-green-400"
        tooltip={PHONE}
        label="Gọi điện"
        shaking={phoneShaking}
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z"/>
        </svg>
      </ContactBtn>

      <ContactBtn
        href={`https://zalo.me/${ZALO}`}
        target="_blank"
        rel="noopener noreferrer"
        color="bg-blue-500 hover:bg-blue-600"
        pingColor="bg-blue-400"
        tooltip="Nhắn Zalo"
        label="Chat Zalo"
        shaking={zaloShaking}
      >
        <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none">
          <rect width="48" height="48" rx="24" fill="#0068FF"/>
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
            fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15"
            fill="white" letterSpacing="0.5">
            Zalo
          </text>
        </svg>
      </ContactBtn>
    </div>
  )
}
