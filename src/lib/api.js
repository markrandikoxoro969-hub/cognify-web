// Cognify AI client.
// Response shape: { success: boolean, name: string, model: string, reply: string }
const PROXY_URL = '/api/chat'
const DIRECT_URL = 'https://cognify-api-2.onrender.com/chat'

async function request(base, text, signal) {
  const res = await fetch(`${base}?text=${encodeURIComponent(text)}`, {
    method: 'GET',
    signal,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const type = res.headers.get('content-type') || ''
  if (!type.includes('json')) throw new Error('Unexpected response')
  return res.json()
}

export async function askCognify(text, { signal, timeout = 90000 } = {}) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(new Error('timeout')), timeout)
  const onAbort = () => ctrl.abort()
  signal?.addEventListener('abort', onAbort)

  try {
    let data
    try {
      data = await request(PROXY_URL, text, ctrl.signal)
    } catch (err) {
      if (ctrl.signal.aborted) throw err
      // Fallback for static hosts without a proxy (works only if the API enables CORS)
      data = await request(DIRECT_URL, text, ctrl.signal)
    }
    if (!data || data.success === false || typeof data.reply !== 'string') {
      throw new Error('Cognify could not answer that right now.')
    }
    return {
      reply: data.reply.trim(),
      name: data.name || 'Cognify',
      model: data.model || 'Cognify Core',
    }
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', onAbort)
  }
}
