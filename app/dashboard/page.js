'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const [creator, setCreator] = useState(null)
  const [stats, setStats] = useState({ clicks: 0, orders: 0, earnings: 0 })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }

      const { data: creatorData } = await supabase
        .from('creators')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (!creatorData) { router.push('/auth'); return }
      setCreator(creatorData)

      // Get stats
      const { data: links } = await supabase
        .from('affiliate_links')
        .select('clicks')
        .eq('creator_id', creatorData.id)

      const { data: orders } = await supabase
        .from('orders')
        .select('commission_amount, status')
        .eq('creator_id', creatorData.id)
        .eq('status', 'confirmed')

      const totalClicks = links?.reduce((sum, l) => sum + (l.clicks || 0), 0) || 0
      const totalEarnings = orders?.reduce((sum, o) => sum + (o.commission_amount || 0), 0) || 0

      setStats({
        clicks: totalClicks,
        orders: orders?.length || 0,
        earnings: totalEarnings,
      })

      setLoading(false)
    }
    load()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#C9A84C', fontSize: '14px' }}>
        Loading...
      </p>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* NAV */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-wider" style={{ color: '#C9A84C' }}>
          LIBAAS
        </Link>
        <div className="flex items-center gap-6">
          <Link href={`/${creator.username}`}
            className="font-body text-xs text-white/40 hover:text-white transition-colors">
            View My Storefront →
          </Link>
          <button
            onClick={handleLogout}
            className="font-body text-xs text-white/40 hover:text-white transition-colors">
            Log Out
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <p className="font-body text-xs tracking-widest text-white/30 uppercase mb-1">
            Welcome back
          </p>
          <h1 className="font-display text-4xl">
            {creator.full_name || creator.username} ✨
          </h1>
          <p className="font-body text-sm text-white/30 mt-1">
            libaas.pk/{creator.username}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Clicks', value: stats.clicks, icon: '👆' },
            { label: 'Confirmed Orders', value: stats.orders, icon: '🛍️' },
            { label: 'PKR Earned', value: `PKR ${stats.earnings.toLocaleString()}`, icon: '💰' },
          ].map(({ label, value, icon }) => (
            <div key={label}
              className="bg-[#141414] border border-white/5 rounded-2xl p-6">
              <span className="text-2xl mb-3 block">{icon}</span>
              <p className="font-display text-3xl text-white mb-1">{value}</p>
              <p className="font-body text-xs text-white/30 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <Link href="/dashboard/storefront"
            className="bg-[#141414] border border-white/5 rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-all group">
            <span className="text-2xl mb-3 block">🛍️</span>
            <p className="font-body font-medium text-white mb-1 group-hover:text-[#C9A84C] transition-colors">
              Manage Storefront
            </p>
            <p className="font-body text-xs text-white/30">
              Add or remove products from your page
            </p>
          </Link>

          <Link href="/dashboard/earnings"
            className="bg-[#141414] border border-white/5 rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-all group">
            <span className="text-2xl mb-3 block">📊</span>
            <p className="font-body font-medium text-white mb-1 group-hover:text-[#C9A84C] transition-colors">
              Earnings & Payouts
            </p>
            <p className="font-body text-xs text-white/30">
              View your commission history
            </p>
          </Link>

          <Link href="/dashboard/profile"
            className="bg-[#141414] border border-white/5 rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-all group">
            <span className="text-2xl mb-3 block">👤</span>
            <p className="font-body font-medium text-white mb-1 group-hover:text-[#C9A84C] transition-colors">
              Edit Profile
            </p>
            <p className="font-body text-xs text-white/30">
              Update bio, avatar, JazzCash number
            </p>
          </Link>

          <Link href={`/${creator.username}`}
            target="_blank"
            className="bg-[#141414] border border-white/5 rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-all group">
            <span className="text-2xl mb-3 block">🔗</span>
            <p className="font-body font-medium text-white mb-1 group-hover:text-[#C9A84C] transition-colors">
              My Storefront
            </p>
            <p className="font-body text-xs text-white/30">
              See how your page looks to followers
            </p>
          </Link>
        </div>

        {/* Profile completion banner */}
        {!creator.bio || !creator.jazzcash_number ? (
          <div className="rounded-2xl p-5 flex items-center justify-between"
            style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <div>
              <p className="font-body font-medium text-sm mb-1" style={{ color: '#C9A84C' }}>
                Complete your profile
              </p>
              <p className="font-body text-xs text-white/40">
                Add your bio and JazzCash number to start receiving payouts
              </p>
            </div>
            <Link href="/dashboard/profile"
              className="font-body text-xs px-4 py-2 rounded-full ml-4 whitespace-nowrap"
              style={{ background: '#C9A84C', color: '#000' }}>
              Complete Now
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  )
}