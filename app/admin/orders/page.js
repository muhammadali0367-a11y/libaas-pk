'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { AdminLayout } from '../page'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .card { background: #fff; border-radius: 12px; border: 1px solid #F0F0F0; padding: 20px; transition: border-color 0.2s; }
  .card:hover { border-color: #E0E0E0; }
  .badge { display: inline-flex; align-items: center; padding: 5px 12px; border-radius: 100px; font-size: 12px; font-weight: 500; }
  .badge-green { background: rgba(22,163,74,0.1); color: #16a34a; }
  .badge-amber { background: rgba(184,149,42,0.12); color: #92700A; }
  .badge-red { background: rgba(220,38,38,0.1); color: #DC2626; }
  .btn-confirm { background: rgba(22,163,74,0.1); color: #16a34a; border: 1px solid rgba(22,163,74,0.2); border-radius: 100px; padding: 8px 18px; font-size: 12px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; }
  .btn-reject { background: rgba(220,38,38,0.08); color: #DC2626; border: 1px solid rgba(220,38,38,0.15); border-radius: 100px; padding: 8px 18px; font-size: 12px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; }
  .btn-revert { background: none; border: none; font-size: 12px; color: #9B9B9B; cursor: pointer; font-family: 'Inter', sans-serif; }
  .tab { padding: 7px 18px; border-radius: 100px; border: none; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; }
  .tab-active { background: #1A1A1A; color: #fff; }
  .tab-inactive { background: transparent; color: #9B9B9B; }
`

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [processing, setProcessing] = useState(null)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('orders')
        .select(`
          *,
          creators(full_name, username, avatar_url, jazzcash_number),
          brands(name),
          affiliate_links(slug, products(name, image_url, price))
        `)
        .order('created_at', { ascending: false })
      setOrders(data || [])
      setLoading(false)
    }
    load()
  }, [])

  async function updateStatus(orderId, status) {
    setProcessing(orderId)
    await supabase.from('orders').update({
      status,
      confirmed_at: status === 'confirmed' ? new Date().toISOString() : null
    }).eq('id', orderId)
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    setProcessing(null)
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const pending = orders.filter(o => o.status === 'pending').length

  return (
    <AdminLayout active="/admin/orders">
      <style>{S}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Platform</p>
          <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>All Orders</h1>
          <p style={{ fontSize: 13, color: '#9B9B9B', marginTop: 4 }}>{orders.length} total orders across all brands</p>
        </div>
        {pending > 0 && (
          <div style={{ background: '#FBF8F1', border: '1px solid #E8D5A0', borderRadius: 14, padding: '16px 24px', textAlign: 'center' }}>
            <p className="display" style={{ fontSize: 32, fontWeight: 700, color: '#B8952A' }}>{pending}</p>
            <p style={{ fontSize: 11, color: '#92700A', fontWeight: 500 }}>Pending</p>
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#F5F5F5', padding: 4, borderRadius: 100, width: 'fit-content' }}>
        {['all', 'pending', 'confirmed', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`tab ${filter === f ? 'tab-active' : 'tab-inactive'}`} style={{ textTransform: 'capitalize' }}>
            {f} ({f === 'all' ? orders.length : orders.filter(o => o.status === f).length})
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ fontSize: 14, color: '#9B9B9B' }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #F0F0F0', padding: '48px 24px', textAlign: 'center' }}>
          <p className="display" style={{ fontSize: 24, color: '#C4C4C4' }}>No orders</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(order => (
            <div key={order.id} className="card">
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                {/* Product image */}
                <div style={{ width: 56, height: 70, borderRadius: 10, overflow: 'hidden', background: '#F5F5F5', flexShrink: 0 }}>
                  {order.affiliate_links?.products?.image_url && (
                    <img src={order.affiliate_links.products.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 2 }}>
                        {order.affiliate_links?.products?.name || 'Product'}
                      </p>
                      <p style={{ fontSize: 12, color: '#9B9B9B' }}>
                        {order.brands?.name} · {new Date(order.created_at).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <span className={`badge ${order.status === 'confirmed' ? 'badge-green' : order.status === 'rejected' ? 'badge-red' : 'badge-amber'}`}>
                      {order.status === 'confirmed' ? '✓ Confirmed' : order.status === 'rejected' ? '✕ Rejected' : '⏳ Pending'}
                    </span>
                  </div>

                  {/* Creator info */}
                  <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '10px 14px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', overflow: 'hidden', background: '#F0F0F0', flexShrink: 0 }}>
                      {order.creators?.avatar_url
                        ? <img src={order.creators.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>👤</div>
                      }
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>{order.creators?.full_name || order.creators?.username}</p>
                      <p style={{ fontSize: 11, color: '#9B9B9B' }}>
                        libaas.pk/{order.creators?.username}
                        {order.creators?.jazzcash_number && ` · JazzCash: ${order.creators.jazzcash_number}`}
                      </p>
                    </div>
                  </div>

                  {/* Financials */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
                    {[
                      { label: 'Order Amount', value: `PKR ${order.order_amount?.toLocaleString()}` },
                      { label: 'Creator Commission', value: `PKR ${order.commission_amount?.toLocaleString()}` },
                      { label: 'Commission Rate', value: `${order.commission_rate}%` },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ background: '#FAFAFA', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
                        <p style={{ fontSize: 11, color: '#9B9B9B', marginBottom: 4 }}>{label}</p>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  {order.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => updateStatus(order.id, 'confirmed')} disabled={processing === order.id} className="btn-confirm" style={{ opacity: processing === order.id ? 0.5 : 1 }}>
                        ✓ Confirm Order
                      </button>
                      <button onClick={() => updateStatus(order.id, 'rejected')} disabled={processing === order.id} className="btn-reject" style={{ opacity: processing === order.id ? 0.5 : 1 }}>
                        ✕ Reject
                      </button>
                    </div>
                  )}
                  {order.status !== 'pending' && (
                    <button onClick={() => updateStatus(order.id, 'pending')} disabled={processing === order.id} className="btn-revert">
                      ↩ Revert to pending
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
