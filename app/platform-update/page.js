export const metadata = {
  title: 'Platform Update — Libaas',
  description: 'Libaas Creator is currently paused while we review and improve the platform experience.',
}

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
`

export default function PlatformUpdatePage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: '#fff', color: '#1A1A1A', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <style>{S}</style>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px' }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 20 }}>
          Platform Update
        </p>
        <h1 className="display" style={{ fontSize: 'clamp(30px, 5vw, 42px)', fontWeight: 700, lineHeight: 1.2, color: '#1A1A1A', marginBottom: 28, letterSpacing: '-0.01em' }}>
          Libaas Creator is currently paused while we review and improve the platform experience.
        </h1>
        <p style={{ fontSize: 16, color: '#3A3A3A', lineHeight: 1.8, marginBottom: 20, fontWeight: 400 }}>
          We are working on clearer product visibility, creator guidance, storefront reliability, and brand/supply verification before creator promotions resume.
        </p>
        <p style={{ fontSize: 16, color: '#3A3A3A', lineHeight: 1.8, marginBottom: 20, fontWeight: 400 }}>
          Creators should not promote products from the platform until Libaas officially confirms that the product and brand status has been reviewed.
        </p>
        <p style={{ fontSize: 16, color: '#1A1A1A', lineHeight: 1.8, fontWeight: 500 }}>
          Trust comes first. Updates will be shared when the experience is ready again.
        </p>
      </div>
    </main>
  )
}
