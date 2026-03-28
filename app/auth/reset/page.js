'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleReset(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })

    if (resetError) {
      setError(resetError.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-display text-3xl tracking-wider" style={{ color: '#C9A84C' }}>
            LIBAAS
          </Link>
        </div>

        <div className="bg-[#141414] border border-white/5 rounded-2xl p-8">
          {sent ? (
            <div className="text-center">
              <p className="text-3xl mb-4">📧</p>
              <h2 className="font-display text-2xl text-white mb-3">Check your email</h2>
              <p className="font-body text-sm text-white/40 mb-6">
                We sent a password reset link to <span style={{ color: '#C9A84C' }}>{email}</span>
              </p>
              <Link href="/auth"
                className="font-body text-xs hover:underline"
                style={{ color: '#C9A84C' }}>
                ← Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h2 className="font-display text-3xl text-white mb-2">Reset Password</h2>
              <p className="font-body text-xs text-white/40 mb-6">
                Enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={handleReset} className="space-y-4">
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

                {error && (
                  <p className="font-body text-xs text-red-400 bg-red-400/10 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-sm font-body font-medium disabled:opacity-50"
                  style={{ background: '#C9A84C', color: '#000' }}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <p className="font-body text-xs text-white/30 text-center mt-6">
                <Link href="/auth" className="hover:underline" style={{ color: '#C9A84C' }}>
                  ← Back to Login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}