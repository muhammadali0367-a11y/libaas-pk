import Link from 'next/link'
import { PauseBanner, PausedSurface } from '@/components/PauseNotice'

export const metadata = {
  title: 'Storefront Paused — Libaas',
}

export default function StorefrontPausedPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: '#fff', minHeight: '100vh' }}>
      <PauseBanner />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
        </div>
      </nav>

      <PausedSurface
        heading="This creator storefront is paused."
        note="Public creator storefronts are paused while Libaas reviews product visibility, creator guidance, storefront reliability, and brand/supply verification. Creators should not promote products from the platform until this review is complete."
      />
    </main>
  )
}
