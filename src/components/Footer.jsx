import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { LogoMark, Magnetic, ease } from './ui'
import { useChat } from '../hooks/useChat'

export function CTA() {
  const { setWidgetOpen } = useChat()
  return (
    <section style={{ paddingBottom: 60 }}>
      <div className="container">
        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
        >
          <div className="grid-bg" />
          <motion.div className="blob" style={{ width: 400, height: 400, background: 'rgba(34,211,238,0.2)', bottom: -200, left: '10%' }} animate={{ x: [0, 100, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="blob" style={{ width: 400, height: 400, background: 'rgba(167,139,250,0.3)', bottom: -200, right: '10%' }} animate={{ x: [0, -100, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
          <div style={{ position: 'relative' }}>
            <h2 className="h-section">Your best grades start <span className="serif grad-text">tonight.</span></h2>
            <p className="lead">Join 48,000+ students learning smarter with Cognify. Free to start — no card needed.</p>
            <div className="cta-actions">
              <Magnetic as="a" href="#pricing" className="btn btn-primary">Get started free <ArrowRight size={17} /></Magnetic>
              <Magnetic as="button" className="btn btn-ghost" onClick={() => setWidgetOpen(true)}><Sparkles size={15} /> Ask Cognify AI</Magnetic>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const cols = {
  Learn: ['Courses', 'AI Tutor', 'Find a tutor', 'Exam prep', 'Study plans'],
  Company: ['About', 'Become a tutor', 'Careers', 'Blog', 'Contact'],
  Support: ['Help centre', 'Parents', 'Schools', 'Privacy', 'Terms'],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            <a href="#top" className="logo"><LogoMark /> Cognify</a>
            <p>Premium tuition and an AI study companion — helping students everywhere learn smarter and score higher.</p>
            <form className="newsletter" onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setDone(true) }}>
              <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
              <motion.button className="btn btn-primary btn-sm" whileTap={{ scale: 0.95 }} type="submit" style={{ minWidth: 112 }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={done ? 'd' : 's'} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {done ? <><Check size={15} /> Joined</> : 'Subscribe'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </form>
          </div>
          {Object.entries(cols).map(([h, ls]) => (
            <div key={h}>
              <h4>{h}</h4>
              {ls.map((l) => <motion.a key={l} href="#top" whileHover={{ x: 4 }}>{l}</motion.a>)}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Cognify. All rights reserved.</span>
          <span>Made with care in Kathmandu 🇳🇵</span>
        </div>
        <motion.div className="foot-word" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>
          cognify
        </motion.div>
      </div>
    </footer>
  )
}
