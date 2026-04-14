import { useEffect, useRef } from 'react'

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useRevealOnScroll(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section style={s.hero}>
      {/* Animated grid background */}
      <div style={s.heroGrid} aria-hidden />

      {/* Glow orb */}
      <div style={s.glowOrb} aria-hidden />

      <div style={s.heroContent}>
        <p style={s.heroPre}>— TRANSMISSION RECEIVED —</p>

        <h1 style={s.heroName}>
          <span style={s.nameFirst}>EMRE</span>
          <span style={s.nameLast}> GREEN</span>
        </h1>

        <div style={s.taglineWrapper}>
          <span style={s.taglineDash}>▸</span>
          <p style={s.tagline}>ALL SYSTEMS GREEN</p>
          <span style={s.taglineDash}>◂</span>
        </div>

        <div style={s.statusRow}>
          {['ONLINE', 'VERIFIED', 'BIRTHDAY MODE'].map(tag => (
            <span key={tag} style={s.statusTag}>
              <span style={s.statusDot} />
              {tag}
            </span>
          ))}
        </div>

        <a href="#gift" style={s.scrollCta}>
          SCROLL TO REVEAL MISSION
          <span style={s.ctaArrow}>↓</span>
        </a>
      </div>

      <style>{heroCSS}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
function GiftSection() {
  const ref = useRef()
  useRevealOnScroll(ref)

  return (
    <section id="gift" style={s.section} ref={ref} className="section-reveal">
      <SectionLabel label="// ARTIFACT LOG" />

      <h2 style={s.sectionTitle}>The Physical Object</h2>
      <p style={s.sectionLead}>
        On your desk, somewhere between the coffee and the chaos, sits a 3D-printed desk
        nameplate — built specifically for you.
      </p>

      <div style={s.cardGrid}>
        <InfoCard
          icon="▣"
          title="The Nameplate"
          body={`Custom-modeled and printed on a Bambu Lab A1. Your name is cast in filament. The surface was ironed flat for maximum clarity. The raised QR blocks are painted black — high-contrast, permanent, and scannable from across the room.`}
        />
        <InfoCard
          icon="◈"
          title="The QR Code"
          body={`The QR code isn't decorative — it's a live gateway. Every scan takes you somewhere. And since the redirect is controlled digitally, where it points can be updated without ever touching the physical object.`}
        />
        <InfoCard
          icon="◉"
          title="The Text"
          body={`"All Systems Green." A play on your last name — half mission-control readout, half personal inside joke. Feels right for someone who has the vibe of a guy whose systems are, in fact, very much green.`}
        />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
function ArchitectureSection() {
  const ref = useRef()
  useRevealOnScroll(ref)

  return (
    <section style={s.section} ref={ref} className="section-reveal">
      <SectionLabel label="// SYSTEM ARCHITECTURE" />

      <h2 style={s.sectionTitle}>How This Works</h2>
      <p style={s.sectionLead}>
        The QR code on the nameplate is permanent — it's literally fused into the plastic.
        But the destination it points to? Fully dynamic. Here's the architecture:
      </p>

      <div style={s.archDiagram}>
        <ArchNode icon="▣" label="Physical Nameplate" sub="Printed. Permanent. On your desk." glow />
        <ArchArrow label="QR scan" />
        <ArchNode icon="⬡" label="Vercel Gateway" sub="Private repo. Hidden redirect layer." />
        <ArchArrow label="302 redirect" />
        <ArchNode icon="◈" label="This Repo" sub="github.com/you/GreenHub" glow />
      </div>

      <div style={s.archExplainer}>
        <p style={s.explainerText}>
          The QR code permanently points to a <strong style={s.em}>Vercel deployment</strong> that
          I control. That deployment holds a single HTML file with an instant redirect. Whenever
          your GitHub URL changes (like when you take ownership of this repo), I update that one
          hidden file — and the physical nameplate keeps working, forever.
        </p>
        <p style={s.explainerText}>
          You own the destination. I maintain the bridge. The nameplate never breaks.
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
function MessageSection() {
  const ref = useRef()
  useRevealOnScroll(ref)

  return (
    <section style={{ ...s.section, ...s.messageSectionBg }} ref={ref} className="section-reveal">
      <SectionLabel label="// CLASSIFIED MESSAGE" />

      <div style={s.messageCard}>
        <div style={s.messageBorder} aria-hidden />
        <p style={s.messageFrom}>From: <span style={s.messageFromName}>AK</span></p>
        <p style={s.messageFrom}>To: <span style={s.messageFromName}>Green</span></p>
        <div style={s.messageDivider} />

        {/* ── THE MESSAGE ── */}
        <p style={s.messageBody}>
          Happy Birthday, Emre! Homeboy is getting old ye. Figured standard paper birthday cards are a bit obsolete (and honestly, not helical enough), so I built you a permanent digital gateway instead. 
        </p>
        <p style={s.messageBody}>
          Whether you use this QR code to link your dev portfolio, your latest repo, or just redirect people to a meme, this physical nameplate is yours to command. Keep building, keep climbing that upward helix, and remember: no matter what bugs you face this year, your desk status is officially "All Systems Green".
        </p>
        <p style={s.messageBody}>
          Life is Good!
        </p>
        {/* ───────────────── */}

        <div style={s.messageDivider} />
        <p style={s.messageSignoff}>— Gotta chnage that birth date cuz it's a joke</p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
function ClaimSection() {
  const ref = useRef()
  useRevealOnScroll(ref)

  const steps = [
    { n: '01', title: 'Accept the transfer', body: 'On your birthday, accept the GitHub transfer to take ownership of this repo.' },
    { n: '02', title: 'The Quick Redirect', body: 'Want to skip this intro? Edit public/config.json and set "showBirthdayIntro" to false to turn this nameplate into an instant link to your LinkedIn or Portfolio.' },
    { n: '03', title: 'The QR stays valid', body: 'I will update the Vercel bridge to point to your new URL. Your physical nameplate will never break.' },
    { n: '04', title: 'Make it yours', body: 'The code is yours. Change the animations, add new sections, or rebuild it entirely. All Systems Green.' },
  ]

  return (
    <section style={{ ...s.section, ...s.claimBg }} ref={ref} className="section-reveal">
      <SectionLabel label="// SYSTEM HANDOFF" />

      <h2 style={s.sectionTitle}>Claiming Ownership</h2>
      <p style={s.sectionLead}>
        This isn't just a birthday card — it's an asset transfer. Here's what happens next:
      </p>

      <div style={s.stepGrid}>
        {steps.map(step => (
          <div key={step.n} style={s.stepCard}>
            <span style={s.stepNumber}>{step.n}</span>
            <h3 style={s.stepTitle}>{step.title}</h3>
            <p style={s.stepBody}>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.footerDivider} />
      <p style={s.footerText}>
        <span style={s.footerGreen}>GreenHub</span>
        {' '}·{' '}
        Built with intent. Gifted with care.
      </p>
      <p style={s.footerSub}>All Systems Green.</p>
    </footer>
  )
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function SectionLabel({ label }) {
  return <p style={s.sectionLabel}>{label}</p>
}

function InfoCard({ icon, title, body }) {
  return (
    <div style={s.infoCard} className="info-card">
      <span style={s.infoIcon}>{icon}</span>
      <h3 style={s.infoTitle}>{title}</h3>
      <p style={s.infoBody}>{body}</p>
      <style>{`.info-card:hover { border-color: var(--green-mid) !important; background: var(--bg-3) !important; }`}</style>
    </div>
  )
}

function ArchNode({ icon, label, sub, glow }) {
  return (
    <div style={{ ...s.archNode, ...(glow ? s.archNodeGlow : {}) }}>
      <span style={s.archIcon}>{icon}</span>
      <p style={s.archLabel}>{label}</p>
      <p style={s.archSub}>{sub}</p>
    </div>
  )
}

function ArchArrow({ label }) {
  return (
    <div style={s.archArrowWrap}>
      <div style={s.archArrowLine} />
      <p style={s.archArrowLabel}>{label}</p>
      <div style={s.archArrowHead}>▶</div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function MainExperience() {
  return (
    <div style={s.wrapper}>
      <HeroSection />
      <GiftSection />
      <ArchitectureSection />
      <MessageSection />
      <ClaimSection />
      <Footer />
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  wrapper: { overflowX: 'hidden' },

  // ── Hero
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '80px 24px',
  },
  heroGrid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(var(--green-faint) 1px, transparent 1px),
      linear-gradient(90deg, var(--green-faint) 1px, transparent 1px)
    `,
    backgroundSize: '48px 48px',
    opacity: 0.25,
    animation: 'gridFade 2s ease forwards',
    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
  },
  glowOrb: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(57,255,20,0.07) 0%, transparent 70%)',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    animation: 'glowPulse 4s ease-in-out infinite',
  },
  heroContent: {
    position: 'relative',
    textAlign: 'center',
    maxWidth: '860px',
    animation: 'fadeIn 1.2s ease 0.3s both',
  },
  heroPre: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    letterSpacing: '0.35em',
    color: 'var(--text-dim)',
    marginBottom: '32px',
  },
  heroName: {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontSize: 'clamp(4rem, 14vw, 11rem)',
    lineHeight: 0.9,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '28px',
    animation: 'bigReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
  },
  nameFirst: {
    color: 'var(--text)',
    display: 'inline',
  },
  nameLast: {
    color: 'var(--green-neon)',
    textShadow: 'var(--glow-lg)',
    display: 'inline',
  },
  taglineWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '32px',
  },
  tagline: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    letterSpacing: '0.4em',
    color: 'var(--green-bright)',
    textShadow: 'var(--glow-sm)',
  },
  taglineDash: {
    color: 'var(--green-dim)',
    fontSize: '18px',
  },
  statusRow: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '48px',
  },
  statusTag: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.15em',
    color: 'var(--text-dim)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '4px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '6px', height: '6px',
    borderRadius: '50%',
    background: 'var(--green-neon)',
    boxShadow: 'var(--glow-sm)',
    animation: 'blink 2s ease-in-out infinite',
    display: 'inline-block',
  },
  scrollCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    letterSpacing: '0.2em',
    color: 'var(--text-ghost)',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  ctaArrow: {
    animation: 'nodeFloat 2s ease-in-out infinite',
    display: 'inline-block',
  },

  // ── Sections
  section: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: 'clamp(60px, 10vw, 120px) 32px',
  },
  sectionLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    letterSpacing: '0.2em',
    color: 'var(--green-mid)',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    color: 'var(--text)',
    letterSpacing: '0.02em',
    lineHeight: 1.05,
    marginBottom: '20px',
  },
  sectionLead: {
    fontFamily: 'var(--font-body)',
    fontWeight: 300,
    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
    color: 'var(--text-dim)',
    lineHeight: 1.8,
    maxWidth: '640px',
    marginBottom: '52px',
  },

  // ── Info cards
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
  },
  infoCard: {
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '28px',
    background: 'var(--bg-2)',
    transition: 'border-color 0.3s, background 0.3s',
  },
  infoIcon: {
    fontSize: '24px',
    color: 'var(--green-mid)',
    display: 'block',
    marginBottom: '16px',
    textShadow: 'var(--glow-sm)',
  },
  infoTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '1.1rem',
    letterSpacing: '0.05em',
    color: 'var(--text)',
    marginBottom: '12px',
  },
  infoBody: {
    fontFamily: 'var(--font-body)',
    fontWeight: 300,
    fontSize: '0.925rem',
    color: 'var(--text-dim)',
    lineHeight: 1.75,
  },

  // ── Architecture diagram
  archDiagram: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    marginBottom: '40px',
    overflowX: 'auto',
    paddingBottom: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  archNode: {
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '20px 24px',
    background: 'var(--bg-2)',
    textAlign: 'center',
    minWidth: '160px',
    flexShrink: 0,
  },
  archNodeGlow: {
    borderColor: 'var(--green-mid)',
    boxShadow: 'var(--glow-sm)',
  },
  archIcon: {
    fontSize: '22px',
    color: 'var(--green-bright)',
    display: 'block',
    marginBottom: '10px',
    textShadow: 'var(--glow-sm)',
  },
  archLabel: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '0.95rem',
    color: 'var(--text)',
    letterSpacing: '0.04em',
    marginBottom: '4px',
  },
  archSub: {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    color: 'var(--text-ghost)',
    letterSpacing: '0.05em',
  },
  archArrowWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 8px',
    flexShrink: 0,
  },
  archArrowLine: {
    width: '48px',
    height: '1px',
    background: 'linear-gradient(90deg, var(--green-dim), var(--green-mid))',
    marginBottom: '4px',
  },
  archArrowLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '9px',
    color: 'var(--text-ghost)',
    letterSpacing: '0.08em',
    marginBottom: '4px',
    whiteSpace: 'nowrap',
  },
  archArrowHead: {
    color: 'var(--green-mid)',
    fontSize: '12px',
  },
  archExplainer: {
    borderLeft: '2px solid var(--green-dim)',
    paddingLeft: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  explainerText: {
    fontFamily: 'var(--font-body)',
    fontWeight: 300,
    fontSize: '1rem',
    color: 'var(--text-dim)',
    lineHeight: 1.8,
  },
  em: {
    color: 'var(--green-bright)',
    fontStyle: 'normal',
    fontWeight: 400,
  },

  // ── Message
  messageSectionBg: {
    maxWidth: '100%',
    padding: 0,
    background: 'var(--bg-2)',
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
  },
  messageCard: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: 'clamp(60px, 10vw, 100px) 32px',
    position: 'relative',
  },
  messageBorder: {
    position: 'absolute',
    top: 40, left: 0,
    width: '3px',
    height: 'calc(100% - 80px)',
    background: 'linear-gradient(180deg, transparent, var(--green-neon), transparent)',
    boxShadow: 'var(--glow-sm)',
  },
  messageFrom: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    letterSpacing: '0.15em',
    color: 'var(--text-ghost)',
    marginBottom: '6px',
  },
  messageFromName: {
    color: 'var(--green-bright)',
    textShadow: 'var(--glow-sm)',
  },
  messageDivider: {
    height: '1px',
    background: 'var(--border)',
    margin: '24px 0',
  },
  messageBody: {
    fontFamily: 'var(--font-body)',
    fontWeight: 300,
    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
    color: 'var(--text)',
    lineHeight: 1.9,
    marginBottom: '16px',
  },
  messageSignoff: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--text-ghost)',
    letterSpacing: '0.12em',
  },

  // ── Claim / Steps
  claimBg: {
    maxWidth: '960px',
  },
  stepGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  stepCard: {
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '28px',
    background: 'var(--bg-2)',
    position: 'relative',
    overflow: 'hidden',
  },
  stepNumber: {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontSize: '3.5rem',
    color: 'var(--green-muted)',
    lineHeight: 1,
    display: 'block',
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  },
  stepTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '1rem',
    color: 'var(--text)',
    letterSpacing: '0.04em',
    marginBottom: '10px',
  },
  stepBody: {
    fontFamily: 'var(--font-body)',
    fontWeight: 300,
    fontSize: '0.9rem',
    color: 'var(--text-dim)',
    lineHeight: 1.75,
  },

  // ── Footer
  footer: {
    textAlign: 'center',
    padding: '60px 32px',
  },
  footerDivider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
    marginBottom: '40px',
    maxWidth: '400px',
    margin: '0 auto 40px',
  },
  footerText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    letterSpacing: '0.15em',
    color: 'var(--text-ghost)',
    marginBottom: '8px',
  },
  footerGreen: {
    color: 'var(--green-mid)',
  },
  footerSub: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '0.3em',
    color: 'var(--green-dim)',
    textTransform: 'uppercase',
  },
}

// ─── Hero-scoped CSS (hover state for scroll CTA) ─────────────────────────────
const heroCSS = `
  a[href="#gift"]:hover { color: var(--green-text) !important; }
`
