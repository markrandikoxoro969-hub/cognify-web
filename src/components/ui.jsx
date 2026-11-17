import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'motion/react'
import { Sparkles } from 'lucide-react'

export const ease = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/** Reveal children when scrolled into view. */
export function Reveal({ children, as = 'div', delay = 0, className, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: fadeUp.hidden,
        visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay } },
      }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function SectionHead({ eyebrow, title, lead, icon: Icon = Sparkles }) {
  return (
    <motion.div
      className="section-head"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger(0.1)}
    >
      <motion.span className="eyebrow" variants={fadeUp}>
        <span className="dot"><Icon size={12} strokeWidth={2.5} /></span>
        {eyebrow}
      </motion.span>
      <motion.h2 className="h-section" variants={fadeUp}>{title}</motion.h2>
      {lead && <motion.p className="lead" variants={fadeUp}>{lead}</motion.p>}
    </motion.div>
  )
}

/** Button that is magnetically pulled toward the cursor. */
export function Magnetic({ children, strength = 0.35, className = '', as = 'a', ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 })
  const Comp = motion[as]

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <Comp
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.95 }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Number that counts up when it scrolls into view. */
export function Counter({ to, suffix = '', prefix = '', decimals = 0, duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = prefix + v.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) + suffix
        }
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix, prefix, decimals, duration])
  return <span ref={ref}>{prefix}0{suffix}</span>
}

/** Cursor-following spotlight on cards (sets CSS vars). */
export function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function LogoMark({ className = 'logo-mark' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1c878" />
          <stop offset=".55" stopColor="#d99743" />
          <stop offset="1" stopColor="#d7b77a" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
      <motion.path
        d="M42 22a14 14 0 1 0 0 20"
        fill="none"
        stroke="url(#lg)"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease }}
      />
      <motion.circle
        cx="44" cy="32" r="4" fill="#fcd34d"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.4, 1] }}
        transition={{ delay: 1.1, duration: 0.6 }}
      />
    </svg>
  )
}
