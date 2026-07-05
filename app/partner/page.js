import Link from 'next/link'
import { PauseBanner, PausedSurface } from '@/components/PauseNotice'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; }
  .btn-primary { background: #1A1A1A; color: #fff; border: none; border-radius: 100px; padding: 13px 28px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
  .btn-primary:hover { opacity: 0.82; }
`

export default function PartnerPage() {
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
          <Link href="/platform-update" className="nav-link">Platform Update</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 18 }}>For Brands</p>
        <h1 className="display" style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: 700, lineHeight: 1.1, color: '#1A1A1A', marginBottom: 22, letterSpacing: '-0.02em' }}>
          Brand Onboarding<br /><em style={{ color: '#B8952A' }}>Is Currently Paused</em>
        </h1>
        <p style={{ fontSize: 17, color: '#6B6B6B', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, fontWeight: 300 }}>
          Libaas is reviewing brand and product verification before any new brand relationships or creator promotions are confirmed. No official partnerships, direct supply, or authenticity claims are being made until that review is complete.
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      <PausedSurface
        heading="Interested in Libaas as a brand?"
        note="We are not accepting new brand onboarding through the public site while verification and agreement rules are under review. Updates will be shared when the experience is ready again."
      />

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
