import Link from 'next/link'
import { PauseBanner, PausedSurface } from '@/components/PauseNotice'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; transition: color 0.2s; }
  .nav-link:hover { color: #1A1A1A; }
  .audience-pill { padding: 8px 18px; border-radius: 100px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; border: none; font-family: 'Inter', sans-serif; text-decoration: none; display: inline-block; }
  .pill-active { background: #1A1A1A; color: #fff; }
  .pill-inactive { background: transparent; color: #6B6B6B; }
  .pill-inactive:hover { color: #1A1A1A; background: #F0F0F0; }
  .btn-primary { background: #1A1A1A; color: #fff; border: none; border-radius: 100px; padding: 12px 24px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
  .btn-primary:hover { opacity: 0.82; }
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
  }
`

export default function ShoppersPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: '#fff', color: '#1A1A1A', minHeight: '100vh' }}>
      <style>{S}</style>

      <PauseBanner />

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid #F0F0F0', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 2, background: '#F5F5F5', borderRadius: 100, padding: '4px 5px' }}>
            <Link href="/shoppers" className="audience-pill pill-active">For Shoppers</Link>
            <Link href="/join" className="audience-pill pill-inactive">For Creators</Link>
            <Link href="/partner" className="audience-pill pill-inactive">For Brands</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/auth" className="nav-link hide-mobile">Log In</Link>
            <Link href="/platform-update" className="btn-primary" style={{ padding: '9px 20px' }}>Platform Update</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 20 }}>For Shoppers</p>
        <h1 className="display" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.1, color: '#1A1A1A', marginBottom: 24, letterSpacing: '-0.02em' }}>
          Discover Pakistani<br /><em style={{ color: '#B8952A' }}>Fashion.</em>
        </h1>
        <p style={{ fontSize: 17, color: '#6B6B6B', maxWidth: 520, margin: '0 auto', lineHeight: 1.75, fontWeight: 300 }}>
          Creator storefronts are currently paused while we review the platform experience.
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      <PausedSurface
        heading="Creator storefronts are paused."
        note="We're reviewing product visibility, creator guidance, storefront reliability, and brand/supply verification before creator promotions resume."
      />

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #F0F0F0', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/join" style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>For Creators</Link>
            <Link href="/partner" style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>For Brands</Link>
          </div>
          <a href="mailto:hello@thelibaas.pk" style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>hello@thelibaas.pk</a>
        </div>
      </footer>
    </main>
  )
}
