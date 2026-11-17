import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Menu, X, Sparkles } from 'lucide-react'
import { LogoMark, Magnetic, ease } from './ui'
import { useChat } from '../hooks/useChat'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#courses', label: 'Courses' },
  { href: '#ai-tutor', label: 'AI Tutor' },
  { href: '#tutors', label: 'Tutors' },
  { href: '#pricing', label: 'Pricing' },
]

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [open, setOpen] = useState(false)
  const { setWidgetOpen } = useChat()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > prev && y > 400 && !open)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <motion.div
        className="nav-wrap"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        <nav className={`nav ${scrolled || open ? 'scrolled' : ''}`}>
          <a href="#top" className="logo" aria-label="Cognify home">
            <LogoMark /> Cognify
          </a>

          <div className="nav-links" onMouseLeave={() => setHovered(null)}>
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav-link" onMouseEnter={() => setHovered(l.href)}>
                {hovered === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </a>
            ))}
          </div>

          <div className="nav-cta">
            <a href="#pricing" className="btn btn-ghost btn-sm">Sign in</a>
            <Magnetic as="button" className="btn btn-primary btn-sm" onClick={() => setWidgetOpen(true)}>
              <Sparkles size={15} /> Ask AI
            </Magnetic>
            <motion.button
              className="menu-btn"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen((o) => !o)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'grid' }}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.3, ease }}
          >
            <motion.div initial="h" animate="v" variants={{ v: { transition: { staggerChildren: 0.05 } } }}>
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  variants={{ h: { opacity: 0, x: -16 }, v: { opacity: 1, x: 0 } }}
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
