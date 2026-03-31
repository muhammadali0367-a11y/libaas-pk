'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  body { font-family: 'Inter', sans-serif; }
  .input-field { width: 100%; background: #FAFAFA; border: 1px solid #E8E8E8; border-radius: 10px; padding: 13px 16px; font-size: 14px; color: #1A1A1A; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.2s; }
  .input-field:focus { border-color: #1A1A1A; background: #fff; box-shadow: 0 0 0 3px rgba(26,26,26,0.06); }
  .input-field::placeholder { color: #C4C4C4; }
  .btn-primary { width: 100%; background: #1A1A1A; color: #fff; border: none; border-radius: 10px; padding: 13px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; transition: opacity 0.2s; }
  .btn-primary:hover { opacity: 0.85; }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .tab { flex: 1; padding: 9px; border-radius: 8px; border: none; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; }
  .tab-active { background: #1A1A1A; color: #fff; }
  .tab-inactive { background: transparent; color: #9B9B9B; }
  .role-btn { flex: 1; padding: 11px; border-radius: 10px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; text-align: center; }
  .role-active { background: #1A1A1A; color: #fff; border: 1.5px solid #1A1A1A; }
  .role-inactive { background: #fff; color: #9B9B9B; border: 1.5px solid #E8E8E8; }
  .role-inactive:hover { border-color: #C4C4C4; color: #6B6B6B; }
`

export default function AuthPage() {
  const [mode, setMode] = useState('login')
  const [role, setRole] = useState('creator')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const roleParam = params.get('role')
    if (roleParam === 'brand') {
      setRole('brand')
      setMode('signup')
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email, password,
          options: { data: { role, name, username } }
        })
        if (signUpError) throw signUpError
        if (role === 'creator') {
          const { error: profileError } = await supabase.from('creators').insert({
            user_id: data.user.id,
            username: username.toLowerCase().replace(/\s+/g, ''),
            full_name: name,
          })
          if (profileError) throw profileError
          router.push('/dashboard')
        } else {
          const { error: profileError } = await supabase.from('brands').insert({
            user_id: data.user.id,
            name: name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
          })
          if (profileError) throw profileError
          router.push('/brand/dashboard')
        }
      } else {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })
        if (loginError) throw loginError
        const { data: creator } = await supabase.from('creators').select('id').eq('user_id', data.user.id).single()
        router.push(creator ? '/dashboard' : '/brand/dashboard')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'Inter', sans-serif" }}>
      <style>{S}</style>

      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 28, fontWeight: 700, color: '#1A1A1A', letterSpacing: '0.02em' }}>Libaas</span>
          </Link>
          <p style={{ fontSize: 12, color: '#9B9B9B', marginTop: 6, letterSpacing: '0.05em' }}>Pakistan's Creator Commerce Platform</p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', border: '1px solid #E8E8E8', borderRadius: 16, padding: 32, boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>

          {/* Mode tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: '#F5F5F5', padding: 4, borderRadius: 12 }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`tab ${mode === m ? 'tab-active' : 'tab-inactive'}`}>
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Role toggle (signup only) */}
          {mode === 'signup' && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {['creator', 'brand'].map(r => (
                <button key={r} onClick={() => setRole(r)}
                  className={`role-btn ${role === r ? 'role-active' : 'role-inactive'}`}>
                  {r === 'creator' ? 'I\'m a Creator' : 'I\'m a Brand'}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Name */}
            {mode === 'signup' && (
              <div>
                <label className="label">{role === 'creator' ? 'Full Name' : 'Brand Name'}</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder={role === 'creator' ? 'Ayesha Malik' : 'Saya'}
                  required className="input-field" />
              </div>
            )}

            {/* Username */}
            {mode === 'signup' && role === 'creator' && (
              <div>
                <label className="label">Username</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#C4C4C4', fontFamily: "'Inter', sans-serif", pointerEvents: 'none' }}>
                    libaas.pk/
                  </span>
                  <input type="text" value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                    placeholder="ayeshamalik" required
                    className="input-field" style={{ paddingLeft: 90 }} />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required className="input-field" />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="label" style={{ margin: 0 }}>Password</label>
                {mode === 'login' && (
                  <Link href="/auth/reset" style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>
                    Forgot password?
                  </Link>
                )}
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required minLength={6} className="input-field" />
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px' }}>
                <p style={{ fontSize: 13, color: '#DC2626', fontFamily: "'Inter', sans-serif" }}>{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: 4 }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : `Create ${role === 'creator' ? 'Creator' : 'Brand'} Account`}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#9B9B9B', fontFamily: "'Inter', sans-serif" }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              style={{ background: 'none', border: 'none', color: '#1A1A1A', fontWeight: 500, cursor: 'pointer', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}
