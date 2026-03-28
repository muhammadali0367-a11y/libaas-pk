'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

      const { data: brandData } = await supabase
        .from('brands')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (!brandData) { router.push('/auth'); return }
      setBrand(brandData)

      const { data: ordersData } = await supabase
        .from('orders')
        .select(`
          *,
          creators ( full_name, username, avatar_url, jazzcash_number ),
          affiliate_links ( slug, products ( name, image_url, price ) )
        `)
        .eq('brand_id', brandData.id)
        .order('created_at', { ascending: false })

      setOrders(ordersData || [])
      setLoading(false)
    }
    load()
  }, [])

  async function updateOrderStatus(orderId, status) {
    setProcessing(orderId)
    const { error } = await supabase
      .from('orders')
      .update({
        status,
        confirmed_at: status === 'confirmed' ? new Date().toISOString() : null,
      })
      .eq('id', orderId)

    if (!error) {
      setOrders(prev => prev.map(o =>
        o.id === orderId ? { ...o, status } : o
      ))
    }
    setProcessing(null)
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const pending = orders.filter(o => o.status === 'pending').length

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

      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-wider" style={{ color: '#C9A84C' }}>LIBAAS</Link>
        <Link href="/brand/dashboard" className="font-body text-xs text-white/40 hover:text-white transition-colors">
          ← Dashboard
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-body text-xs tracking-widest text-white/30 uppercase mb-1">Brand Tools</p>
            <h1 className="font-display text-4xl">Confirm Orders</h1>
          </div>
          {pending > 0 && (
            <div className="text-center px-5 py-3 rounded-2xl"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <p className="font-display text-3xl" style={{ color: '#C9A84C' }}>{pending}</p>
              <p className="font-body text-xs text-white/40">Pending</p>
            </div>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 bg-[#141414] rounded-xl p-1 w-fit">
          {['all', 'pending', 'confirmed', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="font-body text-xs px-4 py-2 rounded-lg transition-all capitalize"
              style={{
                background: filter === f ? '#C9A84C' : 'transparent',
                color: filter === f ? '#000' : '#666',
              }}>
              {f} {f !== 'all' && `(${orders.filter(o => o.status === f).length})`}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-16 text-center">
            <p className="font-display text-3xl text-white/20 mb-2">No orders</p>
            <p className="font-body text-sm text-white/20">
              {filter === 'pending' ? 'No pending orders to confirm' : 'No orders found'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(order => (
              <div key={order.id}
                className="bg-[#141414] border border-white/5 rounded-2xl p-5">
                <div className="flex items-start gap-4">

                  {/* Product image */}
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                    {order.affiliate_links?.products?.image_url && (
                      <img
                        src={order.affiliate_links.products.image_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="font-body font-medium text-white mb-0.5">
                          {order.affiliate_links?.products?.name || 'Product'}
                        </p>
                        <p className="font-body text-xs text-white/30">
                          {new Date(order.created_at).toLocaleDateString('en-PK', {
                            year: 'numeric', month: 'short', day: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className="flex-shrink-0 font-body text-xs px-3 py-1 rounded-full"
                        style={{
                          background: order.status === 'confirmed' ? 'rgba(76,175,130,0.1)' : order.status === 'rejected' ? 'rgba(255,80,80,0.1)' : 'rgba(201,168,76,0.1)',
                          color: order.status === 'confirmed' ? '#4CAF82' : order.status === 'rejected' ? '#ff5050' : '#C9A84C',
                        }}>
                        {order.status === 'confirmed' ? '✓ Confirmed' : order.status === 'rejected' ? '✕ Rejected' : '⏳ Pending'}
                      </span>
                    </div>

                    {/* Creator info */}
                    <div className="flex items-center gap-2 mb-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-white/5">
                        {order.creators?.avatar_url
                          ? <img src={order.creators.avatar_url} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-xs">👤</div>
                        }
                      </div>
                      <div>
                        <p className="font-body text-xs text-white">
                          {order.creators?.full_name || order.creators?.username}
                        </p>
                        <p className="font-body text-xs text-white/30">
                          libaas.pk/{order.creators?.username}
                          {order.creators?.jazzcash_number && ` · JazzCash: ${order.creators.jazzcash_number}`}
                        </p>
                      </div>
                    </div>

                    {/* Financial breakdown */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: 'Order Amount', value: `PKR ${order.order_amount?.toLocaleString()}` },
                        { label: 'Commission', value: `PKR ${order.commission_amount?.toLocaleString()}` },
                        { label: 'Rate', value: `${order.commission_rate}%` },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-center p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <p className="font-body text-xs text-white/30 mb-0.5">{label}</p>
                          <p className="font-body text-sm text-white font-medium">{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    {order.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateOrderStatus(order.id, 'confirmed')}
                          disabled={processing === order.id}
                          className="flex-1 py-2.5 rounded-xl font-body text-sm font-medium transition-opacity disabled:opacity-50"
                          style={{ background: 'rgba(76,175,130,0.15)', color: '#4CAF82', border: '1px solid rgba(76,175,130,0.2)' }}>
                          {processing === order.id ? 'Processing...' : '✓ Confirm Order'}
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'rejected')}
                          disabled={processing === order.id}
                          className="flex-1 py-2.5 rounded-xl font-body text-sm font-medium transition-opacity disabled:opacity-50"
                          style={{ background: 'rgba(255,80,80,0.1)', color: '#ff5050', border: '1px solid rgba(255,80,80,0.15)' }}>
                          ✕ Reject
                        </button>
                      </div>
                    )}

                    {order.status !== 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'pending')}
                        disabled={processing === order.id}
                        className="font-body text-xs text-white/20 hover:text-white/40 transition-colors">
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