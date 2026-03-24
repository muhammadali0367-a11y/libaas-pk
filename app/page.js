import Link from 'next/link'

const BRANDS = ['Saya', 'Beechtree', 'Asim Jofa', 'Limelight', 'Ethnic', 'Zellbury', 'Bonanza', 'Alkaram', 'Baroque', 'Stylo']

const HOW_IT_WORKS = [
  { step: '01', title: 'Brands Join', desc: 'Pakistani fashion brands list their products and set a commission rate.' },
  { step: '02', title: 'Creators Curate', desc: 'Creators build their personal storefront with products they genuinely love.' },
  { step: '03', title: 'Audience Shops', desc: 'Followers shop through the creator\'s page — every sale tracked in real time.' },
  { step: '04', title: 'Everyone Earns', desc: 'Creators earn 10–15% commission in PKR. Brands get measurable ROI.' },
]

const CREATOR_BENEFITS = [
  { icon: '🛍️', title: 'Your Own Storefront', desc: 'A beautiful shop page at libaas.pk/yourname — curated by you, for your audience.' },
  { icon: '💰', title: 'Earn in PKR', desc: '10–15% commission on every sale. Paid directly to JazzCash or your bank account.' },
  { icon: '📊', title: 'Real-Time Analytics', desc: 'See your clicks, orders, and earnings updated live in your dashboard.' },
  { icon: '🤝', title: 'Work With Top Brands', desc: 'Access to Pakistan\'s best fashion brands — Saya, Beechtree, Baroque and more.' },
]

const BRAND_BENEFITS = [
  { icon: '📈', title: 'Performance-Based', desc: 'Pay only when a sale happens. Zero wasted spend on influencers who don\'t convert.' },
  { icon: '🎯', title: 'Full Attribution', desc: 'See exactly which creator drove which sale — down to the SKU level.' },
  { icon: '👥', title: '50+ Vetted Creators', desc: 'Your products promoted by our founding creator cohort from day one.' },
  { icon: '⚡', title: 'Zero Admin', desc: 'We handle all creator payouts. No invoices, no reconciliation headaches.' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root {
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --cream: #FAF7F2;
          --black: #0A0A0A;
          --dark: #141414;
          --gray: #6B6B6B;
        }
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .gold { color: var(--gold); }
        .bg-gold { background-color: var(--gold); }
        .border-gold { border-color: var(--gold); }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-fade-up { animation: fadeUp 0.8s ease forwards; }
        .animate-fade-up-delay { animation: fadeUp 0.8s ease 0.2s forwards; opacity: 0; }
        .animate-fade-up-delay-2 { animation: fadeUp 0.8s ease 0.4s forwards; opacity: 0; }
        .gold-shimmer {
          background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(201, 168, 76, 0.15);
        }
        .brand-pill {
          transition: all 0.2s ease;
        }
        .brand-pill:hover {
          background: var(--gold);
          color: #000;
        }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md bg-black/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-2xl tracking-wider gold">LIBAAS</span>
          <div className="flex items-center gap-6">
            <Link href="/demo" className="font-body text-sm text-white/60 hover:text-white transition-colors">
              See Demo
            </Link>
            <Link href="/demo" className="font-body text-sm bg-gold text-black px-5 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">
              Get Early Access
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #C9A84C 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #C9A84C 0%, transparent 50%)`
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 60px)`
        }} />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <p className="font-body text-xs tracking-[0.3em] text-[#C9A84C] mb-8 animate-fade-up uppercase">
            Pakistan&apos;s First Creator Commerce Platform
          </p>
          <h1 className="font-display text-7xl md:text-9xl leading-[0.9] mb-8 animate-fade-up-delay">
            <span className="block">Turn Your</span>
            <span className="block italic gold-shimmer">Taste Into</span>
            <span className="block">Income</span>
          </h1>
          <p className="font-body text-lg text-white/50 max-w-xl mx-auto mb-12 leading-relaxed animate-fade-up-delay-2">
            Build your personal fashion storefront. Curate products from Pakistan&apos;s top brands.
            Earn 10–15% commission on every sale — paid in PKR.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-2">
            <Link href="/demo"
              className="font-body bg-gold text-black px-8 py-4 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              See a Creator Storefront →
            </Link>
            <a href="mailto:hello@thelibaas.pk"
              className="font-body border border-white/20 text-white px-8 py-4 rounded-full text-sm hover:border-gold hover:text-gold transition-all">
              Partner as a Brand
            </a>
          </div>

          {/* Brand strip */}
          <div className="mt-20 pt-12 border-t border-white/5">
            <p className="font-body text-xs text-white/30 tracking-widest mb-6 uppercase">Products from</p>
            <div className="flex flex-wrap justify-center gap-3">
              {BRANDS.map(brand => (
                <span key={brand} className="brand-pill font-body text-xs text-white/40 border border-white/10 px-4 py-2 rounded-full cursor-default">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="font-body text-xs tracking-[0.3em] gold mb-4 uppercase">The Platform</p>
            <h2 className="font-display text-5xl md:text-6xl">How Libaas Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="card-hover bg-[#141414] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-40" />
                <p className="font-display text-5xl gold opacity-30 mb-4">{step}</p>
                <h3 className="font-body font-medium text-white mb-3">{title}</h3>
                <p className="font-body text-sm text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR CREATORS */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="font-body text-xs tracking-[0.3em] gold mb-4 uppercase">For Creators</p>
              <h2 className="font-display text-5xl md:text-6xl leading-tight mb-6">
                Your Storefront.<br />
                <span className="italic">Your Rules.</span>
              </h2>
              <p className="font-body text-white/50 leading-relaxed mb-8">
                Stop doing one-off paid promotions for brands you barely know.
                Build a real income stream by curating products your audience already trusts you on.
              </p>
              <Link href="/demo"
                className="inline-block font-body text-sm border border-gold text-gold px-6 py-3 rounded-full hover:bg-gold hover:text-black transition-all">
                See Demo Storefront →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {CREATOR_BENEFITS.map(({ icon, title, desc }) => (
                <div key={title} className="card-hover bg-[#141414] border border-white/5 rounded-2xl p-6">
                  <span className="text-2xl mb-3 block">{icon}</span>
                  <h3 className="font-body font-medium text-sm text-white mb-2">{title}</h3>
                  <p className="font-body text-xs text-white/40 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOR BRANDS */}
      <section className="py-32 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-4 order-2 md:order-1">
              {BRAND_BENEFITS.map(({ icon, title, desc }) => (
                <div key={title} className="card-hover bg-[#141414] border border-white/5 rounded-2xl p-6">
                  <span className="text-2xl mb-3 block">{icon}</span>
                  <h3 className="font-body font-medium text-sm text-white mb-2">{title}</h3>
                  <p className="font-body text-xs text-white/40 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="order-1 md:order-2">
              <p className="font-body text-xs tracking-[0.3em] gold mb-4 uppercase">For Brands</p>
              <h2 className="font-display text-5xl md:text-6xl leading-tight mb-6">
                Pay Only For<br />
                <span className="italic">Real Sales.</span>
              </h2>
              <p className="font-body text-white/50 leading-relaxed mb-8">
                Stop guessing if your influencer spend is working.
                Libaas gives you complete attribution — every click, every order, every creator.
                Only 3 founding brand partner slots available.
              </p>
              <a href="mailto:hello@thelibaas.pk"
                className="inline-block font-body text-sm bg-gold text-black px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
                Claim a Founding Partner Slot →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { number: '50+', label: 'Founding Creators' },
              { number: '10–15%', label: 'Commission Rate' },
              { number: 'PKR', label: 'Direct Payouts' },
            ].map(({ number, label }) => (
              <div key={label}>
                <p className="font-display text-5xl md:text-6xl gold mb-2">{number}</p>
                <p className="font-body text-sm text-white/40 tracking-widest uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-6xl md:text-7xl mb-6">
            Ready to Start<br />
            <span className="italic gold-shimmer">Earning?</span>
          </h2>
          <p className="font-body text-white/40 mb-12 leading-relaxed">
            Join Pakistan&apos;s first creator storefront platform. Whether you&apos;re a creator
            looking to monetize your taste or a brand wanting measurable creator marketing — Libaas is for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo"
              className="font-body bg-gold text-black px-8 py-4 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              Explore Demo Storefront
            </Link>
            <a href="mailto:hello@thelibaas.pk"
              className="font-body border border-white/20 text-white px-8 py-4 rounded-full text-sm hover:border-gold hover:text-gold transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl gold tracking-wider">LIBAAS</span>
          <p className="font-body text-xs text-white/20">Pakistan&apos;s First Creator Commerce Platform</p>
          <a href="mailto:hello@thelibaas.pk" className="font-body text-xs text-white/30 hover:text-gold transition-colors">
            hello@thelibaas.pk
          </a>
        </div>
      </footer>
    </main>
  )
}
