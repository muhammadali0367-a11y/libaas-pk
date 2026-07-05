import Link from 'next/link'
import { PauseBanner, PausedSurface } from '@/components/PauseNotice'

const FAQS = [
  { q: 'Can I promote products right now?', a: 'Not yet. Creator promotion is paused platform-wide while we review product visibility, creator guidance, storefront reliability, and brand/supply verification.' },
  { q: 'How much can I earn?', a: 'Nothing is confirmed. Commission details are part of the platform review and will be announced only once creator promotions officially resume.' },
  { q: 'Do I need a minimum number of followers?', a: 'This has not changed, but it does not matter right now — creator promotion is paused for everyone.' },
  { q: 'Which brands are available?', a: 'Brand availability has not been confirmed yet. Brands shown in the catalog are not yet official Libaas partners — we will announce availability once verification is complete.' },
]

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; transition: color 0.2s; }
  .nav-link:hover { color: #1A1A1A; }
  .faq-card { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; padding: 24px; }
`

export default function JoinPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: '#fff', color: '#1A1A1A' }}>
      <style>{S}</style>

      <PauseBanner />

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid #F0F0F0', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/auth" className="nav-link">Log In</Link>
            <Link href="/platform-update" className="nav-link" style={{ fontWeight: 600 }}>Platform Update</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 18 }}>For Creators</p>
        <h1 className="display" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.1, color: '#1A1A1A', marginBottom: 22, letterSpacing: '-0.02em' }}>
          Creator Promotion<br /><em style={{ color: '#B8952A' }}>Is Currently Paused</em>
        </h1>
        <p style={{ fontSize: 17, color: '#6B6B6B', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, fontWeight: 300 }}>
          Libaas is reviewing product visibility, creator guidance, storefront reliability, and brand/supply verification. Creators should not promote products from the platform until this review is complete.
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      <PausedSurface
        heading="Creator onboarding is paused."
        note="We're not inviting new creator signups or promotions while the platform review is underway. Read the platform update for what's changing and when promotions resume."
      />

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      {/* FAQ */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 className="display" style={{ fontSize: 40, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Common Questions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map(({ q, a }) => (
            <div key={q} className="faq-card">
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>{q}</h3>
              <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.65 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #F0F0F0', padding: '24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <a href="mailto:hello@thelibaas.pk" style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>hello@thelibaas.pk</a>
        </div>
      </footer>
    </main>
  )
}
