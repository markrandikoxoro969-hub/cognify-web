import { motion } from 'motion/react'

const beams = [
  { d: 'M-120 270 C 180 310 230 90 560 145 S 930 340 1520 96', delay: 0 },
  { d: 'M-80 480 C 260 375 375 560 680 430 S 1090 180 1510 310', delay: 1.4 },
  { d: 'M-100 690 C 190 520 455 760 770 610 S 1170 470 1540 590', delay: 2.8 },
  { d: 'M300 -80 C 330 140 525 210 720 255 S 1030 340 1320 900', delay: 1 },
]

/** Soft SVG light paths provide the Aceternity-inspired beam treatment without a canvas. */
export default function BackgroundBeams() {
  return (
    <svg className="background-beams pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 820" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="beam-warm" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#a83d34" stopOpacity="0" />
          <stop offset=".48" stopColor="#c4854d" stopOpacity=".65" />
          <stop offset="1" stopColor="#e9c57e" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam-cool" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0" stopColor="#7369a8" stopOpacity="0" />
          <stop offset=".52" stopColor="#a49bd1" stopOpacity=".45" />
          <stop offset="1" stopColor="#d3ad72" stopOpacity="0" />
        </linearGradient>
      </defs>
      {beams.map(({ d, delay }, i) => (
        <g key={d} className="beam-path">
          <path d={d} fill="none" stroke={i % 2 ? 'url(#beam-cool)' : 'url(#beam-warm)'} strokeWidth="1" />
          <motion.path
            d={d}
            fill="none"
            stroke={i % 2 ? '#aaa0d4' : '#f0c47d'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 118"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={{ strokeDashoffset: -360, opacity: [0, .55, 0] }}
            transition={{ duration: 16 + i * 2, repeat: Infinity, ease: 'linear', delay }}
          />
        </g>
      ))}
    </svg>
  )
}
