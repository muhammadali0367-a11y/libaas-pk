'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  body { font-family: 'Inter', sans-serif; background: #FAFAFA; }
  .stat-card { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; padding: 24px; }
  .action-card { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; padding: 24px; text-decoration: none; color: inherit; display: block; transition: all 0.2s; }
  .action-card:hover { border-color: #E0E0E0; box-shadow: 0 2px 12px rgba(0,0,0,0.06); transform: translateY(-1px); }
  .action-icon { width: 40px; height: 40px; background: #F5F5F5; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 14px; }
  .table-card { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; overflow: hidden; }
  .badge { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 500; }
  .badge-green { background: rgba(22,163,74,0.1); color: #16a34a; }
  .badge-amber { background: rgba(184,149,42,0.12); color: #92700A; }
  .badge-red { background: rgba(220,38,38,0.1); color: #DC2626; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; }
`

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
      const { data: brandData } = await supabase.from('brands').select('*').eq('user_id', user.id).single()
      if (!brandData) { router.push('/auth'); return }
      setBrand(brandData)
      const { data: products } = await supabase.from('products').select('id').eq('brand_id', brandData.id)
      const productIds = products?.map(p => p.id) || []
      if (productIds.length > 0) {
        const { data: links } = await supabase.from('affiliate_links').select('clicks, creator_id').in('product_id', productIds)
        const totalClicks = links?.reduce((s, l) => s + (l.clicks || 0), 0) || 0
        const uniqueCreators = new Set(links?.map(l => l.creator_id)).size
        const { data: orders } = await supabase.from('orders').select('*, creators(full_name, username, avatar_url)').eq('brand_id', brandData.id).order('created_at', { ascending: false })
        const confirmedRevenue = orders?.filter(o => o.status === 'confirmed').reduce((s, o) => s + (o.order_amount || 0), 0) || 0
        setStats({ clicks: totalClicks, orders: orders?.length || 0, revenue: confirmedRevenue, creators: uniqueCreators })
        setRecentOrders(orders?.slice(0, 5) || [])
        const creatorClicks = {}
        links?.forEach(l => { creatorClicks[l.creator_id] = (creatorClicks[l.creator_id] || 0) + (l.clicks || 0) })
        const topIds = Object.entries(creatorClicks).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id]) => id)
        if (topIds.length > 0) {
          const { data: creators } = await supabase.from('creators').select('id, full_name, username, avatar_url, instagram').in('id', topIds)
          setTopCreators(creators?.map(c => ({ ...c, clicks: creatorClicks[c.id] || 0 })).sort((a, b) => b.clicks - a.clicks) || [])
        }
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#9B9B9B' }}>Loading...</p>
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Inter', sans-serif" }}>
      <style>{S}</style>

      <nav style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo links to brand dashboard when logged in */}
          <Link href="/brand/dashboard" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 20, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 13, color: '#9B9B9B' }}>{brand.name}</span>
            <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
              className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Log Out</button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Brand Dashboard</p>
          <h1 className="display" style={{ fontSize: 40, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, letterSpacing: '-0.01em' }}>{brand.name}</h1>
          <p style={{ fontSize: 13, color: '#9B9B9B' }}>{brand.commission_rate}% creator commission · {brand.platform_fee_rate || 3}% platform fee</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Clicks', value: stats.clicks },
            { label: 'Active Creators', value: stats.creators },
            { label: 'Total Orders', value: stats.orders },
            { label: 'Confirmed Revenue', value: `PKR ${stats.revenue.toLocaleString()}` },
          ].map(({ label, value }) => (
            <div key={label} className="stat-card">
              <p className="display" style={{ fontSize: 32, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, letterSpacing: '-0.01em' }}>{value}</p>
              <p style={{ fontSize: 11, color: '#9B9B9B', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { href: '/brand/dashboard/products', icon: '📦', title: 'Manage Products', desc: 'Add or update your product catalog' },
            { href: '/brand/dashboard/orders', icon: '✅', title: 'Confirm Orders', desc: 'Review and confirm sales from creators' },
            { href: '/brand/dashboard/creators', icon: '👥', title: 'View Creators', desc: 'See who is promoting your products' },
          ].map(({ href, icon, title, desc }) => (
            <Link key={href} href={href} className="action-card">
              <div className="action-icon">{icon}</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>{title}</p>
              <p style={{ fontSize: 13, color: '#9B9B9B' }}>{desc}</p>
            </Link>
          ))}
        </div>

        {/* Recent orders */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 className="display" style={{ fontSize: 24, fontWeight: 600, color: '#1A1A1A' }}>Recent Orders</h2>
            <Link href="/brand/dashboard/orders" style={{ fontSize: 13, color: '#9B9B9B', textDecoration: 'none' }}>View All →</Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="table-card" style={{ padding: 40, textAlign: 'center' }}>
              <p className="display" style={{ fontSize: 22, color: '#C4C4C4', marginBottom: 6 }}>No orders yet</p>
              <p style={{ fontSize: 13, color: '#9B9B9B' }}>Orders will appear here when creators drive sales</p>
            </div>
          ) : (
            <div className="table-card">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px 120px', padding: '12px 20px', borderBottom: '1px solid #F0F0F0' }}>
                {['Creator', 'Order Amount', 'Commission', 'Status'].map(h => (
                  <p key={h} style={{ fontSize: 11, fontWeight: 600, color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</p>
                ))}
              </div>
              {recentOrders.map(order => (
                <div key={order.id} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px 120px', padding: '14px 20px', borderBottom: '1px solid #F8F8F8', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', background: '#F5F5F5', flexShrink: 0 }}>
                      {order.creators?.avatar_url ? <img src={order.creators.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>👤</div>}
                    </div>
                    <p style={{ fontSize: 14, color: '#1A1A1A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.creators?.full_name || order.creators?.username || 'Creator'}</p>
                  </div>
                  <p style={{ fontSize: 14, color: '#1A1A1A' }}>PKR {order.order_amount?.toLocaleString()}</p>
                  <p style={{ fontSize: 14, color: '#B8952A', fontWeight: 500 }}>PKR {order.commission_amount?.toLocaleString()}</p>
                  <span className={`badge ${order.status === 'confirmed' ? 'badge-green' : order.status === 'rejected' ? 'badge-red' : 'badge-amber'}`}>
                    {order.status === 'confirmed' ? '✓ Confirmed' : order.status === 'rejected' ? '✕ Rejected' : '⏳ Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top creators */}
        {topCreators.length > 0 && (
          <div>
            <h2 className="display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#1A1A1A' }}>Top Creators</h2>
            <div className="table-card">
              {topCreators.map((creator, i) => (
                <div key={creator.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < topCreators.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                  <span style={{ fontSize: 13, color: '#C4C4C4', width: 20 }}>{i + 1}</span>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', background: '#F5F5F5', flexShrink: 0 }}>
                    {creator.avatar_url ? <img src={creator.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A' }}>{creator.full_name || creator.username}</p>
                    <p style={{ fontSize: 12, color: '#9B9B9B' }}>libaas.pk/{creator.username}{creator.instagram && ` · @${creator.instagram}`}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="display" style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>{creator.clicks}</p>
                    <p style={{ fontSize: 11, color: '#9B9B9B' }}>clicks</p>
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
