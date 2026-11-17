import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Atom, Calculator, FlaskConical, Dna, Code2, BookOpen, LineChart, Languages, Clock, Users, ArrowUpRight, BookMarked } from 'lucide-react'
import { SectionHead, spotlight, ease } from './ui'

const categories = ['All', 'Science', 'Maths', 'Tech', 'Humanities']

const courses = [
  { cat: 'Maths', icon: Calculator, title: 'A-Level Pure Mathematics', text: 'Calculus, vectors and proof — taught for top grades.', lessons: 48, students: '6.2k', level: 'Advanced', price: 49, hue: ['#78563d', '#342a26'] },
  { cat: 'Science', icon: Atom, title: 'Physics: Mechanics to Quantum', text: 'Intuition-first physics with worked exam problems.', lessons: 42, students: '4.8k', level: 'Intermediate', price: 45, hue: ['#477a79', '#342a26'] },
  { cat: 'Science', icon: FlaskConical, title: 'Organic Chemistry Mastery', text: 'Mechanisms finally make sense. Promise.', lessons: 36, students: '3.9k', level: 'Advanced', price: 45, hue: ['#8d5145', '#78563d'] },
  { cat: 'Tech', icon: Code2, title: 'Python & Computer Science', text: 'From first program to algorithms and data structures.', lessons: 54, students: '8.1k', level: 'Beginner', price: 39, hue: ['#426f5d', '#355a5d'] },
  { cat: 'Science', icon: Dna, title: 'Biology for Medicine', text: 'Genetics, physiology and exam-style long answers.', lessons: 40, students: '5.4k', level: 'Intermediate', price: 42, hue: ['#52704b', '#37665d'] },
  { cat: 'Humanities', icon: BookOpen, title: 'English Literature Essays', text: 'Structure, analysis and the art of a killer thesis.', lessons: 30, students: '2.7k', level: 'All levels', price: 35, hue: ['#a15c35', '#61383b'] },
  { cat: 'Maths', icon: LineChart, title: 'Statistics & Data', text: 'Probability, distributions and real-world data.', lessons: 32, students: '3.1k', level: 'Intermediate', price: 39, hue: ['#987343', '#70442e'] },
  { cat: 'Humanities', icon: Languages, title: 'IELTS & SAT Prep', text: 'Strategy, timed practice and personal feedback.', lessons: 28, students: '7.6k', level: 'All levels', price: 44, hue: ['#475b75', '#78563d'] },
  { cat: 'Tech', icon: Code2, title: 'Web Development Bootcamp', text: 'HTML, CSS, JavaScript and React by building.', lessons: 60, students: '5.9k', level: 'Beginner', price: 49, hue: ['#5c4768', '#735166'] },
]

export default function Courses() {
  const [active, setActive] = useState('All')
  const shown = courses.filter((c) => active === 'All' || c.cat === active)

  return (
    <section id="courses">
      <div className="container">
        <SectionHead
          icon={BookMarked}
          eyebrow="Courses"
          title={<>Learn from the <span className="serif grad-text">very best</span></>}
          lead="Structured programs built by examiners and top tutors — every course includes unlimited AI tutor support."
        />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="tabs" role="tablist">
            {categories.map((c) => (
              <button key={c} role="tab" aria-selected={active === c} className={`tab ${active === c ? 'active' : ''}`} onClick={() => setActive(c)}>
                {active === c && (
                  <motion.span layoutId="course-tab" className="tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span>{c}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div className="course-grid" layout>
          <AnimatePresence mode="popLayout">
            {shown.map((c, i) => (
              <motion.article
                layout
                key={c.title}
                className="card course"
                onMouseMove={spotlight}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease, delay: i * 0.04 } }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                whileHover="hover"
              >
                <div className="course-cover" style={{ background: `linear-gradient(135deg, ${c.hue[0]}, ${c.hue[1]})` }}>
                  <motion.div
                    style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 50%)' }}
                    variants={{ hover: { scale: 1.3, opacity: 0.8 } }}
                  />
                  <motion.div variants={{ hover: { scale: 1.15, rotate: -6 } }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                    <c.icon className="big" strokeWidth={1.5} />
                  </motion.div>
                </div>
                <div className="course-body">
                  <div className="course-meta">
                    <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Clock size={13} /> {c.lessons} lessons</span>
                    <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Users size={13} /> {c.students}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <div className="course-foot">
                    <div className="price">${c.price}<small>/mo</small></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="level">{c.level}</span>
                      <motion.span className="icon-btn" variants={{ hover: { rotate: 45, background: '#fff', color: '#0b0b14' } }}>
                        <ArrowUpRight size={16} />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
