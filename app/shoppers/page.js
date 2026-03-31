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
  { icon: '🎯', title: 'Curated, Not Algorithmic', desc: 'Every recommendation comes from a real creator who has tested and loves the product — not an ad or a paid placement.' },
  { icon: '🛍️', title: 'Shop Multiple Brands', desc: 'Find pieces from Saya, Beechtree, Limelight, Baroque and more — all in one place.' },
  { icon: '💫', title: 'Trusted by Real People', desc: 'Follow creators whose style matches yours. Their recommendations become your personal shopping guide.' },
  { icon: '🇵🇰', title: 'Pakistan First', desc: 'Every brand, every creator, every product is Pakistani. Support local fashion while looking your best.' },
]

export default function ShoppersPage() {
  return (
    <main style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: '#0A0807', color: '#fff', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .display { font-family: 'Playfair Display', Georgia, serif; }
        .nav-link { font-size: 13px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #fff; }
        .audience-tab { padding: 8px 20px; border-radius: 100px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; border: none; font-family: 'Inter', sans-serif; text-decoration: none; display: inline-block; }
        .tab-active { background: #fff; color: #0A0807; }
        .tab-inactive { background: transparent; color: rgba(255,255,255,0.5); }
        .tab-inactive:hover { color: rgba(255,255,255,0.85); }
        .btn-cream { background: #F5F0E8; color: #0A0807; border: none; border-radius: 100px; padding: 10px 22px; font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
        .btn-cream:hover { opacity: 0.88; }
        .btn-outline { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.25); border-radius: 100px; padding: 12px 28px; font-size: 14px; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; font-family: 'Inter', sans-serif; }
        .btn-outline:hover { border-color: rgba(255,255,255,0.55); }
        .creator-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; transition: all 0.25s; text-decoration: none; display: block; }
        .creator-card:hover { background: rgba(255,255,255,0.07); border-color: rgba(196,160,82,0.3); transform: translateY(-2px); }
        .avatar { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, rgba(196,160,82,0.3), rgba(196,160,82,0.1)); border: 1px solid rgba(196,160,82,0.25); display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 14px; }
        .feature-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 28px; }
        .divider { height: 1px; background: rgba(255,255,255,0.08); border: none; margin: 0; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .grid-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
          .grid-3 { grid-template-columns: 1fr 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,8,7,0.94)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 24, fontWeight: 700, color: '#F5F0E8', letterSpacing: '0.03em' }}>Libaas</span>
          </Link>
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '5px 6px' }}>
            <Link href="/shoppers" className="audience-tab tab-active">For Shoppers</Link>
            <Link href="/join" className="audience-tab tab-inactive">For Creators</Link>
            <Link href="/partner" className="audience-tab tab-inactive">For Brands</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/auth" className="nav-link hide-mobile">Log In</Link>
            <Link href="/auth?mode=signup" className="btn-cream">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '88px 28px 72px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(196,160,82,0.7)', marginBottom: 20 }}>For Shoppers</p>
        <h1 className="display" style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 700, lineHeight: 1.08, color: '#F5F0E8', marginBottom: 24, letterSpacing: '-0.02em' }}>
          Shop What You Love.<br /><em style={{ color: '#C4A052' }}>From Who You Trust.</em>
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.42)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75, fontWeight: 300 }}>
          Browse curated Pakistani fashion storefronts from creators with real taste. No endless scrolling, no fake reviews — just honest recommendations.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth?mode=signup" className="btn-cream">Start Shopping Free →</Link>
          <Link href="/demo" className="btn-outline" style={{ padding: '10px 24px', fontSize: 13 }}>See a Storefront</Link>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', marginTop: 20 }}>Free to browse · No account required to explore</p>
      </section>

      <hr className="divider" />

      {/* FEATURED CREATORS */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '80px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Browse Storefronts</p>
            <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, color: '#F5F0E8' }}>Trending Curators</h2>
          </div>
          <Link href="/auth?mode=signup" style={{ fontSize: 13, color: '#C4A052', textDecoration: 'none', fontWeight: 500 }}>See all →</Link>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {FEATURED_CREATORS.map(({ name, handle, specialty, items }) => (
            <Link key={handle} href={`/${handle}`} className="creator-card">
              <div className="avatar">👗</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F5F0E8', marginBottom: 4 }}>{name}</h3>
              <p style={{ fontSize: 12, color: 'rgba(196,160,82,0.8)', marginBottom: 8 }}>@{handle}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginBottom: 14 }}>{specialty}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>{items} items curated</span>
                <span style={{ fontSize: 11, color: '#C4A052' }}>View shop →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* FEATURES */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '80px 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Why Libaas</p>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 600, color: '#F5F0E8' }}>Shopping the Way It Should Be</h2>
        </div>
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className="feature-card">
              <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F5F0E8', marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* CTA */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '88px 28px', textAlign: 'center' }}>
        <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: 700, color: '#F5F0E8', marginBottom: 20, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Discover Your Next<br /><em style={{ color: '#C4A052' }}>Favourite Outfit.</em>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', marginBottom: 36, fontWeight: 300, lineHeight: 1.7 }}>
          Join Libaas and shop the curated storefronts of Pakistan's best fashion creators.
        </p>
        <Link href="/auth?mode=signup" className="btn-cream">Create Free Account →</Link>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '28px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <Link href="/" style={{ textDecoration: 'none' }}><span className="display" style={{ fontSize: 18, fontWeight: 700, color: '#F5F0E8' }}>Libaas</span></Link>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/join" style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>For Creators</Link>
            <Link href="/partner" style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>For Brands</Link>
          </div>
          <a href="mailto:hello@thelibaas.pk" style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>hello@thelibaas.pk</a>
        </div>
      </footer>
    </main>
  )
}
