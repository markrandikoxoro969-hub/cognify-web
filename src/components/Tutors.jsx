import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { BadgeCheck, Star, Users } from 'lucide-react'
import { SectionHead, fadeUp, stagger } from './ui'

const tutors = [
  { name: 'Dr. Maya Sharma', initials: 'MS', subject: 'Physics · PhD, Cambridge', rating: 4.98, hue: ['#7c3aed', '#2563eb'] },
  { name: 'Arjun Thapa', initials: 'AT', subject: 'Mathematics · Ex-examiner', rating: 4.96, hue: ['#0891b2', '#059669'] },
  { name: 'Sofia Martinez', initials: 'SM', subject: 'English Lit · Oxford', rating: 4.97, hue: ['#db2777', '#ea580c'] },
  { name: 'James Okafor', initials: 'JO', subject: 'Computer Science · MIT', rating: 4.95, hue: ['#9333ea', '#c026d3'] },
]

function TiltCard({ t }) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 })
  const glareX = useTransform(x, [0, 1], ['0%', '100%'])
  const glareY = useTransform(y, [0, 1], ['0%', '100%'])
  const glare = useTransform([glareX, glareY], ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { x.set(0.5); y.set(0.5) }

  return (
    <motion.div variants={fadeUp} style={{ perspective: 900 }}>
      <motion.article
        className="card tutor"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMove}
        onMouseLeave={reset}
        whileHover={{ scale: 1.02 }}
      >
        <div className="tutor-photo" style={{ background: `linear-gradient(150deg, ${t.hue[0]}, ${t.hue[1]})` }}>
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              background: glare,
            }}
          />
          <span className="tutor-badge"><BadgeCheck size={13} /> Verified</span>
          <span className="tutor-initials" style={{ transform: 'translateZ(40px)' }}>{t.initials}</span>
        </div>
        <div className="tutor-info">
          <h3>{t.name}</h3>
          <p style={{ margin: '4px 0 12px' }}>{t.subject}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted)' }}>
            <span style={{ display: 'flex', gap: 5, alignItems: 'center', color: 'var(--gold)' }}><Star size={13} fill="currentColor" /> {t.rating}</span>
            <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}><Users size={13} /> 300+ students</span>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function Tutors() {
  return (
    <section id="tutors">
      <div className="container">
        <SectionHead
          icon={BadgeCheck}
          eyebrow="Our tutors"
          title={<>Taught by people who <span className="serif grad-text">love</span> teaching</>}
          lead="Only 1 in 100 applicants become Cognify tutors. Every one is subject-tested, interviewed and background-checked."
        />
        <motion.div className="tutor-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger(0.1)}>
          {tutors.map((t) => <TiltCard key={t.name} t={t} />)}
        </motion.div>
      </div>
    </section>
  )
}
