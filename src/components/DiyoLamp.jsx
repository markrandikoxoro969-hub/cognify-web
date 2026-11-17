/** Small SVG diya: the flame is animated with a low-cost CSS transform. */
export default function DiyoLamp() {
  return (
    <div className="diyo-wrap" aria-hidden="true">
      <span className="diyo-halo" />
      <span className="diyo-flame" />
      <svg className="diyo-vessel" viewBox="0 0 88 68" focusable="false">
        <path d="M18 36c2 15 12 23 26 23s24-8 26-23H18Z" fill="url(#diyoGold)" stroke="#efc77b" strokeWidth="1.5" />
        <path d="M14 35h60c-2 5-12 9-30 9s-28-4-30-9Z" fill="#f5d795" stroke="#efc77b" strokeWidth="1.5" />
        <path d="M24 53c12 6 28 6 40 0" fill="none" stroke="#a9583c" strokeWidth="2" opacity=".6" />
        <defs>
          <linearGradient id="diyoGold" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#f7df9a" />
            <stop offset="1" stopColor="#b66b3e" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
