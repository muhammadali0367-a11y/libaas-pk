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
  .order-card { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; padding: 20px; transition: all 0.2s; }
  .order-card:hover { border-color: #E0E0E0; }
  .tab { padding: 8px 18px; border-radius: 100px; border: none; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; }
  .tab-active { background: #1A1A1A; color: #fff; }
  .tab-inactive { background: transparent; color: #9B9B9B; }
  .badge { display: inline-flex; align-items: center; padding: 5px 12px; border-radius: 100px; font-size: 12px; font-weight: 500; }
  .badge-green { background: rgba(22,163,74,0.1); color: #16a34a; }
  .badge-amber { background: rgba(184,149,42,0.12); color: #92700A; }
  .badge-red { background: rgba(220,38,38,0.1); color: #DC2626; }
  .btn-confirm { background: rgba(22,163,74,0.1); color: #16a34a; border: 1px solid rgba(22,163,74,0.2); border-radius: 100px; padding: 9px 20px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
  .btn-confirm:hover { background: rgba(22,163,74,0.18); }
  .btn-reject { background: rgba(220,38,38,0.08); color: #DC2626; border: 1px solid rgba(220,38,38,0.15); border-radius: 100px; padding: 9px 20px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
  .btn-reject:hover { background: rgba(220,38,38,0.14); }
`

export default function BrandOrders() {
  const [brand, setBrand] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [processing, setProcessing] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }
      const { data: brandData } = await supabase.from('brands').select('*').eq('user_id', user.id).single()
      if (!brandData) { router.push('/auth'); return }
      setBrand(brandData)
      const { data: ordersData } = await supabase.from('orders').select(`*, creators(full_name, username, avatar_url, jazzcash_number), affiliate_links(slug, products(name, image_url, price))`).eq('brand_id', brandData.id).order('created_at', { ascending: false })
      setOrders(ordersData || [])
      setLoading(false)
    }
    load()
  }, [])

  async function updateOrderStatus(orderId, status) {
    setProcessing(orderId)
    const { error } = await supabase.from('orders').update({ status, confirmed_at: status === 'confirmed' ? new Date().toISOString() : null }).eq('id', orderId)
    if (!error) setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    setProcessing(null)
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const pending = orders.filter(o => o.status === 'pending').length

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
          <Link href="/brand/dashboard" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 20, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <Link href="/brand/dashboard" style={{ fontSize: 13, color: '#6B6B6B', textDecoration: 'none' }}>← Dashboard</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Brand Tools</p>
            <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Confirm Orders</h1>
          </div>
          {pending > 0 && (
            <div style={{ background: '#FBF8F1', border: '1px solid #E8D5A0', borderRadius: 14, padding: '16px 24px', textAlign: 'center' }}>
              <p className="display" style={{ fontSize: 36, fontWeight: 700, color: '#B8952A' }}>{pending}</p>
              <p style={{ fontSize: 11, color: '#92700A', fontWeight: 500 }}>Pending</p>
            </div>
          )}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#F5F5F5', padding: 4, borderRadius: 100, width: 'fit-content' }}>
          {['all', 'pending', 'confirmed', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`tab ${filter === f ? 'tab-active' : 'tab-inactive'}`} style={{ textTransform: 'capitalize' }}>
              {f} {f !== 'all' && `(${orders.filter(o => o.status === f).length})`}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #F0F0F0', borderRadius: 16, padding: 60, textAlign: 'center' }}>
            <p className="display" style={{ fontSize: 26, color: '#C4C4C4', marginBottom: 8 }}>No orders</p>
            <p style={{ fontSize: 14, color: '#9B9B9B' }}>{filter === 'pending' ? 'No pending orders to confirm' : 'No orders found'}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map(order => (
              <div key={order.id} className="order-card">
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  {/* Product image */}
                  <div style={{ width: 64, height: 80, borderRadius: 12, overflow: 'hidden', background: '#F5F5F5', flexShrink: 0 }}>
                    {order.affiliate_links?.products?.image_url && <img src={order.affiliate_links.products.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', marginBottom: 2 }}>{order.affiliate_links?.products?.name || 'Product'}</p>
                        <p style={{ fontSize: 12, color: '#9B9B9B' }}>{new Date(order.created_at).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                      </div>
                      <span className={`badge ${order.status === 'confirmed' ? 'badge-green' : order.status === 'rejected' ? 'badge-red' : 'badge-amber'}`}>
                        {order.status === 'confirmed' ? '✓ Confirmed' : order.status === 'rejected' ? '✕ Rejected' : '⏳ Pending'}
                      </span>
                    </div>

                    {/* Creator */}
                    <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '12px 16px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', background: '#F0F0F0', flexShrink: 0 }}>
                        {order.creators?.avatar_url ? <img src={order.creators.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>👤</div>}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>{order.creators?.full_name || order.creators?.username}</p>
                        <p style={{ fontSize: 11, color: '#9B9B9B' }}>libaas.pk/{order.creators?.username}{order.creators?.jazzcash_number && ` · JazzCash: ${order.creators.jazzcash_number}`}</p>
                      </div>
                    </div>

                    {/* Financials */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                      {[{ label: 'Order Amount', value: `PKR ${order.order_amount?.toLocaleString()}` }, { label: 'Commission', value: `PKR ${order.commission_amount?.toLocaleString()}` }, { label: 'Rate', value: `${order.commission_rate}%` }].map(({ label, value }) => (
                        <div key={label} style={{ background: '#FAFAFA', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                          <p style={{ fontSize: 11, color: '#9B9B9B', marginBottom: 4 }}>{label}</p>
                          <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    {order.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => updateOrderStatus(order.id, 'confirmed')} disabled={processing === order.id} className="btn-confirm" style={{ flex: 1, opacity: processing === order.id ? 0.5 : 1 }}>
                          {processing === order.id ? 'Processing...' : '✓ Confirm Order'}
                        </button>
                        <button onClick={() => updateOrderStatus(order.id, 'rejected')} disabled={processing === order.id} className="btn-reject" style={{ flex: 1, opacity: processing === order.id ? 0.5 : 1 }}>
                          ✕ Reject
                        </button>
                      </div>
                    )}
                    {order.status !== 'pending' && (
                      <button onClick={() => updateOrderStatus(order.id, 'pending')} disabled={processing === order.id}
                        style={{ background: 'none', border: 'none', fontSize: 12, color: '#9B9B9B', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                        ↩ Revert to pending
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
