// ============================================================
// FILE 1: app/brand/dashboard/creators/page.js
// ============================================================
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
  .creator-card { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; padding: 20px; display: flex; align-items: center; gap: 16px; transition: all 0.2s; }
  .creator-card:hover { border-color: #E0E0E0; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
`

export default function BrandCreators() {
  const [brand, setBrand] = useState(null)
  const [creators, setCreators] = useState([])
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
      if (productIds.length === 0) { setLoading(false); return }
      const { data: links } = await supabase.from('affiliate_links').select('creator_id, clicks, product_id').in('product_id', productIds)
      const creatorMap = {}
      links?.forEach(l => {
        if (!creatorMap[l.creator_id]) creatorMap[l.creator_id] = { clicks: 0, products: new Set() }
        creatorMap[l.creator_id].clicks += l.clicks || 0
        creatorMap[l.creator_id].products.add(l.product_id)
      })
      if (Object.keys(creatorMap).length === 0) { setLoading(false); return }
      const { data: creatorData } = await supabase.from('creators').select('*').in('id', Object.keys(creatorMap))
      const { data: orders } = await supabase.from('orders').select('creator_id, commission_amount, status').eq('brand_id', brandData.id)
      const creatorOrders = {}
      orders?.forEach(o => {
        if (!creatorOrders[o.creator_id]) creatorOrders[o.creator_id] = { total: 0, confirmed: 0 }
        creatorOrders[o.creator_id].total++
        if (o.status === 'confirmed') creatorOrders[o.creator_id].confirmed += o.commission_amount || 0
      })
      setCreators(creatorData?.map(c => ({ ...c, clicks: creatorMap[c.id]?.clicks || 0, productsCount: creatorMap[c.id]?.products.size || 0, orders: creatorOrders[c.id]?.total || 0, earned: creatorOrders[c.id]?.confirmed || 0 })).sort((a, b) => b.clicks - a.clicks) || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#9B9B9B' }}>Loading...</p></div>

  return (
    <main style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Inter', sans-serif" }}>
      <style>{S}</style>
      <nav style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/brand/dashboard" style={{ textDecoration: 'none' }}><span className="display" style={{ fontSize: 20, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span></Link>
          <Link href="/brand/dashboard" style={{ fontSize: 13, color: '#6B6B6B', textDecoration: 'none' }}>← Dashboard</Link>
        </div>
      </nav>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Brand Tools</p>
          <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Creators Promoting You</h1>
          <p style={{ fontSize: 13, color: '#9B9B9B', marginTop: 4 }}>{creators.length} creator{creators.length !== 1 ? 's' : ''} promoting {brand?.name}</p>
        </div>
        {creators.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #F0F0F0', borderRadius: 16, padding: 60, textAlign: 'center' }}>
            <p className="display" style={{ fontSize: 26, color: '#C4C4C4', marginBottom: 8 }}>No creators yet</p>
            <p style={{ fontSize: 14, color: '#9B9B9B' }}>Creators will appear here once they add your products to their storefronts</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {creators.map((creator, i) => (
              <div key={creator.id} className="creator-card">
                <span style={{ fontSize: 13, color: '#C4C4C4', width: 24, flexShrink: 0 }}>{i + 1}</span>
                <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', background: '#F5F5F5', flexShrink: 0 }}>
                  {creator.avatar_url ? <img src={creator.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{creator.full_name || creator.username}</p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 2 }}>
                    <a href={`https://thelibaas.pk/${creator.username}`} target="_blank" style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>libaas.pk/{creator.username}</a>
                    {creator.instagram && <a href={`https://instagram.com/${creator.instagram}`} target="_blank" style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>@{creator.instagram}</a>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 28, flexShrink: 0 }}>
                  {[{ label: 'Picks', value: creator.productsCount }, { label: 'Clicks', value: creator.clicks }, { label: 'Orders', value: creator.orders }, { label: 'Earned', value: `PKR ${creator.earned.toLocaleString()}` }].map(({ label, value }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <p className="display" style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{value}</p>
                      <p style={{ fontSize: 11, color: '#9B9B9B', fontWeight: 500 }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
