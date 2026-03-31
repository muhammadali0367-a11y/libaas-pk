import Link from 'next/link'

const BENEFITS = [
  { title: 'Your Own Storefront', desc: 'A beautiful shop page at libaas.pk/yourname — curated by you, for your audience.' },
  { title: 'Earn in PKR', desc: 'Earn commission on every sale — paid directly to JazzCash or your bank account monthly.' },
  { title: 'Real-Time Analytics', desc: 'See your clicks, orders, and earnings live in your dashboard.' },
  { title: 'Top Pakistani Brands', desc: 'Access to Saya, Beechtree, Baroque, Limelight and more from day one.' },
  { title: 'No Follower Minimum', desc: 'We care about engagement and taste — not follower count.' },
  { title: 'Free Forever', desc: 'No subscription fees. Ever. We only earn when you earn.' },
]

const STEPS = [
  { number: '01', title: 'Sign Up Free', desc: 'Create your creator account in under 2 minutes. No approval needed.' },
  { number: '02', title: 'Build Your Shop', desc: 'Browse our brand catalog and add products you genuinely love.' },
  { number: '03', title: 'Share & Earn', desc: 'Share libaas.pk/yourname with your audience and earn on every sale.' },
]

const FAQS = [
  { q: 'How much can I earn?', a: 'Creators earn commission on every sale driven through their storefront. Commission rates vary by brand — typically 10-12% per sale.' },
  { q: 'When do I get paid?', a: 'Payouts are processed monthly via JazzCash or bank transfer once your earnings exceed PKR 1,000.' },
  { q: 'Do I need a minimum number of followers?', a: 'No minimum at all. We care about how engaged your audience is, not how big it is.' },
  { q: 'Which brands are available?', a: 'Saya, Beechtree, Asim Jofa, Limelight, Alkaram, Ethnic, Zellbury, Bonanza, Baroque and Stylo — with more brands joining every week.' },
  { q: 'Is it really free?', a: 'Yes — completely free for creators. We take a small platform fee from the brand side only.' },
]

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; transition: color 0.2s; }
  .nav-link:hover { color: #1A1A1A; }
  .btn-primary { background: #1A1A1A; color: #fff; border: none; border-radius: 100px; padding: 13px 28px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
  .btn-primary:hover { opacity: 0.82; }
  .btn-secondary { background: transparent; color: #1A1A1A; border: 1.5px solid #E8E8E8; border-radius: 100px; padding: 12px 28px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; font-family: 'Inter', sans-serif; }
  .btn-secondary:hover { border-color: #1A1A1A; }
  .card { background: #FAFAFA; border-radius: 14px; border: 1px solid #F0F0F0; padding: 24px; transition: all 0.2s; }
  .card:hover { border-color: #E0E0E0; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
  .faq-card { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; padding: 24px; }
  .step-num { font-family: 'Playfair Display', Georgia, serif; font-size: 40px; font-weight: 700; color: #F0F0F0; line-height: 1; margin-bottom: 14px; }
`

export default function JoinPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: '#fff', color: '#1A1A1A' }}>
      <style>{S}</style>

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid #F0F0F0', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <Link href="/auth" className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>Sign Up Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 72px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 18 }}>For Creators</p>
        <h1 className="display" style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.1, color: '#1A1A1A', marginBottom: 22, letterSpacing: '-0.02em' }}>
          Turn Your Taste<br /><em style={{ color: '#B8952A' }}>Into Income</em>
        </h1>
        <p style={{ fontSize: 17, color: '#6B6B6B', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7, fontWeight: 300 }}>
          Build your personal Pakistani fashion storefront. Earn commission on every sale — paid in PKR.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth" className="btn-primary">Create Your Free Storefront →</Link>
          <Link href="/demo" className="btn-secondary">See Demo</Link>
        </div>
        <p style={{ fontSize: 12, color: '#C4C4C4', marginTop: 20 }}>Free forever · No follower minimum · PKR payouts</p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 14 }}>Simple Process</p>
          <h2 className="display" style={{ fontSize: 40, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em' }}>3 Steps to Start Earning</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {STEPS.map(({ number, title, desc }) => (
            <div key={number} className="card">
              <div className="step-num">{number}</div>
              <h3 className="display" style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      {/* BENEFITS */}
      <section style={{ background: '#FAFAFA', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 14 }}>Why Libaas</p>
            <h2 className="display" style={{ fontSize: 40, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Everything You Need</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {BENEFITS.map(({ title, desc }) => (
              <div key={title} style={{ background: '#fff', borderRadius: 14, border: '1px solid #F0F0F0', padding: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* CTA */}
      <section style={{ background: '#1A1A1A', padding: '72px 24px', textAlign: 'center' }}>
        <h2 className="display" style={{ fontSize: 48, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Ready to Start<br /><em style={{ color: '#D4AF50' }}>Earning?</em>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 32, fontWeight: 300 }}>
          Join Pakistan's first creator storefront platform. Free forever.
        </p>
        <Link href="/auth" style={{ background: '#fff', color: '#1A1A1A', borderRadius: 100, padding: '13px 32px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', fontFamily: "'Inter', sans-serif" }}>
          Create Your Free Storefront →
        </Link>
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
