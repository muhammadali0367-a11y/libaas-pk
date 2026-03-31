'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
    if (params.get('mode') === 'signup') setMode('signup')
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password, options: { data: { role, name, username } } })
        if (signUpError) throw signUpError
        if (role === 'creator') {
          await supabase.from('creators').insert({ user_id: data.user.id, username: username.toLowerCase().replace(/\s+/g, ''), full_name: name })
          router.push('/dashboard')
        } else {
          await supabase.from('brands').insert({ user_id: data.user.id, name, slug: name.toLowerCase().replace(/\s+/g, '-') })
          router.push('/brand/dashboard')
        }
      } else {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })
        if (loginError) throw loginError
        const { data: creator } = await supabase.from('creators').select('id').eq('user_id', data.user.id).single()
        router.push(creator ? '/dashboard' : '/brand/dashboard')
      }
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0A0807', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .display { font-family: 'Playfair Display', Georgia, serif; }
        .input-field { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 13px 16px; font-size: 14px; color: #F5F0E8; font-family: 'Inter', sans-serif; outline: none; transition: all 0.2s; }
        .input-field:focus { border-color: rgba(196,160,82,0.6); background: rgba(255,255,255,0.07); box-shadow: 0 0 0 3px rgba(196,160,82,0.1); }
        .input-field::placeholder { color: rgba(255,255,255,0.22); }
        .label { display: block; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.5); margin-bottom: 8px; letter-spacing: 0.02em; }
        .btn-submit { width: 100%; background: #F5F0E8; color: #0A0807; border: none; border-radius: 10px; padding: 13px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: opacity 0.2s; }
        .btn-submit:hover { opacity: 0.88; }
        .btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }
        .tab { flex: 1; padding: 9px; border-radius: 8px; border: none; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; }
        .tab-active { background: #F5F0E8; color: #0A0807; }
        .tab-inactive { background: transparent; color: rgba(255,255,255,0.4); }
        .tab-inactive:hover { color: rgba(255,255,255,0.7); }
        .role-btn { flex: 1; padding: 11px; border-radius: 10px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; text-align: center; }
        .role-active { background: rgba(196,160,82,0.15); color: #C4A052; border: 1.5px solid rgba(196,160,82,0.4); }
        .role-inactive { background: transparent; color: rgba(255,255,255,0.35); border: 1.5px solid rgba(255,255,255,0.1); }
        .role-inactive:hover { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.6); }
      `}</style>

      {/* Background glow */}
      <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,160,82,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 32, fontWeight: 700, color: '#F5F0E8', letterSpacing: '0.02em' }}>Libaas</span>
          </Link>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>Pakistan's Creator Commerce Platform</p>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 36, backdropFilter: 'blur(10px)' }}>

          {/* Mode tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 12 }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => setMode(m)} className={`tab ${mode === m ? 'tab-active' : 'tab-inactive'}`}>
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Role toggle */}
          {mode === 'signup' && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {[
                { key: 'shopper', label: '🛍️ Shopper' },
                { key: 'creator', label: '✨ Creator' },
                { key: 'brand', label: '📈 Brand' },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setRole(key)} className={`role-btn ${role === key ? 'role-active' : 'role-inactive'}`} style={{ fontSize: 12 }}>
                  {label}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {mode === 'signup' && (
              <div>
                <label className="label">{role === 'brand' ? 'Brand Name' : 'Full Name'}</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={role === 'brand' ? 'Saya' : 'Ayesha Malik'} required className="input-field" />
              </div>
            )}
            {mode === 'signup' && role === 'creator' && (
              <div>
                <label className="label">Username</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'rgba(255,255,255,0.28)', pointerEvents: 'none' }}>libaas.pk/</span>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))} placeholder="ayeshamalik" required className="input-field" style={{ paddingLeft: 96 }} />
                </div>
              </div>
            )}
            <div>
              <label className="label">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="input-field" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label className="label" style={{ margin: 0 }}>Password</label>
                {mode === 'login' && <Link href="/auth/reset" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Forgot?</Link>}
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className="input-field" />
            </div>

            {error && (
              <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 10, padding: '10px 14px' }}>
                <p style={{ fontSize: 13, color: '#F87171' }}>{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-submit" style={{ marginTop: 4 }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : `Create ${role.charAt(0).toUpperCase() + role.slice(1)} Account`}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 22, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ background: 'none', border: 'none', color: '#F5F0E8', fontWeight: 500, cursor: 'pointer', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
          By continuing you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    </main>
  )
}
