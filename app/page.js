'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { PauseBanner, PausedSurface } from '@/components/PauseNotice'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; transition: color 0.2s; }
  .nav-link:hover { color: #1A1A1A; }
  .audience-pill { padding: 8px 18px; border-radius: 100px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; border: none; font-family: 'Inter', sans-serif; text-decoration: none; display: inline-block; color: #6B6B6B; background: transparent; }
  .audience-pill:hover { color: #1A1A1A; background: #F5F5F5; }
  .btn-primary { background: #1A1A1A; color: #fff; border: none; border-radius: 100px; padding: 12px 24px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
  .btn-primary:hover { opacity: 0.82; }
  .btn-secondary { background: transparent; color: #1A1A1A; border: 1.5px solid #E8E8E8; border-radius: 100px; padding: 11px 24px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; font-family: 'Inter', sans-serif; }
  .btn-secondary:hover { border-color: #1A1A1A; }
  .btn-gold { background: #B8952A; color: #fff; border: none; border-radius: 100px; padding: 12px 24px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
  .btn-gold:hover { opacity: 0.88; }
  .card { background: #FAFAFA; border-radius: 14px; border: 1px solid #F0F0F0; padding: 24px; transition: all 0.22s; }
  .card:hover { border-color: #E0E0E0; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
  .brand-tag { display: inline-block; background: #F5F5F5; color: #6B6B6B; border-radius: 100px; padding: 6px 14px; font-size: 12px; }
  .step-num { font-family: 'Playfair Display', Georgia, serif; font-size: 40px; font-weight: 700; color: #F0F0F0; line-height: 1; margin-bottom: 14px; }
  .stat-box { padding: 44px 32px; text-align: center; border-right: 1px solid #F0F0F0; }
  .stat-box:last-child { border-right: none; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  .fade-1 { animation: fadeUp 0.7s ease forwards; }
  .fade-2 { animation: fadeUp 0.7s ease 0.12s forwards; opacity:0; }
  .fade-3 { animation: fadeUp 0.7s ease 0.24s forwards; opacity:0; }
  .fade-4 { animation: fadeUp 0.7s ease 0.36s forwards; opacity:0; }
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .grid-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
    .grid-4 { grid-template-columns: 1fr 1fr !important; }
    .stat-box { border-right: none !important; border-bottom: 1px solid #F0F0F0; padding: 28px 20px; }
    .stat-box:last-child { border-bottom: none; }
  }
`

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: '#fff', color: '#1A1A1A', minHeight: '100vh' }}>
      <style>{S}</style>

      <PauseBanner />

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.96)' : '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid #F0F0F0',
        transition: 'all 0.3s'
      }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', letterSpacing: '0.02em' }}>Libaas</span>
          </Link>
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 2, background: '#F5F5F5', borderRadius: 100, padding: '4px 5px' }}>
            <Link href="/shoppers" className="audience-pill">For Shoppers</Link>
            <Link href="/join" className="audience-pill">For Creators</Link>
            <Link href="/partner" className="audience-pill">For Brands</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/auth" className="nav-link hide-mobile">Log In</Link>
            <Link href="/platform-update" className="btn-primary" style={{ padding: '9px 20px' }}>Platform Update</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '88px 24px 80px', textAlign: 'center' }}>
        <p className="fade-1" style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 22 }}>
          Pakistan's Fashion Discovery Platform
        </p>
        <h1 className="display fade-2" style={{ fontSize: 'clamp(48px, 7.5vw, 84px)', fontWeight: 700, lineHeight: 1.07, color: '#1A1A1A', marginBottom: 24, letterSpacing: '-0.02em' }}>
          Discover the Taste of<br /><em style={{ color: '#B8952A' }}>Pakistan's Best.</em>
        </h1>
        <p className="fade-3" style={{ fontSize: 17, color: '#6B6B6B', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.75, fontWeight: 300 }}>
          We're making fashion discovery easier for Pakistan. Creator storefronts and brand promotions are paused while we review the platform experience.
        </p>
        <div className="fade-4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/platform-update" className="btn-primary">Read the Platform Update →</Link>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      {/* THREE AUDIENCES */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 16 }}>One Platform. Three Audiences.</p>
          <h2 className="display" style={{ fontSize: 'clamp(34px, 4.5vw, 48px)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Built for Everyone.</h2>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { label: 'For Shoppers', title: 'Discover Fashion', desc: 'Browse and compare Pakistani fashion — discovery is being made easier for everyone.', href: '/shoppers', cta: 'Learn More' },
            { label: 'For Creators', title: 'Curate Your Taste', desc: 'Creator storefronts and promotions are paused while Libaas reviews product visibility, creator guidance, and brand verification.', href: '/join', cta: 'Learn More' },
            { label: 'For Brands', title: 'Get Discovered', desc: 'Brand visibility and onboarding are under review until verification and agreement rules are clear.', href: '/partner', cta: 'Learn More' },
          ].map(({ label, title, desc, href, cta }) => (
            <div key={label} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 14 }}>{label}</p>
              <h3 className="display" style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A', marginBottom: 12 }}>{title}</h3>
              <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.65, marginBottom: 24, flex: 1 }}>{desc}</p>
              <Link href={href} style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Inter', sans-serif" }}>
                {cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      {/* PLATFORM PAUSED */}
      <section style={{ background: '#FAFAFA' }}>
        <PausedSurface
          heading="Libaas Creator is currently paused."
          note="We are reviewing product visibility, creator guidance, storefront reliability, and brand/supply verification before creator promotions resume. Trust comes first."
        />
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #F0F0F0', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span className="display" style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>Libaas</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {[['For Shoppers', '/shoppers'], ['For Creators', '/join'], ['For Brands', '/partner']].map(([label, href]) => (
              <Link key={label} href={href} style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
          <a href="mailto:hello@thelibaas.pk" style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>hello@thelibaas.pk</a>
        </div>
        <div style={{ maxWidth: 1140, margin: '16px auto 0', paddingTop: 16, borderTop: '1px solid #F0F0F0', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: '#C4C4C4' }}>© 2025 Libaas · Pakistan's Fashion Discovery Platform</p>
        </div>
      </footer>
    </main>
  )
}
