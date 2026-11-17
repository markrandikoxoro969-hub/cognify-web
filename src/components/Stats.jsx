import { motion } from 'framer-motion'
import { Counter, fadeUp, stagger } from './ui'

const stats = [
  { to: 48000, suffix: '+', label: 'Students taught' },
  { to: 1200, suffix: '+', label: 'Expert tutors' },
  { to: 4.9, decimals: 1, suffix: '/5', label: 'Average rating' },
  { to: 94, suffix: '%', label: 'Hit their target grade' },
]

export default function Stats() {
  return (
    <section style={{ paddingTop: 40 }}>
      <div className="container">
        <motion.div className="stats" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger(0.1)}>
          {stats.map((s) => (
            <motion.div className="stat" key={s.label} variants={fadeUp}>
              <div className="stat-num grad-text"><Counter to={s.to} suffix={s.suffix} decimals={s.decimals || 0} /></div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
