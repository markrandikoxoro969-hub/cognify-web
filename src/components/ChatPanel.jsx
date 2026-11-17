import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, RotateCcw, Sparkles, Square, X } from 'lucide-react'
import { useChat } from '../hooks/useChat'
import { Markdown } from '../lib/markdown'

const SUGGESTIONS = [
  'Explain photosynthesis simply',
  'Quiz me on quadratic equations',
  'Make me a 7-day exam revision plan',
  "What's Newton's second law?",
  'Help me write an essay intro',
]

function Typing() {
  return (
    <motion.div
      className="msg ai"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
    >
      <div className="ai-avatar sm"><Sparkles size={14} /></div>
      <div className="bubble ai typing">
        {[0, 1, 2].map((i) => (
          <motion.i
            key={i}
            animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function ChatPanel({ onClose, autoFocus = false }) {
  const { messages, loading, waking, model, send, stop, reset } = useChat()
  const [input, setInput] = useState('')
  const bodyRef = useRef(null)
  const taRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, waking])

  useEffect(() => {
    if (autoFocus) setTimeout(() => taRef.current?.focus(), 250)
  }, [autoFocus])

  const autosize = () => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 140) + 'px'
  }

  const submit = (text = input) => {
    if (!text.trim() || loading) return
    send(text)
    setInput('')
    requestAnimationFrame(autosize)
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const showSuggestions = messages.length <= 1 && !loading

  return (
    <div className="chat">
      <div className="chat-glow" />
      <div className="chat-head">
        <div className="chat-id">
          <motion.div
            className="ai-avatar"
            animate={loading ? { rotate: [0, 8, -8, 0], scale: [1, 1.06, 1] } : { rotate: 0, scale: 1 }}
            transition={loading ? { duration: 1.2, repeat: Infinity } : { duration: 0.3 }}
          >
            <Sparkles size={18} />
          </motion.div>
          <div>
            <strong>Cognify AI Tutor</strong>
            <small><span className="live" /> {loading ? 'Thinking…' : `Online · ${model}`}</small>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <motion.button className="icon-btn" aria-label="New chat" title="New chat" onClick={reset} whileHover={{ rotate: -90 }} whileTap={{ scale: 0.9 }}>
            <RotateCcw size={16} />
          </motion.button>
          {onClose && (
            <motion.button className="icon-btn" aria-label="Close chat" onClick={onClose} whileTap={{ scale: 0.9 }}>
              <X size={16} />
            </motion.button>
          )}
        </div>
      </div>

      <div className="chat-body" ref={bodyRef} aria-live="polite">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              className={`msg ${m.role}`}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              style={{ originX: m.role === 'user' ? 1 : 0 }}
            >
              {m.role === 'ai' && <div className="ai-avatar sm"><Sparkles size={14} /></div>}
              <div className={`bubble ${m.role} ${m.error ? 'error' : ''}`}>
                {m.role === 'ai' ? <Markdown text={m.text} /> : m.text}
              </div>
            </motion.div>
          ))}
          {loading && <Typing key="typing" />}
          {waking && (
            <motion.div key="waking" className="waking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Waking up the Cognify servers — the first reply can take up to a minute…
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            className="suggestions"
            initial="h"
            animate="v"
            exit={{ opacity: 0, height: 0, paddingBottom: 0 }}
            variants={{ v: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
          >
            {SUGGESTIONS.map((s) => (
              <motion.button
                key={s}
                className="suggestion"
                onClick={() => submit(s)}
                variants={{ h: { opacity: 0, y: 8 }, v: { opacity: 1, y: 0 } }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <form className="chat-input" onSubmit={(e) => { e.preventDefault(); submit() }}>
        <textarea
          ref={taRef}
          rows={1}
          value={input}
          placeholder="Ask anything — maths, science, essays…"
          onChange={(e) => { setInput(e.target.value); autosize() }}
          onKeyDown={onKey}
          aria-label="Message Cognify"
        />
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.button
              key="stop" type="button" className="send stop" onClick={stop} aria-label="Stop"
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}
              whileTap={{ scale: 0.9 }}
            >
              <Square size={14} fill="currentColor" />
            </motion.button>
          ) : (
            <motion.button
              key="send" type="submit" className="send" disabled={!input.trim()} aria-label="Send"
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}
              whileHover={input.trim() ? { scale: 1.06 } : undefined}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </form>
      <div className="chat-foot">Cognify AI can make mistakes. Check important info with your tutor.</div>
    </div>
  )
}
