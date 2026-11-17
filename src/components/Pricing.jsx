import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Gem } from 'lucide-react'
import { Magnetic, SectionHead, fadeUp, spotlight, stagger } from './ui'

const plans = [
  { name: 'Starter', monthly: 0, yearly: 0, desc: 'Explore Cognify with the AI tutor.', features: ['Cognify AI tutor (30 chats/day)', 'Practice quizzes', 'Progress dashboard', 'Community study groups'], cta: 'Start free' },
  { name: 'Scholar', monthly: 49, yearly: 39, desc: 'For students serious about their grades.', features: ['Unlimited AI tutor', '4 live tutor sessions / month', 'Personal revision plan', 'Mock exams with feedback', 'Parent progress reports'], cta: 'Start 7-day trial', featured: true },
  { name: 'Elite', monthly: 129, yearly: 103, desc: 'Maximum support for top results.', features: ['Everything in Scholar', '12 live sessions / month', 'Dedicated lead tutor', 'University application help', 'Priority 1-hour support'], cta: 'Talk to us' },
]

export default function Pricing() {
  const [yearly, setYearly] = useState(true)
  return (
    <section id="pricing">
      <div className="container">
        <SectionHead
          icon={Gem}
          eyebrow="Pricing"
          title={<>Simple plans, <span className="serif grad-text">serious</span> results</>}
          lead="Start free with the AI tutor. Upgrade when you want live expert sessions. Cancel anytime."
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="toggle">
            {[['Monthly', false], ['Yearly', true]].map(([label, val]) => (
              <button key={label} className={yearly === val ? 'active' : ''} onClick={() => setYearly(val)}>
                {yearly === val && <motion.span layoutId="price-toggle" className="tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                <span style={{ position: 'relative' }}>{label}{val && <span className="save">−20%</span>}</span>
              </button>
            ))}
          </div>
        </div>
        <motion.div className="pricing" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger(0.12)}>
          {plans.map((p) => {
            const price = yearly ? p.yearly : p.monthly
            return (
              <motion.article
                key={p.name}
                className={`card plan ${p.featured ? 'featured' : ''}`}
                variants={fadeUp}
                onMouseMove={spotlight}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <div className="plan-name">
                  {p.name}
                  {p.featured && <span className="popular">Most popular</span>}
                </div>
                <div className="plan-price">
                  <span style={{ fontSize: 28, fontWeight: 600, marginBottom: 22 }}>$</span>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={price}
                      className="amount"
                      initial={{ y: 40, opacity: 0, filter: 'blur(4px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -40, opacity: 0, filter: 'blur(4px)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 26, filter: { duration: 0.25 } }}
                    >
                      {price}
                    </motion.span>
                  </AnimatePresence>
                  <small>/ month</small>
                </div>
                <p>{p.desc}</p>
                <ul>
                  {p.features.map((f) => <li key={f}><Check size={16} strokeWidth={2.5} /> {f}</li>)}
                </ul>
                <Magnetic as="button" strength={0.15} className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`}>{p.cta}</Magnetic>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
