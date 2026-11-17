import { motion } from 'motion/react'
import { Quote, Star } from 'lucide-react'
import { SectionHead } from './ui'

const items = [
  ['Went from a C to an A* in Maths in two terms. The AI tutor at midnight before exams was a lifesaver.', 'Aanya S.', 'A-Level student', 'C → A*', '#f1c878'],
  ['Dr. Maya made quantum physics feel obvious. Then Cognify quizzed me until I actually knew it.', 'Rohan K.', 'IB Diploma', '7 in Physics', '#67e8f9'],
  ["As a parent, the weekly reports are gold. I finally know what's going on — and his confidence is way up.", 'Priya M.', 'Parent', '+2 grades', '#fcd34d'],
  ['I use the AI to plan my week and break down essays. It explains instead of just giving answers.', 'Lucas B.', 'University, Year 1', 'First-class', '#86efac'],
  ['The best SAT prep I tried. Tutor sessions plus unlimited AI practice is an unfair advantage.', 'Mei L.', 'SAT prep', '1540 SAT', '#f9a8d4'],
  ['Nepali explanations when I get stuck in English — that alone changed everything for me.', 'Bikash T.', 'SEE student', 'GPA 3.9', '#fdba74'],
]

export default function Testimonials() {

  const loop = items

  return (
    <section id="reviews" style={{ overflow: 'hidden' }}>
      <div className="container">
        <SectionHead
          icon={Quote}
          eyebrow="Student stories"
          title={<>Real students. <span className="serif grad-text">Real results.</span></>}
        />
      </div>
      <div className="testi-wrap marquee">
        <motion.div className="testi-track">
          {loop.map(([quote, name, role, grade, color], i) => (
            <motion.article key={i} className="card testi" whileHover={{ y: -6, borderColor: 'rgba(233,169,74,0.35)' }}>
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
