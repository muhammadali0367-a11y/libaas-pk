'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const BRANDS = ['Saya', 'Beechtree', 'Asim Jofa', 'Limelight', 'Ethnic', 'Zellbury', 'Bonanza', 'Alkaram', 'Baroque', 'Stylo']

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: '#0A0807', color: '#fff', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .display { font-family: 'Playfair Display', Georgia, serif; }
        .nav-link { font-size: 13px; color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #fff; }
        .btn-cream { background: #F5F0E8; color: #0A0807; border: none; border-radius: 100px; padding: 10px 22px; font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
        .btn-cream:hover { opacity: 0.88; }
        .btn-gold { background: #C4A052; color: #fff; border: none; border-radius: 100px; padding: 12px 28px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
        .btn-gold:hover { opacity: 0.88; }
        .btn-outline { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.25); border-radius: 100px; padding: 12px 28px; font-size: 14px; font-weight: 400; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; font-family: 'Inter', sans-serif; }
        .btn-outline:hover { border-color: rgba(255,255,255,0.6); }
        .card-dark { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; transition: all 0.25s; }
        .card-dark:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.14); }
        .brand-tag { display: inline-block; background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.45); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; padding: 6px 16px; font-size: 12px; }
        .divider { height: 1px; background: rgba(255,255,255,0.08); border: none; margin: 0; }
        .audience-tab { padding: 8px 20px; border-radius: 100px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; border: none; font-family: 'Inter', sans-serif; text-decoration: none; display: inline-block; color: rgba(255,255,255,0.5); background: transparent; }
        .audience-tab:hover { color: rgba(255,255,255,0.85); }
        .stat-box { padding: 44px 32px; text-align: center; border-right: 1px solid rgba(255,255,255,0.08); }
        .stat-box:last-child { border-right: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-1 { animation: fadeUp 0.8s ease forwards; }
        .fade-2 { animation: fadeUp 0.8s ease 0.15s forwards; opacity:0; }
        .fade-3 { animation: fadeUp 0.8s ease 0.3s forwards; opacity:0; }
        .fade-4 { animation: fadeUp 0.8s ease 0.45s forwards; opacity:0; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .grid-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .stat-box { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 28px 20px; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: scrolled ? 'rgba(10,8,7,0.94)' : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent', transition: 'all 0.3s' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 24, fontWeight: 700, color: '#F5F0E8', letterSpacing: '0.03em' }}>Libaas</span>
          </Link>
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '5px 6px' }}>
            <Link href="/shoppers" className="audience-tab">For Shoppers</Link>
            <Link href="/join" className="audience-tab">For Creators</Link>
            <Link href="/partner" className="audience-tab">For Brands</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/auth" className="nav-link hide-mobile">Log In</Link>
            <Link href="/auth?mode=signup" className="btn-cream">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '100px 28px 88px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(196,160,82,0.07) 0%, transparent 70%)' }} />
        <p className="fade-1" style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>Pakistan's First Creator Commerce Platform</p>
        <h1 className="display fade-2" style={{ fontSize: 'clamp(52px, 8vw, 88px)', fontWeight: 700, lineHeight: 1.06, color: '#F5F0E8', marginBottom: 28, letterSpacing: '-0.02em' }}>
          Shop the Taste of<br /><em style={{ color: '#C4A052', fontStyle: 'italic' }}>Pakistan's Best.</em>
        </h1>
        <p className="fade-3" style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.75, fontWeight: 300 }}>
          Discover curated fashion from Pakistan's most trusted creators. Shop their storefronts. Support local talent. Look incredible.
        </p>
        <div className="fade-4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/shoppers" className="btn-cream">Shop Collections →</Link>
          <Link href="/join" className="btn-outline">Become a Creator</Link>
        </div>
        <div style={{ marginTop: 80, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: 22 }}>Featuring products from</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {BRANDS.map(b => <span key={b} className="brand-tag">{b}</span>)}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* THREE AUDIENCES */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '88px 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>One Platform. Three Audiences.</p>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 600, color: '#F5F0E8', letterSpacing: '-0.01em' }}>Built for Everyone.</h2>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { icon: '🛍️', label: 'For Shoppers', href: '/shoppers', title: 'Discover What\'s Worth Buying', desc: 'Browse curated storefronts from creators whose taste you trust. No algorithm. No noise. Just real recommendations from real people.', cta: 'Explore Storefronts' },
            { icon: '✨', label: 'For Creators', href: '/join', title: 'Turn Your Taste Into Income', desc: 'Build your personal storefront at libaas.pk/yourname. Curate products you love. Earn commission in PKR on every sale.', cta: 'Join as a Creator', featured: true },
            { icon: '📈', label: 'For Brands', href: '/partner', title: 'Pay Only for Real Sales', desc: 'Complete attribution. Every click, every order, every creator tracked in real time. You only pay when a sale is confirmed.', cta: 'Become a Partner' },
          ].map(({ icon, label, href, title, desc, cta, featured }) => (
            <div key={label} className="card-dark" style={{ display: 'flex', flexDirection: 'column', ...(featured ? { border: '1px solid rgba(196,160,82,0.22)', background: 'rgba(196,160,82,0.04)' } : {}) }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(196,160,82,0.12)', border: '1px solid rgba(196,160,82,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 18 }}>{icon}</div>
              <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(196,160,82,0.75)', marginBottom: 12 }}>{label}</p>
              <h3 className="display" style={{ fontSize: 24, fontWeight: 600, color: '#F5F0E8', marginBottom: 14, lineHeight: 1.25, flexGrow: 1 }}>{title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, marginBottom: 28 }}>{desc}</p>
              <Link href={href} style={{ fontSize: 13, color: '#C4A052', textDecoration: 'none', fontWeight: 500 }}>{cta} →</Link>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '88px 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>How It Works</p>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 600, color: '#F5F0E8', letterSpacing: '-0.01em' }}>Simple. Transparent. Effective.</h2>
        </div>
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
          {[
            { step: '01', title: 'Brands Join', desc: 'Pakistani fashion brands list products and agree on a commission rate.' },
            { step: '02', title: 'Creators Curate', desc: 'Creators build personal storefronts with products they genuinely love.' },
            { step: '03', title: 'Audience Shops', desc: 'Followers shop through creator pages — every sale tracked in real time.' },
            { step: '04', title: 'Everyone Earns', desc: 'Creators earn in PKR. Brands get measurable ROI. Repeat.' },
          ].map(({ step, title, desc }) => (
            <div key={step} style={{ background: '#0A0807', padding: '40px 28px' }}>
              <p className="display" style={{ fontSize: 44, fontWeight: 700, color: 'rgba(255,255,255,0.07)', lineHeight: 1, marginBottom: 20 }}>{step}</p>
              <h3 className="display" style={{ fontSize: 18, fontWeight: 600, color: '#F5F0E8', marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* STATS */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '88px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}>
          {[{ number: '50+', label: 'Founding Creators' }, { number: '10+', label: 'Pakistani Brands' }, { number: 'PKR', label: 'Direct Payouts' }].map(({ number, label }) => (
            <div key={label} className="stat-box">
              <p className="display" style={{ fontSize: 'clamp(44px, 6vw, 64px)', fontWeight: 700, color: '#F5F0E8', marginBottom: 8, letterSpacing: '-0.02em' }}>{number}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* FOR CREATORS */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '88px 28px' }}>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(196,160,82,0.8)', marginBottom: 20 }}>For Creators</p>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 600, lineHeight: 1.12, color: '#F5F0E8', marginBottom: 20, letterSpacing: '-0.01em' }}>Your Storefront.<br /><em style={{ color: '#C4A052' }}>Your Rules.</em></h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, marginBottom: 36, fontWeight: 300 }}>Stop doing one-off paid promotions. Build a real income stream by curating products your audience already trusts you on.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/join" className="btn-cream">Join as a Creator</Link>
              <Link href="/demo" className="btn-outline">See Demo</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🏪', title: 'Your Own Storefront', desc: 'A beautiful shop at libaas.pk/yourname — curated by you.' },
              { icon: '💰', title: 'Earn in PKR', desc: 'Commission paid to JazzCash or bank account monthly.' },
              { icon: '📊', title: 'Real-Time Analytics', desc: 'See clicks, orders, and earnings updated live.' },
              { icon: '🏷️', title: 'Top Pakistani Brands', desc: 'Access to Saya, Baroque, Limelight and more.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card-dark">
                <div style={{ fontSize: 22, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#F5F0E8', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* FOR BRANDS */}
      <section style={{ padding: '88px 28px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: 32, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
                {[{ label: 'Total Clicks', value: '—' }, { label: 'Active Creators', value: '—' }, { label: 'Confirmed Orders', value: '—' }, { label: 'Revenue', value: 'PKR —' }].map(({ label, value }) => (
                  <div key={label} style={{ background: '#0A0807', padding: '24px 20px' }}>
                    <p className="display" style={{ fontSize: 28, fontWeight: 600, color: '#F5F0E8', marginBottom: 4 }}>{value}</p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', textAlign: 'center', marginTop: 16 }}>Your brand dashboard — real-time attribution</p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(196,160,82,0.8)', marginBottom: 20 }}>For Brands</p>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 600, lineHeight: 1.12, color: '#F5F0E8', marginBottom: 20, letterSpacing: '-0.01em' }}>Pay Only For<br /><em style={{ color: '#C4A052' }}>Real Sales.</em></h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, marginBottom: 36, fontWeight: 300 }}>Complete attribution — every click, every order, every creator. Only 3 founding brand partner slots available.</p>
              <Link href="/partner" className="btn-gold">Claim a Founding Slot →</Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* FINAL CTA */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '96px 28px', textAlign: 'center' }}>
        <h2 className="display" style={{ fontSize: 'clamp(44px, 7vw, 72px)', fontWeight: 700, color: '#F5F0E8', marginBottom: 20, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Ready to Start<br /><em style={{ color: '#C4A052' }}>Earning?</em></h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.38)', marginBottom: 40, lineHeight: 1.7, fontWeight: 300 }}>Whether you're a shopper, a creator, or a brand — Libaas is built for you.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth?mode=signup" className="btn-cream">Create Free Account →</Link>
          <Link href="/partner" className="btn-outline">Partner as a Brand</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '32px 28px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span className="display" style={{ fontSize: 20, fontWeight: 700, color: '#F5F0E8' }}>Libaas</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/shoppers" style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>For Shoppers</Link>
            <Link href="/join" style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>For Creators</Link>
            <Link href="/partner" style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>For Brands</Link>
          </div>
          <a href="mailto:hello@thelibaas.pk" style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>hello@thelibaas.pk</a>
        </div>
        <div style={{ maxWidth: 1140, margin: '16px auto 0', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>© 2025 Libaas · Pakistan's First Creator Commerce Platform</p>
        </div>
      </footer>
    </main>
  )
}
