import Link from 'next/link'

const HOW = [
  { step: '01', title: 'You Set Commission', desc: 'Agree on a total commission rate with us. We split it between the creator and our platform fee.' },
  { step: '02', title: 'Creators Promote', desc: 'Our vetted creators add your products to their storefronts and share with their audiences.' },
  { step: '03', title: 'Sales Are Tracked', desc: 'Every click and sale is tracked in real time. You confirm orders monthly.' },
  { step: '04', title: 'Pay Only on Results', desc: 'You pay commission only on confirmed sales. We handle creator payouts.' },
]

const BENEFITS = [
  { title: 'Performance-Based Only', desc: 'Pay commission only when a sale happens. Zero wasted spend on influencers who don\'t convert.' },
  { title: 'Full Attribution', desc: 'See exactly which creator drove which sale — down to the SKU level. Real data, not estimates.' },
  { title: '50+ Vetted Creators', desc: 'Your products promoted by our founding creator cohort from day one of joining.' },
  { title: 'Zero Admin', desc: 'We handle all creator payouts. No invoices, no reconciliation, no WhatsApp back and forth.' },
  { title: 'Live Dashboard', desc: 'Real-time view of clicks, orders, and revenue per creator — updated instantly.' },
  { title: 'Founding Rate Lock', desc: 'Early brand partners lock in the lowest subscription rate forever.' },
]

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; }
  .btn-primary { background: #1A1A1A; color: #fff; border: none; border-radius: 100px; padding: 13px 28px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
  .btn-primary:hover { opacity: 0.82; }
  .btn-secondary { background: transparent; color: #1A1A1A; border: 1.5px solid #E8E8E8; border-radius: 100px; padding: 12px 28px; font-size: 14px; font-weight: 500; text-decoration: none; display: inline-block; transition: all 0.2s; font-family: 'Inter', sans-serif; }
  .btn-secondary:hover { border-color: #1A1A1A; }
  .btn-gold { background: #B8952A; color: #fff; border: none; border-radius: 100px; padding: 13px 28px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.2s; font-family: 'Inter', sans-serif; }
  .btn-gold:hover { opacity: 0.88; }
  .card { background: #FAFAFA; border-radius: 14px; border: 1px solid #F0F0F0; padding: 24px; }
  .step-num { font-family: 'Playfair Display', Georgia, serif; font-size: 40px; font-weight: 700; color: #F0F0F0; line-height: 1; margin-bottom: 14px; }
  .check { width: 20px; height: 20px; background: #F0F0F0; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 10px; color: #6B6B6B; }
  .check-gold { background: rgba(184,149,42,0.12); color: #B8952A; }
`

export default function PartnerPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: '#fff', color: '#1A1A1A' }}>
      <style>{S}</style>

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid #F0F0F0', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <Link href="/auth?role=brand" className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 72px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 18 }}>For Brands</p>
        <h1 className="display" style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.1, color: '#1A1A1A', marginBottom: 22, letterSpacing: '-0.02em' }}>
          Pay Only For<br /><em style={{ color: '#B8952A' }}>Real Sales</em>
        </h1>
        <p style={{ fontSize: 17, color: '#6B6B6B', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7, fontWeight: 300 }}>
          Stop guessing if your influencer spend is working. Complete attribution — every click, every order, every creator. You only pay when a sale is confirmed.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth?role=brand" className="btn-primary">Claim a Founding Partner Slot →</Link>
          <Link href="/demo" className="btn-secondary">See Creator Storefront</Link>
        </div>
        <p style={{ fontSize: 12, color: '#C4C4C4', marginTop: 20 }}>Only 3 founding partner slots · Commission agreed per brand</p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 14 }}>The Process</p>
          <h2 className="display" style={{ fontSize: 40, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em' }}>How It Works</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {HOW.map(({ step, title, desc }) => (
            <div key={step} className="card">
              <div className="step-num">{step}</div>
              <h3 className="display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      {/* PRICING */}
      <section style={{ background: '#FAFAFA', padding: '72px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 14 }}>Pricing</p>
            <h2 className="display" style={{ fontSize: 40, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em', marginBottom: 12 }}>Simple & Transparent</h2>
            <p style={{ fontSize: 14, color: '#6B6B6B', maxWidth: 460, margin: '0 auto' }}>
              Commission rates are agreed individually. We split the total between creator and platform fee.
            </p>
          </div>

          {/* Commission explainer */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E8E8', padding: 32, margin: '32px 0' }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 24 }}>How Commission Works</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' }}>
              {[
                { label: 'Total Commission', value: 'Agreed with you', sub: 'e.g. 13% of sale value' },
                { label: 'Creator Earns', value: 'Majority split', sub: 'e.g. 10% of sale value' },
                { label: 'Libaas Fee', value: 'Small fee', sub: 'e.g. 3% of sale value' },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ background: '#FAFAFA', borderRadius: 12, padding: '20px 16px' }}>
                  <p className="display" style={{ fontSize: 20, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>{value}</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 11, color: '#9B9B9B' }}>{sub}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: '#C4C4C4', textAlign: 'center', marginTop: 20 }}>Exact rates agreed during onboarding. No hidden fees.</p>
          </div>

          {/* Tiers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Commission Only */}
            <div style={{ background: '#fff', border: '1px solid #E8E8E8', borderRadius: 16, padding: 32 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 16 }}>Commission Only</p>
              <p className="display" style={{ fontSize: 48, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>PKR 0</p>
              <p style={{ fontSize: 13, color: '#9B9B9B', marginBottom: 28 }}>/month · pay only on sales</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {['Pay commission only on confirmed sales', 'Commission rate agreed with Libaas team', 'Basic creator access', 'Monthly sales report'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div className="check"><span>✓</span></div>
                    <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5 }}>{f}</p>
                  </div>
                ))}
              </div>
              <Link href="/auth?role=brand" style={{ display: 'block', textAlign: 'center', background: '#F5F5F5', color: '#1A1A1A', borderRadius: 100, padding: '12px', fontSize: 14, fontWeight: 500, textDecoration: 'none', fontFamily: "'Inter', sans-serif", transition: 'background 0.2s' }}>
                Get Started Free →
              </Link>
            </div>

            {/* Founding Partner */}
            <div style={{ background: '#1A1A1A', border: '1px solid #1A1A1A', borderRadius: 16, padding: 32, position: 'relative', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(212,175,80,0.2)', color: '#D4AF50', borderRadius: 100, padding: '4px 12px', fontSize: 11, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                Only 3 slots
              </span>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4AF50', marginBottom: 16 }}>Founding Partner</p>
              <p className="display" style={{ fontSize: 48, fontWeight: 700, color: '#fff', marginBottom: 4 }}>PKR 15,000</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>/month · rate locked forever</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {['Everything in Commission Only', 'Priority creator placement', 'Real-time analytics dashboard', 'Dedicated brand page on Libaas', 'Direct creator communication', 'Founding rate locked for life'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div className="check check-gold"><span>✓</span></div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{f}</p>
                  </div>
                ))}
              </div>
              <Link href="/auth?role=brand" style={{ display: 'block', textAlign: 'center', background: '#D4AF50', color: '#1A1A1A', borderRadius: 100, padding: '12px', fontSize: 14, fontWeight: 600, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
                Claim Your Slot →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #F0F0F0', margin: 0 }} />

      {/* BENEFITS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 14 }}>Why Libaas</p>
          <h2 className="display" style={{ fontSize: 40, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em' }}>What You Get</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {BENEFITS.map(({ title, desc }) => (
            <div key={title} className="card">
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1A1A1A', padding: '72px 24px', textAlign: 'center' }}>
        <h2 className="display" style={{ fontSize: 52, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Ready to Partner<br /><em style={{ color: '#D4AF50' }}>With Us?</em>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginBottom: 36, fontWeight: 300 }}>
          Only 3 founding brand partner slots available.
        </p>
        <Link href="/auth?role=brand" style={{ background: '#D4AF50', color: '#1A1A1A', borderRadius: 100, padding: '13px 36px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', fontFamily: "'Inter', sans-serif" }}>
          Become a Partner →
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
