import Link from 'next/link'

const BENEFITS = [
  { icon: '🛍️', title: 'Your Own Storefront', desc: 'A beautiful shop page at libaas.pk/yourname — curated by you, for your audience.' },
  { icon: '💰', title: 'Earn in PKR', desc: 'Earn commission on every sale you drive — paid directly to JazzCash or your bank account monthly.' },
  { icon: '📊', title: 'Real-Time Analytics', desc: 'See your clicks, orders, and earnings live in your dashboard.' },
  { icon: '🤝', title: 'Top Pakistani Brands', desc: 'Access to Saya, Beechtree, Baroque, Limelight and more from day one.' },
  { icon: '🚫', title: 'No Follower Minimum', desc: 'We care about engagement and taste — not follower count.' },
  { icon: '⚡', title: 'Free Forever', desc: 'No subscription fees. Ever. We only earn when you earn.' },
]

const STEPS = [
  { number: '01', title: 'Sign Up', desc: 'Create your free creator account in under 2 minutes.' },
  { number: '02', title: 'Build Your Shop', desc: 'Browse our brand catalog and add products you genuinely love.' },
  { number: '03', title: 'Share & Earn', desc: 'Share libaas.pk/yourname with your audience and earn on every sale.' },
]

const FAQS = [
  { q: 'How much can I earn?', a: 'Creators earn commission on every sale driven through their storefront. Commission rates vary by brand. The more you share, the more you earn.' },
  { q: 'When do I get paid?', a: 'Payouts are processed monthly via JazzCash or bank transfer once your earnings exceed PKR 1,000.' },
  { q: 'Do I need a minimum number of followers?', a: 'No minimum at all. We care about how engaged your audience is, not how big it is.' },
  { q: 'Which brands are available?', a: 'We currently have Saya, Beechtree, Asim Jofa, Limelight, Alkaram, Ethnic, Zellbury, Bonanza, Baroque and Stylo — with more brands joining every week.' },
  { q: 'Is it really free?', a: 'Yes — completely free for creators. We take a small platform fee from the brand side only.' },
  { q: 'How do I get paid?', a: 'Once a brand confirms a sale driven by your storefront, your earnings are added to your balance. We pay out monthly via JazzCash or bank transfer.' },
]

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .animate-in { animation: fadeUp 0.7s ease forwards; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); border-color: rgba(201,168,76,0.3) !important; }
      `}</style>

      {/* NAV */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-wider" style={{ color: '#C9A84C' }}>LIBAAS</Link>
        <Link href="/auth"
          className="font-body text-xs px-5 py-2.5 rounded-full"
          style={{ background: '#C9A84C', color: '#000' }}>
          Sign Up Free
        </Link>
      </nav>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center animate-in">
        <p className="font-body text-xs tracking-[0.3em] mb-6 uppercase" style={{ color: '#C9A84C' }}>
          For Creators
        </p>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.9] mb-8">
          Turn Your Taste<br />
          <span className="italic" style={{ color: '#C9A84C' }}>Into Income</span>
        </h1>
        <p className="font-body text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Build your personal Pakistani fashion storefront. Curate products from top brands.
          Earn commission on every sale — paid in PKR, directly to your account.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth"
            className="font-body px-8 py-4 rounded-full text-sm font-medium"
            style={{ background: '#C9A84C', color: '#000' }}>
            Create Your Free Storefront →
          </Link>
          <Link href="/demo"
            className="font-body px-8 py-4 rounded-full text-sm border border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
            See Demo Storefront
          </Link>
        </div>
        <p className="font-body text-xs mt-8" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Free forever · No follower minimum · PKR payouts
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/5 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] mb-4 uppercase" style={{ color: '#C9A84C' }}>Simple Process</p>
            <h2 className="font-display text-5xl">3 Steps to Start Earning</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map(({ number, title, desc }) => (
              <div key={number} className="card-hover bg-[#141414] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px]"
                  style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.4 }} />
                <p className="font-display text-5xl mb-4" style={{ color: 'rgba(201,168,76,0.3)' }}>{number}</p>
                <h3 className="font-body font-medium text-white mb-2">{title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-t border-white/5 py-24 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] mb-4 uppercase" style={{ color: '#C9A84C' }}>Why Libaas</p>
            <h2 className="font-display text-5xl">Everything You Need</h2>
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

      {/* FAQ */}
      <section className="border-t border-white/5 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-[#141414] border border-white/5 rounded-2xl p-6">
                <h3 className="font-body font-medium text-white mb-2">{q}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-6xl mb-6">
            Ready to Start<br />
            <span className="italic" style={{ color: '#C9A84C' }}>Earning?</span>
          </h2>
          <p className="font-body mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Join Pakistan's first creator storefront platform. Free forever.
          </p>
          <Link href="/auth"
            className="inline-block font-body px-10 py-4 rounded-full text-sm font-medium"
            style={{ background: '#C9A84C', color: '#000' }}>
            Create Your Free Storefront →
          </Link>
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
