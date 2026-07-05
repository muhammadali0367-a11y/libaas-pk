import Link from 'next/link'
import { PauseBanner, PausedSurface } from '@/components/PauseNotice'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  body { font-family: 'Inter', sans-serif; background: #FAFAFA; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; transition: color 0.2s; }
  .nav-link:hover { color: #1A1A1A; }
`

export const metadata = {
  title: 'Browse Storefronts (Paused) — Libaas',
}

export default function ShoppersDashboard() {
  return (
    <main style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Inter', sans-serif" }}>
      <style>{S}</style>

      <PauseBanner />

      {/* NAV */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <Link href="/auth" className="nav-link">Log In</Link>
        </div>
      </nav>

      <PausedSurface
        heading="Storefront browsing is paused."
        note="Creator storefronts are hidden while we review product visibility, creator guidance, storefront reliability, and brand/supply verification. Check back once the review is complete."
      />
    </main>
  )
}
