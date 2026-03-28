'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UpdatePassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const router = useRouter()

  async function handleUpdate(e) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')

    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
    } else {
      setDone(true)
      setTimeout(() => router.push('/dashboard'), 2000)
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
          {done ? (
            <div className="text-center">
              <p className="text-3xl mb-4">✅</p>
              <h2 className="font-display text-2xl text-white mb-2">Password Updated!</h2>
              <p className="font-body text-sm text-white/40">Redirecting you to dashboard...</p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-3xl text-white mb-2">New Password</h2>
              <p className="font-body text-xs text-white/40 mb-6">
                Choose a strong new password for your account.
              </p>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="font-body text-xs text-white/40 block mb-1.5">New Password</label>
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
                <div>
                  <label className="font-body text-xs text-white/40 block mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
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
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  )
}