import { motion } from 'framer-motion'
import { Check, Bot } from 'lucide-react'
import ChatPanel from './ChatPanel'
import { fadeUp, stagger, ease } from './ui'

const points = [
  ['Explains, never just answers', 'Step-by-step reasoning so you understand the “why”.'],
  ['Quizzes you on demand', 'Instant practice questions to lock in what you learned.'],
  ['Plans your revision', 'Personal study timetables built around your exams.'],
  ['Available 24/7', 'Late-night homework panic? Cognify is always awake.'],
]

export default function AITutor() {
  return (
    <section id="ai-tutor" className="ai-section">
      <motion.div
        className="blob"
        style={{ width: 600, height: 600, background: 'rgba(99,102,241,0.22)', top: '10%', right: '-10%' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="container ai-grid">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger(0.1)}>
          <motion.span className="eyebrow" variants={fadeUp}>
            <span className="dot"><Bot size={12} strokeWidth={2.5} /></span>
            Live · Powered by Cognify Core
          </motion.span>
          <motion.h2 className="h-section" variants={fadeUp}>
            Meet your <span className="serif grad-text">AI study</span> companion
          </motion.h2>
          <motion.p className="lead" style={{ marginTop: 18 }} variants={fadeUp}>
            This is the real thing — not a demo video. Ask Cognify anything you’re
            studying and get a clear, friendly explanation in seconds.
          </motion.p>
          <ul className="ai-points">
            {points.map(([t, d]) => (
              <motion.li key={t} variants={fadeUp}>
                <span className="check"><Check size={14} strokeWidth={3} /></span>
                <span><b>{t}</b>{d}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 12, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease }}
          style={{ perspective: 1200 }}
        >
          <ChatPanel />
        </motion.div>
      </div>
    </section>
  )
}
