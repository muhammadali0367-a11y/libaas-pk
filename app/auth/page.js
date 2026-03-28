'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
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
          email,
          password,
          options: {
            data: { role, name, username }
          }
        })
        if (signUpError) throw signUpError

        if (role === 'creator') {
          const { error: profileError } = await supabase
            .from('creators')
            .insert({
              user_id: data.user.id,
              username: username.toLowerCase().replace(/\s+/g, ''),
              full_name: name,
            })
          if (profileError) throw profileError
          router.push('/dashboard')
        } else {
          const { error: profileError } = await supabase
            .from('brands')
            .insert({
              user_id: data.user.id,
              name: name,
              slug: name.toLowerCase().replace(/\s+/g, '-'),
            })
          if (profileError) throw profileError
          router.push('/brand/dashboard')
        }
      } else {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (loginError) throw loginError

        const { data: creator } = await supabase
          .from('creators')
          .select('id')
          .eq('user_id', data.user.id)
          .single()

        if (creator) {
          router.push('/dashboard')
        } else {
          router.push('/brand/dashboard')
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="font-display text-3xl tracking-wider" style={{ color: '#C9A84C' }}>
            LIBAAS
          </Link>
          <p className="font-body text-xs text-white/30 mt-2 tracking-widest uppercase">
            Pakistan's Creator Commerce Platform
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-8">

          {/* Mode toggle */}
          <div className="flex gap-2 mb-8 bg-black/40 rounded-xl p-1">
            {['login', 'signup'].map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2.5 rounded-lg text-xs font-body font-medium transition-all"
                style={{
                  background: mode === m ? '#C9A84C' : 'transparent',
                  color: mode === m ? '#000' : '#666',
                }}>
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Role toggle (signup only) */}
          {mode === 'signup' && (
            <div className="flex gap-2 mb-6">
              {['creator', 'brand'].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-body border transition-all"
                  style={{
                    borderColor: role === r ? '#C9A84C' : '#333',
                    color: role === r ? '#C9A84C' : '#666',
                    background: role === r ? 'rgba(201,168,76,0.08)' : 'transparent',
                  }}>
                  {r === 'creator' ? '👩‍💻 I\'m a Creator' : '🏷️ I\'m a Brand'}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (signup only) */}
            {mode === 'signup' && (
              <div>
                <label className="font-body text-xs text-white/40 block mb-1.5">
                  {role === 'creator' ? 'Full Name' : 'Brand Name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={role === 'creator' ? 'Ayesha Malik' : 'Saya'}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
            )}

            {/* Username (creator signup only) */}
            {mode === 'signup' && role === 'creator' && (
              <div>
                <label className="font-body text-xs text-white/40 block mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-sm font-body text-white/30">
                    libaas.pk/
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                    placeholder="ayeshamalik"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-24 pr-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="font-body text-xs text-white/40 block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-body text-xs text-white/40 block mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="font-body text-xs text-red-400 bg-red-400/10 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-body font-medium transition-opacity disabled:opacity-50"
              style={{ background: '#C9A84C', color: '#000' }}>
              {loading
                ? 'Please wait...'
                : mode === 'login' ? 'Log In' : `Create ${role === 'creator' ? 'Creator' : 'Brand'} Account`}
            </button>
          </form>

          {/* Footer link */}
          <p className="font-body text-xs text-white/30 text-center mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#C9A84C] hover:underline">
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}
