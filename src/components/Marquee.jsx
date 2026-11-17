import { Atom, Calculator, FlaskConical, Globe2, BookOpen, Code2, Dna, Landmark, Languages, LineChart, Music2, PenTool } from 'lucide-react'

const subjects = [
  [Calculator, 'Mathematics'], [Atom, 'Physics'], [FlaskConical, 'Chemistry'], [Dna, 'Biology'],
  [Code2, 'Computer Science'], [BookOpen, 'English Literature'], [Languages, 'Languages'],
  [LineChart, 'Economics'], [Landmark, 'History'], [Globe2, 'Geography'], [PenTool, 'Design'], [Music2, 'Music Theory'],
]

function Row({ reverse = false, duration = 40 }) {
  const items = [...subjects, ...subjects]
  return (
    <div className="marquee">
      <div className={`marquee-track${reverse ? ' reverse' : ''}`} style={{ '--marquee-duration': `${duration}s` }}>
        {items.map(([Icon, label], i) => (
          <span className="chip" key={i}>
            <Icon size={16} /> {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-label">40+ subjects · GCSE · A-Level · IB · SAT · University</div>
      <div style={{ display: 'grid', gap: 14 }}>
        <Row />
        <Row reverse duration={46} />
      </div>
    </div>
  )
}
