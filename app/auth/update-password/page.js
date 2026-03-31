'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .input-field { width: 100%; background: #FAFAFA; border: 1px solid #E8E8E8; border-radius: 10px; padding: 13px 16px; font-size: 14px; color: #1A1A1A; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.2s; }
  .input-field:focus { border-color: #1A1A1A; background: #fff; }
  .input-field::placeholder { color: #C4C4C4; }
  .btn-primary { width: 100%; background: #1A1A1A; color: #fff; border: none; border-radius: 10px; padding: 13px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; transition: opacity 0.2s; }
  .btn-primary:hover { opacity: 0.85; }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .label { font-size: 12px; font-weight: 500; color: #6B6B6B; display: block; margin-bottom: 6px; }
`

export default function UpdatePassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const router = useRouter()

  async function handleUpdate(e) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    setLoading(true)
    setError('')
    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) { setError(updateError.message) } else { setDone(true); setTimeout(() => router.push('/dashboard'), 2000) }
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter', sans-serif" }}>
      <style>{S}</style>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 28, fontWeight: 700, color: '#1A1A1A' }}>Libaas</span>
          </Link>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E8E8E8', borderRadius: 16, padding: 32, boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
          {done ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 24 }}>✅</div>
              <h2 className="display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 10 }}>Password Updated!</h2>
              <p style={{ fontSize: 14, color: '#6B6B6B' }}>Redirecting to dashboard...</p>
            </div>
          ) : (
            <>
              <h2 className="display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>New Password</h2>
              <p style={{ fontSize: 13, color: '#9B9B9B', marginBottom: 24 }}>Choose a strong new password.</p>
              <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="label">New Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className="input-field" />
                </div>
                <div>
                  <label className="label">Confirm Password</label>
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" required minLength={6} className="input-field" />
                </div>
                {error && <p style={{ fontSize: 13, color: '#DC2626', background: '#FEF2F2', padding: '10px 14px', borderRadius: 10 }}>{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Updating...' : 'Update Password'}</button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
