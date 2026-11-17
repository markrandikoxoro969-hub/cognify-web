import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Star, TrendingUp, Flame, GraduationCap } from 'lucide-react'
import { Magnetic, ease } from './ui'
import { useChat } from '../hooks/useChat'

const line1 = ['Learn', 'smarter.']
const line2 = ['Score', 'higher.']

function Words({ words, delay = 0, className }) {
  return words.map((w, i) => (
    <span className="word" key={w + i}>
      <motion.span
        className={className}
        initial={{ y: '110%', rotate: 4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1, ease, delay: delay + i * 0.08 }}
      >
        {w}
      </motion.span>
      {i < words.length - 1 && '\u00A0'}
    </span>
  ))
}

export default function Hero() {
  const ref = useRef(null)
  const { setWidgetOpen } = useChat()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 140])
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Cursor spotlight + subtle 3D tilt of the mock
  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rX = useSpring(tiltX, { stiffness: 100, damping: 18 })
  const rY = useSpring(tiltY, { stiffness: 100, damping: 18 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
  }

  return (
    <section id="top" className="hero" ref={ref} onMouseMove={onMove}>
      <div className="grid-bg" />
      <motion.div
        className="blob"
        style={{ width: 520, height: 520, background: 'rgba(124,58,237,0.35)', top: -120, left: -120 }}
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="blob"
        style={{ width: 460, height: 460, background: 'rgba(34,211,238,0.18)', top: 80, right: -160 }}
        animate={{ x: [0, -60, 0], y: [0, 90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="spotlight" style={{ x: sx, y: sy }} />

      <div className="container hero-inner">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.a
            href="#ai-tutor"
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="dot"><Sparkles size={12} strokeWidth={2.5} /></span>
            New — Cognify AI tutor, awake 24/7
            <ArrowRight size={14} />
          </motion.a>

          <h1 className="h-display" style={{ marginTop: 26 }}>
            <Words words={line1} delay={0.15} />
            <br />
            <Words words={line2} delay={0.35} className="serif grad-text" />
          </h1>

          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
          >
            Premium one-to-one tuition from hand-picked tutors, paired with an AI study
            companion that explains, quizzes and plans with you — any subject, any hour.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
          >
            <Magnetic as="button" className="btn btn-primary" onClick={() => document.getElementById('ai-tutor')?.scrollIntoView({ behavior: 'smooth' })}>
              Start learning free <ArrowRight size={17} />
            </Magnetic>
            <Magnetic as="button" className="btn btn-ghost" onClick={() => setWidgetOpen(true)}>
              <Play size={15} /> Try the AI tutor
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero-proof"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="avatars">
              {[['AS', '#c4b5fd'], ['RK', '#67e8f9'], ['MP', '#fcd34d'], ['JL', '#86efac']].map(([t, c], i) => (
                <motion.span
                  key={t}
                  style={{ background: c }}
                  initial={{ scale: 0, x: -10 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 1.05 + i * 0.07 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
            <div>
              <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
              Loved by 48,000+ students
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: yVisual, perspective: 1200 }}>
          <motion.div
            className="mock"
            style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.3 }}
          >
            <div className="mock-top">
              <div className="mock-dots"><i /><i /><i /></div>
              <div className="mock-title"><span className="live" /> Cognify · Physics session</div>
              <span style={{ width: 42 }} />
            </div>
            <MockChat />
          </motion.div>

          <motion.div
            className="float-card"
            style={{ top: 0, left: -10 }}
            drag
            dragSnapToOrigin
            whileDrag={{ scale: 1.06 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{ opacity: { delay: 1 }, x: { delay: 1, duration: 0.8, ease }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <div className="fc-row">
              <div className="fc-icon" style={{ background: 'rgba(52,211,153,0.15)', color: '#6ee7b7' }}><TrendingUp size={18} /></div>
              <div>
                <div className="fc-label">Average grade boost</div>
                <div className="fc-value">+1.8 grades</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="float-card"
            style={{ bottom: 6, right: -6 }}
            drag
            dragSnapToOrigin
            whileDrag={{ scale: 1.06 }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, y: [0, 12, 0] }}
            transition={{ opacity: { delay: 1.2 }, x: { delay: 1.2, duration: 0.8, ease }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <div className="fc-label">Weekly goal · Calculus</div>
            <div className="fc-row" style={{ justifyContent: 'space-between' }}>
              <div className="fc-value">82%</div>
              <Flame size={18} color="#fdba74" />
            </div>
            <div className="bar">
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 0.82 }} transition={{ delay: 1.6, duration: 1.4, ease }} />
            </div>
          </motion.div>

          <motion.div
            className="float-card hide-sm"
            style={{ top: '46%', left: -34 }}
            drag
            dragSnapToOrigin
            whileDrag={{ scale: 1.06 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, rotate: [-3, 3, -3] }}
            transition={{ opacity: { delay: 1.4 }, scale: { delay: 1.4, type: 'spring' }, rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <div className="fc-row">
              <div className="fc-icon" style={{ background: 'rgba(252,211,77,0.15)', color: '#fcd34d' }}><GraduationCap size={18} /></div>
              <div>
                <div className="fc-label">Next session</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Dr. Maya · 4:30 PM</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="scroll-hint" style={{ opacity: fade }}>
        <div className="mouse"><motion.i animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.8, repeat: Infinity }} /></div>
        Scroll
      </motion.div>
    </section>
  )
}

function MockChat() {
  const item = (delay) => ({
    initial: { opacity: 0, y: 14, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { delay, duration: 0.6, ease },
  })
  return (
    <>
      <motion.div className="bubble user" {...item(1.0)}>Why does a satellite not fall to Earth? 🤔</motion.div>
      <motion.div className="bubble ai" {...item(1.7)}>
        It <b>is</b> falling — constantly! It just moves sideways so fast that Earth curves away beneath it.
        <div className="formula">v = √(GM / r) ≈ 7.8 km/s</div>
      </motion.div>
      <motion.div className="bubble user" {...item(2.5)}>Can you quiz me on this?</motion.div>
      <motion.div className="bubble ai" {...item(3.2)} style={{ display: 'flex', gap: 5, padding: '16px 18px' }}>
        {[0, 1, 2].map((i) => (
          <motion.i
            key={i}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#a78bfa', display: 'block' }}
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </motion.div>
    </>
  )
}
