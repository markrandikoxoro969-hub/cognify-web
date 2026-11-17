import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { SectionHead } from './ui'

const items = [
  ['Went from a C to an A* in Maths in two terms. The AI tutor at midnight before exams was a lifesaver.', 'Aanya S.', 'A-Level student', 'C → A*', '#c4b5fd'],
  ['Dr. Maya made quantum physics feel obvious. Then Cognify quizzed me until I actually knew it.', 'Rohan K.', 'IB Diploma', '7 in Physics', '#67e8f9'],
  ["As a parent, the weekly reports are gold. I finally know what's going on — and his confidence is way up.", 'Priya M.', 'Parent', '+2 grades', '#fcd34d'],
  ['I use the AI to plan my week and break down essays. It explains instead of just giving answers.', 'Lucas B.', 'University, Year 1', 'First-class', '#86efac'],
  ['The best SAT prep I tried. Tutor sessions plus unlimited AI practice is an unfair advantage.', 'Mei L.', 'SAT prep', '1540 SAT', '#f9a8d4'],
  ['Nepali explanations when I get stuck in English — that alone changed everything for me.', 'Bikash T.', 'SEE student', 'GPA 3.9', '#fdba74'],
]

export default function Testimonials() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const [paused, setPaused] = useState(false)
  const [half, setHalf] = useState(0)

  useEffect(() => {
    const measure = () => setHalf((trackRef.current?.scrollWidth || 0) / 2)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Auto-scroll, pause on hover/drag, loop seamlessly
  useAnimationFrame((_, delta) => {
    if (paused || !half) return
    let next = x.get() - delta * 0.04
    if (next <= -half) next += half
    if (next > 0) next -= half
    x.set(next)
  })

  const loop = [...items, ...items]

  return (
    <section id="reviews" style={{ overflow: 'hidden' }}>
      <div className="container">
        <SectionHead
          icon={Quote}
          eyebrow="Student stories"
          title={<>Real students. <span className="serif grad-text">Real results.</span></>}
        />
      </div>
      <div
        className="testi-wrap marquee"
        ref={wrapRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="testi-track"
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          dragMomentum={false}
          onDragStart={() => setPaused(true)}
          onDragEnd={() => setPaused(false)}
        >
          {loop.map(([quote, name, role, grade, color], i) => (
            <motion.article key={i} className="card testi" whileHover={{ y: -6, borderColor: 'rgba(167,139,250,0.35)' }}>
              <div className="stars">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={15} fill="currentColor" />)}</div>
              <blockquote>“{quote}”</blockquote>
              <div className="testi-person">
                <span className="av" style={{ background: color }}>{name.split(' ').map((p) => p[0]).join('')}</span>
                <div><b>{name}</b><small>{role}</small></div>
                <span className="grade">{grade}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
