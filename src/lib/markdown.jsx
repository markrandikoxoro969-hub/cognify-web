// Tiny, safe markdown renderer (no innerHTML) for AI replies.
import { Fragment } from 'react'

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', n: 'ⁿ', '-': '⁻' }
function prettyMath(src) {
  return src
    .replace(/\\(times|cdot)/g, (_, c) => (c === 'times' ? '×' : '·'))
    .replace(/\\(pm|sqrt|pi|theta|alpha|beta|Delta|le|ge|neq|approx)/g, (_, c) => ({ pm: '±', sqrt: '√', pi: 'π', theta: 'θ', alpha: 'α', beta: 'β', Delta: 'Δ', le: '≤', ge: '≥', neq: '≠', approx: '≈' })[c])
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '($1)/($2)')
    .replace(/\^\{?([0-9n-]+)\}?/g, (_, d) => d.split('').map((c) => SUP[c] ?? c).join(''))
    .replace(/[{}]/g, '')
}

function inline(text, keyBase) {
  const out = []
  const re = /(\$\$[^$]+\$\$|\$[^$\n]+\$|\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*|_[^_\s][^_]*_)/g
  let last = 0
  let m
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const t = m[0]
    const k = `${keyBase}-${i++}`
    if (t.startsWith('$')) out.push(<span className="math" key={k}>{prettyMath(t.replace(/^\$+|\$+$/g, ''))}</span>)
    else if (t.startsWith('**')) out.push(<strong key={k}>{t.slice(2, -2)}</strong>)
    else if (t.startsWith('`')) out.push(<code key={k}>{t.slice(1, -1)}</code>)
    else out.push(<em key={k}>{t.slice(1, -1)}</em>)
    last = m.index + t.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export function Markdown({ text }) {
  const lines = text.replace(/\r/g, '').split('\n')
  const blocks = []
  let list = null
  let code = null

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd()
    if (line.trim().startsWith('```')) {
      if (code) {
        blocks.push(<pre key={`c${idx}`}><code>{code.join('\n')}</code></pre>)
        code = null
      } else {
        list = null
        code = []
      }
      return
    }
    if (code) return code.push(raw)

    const ul = line.match(/^\s*[-*•]\s+(.*)/)
    const ol = line.match(/^\s*(\d+)[.)]\s+(.*)/)
    if (ul || ol) {
      const type = ul ? 'ul' : 'ol'
      if (!list || list.type !== type) {
        list = { type, items: [] }
        blocks.push(list)
      }
      list.items.push(ul ? ul[1] : ol[2])
      return
    }
    list = null
    const h = line.match(/^#{1,4}\s+(.*)/)
    if (h) return blocks.push(<h4 key={`h${idx}`}>{inline(h[1], `h${idx}`)}</h4>)
    if (!line.trim()) return
    blocks.push(<p key={`p${idx}`}>{inline(line, `p${idx}`)}</p>)
  })
  if (code) blocks.push(<pre key="c-end"><code>{code.join('\n')}</code></pre>)

  return (
    <div className="md">
      {blocks.map((b, i) => {
        if (b && b.type && (b.type === 'ul' || b.type === 'ol') && Array.isArray(b.items)) {
          const Tag = b.type
          return (
            <Tag key={`l${i}`}>
              {b.items.map((it, j) => <li key={j}>{inline(it, `l${i}-${j}`)}</li>)}
            </Tag>
          )
        }
        return <Fragment key={`b${i}`}>{b}</Fragment>
      })}
    </div>
  )
}
