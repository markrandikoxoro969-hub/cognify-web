import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Route } from 'lucide-react'
import { SectionHead, ease } from './ui'

const steps = [
  ['Tell us your goals', 'Pick your subjects, exam board and target grades. A 3-minute diagnostic shows exactly where you stand.', ['2-min setup', 'Free diagnostic']],
  ['Get matched with a tutor', 'We pair you with a vetted expert who fits your learning style, schedule and budget.', ['Top 1% tutors', 'Free trial lesson']],
  ['Learn with human + AI', 'Live sessions for depth, Cognify AI between sessions for practice, questions and instant help.', ['1:1 sessions', '24/7 AI tutor']],
  ['Track & ace your exams', 'Watch mastery grow topic by topic, with mock exams and personal feedback before the big day.', ['Mock exams', 'Parent reports']],
]

export default function HowItWorks() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section id="how">
      <div className="container">
        <SectionHead
          icon={Route}
          eyebrow="How it works"
          title={<>From stuck to <span className="serif grad-text">confident</span> in four steps</>}
        />
        <div className="steps" ref={ref}>
          <div className="steps-line"><motion.div style={{ scaleY }} /></div>
          {steps.map(([title, text, tags], i) => (
            <motion.div
              className="step"
              key={title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.8, ease }}
            >
              <motion.div
                className="step-num"
                initial={{ scale: 0.6, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0, borderColor: 'rgba(233,169,74,0.6)', boxShadow: '0 0 40px -6px rgba(233,169,74,0.5)' }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              >
                <span className="grad-text">0{i + 1}</span>
              </motion.div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="step-tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
