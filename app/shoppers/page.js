import Link from 'next/link'

const FEATURED_CREATORS = [
  { name: 'Ayesha Malik', handle: 'ayeshamalik', specialty: 'Formal & Bridal', items: 24 },
  { name: 'Sara Khan', handle: 'sarakhan', specialty: 'Casual & Streetwear', items: 18 },
  { name: 'Zara Ahmed', handle: 'zaraahmed', specialty: 'Lawn & Summer', items: 31 },
  { name: 'Hira Baig', handle: 'hirabaig', specialty: 'Luxury & Designer', items: 15 },
  { name: 'Nadia Hussain', handle: 'nadiahussain', specialty: 'Party & Festive', items: 22 },
  { name: 'Maria Shah', handle: 'mariashah', specialty: 'Everyday Basics', items: 28 },
]

const FEATURES = [
  { title: 'Curated, Not Algorithmic', desc: 'Every recommendation comes from a real creator who has tested and loves the product — not an ad or a paid placement.' },
  { title: 'Shop Multiple Brands', desc: 'Find pieces from Saya, Beechtree, Limelight, Baroque and more — all in one place.' },
  { title: 'Trusted by Real People', desc: 'Follow creators whose style matches yours. Their recommendations become your personal shopping guide.' },
  { title: 'Pakistan First', desc: 'Every brand, every creator, every product is Pakistani. Support local fashion while looking your best.' },
]

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
  .btn-secondary { background: transparent; color: #1A1A1A; border: 1.5px solid #E8E8E8; border-radius: 100px; padding: 11px 24px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; font-family: 'Inter', sans-serif; }
  .btn-secondary:hover { border-color: #1A1A1A; }
  .creator-card { background: #FAFAFA; border: 1px solid #F0F0F0; border-radius: 16px; padding: 24px; transition: all 0.22s; text-decoration: none; display: block; }
  .creator-card:hover { border-color: #E0E0E0; box-shadow: 0 4px 16px rgba(0,0,0,0.07); transform: translateY(-2px); }
  .avatar { width: 52px; height: 52px; border-radius: 50%; background: #F0F0F0; border: 1px solid #E8E8E8; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 14px; }
  .card { background: #FAFAFA; border-radius: 14px; border: 1px solid #F0F0F0; padding: 24px; }
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .grid-3 { grid-template-columns: 1fr 1fr !important; }
    .grid-4 { grid-template-columns: 1fr 1fr !important; }
  }
`

export default function ShoppersPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: '#fff', color: '#1A1A1A', minHeight: '100vh' }}>
      <style>{S}</style>

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
            <Link href="/auth?mode=signup" className="btn-primary" style={{ padding: '9px 20px' }}>Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 72px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 20 }}>For Shoppers</p>
        <h1 className="display" style={{ fontSize: 'clamp(44px, 7vw, 76px)', fontWeight: 700, lineHeight: 1.08, color: '#1A1A1A', marginBottom: 24, letterSpacing: '-0.02em' }}>
          Shop What You Love.<br /><em style={{ color: '#B8952A' }}>From Who You Trust.</em>
        </h1>
        <p style={{ fontSize: 17, color: '#6B6B6B', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.75, fontWeight: 300 }}>
          Browse curated Pakistani fashion storefronts from creators with real taste. No account needed — just explore and shop.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Goes directly to browse — no login required */}
          <Link href="/shoppers/dashboard" className="btn-primary">Start Shopping →</Link>
          <Link href="/demo" className="btn-secondary">See a Storefront</Link>
        </div>
        <p style={{ fontSize: 12, color: '#C4C4C4', marginTop: 20 }}>No account required · Free to browse</p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      {/* FEATURED CREATORS */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 44 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 10 }}>Browse Storefronts</p>
            <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Trending Curators</h2>
          </div>
          <Link href="/shoppers/dashboard" style={{ fontSize: 13, color: '#B8952A', textDecoration: 'none', fontWeight: 500 }}>See all →</Link>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {FEATURED_CREATORS.map(({ name, handle, specialty, items }) => (
            <Link key={handle} href={`/${handle}`} className="creator-card">
              <div className="avatar">👗</div>
              <h3 className="display" style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>{name}</h3>
              <p style={{ fontSize: 13, color: '#B8952A', fontWeight: 500, marginBottom: 6 }}>@{handle}</p>
              <p style={{ fontSize: 13, color: '#9B9B9B', marginBottom: 16 }}>{specialty}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#C4C4C4' }}>{items} items curated</span>
                <span style={{ fontSize: 12, color: '#1A1A1A', fontWeight: 500 }}>View shop →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      {/* WHY LIBAAS */}
      <section style={{ background: '#FAFAFA', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 14 }}>Why Libaas</p>
            <h2 className="display" style={{ fontSize: 40, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Shopping the Way It Should Be</h2>
          </div>
          <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {FEATURES.map(({ title, desc }) => (
              <div key={title} className="card">
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1A1A1A', padding: '72px 24px', textAlign: 'center' }}>
        <h2 className="display" style={{ fontSize: 'clamp(36px, 5.5vw, 56px)', fontWeight: 700, color: '#fff', marginBottom: 18, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Discover Your Next<br /><em style={{ color: '#D4AF50' }}>Favourite Outfit.</em>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 32, fontWeight: 300, lineHeight: 1.7 }}>
          Browse Pakistan's best fashion creators — no account needed.
        </p>
        <Link href="/shoppers/dashboard" style={{ background: '#fff', color: '#1A1A1A', borderRadius: 100, padding: '13px 32px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', fontFamily: "'Inter', sans-serif" }}>
          Start Shopping →
        </Link>
      </section>

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
