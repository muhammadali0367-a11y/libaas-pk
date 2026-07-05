import Link from 'next/link'

export function PauseBanner() {
  return (
    <div style={{ background: '#1A1A1A', textAlign: 'center', padding: '10px 16px' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.02em' }}>
        Libaas Creator is currently paused while we review the platform.{' '}
        <Link href="/platform-update" style={{ color: '#D4AF50', textDecoration: 'underline' }}>Read the update</Link>
      </p>
    </div>
  )
}

export function PausedSurface({ heading, note }) {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '64px 24px 80px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
      <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 16 }}>
        Paused for Review
      </p>
      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, color: '#1A1A1A', marginBottom: 16, letterSpacing: '-0.01em' }}>
        {heading}
      </h1>
      <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.75, marginBottom: 28, fontWeight: 300 }}>
        {note}
      </p>
      <Link href="/platform-update" style={{ background: '#1A1A1A', color: '#fff', borderRadius: 100, padding: '12px 26px', fontSize: 13, fontWeight: 500, textDecoration: 'none', display: 'inline-block', fontFamily: "'Inter', sans-serif" }}>
        Read the Platform Update →
      </Link>
    </div>
  )
}
