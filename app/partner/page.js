import Link from 'next/link'

const BENEFITS = [
  { icon: '📈', title: 'Performance-Based Only', desc: 'Pay commission only when a sale happens. Zero wasted spend on influencers who don\'t convert.' },
  { icon: '🎯', title: 'Full Attribution', desc: 'See exactly which creator drove which sale — down to the SKU level. Real data, not estimates.' },
  { icon: '👥', title: '50+ Vetted Creators', desc: 'Your products promoted by our founding creator cohort from day one of joining.' },
  { icon: '⚡', title: 'Zero Admin', desc: 'We handle all creator payouts. No invoices, no reconciliation, no WhatsApp back and forth.' },
  { icon: '📊', title: 'Live Dashboard', desc: 'Real-time view of clicks, orders, and revenue per creator — updated instantly.' },
  { icon: '🔒', title: 'Founding Rate Lock', desc: 'Early brand partners lock in the lowest subscription rate forever.' },
]

const HOW = [
  { step: '01', title: 'You Set Commission', desc: 'Agree on a total commission rate with us. We split it between the creator and our platform fee.' },
  { step: '02', title: 'Creators Promote', desc: 'Our vetted creators add your products to their storefronts and share with their audiences.' },
  { step: '03', title: 'Sales Are Tracked', desc: 'Every click and sale is tracked in real time. You confirm orders monthly.' },
  { step: '04', title: 'Pay Only on Results', desc: 'You pay commission only on confirmed sales. We handle creator payouts — nothing for you to manage.' },
]

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); border-color: rgba(201,168,76,0.3) !important; }
      `}</style>

      {/* NAV */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-wider" style={{ color: '#C9A84C' }}>LIBAAS</Link>
        <a href="mailto:hello@thelibaas.pk"
          className="font-body text-xs px-5 py-2.5 rounded-full"
          style={{ background: '#C9A84C', color: '#000' }}>
          Contact Us
        </a>
      </nav>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <p className="font-body text-xs tracking-[0.3em] mb-6 uppercase" style={{ color: '#C9A84C' }}>
          For Brands
        </p>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.9] mb-8">
          Pay Only For<br />
          <span className="italic" style={{ color: '#C9A84C' }}>Real Sales</span>
        </h1>
        <p className="font-body text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Stop guessing if your influencer spend is working. Libaas gives you
          complete attribution — every click, every order, every creator.
          You only pay when a sale is confirmed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:hello@thelibaas.pk"
            className="font-body px-8 py-4 rounded-full text-sm font-medium"
            style={{ background: '#C9A84C', color: '#000' }}>
            Claim a Founding Partner Slot →
          </a>
          <Link href="/demo"
            className="font-body px-8 py-4 rounded-full text-sm border border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
            See Creator Storefront
          </Link>
        </div>
        <p className="font-body text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Only 3 founding partner slots available · Commission agreed per brand
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/5 py-24 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] mb-4 uppercase" style={{ color: '#C9A84C' }}>The Process</p>
            <h2 className="font-display text-5xl">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {HOW.map(({ step, title, desc }) => (
              <div key={step} className="card-hover bg-[#141414] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px]"
                  style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.3 }} />
                <p className="font-display text-4xl mb-3" style={{ color: 'rgba(201,168,76,0.3)' }}>{step}</p>
                <h3 className="font-body font-medium text-sm text-white mb-2">{title}</h3>
                <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-t border-white/5 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-6">
            <p className="font-body text-xs tracking-[0.3em] mb-4 uppercase" style={{ color: '#C9A84C' }}>Pricing</p>
            <h2 className="font-display text-5xl mb-4">Simple & Transparent</h2>
            <p className="font-body text-sm max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Commission rates are agreed individually with each brand.
              We split the total between the creator and our platform fee.
              You always know exactly what you're paying and why.
            </p>
          </div>

          {/* Commission explainer */}
          <div className="my-10 bg-[#141414] border border-white/5 rounded-2xl p-8">
            <p className="font-body text-xs tracking-widest uppercase mb-6" style={{ color: '#C9A84C' }}>
              How Commission Works
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Total Commission', value: 'Agreed with you', sub: 'e.g. 13% of sale value', color: '#fff' },
                { label: 'Creator Earns', value: 'Majority split', sub: 'e.g. 10% of sale value', color: '#C9A84C' },
                { label: 'Libaas Fee', value: 'Small platform fee', sub: 'e.g. 3% of sale value', color: '#C9A84C' },
              ].map(({ label, value, sub, color }) => (
                <div key={label} className="bg-black/30 rounded-xl p-5">
                  <p className="font-display text-2xl mb-1" style={{ color }}>{value}</p>
                  <p className="font-body text-xs text-white font-medium mb-1">{label}</p>
                  <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{sub}</p>
                </div>
              ))}
            </div>
            <p className="font-body text-xs mt-6 text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Exact rates agreed during onboarding. No hidden fees. No surprises.
            </p>
          </div>

          {/* Two tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Commission Only */}
            <div className="rounded-2xl p-8 border" style={{ background: '#0D0D0D', borderColor: 'rgba(255,255,255,0.05)' }}>
              <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Commission Only
              </p>
              <p className="font-display text-5xl text-white mb-1">PKR 0</p>
              <p className="font-body text-xs mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
                /month subscription — pay only on sales
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Pay commission only on confirmed sales',
                  'Commission rate agreed with Libaas team',
                  'Basic creator access',
                  'Monthly sales report',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(201,168,76,0.15)' }}>
                      <span style={{ color: '#C9A84C', fontSize: '9px' }}>✓</span>
                    </div>
                    <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{f}</p>
                  </div>
                ))}
              </div>
              <a href="mailto:hello@thelibaas.pk"
                className="block w-full text-center font-body text-sm py-3.5 rounded-xl font-medium"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                Get in Touch →
              </a>
            </div>

            {/* Founding Partner */}
            <div className="rounded-2xl p-8 border relative overflow-hidden"
              style={{ background: '#141414', borderColor: '#C9A84C' }}>
              <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: '#C9A84C' }} />
              <span className="absolute top-4 right-4 font-body text-xs px-3 py-1 rounded-full"
                style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}>
                Only 3 slots
              </span>
              <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: '#C9A84C' }}>
                Founding Partner
              </p>
              <p className="font-display text-5xl mb-1" style={{ color: '#C9A84C' }}>PKR 15,000</p>
              <p className="font-body text-xs mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
                /month · rate locked forever
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Everything in Commission Only',
                  'Priority creator placement',
                  'Real-time analytics dashboard',
                  'Dedicated brand page on Libaas',
                  'Direct creator communication',
                  'Founding rate locked for life',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(201,168,76,0.15)' }}>
                      <span style={{ color: '#C9A84C', fontSize: '9px' }}>✓</span>
                    </div>
                    <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{f}</p>
                  </div>
                ))}
              </div>
              <a href="mailto:hello@thelibaas.pk"
                className="block w-full text-center font-body text-sm py-3.5 rounded-xl font-medium transition-opacity hover:opacity-90"
                style={{ background: '#C9A84C', color: '#000' }}>
                Claim Your Slot →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-t border-white/5 py-24 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] mb-4 uppercase" style={{ color: '#C9A84C' }}>Why Libaas</p>
            <h2 className="font-display text-5xl">What You Get</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BENEFITS.map(({ icon, title, desc }) => (
              <div key={title} className="card-hover bg-[#141414] border border-white/5 rounded-2xl p-6">
                <span className="text-2xl mb-3 block">{icon}</span>
                <h3 className="font-body font-medium text-sm text-white mb-2">{title}</h3>
                <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-6xl mb-6">
            Ready to Partner<br />
            <span className="italic" style={{ color: '#C9A84C' }}>With Us?</span>
          </h2>
          <p className="font-body mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Only 3 founding brand partner slots available.
            Email us to claim yours before we open to the public.
          </p>
          <a href="mailto:hello@thelibaas.pk"
            className="inline-block font-body px-10 py-4 rounded-full text-sm font-medium"
            style={{ background: '#C9A84C', color: '#000' }}>
            Email Us to Partner →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-display text-xl tracking-wider" style={{ color: '#C9A84C' }}>LIBAAS</Link>
          <a href="mailto:hello@thelibaas.pk"
            className="font-body text-xs hover:text-[#C9A84C] transition-colors"
            style={{ color: 'rgba(255,255,255,0.3)' }}>
            hello@thelibaas.pk
          </a>
        </div>
      </footer>
    </main>
  )
}
