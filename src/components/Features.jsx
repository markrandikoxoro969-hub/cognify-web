import { motion } from 'framer-motion'
import { Brain, CalendarClock, LineChart, MessagesSquare, ShieldCheck, Languages } from 'lucide-react'
import { SectionHead, fadeUp, spotlight, stagger, ease } from './ui'

function Heatmap() {
  const cells = Array.from({ length: 72 }, (_, i) => {
    const v = (Math.sin(i * 1.7) + Math.cos(i * 0.6) + 2) / 4
    return v
  })
  return (
    <motion.div
      className="heat feature-visual"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger(0.012)}
    >
      {cells.map((v, i) => (
        <motion.i
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0.4 },
            visible: { opacity: 1, scale: 1, background: `rgba(233,169,74,${0.08 + v * 0.75})` },
          }}
        />
      ))}
    </motion.div>
  )
}

function Ring() {
  return (
    <div className="ring-wrap">
      <svg width="150" height="150" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
        <motion.circle
          cx="60" cy="60" r="50" fill="none" stroke="url(#rg)" strokeWidth="10" strokeLinecap="round"
          transform="rotate(-90 60 60)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 0.92 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease }}
        />
        <defs>
          <linearGradient id="rg"><stop offset="0" stopColor="#e9a94a" /><stop offset="1" stopColor="#d7b77a" /></linearGradient>
        </defs>
        <text x="60" y="58" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700">92%</text>
        <text x="60" y="76" textAnchor="middle" fill="#9a98b0" fontSize="9">exam ready</text>
      </svg>
    </div>
  )
}

const features = [
  {
    span: 'span-4', icon: Brain, title: 'An AI tutor that actually teaches',
    text: 'Cognify breaks down hard ideas step by step, checks understanding with quick questions and adapts to how you learn — not just how to get the answer.',
    visual: <Heatmap />,
  },
  {
    span: 'span-2', icon: LineChart, title: 'Progress you can see',
    text: 'Live mastery tracking for every topic and paper.',
    visual: <Ring />,
  },
  {
    span: 'span-2', icon: CalendarClock, title: 'Flexible scheduling',
    text: 'Book expert tutors in 2 taps — mornings, evenings or weekends.',
  },
  {
    span: 'span-2', icon: MessagesSquare, title: 'Homework help, instantly',
    text: 'Stuck at 11 PM? Ask Cognify and get unstuck in seconds.',
  },
  {
    span: 'span-2', icon: ShieldCheck, title: 'Vetted top-1% tutors',
    text: 'Every tutor is background-checked and interview-tested.',
  },
  {
    span: 'span-6', icon: Languages, title: 'Learn in the language you think in',
    text: 'Sessions and AI explanations in English, Nepali, Hindi, Spanish and more — switch any time mid-lesson.',
    visual: (
      <div className="lang-row">
        {['English', 'नेपाली', 'हिन्दी', 'Español', 'Français', '中文', 'العربية', 'Deutsch'].map((l, i) => (
          <motion.span
            key={l}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.05 }}
            whileHover={{ y: -3, borderColor: 'rgba(233,169,74,0.5)', color: '#fff' }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    ),
  },
]

export default function Features() {
  return (
    <section id="features">
      <div className="container">
        <SectionHead
          eyebrow="Why Cognify"
          title={<>Everything you need to <span className="serif grad-text">master</span> any subject</>}
          lead="Human expertise and AI, working together. Real tutors for depth, an always-on AI companion for momentum."
        />
        <motion.div
          className="bento"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.08)}
        >
          {features.map(({ span, icon: Icon, title, text, visual }) => (
            <motion.article
              key={title}
              className={`card ${span}`}
              variants={fadeUp}
              onMouseMove={spotlight}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <motion.div className="icon-tile" whileHover={{ rotate: -8, scale: 1.08 }}>
                <Icon size={22} />
              </motion.div>
              <h3>{title}</h3>
              <p>{text}</p>
              {visual}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
