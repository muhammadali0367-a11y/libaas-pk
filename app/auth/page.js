'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .input-field { width: 100%; background: #FAFAFA; border: 1px solid #E8E8E8; border-radius: 10px; padding: 13px 16px; font-size: 14px; color: #1A1A1A; font-family: 'Inter', sans-serif; outline: none; transition: all 0.2s; }
  .input-field:focus { border-color: #1A1A1A; background: #fff; box-shadow: 0 0 0 3px rgba(26,26,26,0.06); }
  .input-field::placeholder { color: #C4C4C4; }
  .label { display: block; font-size: 12px; font-weight: 500; color: #6B6B6B; margin-bottom: 7px; }
  .btn-submit { width: 100%; background: #1A1A1A; color: #fff; border: none; border-radius: 10px; padding: 13px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: opacity 0.2s; }
  .btn-submit:hover { opacity: 0.85; }
  .btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }
  .tab { flex: 1; padding: 9px; border-radius: 8px; border: none; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; }
  .tab-active { background: #1A1A1A; color: #fff; }
  .tab-inactive { background: transparent; color: #9B9B9B; }
  .tab-inactive:hover { color: #1A1A1A; }
  .role-btn { flex: 1; padding: 11px 8px; border-radius: 10px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; text-align: center; }
  .role-active { background: #1A1A1A; color: #fff; border: 1.5px solid #1A1A1A; }
  .role-inactive { background: transparent; color: #9B9B9B; border: 1.5px solid #E8E8E8; }
  .role-inactive:hover { border-color: #C4C4C4; color: #1A1A1A; }
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
    if (params.get('role') === 'brand') { setRole('brand'); setMode('signup') }
    if (params.get('role') === 'shopper') { setRole('shopper'); setMode('signup') }
    if (params.get('mode') === 'signup') setMode('signup')
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )

      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { role, name, username } }
        })
        if (signUpError) throw signUpError

        if (role === 'creator') {
          await supabase.from('creators').insert({
            user_id: data.user.id,
            username: username.toLowerCase().replace(/\s+/g, ''),
            full_name: name
          })
          router.push('/dashboard')
        } else if (role === 'brand') {
          await supabase.from('brands').insert({
            user_id: data.user.id,
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-')
          })
          router.push('/brand/dashboard')
        } else {
          // Shopper — no extra DB record needed, redirect to demo/browse
          router.push('/shoppers/dashboard')
        }

      } else {
        // Login
        const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })
        if (loginError) throw loginError

        const { data: creator } = await supabase
          .from('creators')
          .select('id')
          .eq('user_id', data.user.id)
          .single()

        if (creator) {
          router.push('/dashboard')
        } else {
          const { data: brand } = await supabase
            .from('brands')
            .select('id')
            .eq('user_id', data.user.id)
            .single()
          router.push(brand ? '/brand/dashboard' : '/shoppers/dashboard')
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <style>{S}</style>

      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 32, fontWeight: 700, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <p style={{ fontSize: 13, color: '#9B9B9B', marginTop: 8 }}>Pakistan's Creator Commerce Platform</p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', border: '1px solid #E8E8E8', borderRadius: 20, padding: 36, boxShadow: '0 2px 24px rgba(0,0,0,0.07)' }}>

          {/* Mode tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: '#F5F5F5', padding: 4, borderRadius: 12 }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => setMode(m)} className={`tab ${mode === m ? 'tab-active' : 'tab-inactive'}`}>
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Role toggle — signup only */}
          {mode === 'signup' && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {[
                { key: 'shopper', label: '🛍️ Shopper' },
                { key: 'creator', label: '✨ Creator' },
                { key: 'brand', label: '📈 Brand' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setRole(key)}
                  className={`role-btn ${role === key ? 'role-active' : 'role-inactive'}`}>
                  {label}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Name — not needed for shoppers */}
            {mode === 'signup' && role !== 'shopper' && (
              <div>
                <label className="label">{role === 'brand' ? 'Brand Name' : 'Full Name'}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={role === 'brand' ? 'Saya' : 'Ayesha Malik'}
                  required
                  className="input-field"
                />
              </div>
            )}

            {/* Username — creators only */}
            {mode === 'signup' && role === 'creator' && (
              <div>
                <label className="label">Username</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#C4C4C4', pointerEvents: 'none' }}>
                    libaas.pk/
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                    placeholder="ayeshamalik"
                    required
                    className="input-field"
                    style={{ paddingLeft: 96 }}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input-field"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <label className="label" style={{ margin: 0 }}>Password</label>
                {mode === 'login' && (
                  <Link href="/auth/reset" style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>Forgot?</Link>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="input-field"
              />
            </div>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px' }}>
                <p style={{ fontSize: 13, color: '#DC2626' }}>{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-submit" style={{ marginTop: 4 }}>
              {loading
                ? 'Please wait...'
                : mode === 'login'
                  ? 'Log In'
                  : role === 'shopper'
                    ? 'Create Account'
                    : `Create ${role.charAt(0).toUpperCase() + role.slice(1)} Account`
              }
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 22, fontSize: 13, color: '#9B9B9B' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              style={{ background: 'none', border: 'none', color: '#1A1A1A', fontWeight: 600, cursor: 'pointer', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: '#C4C4C4' }}>
          By continuing you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    </main>
  )
}
