'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Earnings() {
  const [creator, setCreator] = useState(null)
  const [orders, setOrders] = useState([])
  const [payouts, setPayouts] = useState([])
  const [links, setLinks] = useState([])
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

      // Orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*, products(name, image_url), brands(name)')
        .eq('creator_id', creatorData.id)
        .order('created_at', { ascending: false })

      // Payouts
      const { data: payoutsData } = await supabase
        .from('payouts')
        .select('*')
        .eq('creator_id', creatorData.id)
        .order('created_at', { ascending: false })

      // Affiliate links with clicks
      const { data: linksData } = await supabase
        .from('affiliate_links')
        .select('*, products(name, image_url, brands(name))')
        .eq('creator_id', creatorData.id)
        .order('clicks', { ascending: false })

      setOrders(ordersData || [])
      setPayouts(payoutsData || [])
      setLinks(linksData || [])
      setLoading(false)
    }
    load()
  }, [])

  const totalEarned = orders
    .filter(o => o.status === 'confirmed')
    .reduce((sum, o) => sum + (o.commission_amount || 0), 0)

  const totalPending = orders
    .filter(o => o.status === 'pending')
    .reduce((sum, o) => sum + (o.commission_amount || 0), 0)

  const totalPaid = payouts
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + (p.amount || 0), 0)

  const totalClicks = links.reduce((sum, l) => sum + (l.clicks || 0), 0)

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#C9A84C', fontSize: '14px' }}>Loading...</p>
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
        <Link href="/" className="font-display text-xl tracking-wider" style={{ color: '#C9A84C' }}>LIBAAS</Link>
        <Link href="/dashboard" className="font-body text-xs text-white/40 hover:text-white transition-colors">
          ← Back to Dashboard
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <p className="font-body text-xs tracking-widest text-white/30 uppercase mb-1">Finance</p>
          <h1 className="font-display text-4xl">Earnings & Payouts</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Clicks', value: totalClicks, icon: '👆', color: '#fff' },
            { label: 'Confirmed Earnings', value: `PKR ${totalEarned.toLocaleString()}`, icon: '✅', color: '#C9A84C' },
            { label: 'Pending Earnings', value: `PKR ${totalPending.toLocaleString()}`, icon: '⏳', color: '#fff' },
            { label: 'Total Paid Out', value: `PKR ${totalPaid.toLocaleString()}`, icon: '💸', color: '#4CAF82' },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="bg-[#141414] border border-white/5 rounded-2xl p-5">
              <span className="text-xl mb-3 block">{icon}</span>
              <p className="font-display text-2xl mb-1" style={{ color }}>{value}</p>
              <p className="font-body text-xs text-white/30 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>

        {/* Top performing links */}
        {links.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-2xl mb-4">Top Performing Links</h2>
            <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden">
              {links.slice(0, 5).map((link, i) => (
                <div key={link.id}
                  className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0">
                  <span className="font-body text-sm text-white/20 w-5">{i + 1}</span>
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                    {link.products?.image_url && (
                      <img src={link.products.image_url} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-white truncate">
                      {link.products?.name}
                    </p>
                    <p className="font-body text-xs text-white/30">
                      {link.products?.brands?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg" style={{ color: '#C9A84C' }}>
                      {link.clicks || 0}
                    </p>
                    <p className="font-body text-xs text-white/30">clicks</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        <div className="mb-10">
          <h2 className="font-display text-2xl mb-4">Orders</h2>
          {orders.length === 0 ? (
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-10 text-center">
              <p className="font-display text-2xl text-white/20 mb-2">No orders yet</p>
              <p className="font-body text-sm text-white/20">
                Share your storefront to start earning!
              </p>
              <Link href={`/${creator.username}`} target="_blank"
                className="inline-block mt-4 font-body text-xs px-5 py-2.5 rounded-full"
                style={{ background: '#C9A84C', color: '#000' }}>
                View My Storefront →
              </Link>
            </div>
          ) : (
            <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden">
              <div className="grid grid-cols-4 px-5 py-3 border-b border-white/5">
                {['Product', 'Amount', 'Commission', 'Status'].map(h => (
                  <p key={h} className="font-body text-xs text-white/30 uppercase tracking-widest">{h}</p>
                ))}
              </div>
              {orders.map(order => (
                <div key={order.id} className="grid grid-cols-4 px-5 py-4 border-b border-white/5 last:border-0 items-center">
                  <p className="font-body text-sm text-white truncate pr-4">
                    {order.products?.name || 'Product'}
                  </p>
                  <p className="font-body text-sm text-white">
                    PKR {order.order_amount?.toLocaleString()}
                  </p>
                  <p className="font-body text-sm" style={{ color: '#C9A84C' }}>
                    PKR {order.commission_amount?.toLocaleString()}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-body text-xs px-3 py-1 rounded-full w-fit"
                    style={{
                      background: order.status === 'confirmed'
                        ? 'rgba(76,175,130,0.1)'
                        : order.status === 'rejected'
                          ? 'rgba(255,80,80,0.1)'
                          : 'rgba(201,168,76,0.1)',
                      color: order.status === 'confirmed'
                        ? '#4CAF82'
                        : order.status === 'rejected'
                          ? '#ff5050'
                          : '#C9A84C',
                    }}>
                    {order.status === 'confirmed' ? '✓' : order.status === 'rejected' ? '✕' : '⏳'}
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payouts */}
        <div>
          <h2 className="font-display text-2xl mb-4">Payout History</h2>
          {payouts.length === 0 ? (
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-8 text-center">
              <p className="font-body text-sm text-white/20">No payouts yet</p>
            </div>
          ) : (
            <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden">
              {payouts.map(payout => (
                <div key={payout.id}
                  className="flex items-center justify-between px-5 py-4 border-b border-white/5 last:border-0">
                  <div>
                    <p className="font-body text-sm text-white">
                      PKR {payout.amount?.toLocaleString()}
                    </p>
                    <p className="font-body text-xs text-white/30 mt-0.5">
                      via {payout.method} · {new Date(payout.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-body text-xs px-3 py-1 rounded-full"
                    style={{
                      background: payout.status === 'paid' ? 'rgba(76,175,130,0.1)' : 'rgba(201,168,76,0.1)',
                      color: payout.status === 'paid' ? '#4CAF82' : '#C9A84C',
                    }}>
                    {payout.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}