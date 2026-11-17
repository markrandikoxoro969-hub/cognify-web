import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Sparkles, X } from 'lucide-react'
import ChatPanel from './ChatPanel'
import { useChat } from '../hooks/useChat'

export default function ChatWidget() {
  const { widgetOpen: open, setWidgetOpen: setOpen } = useChat()

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="widget"
            initial={{ opacity: 0, scale: 0.85, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(6px)' }}
            transition={{ type: 'spring', stiffness: 320, damping: 28, filter: { duration: 0.3, ease: 'easeOut' }, opacity: { duration: 0.25 } }}
          >
            <ChatPanel onClose={() => setOpen(false)} autoFocus />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`fab ${open ? 'closed-only' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close AI tutor' : 'Open AI tutor'}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} style={{ display: 'grid' }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="o" style={{ display: 'flex', alignItems: 'center', gap: 10 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <span className="ai-avatar">
                <Sparkles size={20} />
              </span>
              <span className="fab-label">Ask Cognify</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
