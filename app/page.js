import Link from 'next/link'

const BRANDS = ['Saya', 'Beechtree', 'Asim Jofa', 'Limelight', 'Ethnic', 'Zellbury', 'Bonanza', 'Alkaram', 'Baroque', 'Stylo']

const HOW_IT_WORKS = [
  { step: '1', title: 'Brands Join', desc: 'Pakistani fashion brands list their products and agree on a commission rate with us.' },
  { step: '2', title: 'Creators Curate', desc: 'Creators build their personal storefront with products they genuinely love.' },
  { step: '3', title: 'Audience Shops', desc: 'Followers shop through the creator\'s page — every sale tracked in real time.' },
  { step: '4', title: 'Everyone Earns', desc: 'Creators earn commission in PKR. Brands get measurable ROI.' },
]

const CREATOR_BENEFITS = [
  { title: 'Your Own Storefront', desc: 'A beautiful shop page at libaas.pk/yourname — curated by you, for your audience.' },
  { title: 'Earn in PKR', desc: 'Commission on every sale, paid directly to JazzCash or your bank account.' },
  { title: 'Real-Time Analytics', desc: 'See your clicks, orders, and earnings updated live in your dashboard.' },
  { title: 'Work With Top Brands', desc: 'Access to Pakistan\'s best fashion brands from day one.' },
]

export default function HomePage() {
  return (
    <main style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: '#fff', color: '#1A1A1A' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        .display { font-family: 'Playfair Display', Georgia, serif; }
        .body { font-family: 'Inter', -apple-system, sans-serif; }
        .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #1A1A1A; }
        .btn-primary { background: #1A1A1A; color: #fff; border: none; border-radius: 100px; padding: 12px 24px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
        .btn-primary:hover { opacity: 0.85; }
        .btn-secondary { background: transparent; color: #1A1A1A; border: 1.5px solid #1A1A1A; border-radius: 100px; padding: 11px 24px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; font-family: 'Inter', sans-serif; }
        .btn-secondary:hover { background: #1A1A1A; color: #fff; }
        .btn-gold { background: #B8952A; color: #fff; border: none; border-radius: 100px; padding: 12px 24px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
        .btn-gold:hover { opacity: 0.88; }
        .card { background: #FAFAFA; border-radius: 16px; padding: 28px; border: 1px solid #F0F0F0; transition: all 0.25s; }
        .card:hover { border-color: #E0E0E0; box-shadow: 0 4px 24px rgba(0,0,0,0.06); transform: translateY(-2px); }
        .brand-tag { display: inline-block; background: #F5F5F5; color: #6B6B6B; border-radius: 100px; padding: 6px 14px; font-size: 12px; font-weight: 400; }
        .divider { height: 1px; background: #F0F0F0; border: none; margin: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .hero-in { animation: fadeUp 0.7s ease forwards; }
        .hero-in-2 { animation: fadeUp 0.7s ease 0.15s forwards; opacity: 0; }
        .hero-in-3 { animation: fadeUp 0.7s ease 0.3s forwards; opacity: 0; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.04em' }}>Libaas</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <Link href="/demo" className="nav-link">See Demo</Link>
            <Link href="/partner" className="nav-link">For Brands</Link>
            <Link href="/auth" className="nav-link">Log In</Link>
            <Link href="/join" className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>Join as Creator</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '90px 24px 80px', textAlign: 'center' }}>
        <p className="body hero-in" style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 20 }}>
          Pakistan's First Creator Commerce Platform
        </p>
        <h1 className="display hero-in-2" style={{ fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 700, lineHeight: 1.08, color: '#1A1A1A', marginBottom: 24, letterSpacing: '-0.02em' }}>
          Where Great Taste<br />
          <em style={{ color: '#B8952A', fontStyle: 'italic' }}>Leads to Income.</em>
        </h1>
        <p className="body hero-in-3" style={{ fontSize: 17, color: '#6B6B6B', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7, fontWeight: 300 }}>
          Build your personal storefront. Curate products from Pakistan's top fashion brands.
          Earn commission on every sale — paid in PKR.
        </p>
        <div className="hero-in-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/demo" className="btn-primary">See a Creator Storefront →</Link>
          <Link href="/partner" className="btn-secondary">Partner as a Brand</Link>
        </div>

        {/* Brand strip */}
        <div style={{ marginTop: 72, paddingTop: 40, borderTop: '1px solid #F0F0F0' }}>
          <p className="body" style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4C4C4', marginBottom: 20 }}>Products from</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {BRANDS.map(brand => (
              <span key={brand} className="brand-tag">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="body" style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 14 }}>How It Works</p>
          <h2 className="display" style={{ fontSize: 40, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Simple. Transparent. Effective.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="card">
              <div style={{ width: 32, height: 32, background: '#1A1A1A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <span className="body" style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{step}</span>
              </div>
              <h3 className="display" style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A', marginBottom: 10 }}>{title}</h3>
              <p className="body" style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* FOR CREATORS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <p className="body" style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 14 }}>For Creators</p>
            <h2 className="display" style={{ fontSize: 44, fontWeight: 600, lineHeight: 1.15, color: '#1A1A1A', marginBottom: 20, letterSpacing: '-0.01em' }}>
              Your Storefront.<br /><em style={{ color: '#B8952A' }}>Your Rules.</em>
            </h2>
            <p className="body" style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.7, marginBottom: 32, fontWeight: 300 }}>
              Stop doing one-off paid promotions. Build a real income stream by curating products your audience already trusts you on.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/join" className="btn-primary">Join as a Creator</Link>
              <Link href="/demo" className="btn-secondary">See Demo</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {CREATOR_BENEFITS.map(({ title, desc }) => (
              <div key={title} className="card">
                <h3 className="body" style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>{title}</h3>
                <p className="body" style={{ fontSize: 12, color: '#6B6B6B', lineHeight: 1.55 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* FOR BRANDS */}
      <section style={{ background: '#FAFAFA', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 40, border: '1px solid #F0F0F0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#F0F0F0', borderRadius: 12, overflow: 'hidden' }}>
              {[
                { label: 'Total Clicks', value: '—' },
                { label: 'Active Creators', value: '—' },
                { label: 'Confirmed Orders', value: '—' },
                { label: 'Revenue', value: 'PKR —' },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: '#fff', padding: '24px 20px' }}>
                  <p className="display" style={{ fontSize: 28, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>{value}</p>
                  <p className="body" style={{ fontSize: 11, color: '#9B9B9B', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                </div>
              ))}
            </div>
            <p className="body" style={{ fontSize: 11, color: '#C4C4C4', textAlign: 'center', marginTop: 16 }}>Your brand dashboard — real-time attribution</p>
          </div>
          <div>
            <p className="body" style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 14 }}>For Brands</p>
            <h2 className="display" style={{ fontSize: 44, fontWeight: 600, lineHeight: 1.15, color: '#1A1A1A', marginBottom: 20, letterSpacing: '-0.01em' }}>
              Pay Only For<br /><em style={{ color: '#B8952A' }}>Real Sales.</em>
            </h2>
            <p className="body" style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.7, marginBottom: 32, fontWeight: 300 }}>
              Complete attribution — every click, every order, every creator. Only 3 founding brand partner slots available.
            </p>
            <Link href="/partner" className="btn-gold">Claim a Founding Slot →</Link>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* STATS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, textAlign: 'center', borderRadius: 20, border: '1px solid #F0F0F0', overflow: 'hidden' }}>
          {[
            { number: '50+', label: 'Founding Creators' },
            { number: '10+', label: 'Pakistani Brands' },
            { number: 'PKR', label: 'Direct Payouts' },
          ].map(({ number, label }, i) => (
            <div key={label} style={{ padding: '48px 32px', borderRight: i < 2 ? '1px solid #F0F0F0' : 'none' }}>
              <p className="display" style={{ fontSize: 52, fontWeight: 700, color: '#1A1A1A', marginBottom: 8, letterSpacing: '-0.02em' }}>{number}</p>
              <p className="body" style={{ fontSize: 12, color: '#9B9B9B', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h2 className="display" style={{ fontSize: 52, fontWeight: 700, color: '#1A1A1A', marginBottom: 20, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Ready to Start<br /><em style={{ color: '#B8952A' }}>Earning?</em>
        </h2>
        <p className="body" style={{ fontSize: 15, color: '#6B6B6B', marginBottom: 36, lineHeight: 1.7, fontWeight: 300 }}>
          Whether you're a creator looking to monetize your taste or a brand wanting measurable creator marketing — Libaas is for you.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/join" className="btn-primary">Join as a Creator</Link>
          <Link href="/partner" className="btn-secondary">Partner as a Brand</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #F0F0F0', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="display" style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          <p className="body" style={{ fontSize: 12, color: '#C4C4C4' }}>Pakistan's First Creator Commerce Platform</p>
          <a href="mailto:hello@thelibaas.pk" className="body" style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>hello@thelibaas.pk</a>
        </div>
      </footer>
    </main>
  )
}
