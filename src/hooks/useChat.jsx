import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { askCognify } from '../lib/api'

const ChatContext = createContext(null)
let uid = 0
const id = () => `m${Date.now()}-${uid++}`

const WELCOME = {
  id: 'welcome',
  role: 'ai',
  text: "Hi, I'm **Cognify** — your AI study companion. Ask me to explain a concept, quiz you, or build a revision plan. What are we learning today?",
}

// The API is stateless, so recent turns are sent along with each message
// (trimmed to keep the GET URL a safe length).
const MAX_HISTORY_CHARS = 1800
function buildPrompt(history, text) {
  const turns = history.filter((m) => m.id !== 'welcome' && !m.error)
  const lines = []
  let total = 0
  for (let i = turns.length - 1; i >= 0 && lines.length < 8; i--) {
    const m = turns[i]
    let body = m.text.replace(/\s+/g, ' ').trim()
    if (body.length > 600) body = body.slice(0, 600) + '…'
    const line = `${m.role === 'user' ? 'Student' : 'Cognify'}: ${body}`
    if (total + line.length > MAX_HISTORY_CHARS) break
    lines.unshift(line)
    total += line.length
  }
  if (!lines.length) return text
  return `[Conversation so far]\n${lines.join('\n')}\n\n[Student's new message]\n${text}`
}

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([WELCOME])
  const [loading, setLoading] = useState(false)
  const [waking, setWaking] = useState(false)
  const [model, setModel] = useState('Cognify Core')
  const [widgetOpen, setWidgetOpen] = useState(false)
  const ctrlRef = useRef(null)

  const historyRef = useRef([])
  historyRef.current = messages

  const send = useCallback(async (raw) => {
    const text = raw.trim()
    if (!text || ctrlRef.current) return
    const prompt = buildPrompt(historyRef.current, text)
    setMessages((m) => [...m, { id: id(), role: 'user', text }])
    setLoading(true)
    const ctrl = new AbortController()
    ctrlRef.current = ctrl
    // Render free-tier instances can cold-start; tell the user after a few seconds.
    const wakeTimer = setTimeout(() => setWaking(true), 6000)
    try {
      const res = await askCognify(prompt, { signal: ctrl.signal })
      setModel(res.model)
      setMessages((m) => [...m, { id: id(), role: 'ai', text: res.reply, model: res.model }])
    } catch (err) {
      if (ctrl.signal.aborted) {
        setMessages((m) => [...m, { id: id(), role: 'ai', text: '_Stopped._', error: true }])
      } else {
        setMessages((m) => [
          ...m,
          {
            id: id(),
            role: 'ai',
            error: true,
            text: "I couldn't reach the Cognify servers just now. Please try again in a moment.",
          },
        ])
      }
    } finally {
      clearTimeout(wakeTimer)
      setWaking(false)
      setLoading(false)
      ctrlRef.current = null
    }
  }, [])

  const stop = useCallback(() => ctrlRef.current?.abort(), [])
  const reset = useCallback(() => {
    ctrlRef.current?.abort()
    setMessages([WELCOME])
  }, [])

  return (
    <ChatContext.Provider
      value={{ messages, loading, waking, model, send, stop, reset, widgetOpen, setWidgetOpen }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
