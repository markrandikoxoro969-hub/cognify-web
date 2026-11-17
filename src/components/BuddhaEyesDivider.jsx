/** Quiet, abstract eye motif used as a decorative divider between learning sections. */
export default function BuddhaEyesDivider() {
  return (
    <div className="buddha-divider flex items-center justify-center" role="presentation" aria-hidden="true">
      <span className="buddha-rule" />
      <svg viewBox="0 0 124 48" className="buddha-eyes" focusable="false">
        <path d="M15 19c8-8 18-8 27 0-8 7-18 7-27 0Zm67 0c8-8 18-8 27 0-8 7-18 7-27 0Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="35.5" cy="19" r="2.5" fill="currentColor" />
        <circle cx="91.5" cy="19" r="2.5" fill="currentColor" />
        <path d="M62 9c-3 5-4 10 0 14 4-4 3-9 0-14Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M58 38c2.5-3 5.5-3 8 0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M7 19h7m96 0h7" stroke="currentColor" strokeWidth="1" opacity=".55" />
      </svg>
      <span className="buddha-rule" />
    </div>
  )
}
