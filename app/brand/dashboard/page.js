'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function BrandDashboard() {
  const [brand, setBrand] = useState(null)
  const [stats, setStats] = useState({ clicks: 0, orders: 0, revenue: 0, creators: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [topCreators, setTopCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }

      const { data: brandData } = await supabase
        .from('brands')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (!brandData) { router.push('/auth'); return }
      setBrand(brandData)

      // Get affiliate links for this brand's products
      const { data: products } = await supabase
        .from('products')
        .select('id')
        .eq('brand_id', brandData.id)

      const productIds = products?.map(p => p.id) || []

      if (productIds.length > 0) {
        // Get clicks
        const { data: links } = await supabase
          .from('affiliate_links')
          .select('clicks, creator_id')
          .in('product_id', productIds)

        const totalClicks = links?.reduce((sum, l) => sum + (l.clicks || 0), 0) || 0
        const uniqueCreators = new Set(links?.map(l => l.creator_id)).size

        // Get orders
        const { data: orders } = await supabase
          .from('orders')
          .select('*, creators(full_name, username, avatar_url)')
          .eq('brand_id', brandData.id)
          .order('created_at', { ascending: false })

        const confirmedRevenue = orders
          ?.filter(o => o.status === 'confirmed')
          .reduce((sum, o) => sum + (o.order_amount || 0), 0) || 0

        setStats({
          clicks: totalClicks,
          orders: orders?.length || 0,
          revenue: confirmedRevenue,
          creators: uniqueCreators,
        })

        setRecentOrders(orders?.slice(0, 5) || [])

        // Top creators by clicks
        const creatorClicks = {}
        links?.forEach(l => {
          if (!creatorClicks[l.creator_id]) creatorClicks[l.creator_id] = 0
          creatorClicks[l.creator_id] += l.clicks || 0
        })

        const topCreatorIds = Object.entries(creatorClicks)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([id]) => id)

        if (topCreatorIds.length > 0) {
          const { data: creators } = await supabase
            .from('creators')
            .select('id, full_name, username, avatar_url, instagram')
            .in('id', topCreatorIds)

          const creatorsWithClicks = creators?.map(c => ({
            ...c,
            clicks: creatorClicks[c.id] || 0,
          })).sort((a, b) => b.clicks - a.clicks)

          setTopCreators(creatorsWithClicks || [])
        }
      }

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
        <div className="flex items-center gap-6">
          <span className="font-body text-xs text-white/40">{brand.name}</span>
          <button onClick={handleLogout}
            className="font-body text-xs text-white/40 hover:text-white transition-colors">
            Log Out
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <p className="font-body text-xs tracking-widest text-white/30 uppercase mb-1">Brand Dashboard</p>
          <h1 className="font-display text-4xl">{brand.name} ✨</h1>
          <p className="font-body text-sm text-white/30 mt-1">
            {brand.commission_rate}% creator commission · {brand.platform_fee_rate || 3}% platform fee
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Clicks', value: stats.clicks, icon: '👆' },
            { label: 'Active Creators', value: stats.creators, icon: '👩‍💻' },
            { label: 'Total Orders', value: stats.orders, icon: '🛍️' },
            { label: 'Confirmed Revenue', value: `PKR ${stats.revenue.toLocaleString()}`, icon: '💰' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-[#141414] border border-white/5 rounded-2xl p-5">
              <span className="text-xl mb-3 block">{icon}</span>
              <p className="font-display text-2xl text-white mb-1">{value}</p>
              <p className="font-body text-xs text-white/30 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {[
            { href: '/brand/dashboard/products', icon: '📦', title: 'Manage Products', desc: 'Add or update your product catalog' },
            { href: '/brand/dashboard/orders', icon: '✅', title: 'Confirm Orders', desc: 'Review and confirm sales from creators' },
            { href: '/brand/dashboard/creators', icon: '👥', title: 'View Creators', desc: 'See who is promoting your products' },
          ].map(({ href, icon, title, desc }) => (
            <Link key={href} href={href}
              className="bg-[#141414] border border-white/5 rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-all group">
              <span className="text-2xl mb-3 block">{icon}</span>
              <p className="font-body font-medium text-white mb-1 group-hover:text-[#C9A84C] transition-colors">{title}</p>
              <p className="font-body text-xs text-white/30">{desc}</p>
            </Link>
          ))}
        </div>

        {/* Recent orders */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl">Recent Orders</h2>
            <Link href="/brand/dashboard/orders"
              className="font-body text-xs text-white/40 hover:text-[#C9A84C] transition-colors">
              View All →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="bg-[#141414] border border-white/5 rounded-2xl p-10 text-center">
              <p className="font-display text-2xl text-white/20 mb-2">No orders yet</p>
              <p className="font-body text-sm text-white/20">
                Orders will appear here when creators drive sales
              </p>
            </div>
          ) : (
            <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-4 px-5 py-3 border-b border-white/5">
                {['Creator', 'Order Amount', 'Commission', 'Status'].map(h => (
                  <p key={h} className="font-body text-xs text-white/30 uppercase tracking-widest">{h}</p>
                ))}
              </div>
              {recentOrders.map(order => (
                <div key={order.id} className="grid grid-cols-4 px-5 py-4 border-b border-white/5 last:border-0 items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-white/5 flex-shrink-0">
                      {order.creators?.avatar_url
                        ? <img src={order.creators.avatar_url} alt="" className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-xs">👤</div>
                      }
                    </div>
                    <p className="font-body text-sm text-white truncate">
                      {order.creators?.full_name || order.creators?.username || 'Creator'}
                    </p>
                  </div>
                  <p className="font-body text-sm text-white">PKR {order.order_amount?.toLocaleString()}</p>
                  <p className="font-body text-sm" style={{ color: '#C9A84C' }}>
                    PKR {order.commission_amount?.toLocaleString()}
                  </p>
                  <span className="inline-flex items-center gap-1 font-body text-xs px-3 py-1 rounded-full w-fit"
                    style={{
                      background: order.status === 'confirmed' ? 'rgba(76,175,130,0.1)' : order.status === 'rejected' ? 'rgba(255,80,80,0.1)' : 'rgba(201,168,76,0.1)',
                      color: order.status === 'confirmed' ? '#4CAF82' : order.status === 'rejected' ? '#ff5050' : '#C9A84C',
                    }}>
                    {order.status === 'confirmed' ? '✓' : order.status === 'rejected' ? '✕' : '⏳'} {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top creators */}
        {topCreators.length > 0 && (
          <div>
            <h2 className="font-display text-2xl mb-4">Top Creators</h2>
            <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
              {topCreators.map((creator, i) => (
                <div key={creator.id}
                  className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0">
                  <span className="font-body text-sm text-white/20 w-5">{i + 1}</span>
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-white/5 flex-shrink-0">
                    {creator.avatar_url
                      ? <img src={creator.avatar_url} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center">👤</div>
                    }
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm text-white">{creator.full_name || creator.username}</p>
                    <p className="font-body text-xs text-white/30">
                      libaas.pk/{creator.username}
                      {creator.instagram && ` · @${creator.instagram}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg" style={{ color: '#C9A84C' }}>{creator.clicks}</p>
                    <p className="font-body text-xs text-white/30">clicks</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}