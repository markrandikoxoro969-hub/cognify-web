import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HelpCircle, Plus } from 'lucide-react'
import { SectionHead, fadeUp, stagger, ease } from './ui'

const faqs = [
  ['How does the Cognify AI tutor work?', 'Cognify AI is powered by our own Cognify Core model. You can ask it to explain concepts, solve problems step by step, quiz you or build a revision plan. It’s available 24/7 on every plan — including free.'],
  ['Are your tutors qualified?', 'Yes. Every tutor holds a degree in their subject (many have PhDs or examiner experience), passes a subject test and interview, and is background-checked. Only around 1% of applicants are accepted.'],
  ['Which subjects and levels do you cover?', 'Over 40 subjects from middle school to university — including GCSE, A-Level, IB, SAT, IELTS, SEE and NEB curricula — across maths, sciences, languages, humanities and computer science.'],
  ['Can I try before I pay?', 'Absolutely. The Starter plan is free forever, and Scholar comes with a 7-day free trial plus a free first lesson with your matched tutor.'],
  ['Can I cancel anytime?', 'Yes — no contracts. Cancel or change plans in one click from your dashboard. Yearly plans are refundable within 30 days.'],
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq">
      <div className="container">
        <SectionHead icon={HelpCircle} eyebrow="FAQ" title={<>Questions, <span className="serif grad-text">answered</span></>} />
        <motion.div className="faq" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger(0.07)}>
          {faqs.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={q}
                className="faq-item"
                variants={fadeUp}
                animate={{ borderColor: isOpen ? 'rgba(167,139,250,0.35)' : 'rgba(255,255,255,0.08)', backgroundColor: isOpen ? 'rgba(167,139,250,0.06)' : 'rgba(255,255,255,0.035)' }}
              >
                <button className="faq-q" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  {q}
                  <motion.span className="faq-icon" animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? '#fff' : 'rgba(0,0,0,0)', color: isOpen ? '#0b0b14' : '#ecebf5' }} transition={{ duration: 0.3, ease }}>
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-a">{a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
