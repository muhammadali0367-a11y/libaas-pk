'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .input-field { width: 100%; background: #FAFAFA; border: 1px solid #E8E8E8; border-radius: 10px; padding: 13px 16px; font-size: 14px; color: #1A1A1A; font-family: 'Inter', sans-serif; outline: none; transition: all 0.2s; }
  .input-field:focus { border-color: #1A1A1A; background: #fff; box-shadow: 0 0 0 3px rgba(26,26,26,0.06); }
  .input-field::placeholder { color: #C4C4C4; }
  .btn { width: 100%; background: #1A1A1A; color: #fff; border: none; border-radius: 10px; padding: 13px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: opacity 0.2s; }
  .btn:hover { opacity: 0.85; }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }
`

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Incorrect password')
    }
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter', sans-serif" }}>
      <style>{S}</style>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="display" style={{ fontSize: 28, fontWeight: 700, color: '#1A1A1A' }}>Libaas</span>
          <p style={{ fontSize: 12, color: '#9B9B9B', marginTop: 6, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Admin Panel</p>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E8E8E8', borderRadius: 16, padding: 32, boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
          <h2 className="display" style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A', marginBottom: 20 }}>Sign In</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6B6B6B', marginBottom: 7 }}>Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-field"
                autoFocus
              />
            </div>
            {error && (
              <p style={{ fontSize: 13, color: '#DC2626', background: '#FEF2F2', padding: '10px 14px', borderRadius: 10 }}>{error}</p>
            )}
            <button type="submit" disabled={loading} className="btn">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
