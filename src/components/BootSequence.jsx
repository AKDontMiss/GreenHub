import { useState, useEffect, useCallback } from 'react'

// ─── Terminal line definitions ───────────────────────────────────────────────
// Each entry: { text, delay (ms from start), className }
const BOOT_LINES = [
  { text: 'GreenHub OS  v1.0.0', delay: 200,  cls: 'line-header' },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 400,  cls: 'line-divider' },
  { text: '',                                                       delay: 500,  cls: '' },
  { text: 'Booting kernel...',                                      delay: 700,  cls: 'line-normal' },
  { text: 'Loading birthday_protocols.sh...',                       delay: 1000, cls: 'line-normal' },
  { text: 'Mounting gift filesystem...',                            delay: 1300, cls: 'line-normal' },
  { text: 'Establishing encrypted connection...',                   delay: 1600, cls: 'line-normal' },
  { text: '',                                                       delay: 1900, cls: '' },
  { text: 'Verifying recipient identity...',                        delay: 2100, cls: 'line-dim' },
  { text: '',                                                       delay: 2400, cls: '' },
  { text: '  ┌─ CLASSIFIED RECORD ──────────────────────────┐',   delay: 2600, cls: 'line-box' },
  { text: '  │  NAME      :  Emre Green                     │',   delay: 2800, cls: 'line-box' },
  { text: '  │  STATUS    :  Birthday Boy                   │',   delay: 3000, cls: 'line-box' },
  { text: '  │  CLEARANCE :  FULL ACCESS                    │',   delay: 3200, cls: 'line-box' },
  { text: '  └───────────────────────────────────────────────┘',  delay: 3400, cls: 'line-box' },
  { text: '',                                                       delay: 3500, cls: '' },
  { text: 'Running system diagnostics...',                         delay: 3700, cls: 'line-dim' },
  { text: '',                                                       delay: 3900, cls: '' },
  { text: '  ◆  FRIENDSHIP_MODULE          [ ACTIVE  ]',           delay: 4100, cls: 'line-check' },
  { text: '  ◆  HUMOR_SUBSYSTEM            [ NOMINAL ]',           delay: 4350, cls: 'line-check' },
  { text: '  ◆  GIFT_DEPLOYMENT            [ READY   ]',           delay: 4600, cls: 'line-check' },
  { text: '  ◆  ALL_SYSTEMS                [ GREEN ✓ ]',           delay: 4850, cls: 'line-check-final' },
  { text: '',                                                       delay: 5100, cls: '' },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 5200, cls: 'line-divider' },
  { text: 'INITIALIZATION COMPLETE.',                              delay: 5400, cls: 'line-success' },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 5500, cls: 'line-divider' },
]

const ADVANCE_DELAY = 6800 // ms — auto-advance to main experience

// ─────────────────────────────────────────────────────────────────────────────
export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [showPrompt, setShowPrompt]     = useState(false)
  const [exiting, setExiting]           = useState(false)

  const advance = useCallback(() => {
    if (exiting) return
    setExiting(true)
    setTimeout(onComplete, 700)
  }, [exiting, onComplete])

  useEffect(() => {
    const timers = []

    // Schedule each terminal line
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(prev => [...prev, { ...line, id: i }])
      }, line.delay))
    })

    // Show "press any key" prompt
    timers.push(setTimeout(() => setShowPrompt(true), ADVANCE_DELAY - 800))

    // Auto-advance
    timers.push(setTimeout(advance, ADVANCE_DELAY))

    return () => timers.forEach(clearTimeout)
  }, [advance])

  // Also advance on any keypress or click
  useEffect(() => {
    const handler = () => advance()
    if (showPrompt) {
      window.addEventListener('keydown', handler)
      window.addEventListener('click', handler)
    }
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('click', handler)
    }
  }, [showPrompt, advance])

  return (
    <div style={styles.wrapper} className={exiting ? 'boot-exit' : ''}>
      {/* Scan line sweep */}
      <div style={styles.scanSweep} />

      <div style={styles.terminal}>
        {/* Terminal chrome */}
        <div style={styles.terminalHeader}>
          <span style={styles.dot('#ff5f57')} />
          <span style={styles.dot('#febc2e')} />
          <span style={styles.dot('#28c840')} />
          <span style={styles.terminalTitle}>GreenHub — bash</span>
        </div>

        <div style={styles.terminalBody}>
          {visibleLines.map(line => (
            <div
              key={line.id}
              className={`boot-line ${line.cls}`}
              style={lineStyle(line.cls)}
            >
              {line.text}
            </div>
          ))}

          {/* Cursor */}
          {!showPrompt && (
            <span style={styles.cursor}>█</span>
          )}

          {showPrompt && (
            <div style={styles.prompt}>
              <span style={styles.promptBracket}>[</span>
              PRESS ANY KEY TO ENTER
              <span style={styles.promptBracket}>]</span>
              <span style={styles.blinkCursor}>_</span>
            </div>
          )}
        </div>
      </div>

      <style>{bootCSS}</style>
    </div>
  )
}

// ─── Inline styles ───────────────────────────────────────────────────────────
const styles = {
  wrapper: {
    position: 'fixed',
    inset: 0,
    background: 'var(--bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '24px',
    transition: 'opacity 0.7s ease',
  },
  scanSweep: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, transparent, var(--green-neon), transparent)',
    opacity: 0.6,
    animation: 'scanDown 3s linear infinite',
    pointerEvents: 'none',
  },
  terminal: {
    width: '100%',
    maxWidth: '700px',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid var(--border)',
    boxShadow: 'var(--glow-md), 0 40px 80px rgba(0,0,0,0.6)',
  },
  terminalHeader: {
    background: 'var(--bg-3)',
    borderBottom: '1px solid var(--border)',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  dot: (color) => ({
    width: '12px', height: '12px',
    borderRadius: '50%',
    background: color,
    display: 'inline-block',
    flexShrink: 0,
  }),
  terminalTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--text-dim)',
    marginLeft: '8px',
  },
  terminalBody: {
    background: 'var(--bg)',
    padding: '24px 28px',
    minHeight: '300px',
    maxHeight: '70vh',
    overflowY: 'auto',
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    lineHeight: '1.8',
  },
  cursor: {
    color: 'var(--green-neon)',
    animation: 'blink 1s step-end infinite',
    display: 'inline-block',
  },
  prompt: {
    marginTop: '16px',
    color: 'var(--green-neon)',
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    letterSpacing: '0.12em',
    textShadow: 'var(--glow-sm)',
    animation: 'flicker 4s ease-in-out infinite',
  },
  promptBracket: {
    color: 'var(--text-dim)',
    marginRight: '8px',
  },
  blinkCursor: {
    animation: 'blink 0.8s step-end infinite',
    marginLeft: '4px',
  },
}

function lineStyle(cls) {
  switch (cls) {
    case 'line-header':      return { color: 'var(--green-neon)', fontWeight: 'bold', letterSpacing: '0.1em', textShadow: 'var(--glow-sm)', animation: 'terminalReveal 0.3s ease' }
    case 'line-divider':     return { color: 'var(--green-dim)',  animation: 'terminalReveal 0.2s ease' }
    case 'line-normal':      return { color: 'var(--text-dim)',   animation: 'terminalReveal 0.3s ease' }
    case 'line-dim':         return { color: 'var(--text-ghost)', animation: 'terminalReveal 0.3s ease' }
    case 'line-box':         return { color: 'var(--green-text)', animation: 'terminalReveal 0.3s ease', fontFamily: 'var(--font-mono)' }
    case 'line-check':       return { color: 'var(--green-bright)', animation: 'terminalReveal 0.3s ease' }
    case 'line-check-final': return { color: 'var(--green-neon)', fontWeight: 'bold', textShadow: 'var(--glow-sm)', animation: 'terminalReveal 0.3s ease' }
    case 'line-success':     return { color: 'var(--green-neon)', textShadow: 'var(--glow-md)', letterSpacing: '0.15em', animation: 'terminalReveal 0.4s ease' }
    default:                 return { color: 'transparent', userSelect: 'none', animation: 'none' }
  }
}

// ─── Scoped styles ────────────────────────────────────────────────────────────
const bootCSS = `
  .boot-exit { opacity: 0 !important; }
  .boot-line  { white-space: pre; }
`
