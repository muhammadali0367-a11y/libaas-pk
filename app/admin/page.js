'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  body { font-family: 'Inter', sans-serif; background: #FAFAFA; }
  .stat-card { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; padding: 24px; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; padding: 8px 14px; border-radius: 8px; transition: all 0.2s; display: block; }
  .nav-link:hover { background: #F5F5F5; color: #1A1A1A; }
  .nav-link-active { background: #1A1A1A; color: #fff !important; }
  .nav-link-active:hover { background: #1A1A1A; }
  .badge { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 500; }
  .badge-green { background: rgba(22,163,74,0.1); color: #16a34a; }
  .badge-amber { background: rgba(184,149,42,0.12); color: #92700A; }
  .badge-red { background: rgba(220,38,38,0.1); color: #DC2626; }
`

const NAV = [
  { href: '/admin', label: '📊 Overview' },
  { href: '/admin/creators', label: '✨ Creators' },
  { href: '/admin/brands', label: '📦 Brands' },
  { href: '/admin/orders', label: '✅ Orders' },
  { href: '/admin/payouts', label: '💸 Payouts' },
]

export function AdminLayout({ children, active }) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Inter', sans-serif" }}>
      <style>{S}</style>
      {/* Top nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="display" style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>Libaas</span>
            <span style={{ fontSize: 11, background: '#F0F0F0', color: '#6B6B6B', borderRadius: 100, padding: '3px 10px', fontWeight: 600, letterSpacing: '0.06em' }}>ADMIN</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {NAV.map(({ href, label }) => (
              <Link key={href} href={href} className={`nav-link ${active === href ? 'nav-link-active' : ''}`}>{label}</Link>
            ))}
          </div>
          <button onClick={handleLogout} style={{ fontSize: 13, color: '#9B9B9B', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            Log Out
          </button>
        </div>
      </nav>
      {/* Page content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 24px' }}>
        {children}
      </div>
    </div>
  )
}

export default function AdminOverview() {
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [
        { count: totalCreators },
        { count: totalBrands },
        { count: totalProducts },
        { data: orders },
        { data: links },
      ] = await Promise.all([
        supabase.from('creators').select('*', { count: 'exact', head: true }),
        supabase.from('brands').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('orders').select('*, creators(full_name, username), brands(name)').order('created_at', { ascending: false }),
        supabase.from('affiliate_links').select('clicks'),
      ])

      const confirmedOrders = orders?.filter(o => o.status === 'confirmed') || []
      const pendingOrders = orders?.filter(o => o.status === 'pending') || []
      const totalGMV = confirmedOrders.reduce((s, o) => s + (o.order_amount || 0), 0)
      const totalRevenue = confirmedOrders.reduce((s, o) => s + (o.commission_amount || 0) * 0.3, 0) // platform portion
      const totalClicks = links?.reduce((s, l) => s + (l.clicks || 0), 0) || 0

      setStats({
        totalCreators: totalCreators || 0,
        totalBrands: totalBrands || 0,
        totalProducts: totalProducts || 0,
        totalClicks,
        totalOrders: orders?.length || 0,
        pendingOrders: pendingOrders.length,
        confirmedOrders: confirmedOrders.length,
        totalGMV,
        totalRevenue,
      })
      setRecentOrders(orders?.slice(0, 8) || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <AdminLayout active="/admin">
      <p style={{ fontSize: 14, color: '#9B9B9B' }}>Loading...</p>
    </AdminLayout>
  )

  return (
    <AdminLayout active="/admin">
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Platform Overview</p>
        <h1 className="display" style={{ fontSize: 40, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Dashboard</h1>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total Creators', value: stats.totalCreators, link: '/admin/creators' },
          { label: 'Total Brands', value: stats.totalBrands, link: '/admin/brands' },
          { label: 'Active Products', value: stats.totalProducts.toLocaleString() },
          { label: 'Total Clicks', value: stats.totalClicks.toLocaleString() },
        ].map(({ label, value, link }) => (
          <div key={label} className="stat-card" style={{ cursor: link ? 'pointer' : 'default' }}
            onClick={() => link && (window.location.href = link)}>
            <p className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, letterSpacing: '-0.02em' }}>{value}</p>
            <p style={{ fontSize: 11, color: '#9B9B9B', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 36 }}>
        {[
          { label: 'Total Orders', value: stats.totalOrders },
          { label: 'Pending Orders', value: stats.pendingOrders, highlight: stats.pendingOrders > 0 },
          { label: 'Confirmed GMV', value: `PKR ${stats.totalGMV.toLocaleString()}`, gold: true },
          { label: 'Platform Revenue', value: `PKR ${Math.round(stats.totalRevenue).toLocaleString()}`, gold: true },
        ].map(({ label, value, highlight, gold }) => (
          <div key={label} className="stat-card">
            <p className="display" style={{ fontSize: 32, fontWeight: 700, color: gold ? '#B8952A' : highlight ? '#DC2626' : '#1A1A1A', marginBottom: 6, letterSpacing: '-0.01em' }}>{value}</p>
            <p style={{ fontSize: 11, color: '#9B9B9B', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 className="display" style={{ fontSize: 24, fontWeight: 600, color: '#1A1A1A' }}>Recent Orders</h2>
          <Link href="/admin/orders" style={{ fontSize: 13, color: '#9B9B9B', textDecoration: 'none' }}>View All →</Link>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #F0F0F0', overflow: 'hidden' }}>
          {recentOrders.length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#9B9B9B' }}>No orders yet</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px 140px 120px', padding: '12px 20px', borderBottom: '1px solid #F0F0F0' }}>
                {['Creator', 'Brand', 'Order Amount', 'Commission', 'Status'].map(h => (
                  <p key={h} style={{ fontSize: 11, fontWeight: 600, color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</p>
                ))}
              </div>
              {recentOrders.map((order, i) => (
                <div key={order.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px 140px 120px', padding: '14px 20px', borderBottom: i < recentOrders.length - 1 ? '1px solid #F8F8F8' : 'none', alignItems: 'center' }}>
                  <p style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500 }}>{order.creators?.full_name || order.creators?.username || '—'}</p>
                  <p style={{ fontSize: 13, color: '#6B6B6B' }}>{order.brands?.name || '—'}</p>
                  <p style={{ fontSize: 13, color: '#1A1A1A' }}>PKR {order.order_amount?.toLocaleString()}</p>
                  <p style={{ fontSize: 13, color: '#B8952A', fontWeight: 500 }}>PKR {order.commission_amount?.toLocaleString()}</p>
                  <span className={`badge ${order.status === 'confirmed' ? 'badge-green' : order.status === 'rejected' ? 'badge-red' : 'badge-amber'}`}>
                    {order.status === 'confirmed' ? '✓ Confirmed' : order.status === 'rejected' ? '✕ Rejected' : '⏳ Pending'}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
