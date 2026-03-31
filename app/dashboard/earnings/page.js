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
  .card { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; }
  .badge { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 500; }
  .badge-green { background: rgba(22,163,74,0.1); color: #16a34a; }
  .badge-amber { background: rgba(184,149,42,0.12); color: #92700A; }
  .badge-red { background: rgba(220,38,38,0.1); color: #DC2626; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; }
`

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
      const { data: creatorData } = await supabase.from('creators').select('*').eq('user_id', user.id).single()
      if (!creatorData) { router.push('/auth'); return }
      setCreator(creatorData)
      const [{ data: ordersData }, { data: payoutsData }, { data: linksData }] = await Promise.all([
        supabase.from('orders').select('*, products(name, image_url), brands(name)').eq('creator_id', creatorData.id).order('created_at', { ascending: false }),
        supabase.from('payouts').select('*').eq('creator_id', creatorData.id).order('created_at', { ascending: false }),
        supabase.from('affiliate_links').select('*, products(name, image_url, brands(name))').eq('creator_id', creatorData.id).order('clicks', { ascending: false }),
      ])
      setOrders(ordersData || [])
      setPayouts(payoutsData || [])
      setLinks(linksData || [])
      setLoading(false)
    }
    load()
  }, [])

  const totalEarned = orders.filter(o => o.status === 'confirmed').reduce((s, o) => s + (o.commission_amount || 0), 0)
  const totalPending = orders.filter(o => o.status === 'pending').reduce((s, o) => s + (o.commission_amount || 0), 0)
  const totalPaid = payouts.filter(p => p.status === 'paid').reduce((s, p) => s + (p.amount || 0), 0)
  const totalClicks = links.reduce((s, l) => s + (l.clicks || 0), 0)

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
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 20, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <Link href="/dashboard" className="nav-link">← Back to Dashboard</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Finance</p>
          <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Earnings & Payouts</h1>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Clicks', value: totalClicks },
            { label: 'Confirmed Earnings', value: `PKR ${totalEarned.toLocaleString()}`, highlight: true },
            { label: 'Pending Earnings', value: `PKR ${totalPending.toLocaleString()}` },
            { label: 'Total Paid Out', value: `PKR ${totalPaid.toLocaleString()}` },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="card" style={{ padding: 24 }}>
              <p className="display" style={{ fontSize: 28, fontWeight: 700, color: highlight ? '#B8952A' : '#1A1A1A', marginBottom: 6, letterSpacing: '-0.01em' }}>{value}</p>
              <p style={{ fontSize: 11, color: '#9B9B9B', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Top links */}
        {links.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h2 className="display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#1A1A1A' }}>Top Performing Links</h2>
            <div className="card" style={{ overflow: 'hidden' }}>
              {links.slice(0, 5).map((link, i) => (
                <div key={link.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < 4 ? '1px solid #F0F0F0' : 'none' }}>
                  <span style={{ fontSize: 13, color: '#C4C4C4', width: 20 }}>{i + 1}</span>
                  <div style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden', background: '#F5F5F5', flexShrink: 0 }}>
                    {link.products?.image_url && <img src={link.products.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.products?.name}</p>
                    <p style={{ fontSize: 12, color: '#9B9B9B' }}>{link.products?.brands?.name}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="display" style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>{link.clicks || 0}</p>
                    <p style={{ fontSize: 11, color: '#9B9B9B' }}>clicks</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        <div style={{ marginBottom: 28 }}>
          <h2 className="display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#1A1A1A' }}>Orders</h2>
          {orders.length === 0 ? (
            <div className="card" style={{ padding: 48, textAlign: 'center' }}>
              <p className="display" style={{ fontSize: 24, color: '#C4C4C4', marginBottom: 8 }}>No orders yet</p>
              <p style={{ fontSize: 14, color: '#9B9B9B', marginBottom: 20 }}>Share your storefront to start earning!</p>
              <Link href={`/${creator.username}`} target="_blank" style={{ background: '#1A1A1A', color: '#fff', borderRadius: 100, padding: '10px 24px', fontSize: 13, textDecoration: 'none', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                View My Storefront →
              </Link>
            </div>
          ) : (
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 140px 120px', padding: '12px 20px', borderBottom: '1px solid #F0F0F0' }}>
                {['Product', 'Amount', 'Commission', 'Status'].map(h => (
                  <p key={h} style={{ fontSize: 11, fontWeight: 600, color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</p>
                ))}
              </div>
              {orders.map(order => (
                <div key={order.id} style={{ display: 'grid', gridTemplateColumns: '1fr 140px 140px 120px', padding: '14px 20px', borderBottom: '1px solid #F8F8F8', alignItems: 'center' }}>
                  <p style={{ fontSize: 14, color: '#1A1A1A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 16 }}>{order.products?.name || 'Product'}</p>
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

        {/* Payouts */}
        <div>
          <h2 className="display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#1A1A1A' }}>Payout History</h2>
          {payouts.length === 0 ? (
            <div className="card" style={{ padding: 32, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#9B9B9B' }}>No payouts yet</p>
            </div>
          ) : (
            <div className="card" style={{ overflow: 'hidden' }}>
              {payouts.map((payout, i) => (
                <div key={payout.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: i < payouts.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A' }}>PKR {payout.amount?.toLocaleString()}</p>
                    <p style={{ fontSize: 12, color: '#9B9B9B', marginTop: 2 }}>via {payout.method} · {new Date(payout.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`badge ${payout.status === 'paid' ? 'badge-green' : 'badge-amber'}`}>{payout.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
