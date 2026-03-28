'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function BrandCreators() {
  const [brand, setBrand] = useState(null)
  const [creators, setCreators] = useState([])
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

      // Get all products for this brand
      const { data: products } = await supabase
        .from('products')
        .select('id')
        .eq('brand_id', brandData.id)

      const productIds = products?.map(p => p.id) || []

      if (productIds.length === 0) {
        setLoading(false)
        return
      }

      // Get affiliate links for these products
      const { data: links } = await supabase
        .from('affiliate_links')
        .select('creator_id, clicks, product_id')
        .in('product_id', productIds)

      // Group by creator
      const creatorMap = {}
      links?.forEach(l => {
        if (!creatorMap[l.creator_id]) {
          creatorMap[l.creator_id] = { clicks: 0, products: new Set() }
        }
        creatorMap[l.creator_id].clicks += l.clicks || 0
        creatorMap[l.creator_id].products.add(l.product_id)
      })

      if (Object.keys(creatorMap).length === 0) {
        setLoading(false)
        return
      }

      // Get creator details
      const { data: creatorData } = await supabase
        .from('creators')
        .select('*')
        .in('id', Object.keys(creatorMap))

      // Get orders per creator
      const { data: orders } = await supabase
        .from('orders')
        .select('creator_id, commission_amount, status')
        .eq('brand_id', brandData.id)

      const creatorOrders = {}
      orders?.forEach(o => {
        if (!creatorOrders[o.creator_id]) creatorOrders[o.creator_id] = { total: 0, confirmed: 0 }
        creatorOrders[o.creator_id].total++
        if (o.status === 'confirmed') {
          creatorOrders[o.creator_id].confirmed += o.commission_amount || 0
        }
      })

      const enriched = creatorData?.map(c => ({
        ...c,
        clicks: creatorMap[c.id]?.clicks || 0,
        productsCount: creatorMap[c.id]?.products.size || 0,
        orders: creatorOrders[c.id]?.total || 0,
        earned: creatorOrders[c.id]?.confirmed || 0,
      })).sort((a, b) => b.clicks - a.clicks)

      setCreators(enriched || [])
      setLoading(false)
    }
    load()
  }, [])

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
        <div className="mb-8">
          <p className="font-body text-xs tracking-widest text-white/30 uppercase mb-1">Brand Tools</p>
          <h1 className="font-display text-4xl">Creators Promoting You</h1>
          <p className="font-body text-sm text-white/30 mt-1">
            {creators.length} creator{creators.length !== 1 ? 's' : ''} promoting {brand?.name}
          </p>
        </div>

        {creators.length === 0 ? (
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-16 text-center">
            <p className="font-display text-3xl text-white/20 mb-2">No creators yet</p>
            <p className="font-body text-sm text-white/20">
              Creators will appear here once they add your products to their storefronts
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {creators.map((creator, i) => (
              <div key={creator.id}
                className="bg-[#141414] border border-white/5 rounded-2xl p-5 flex items-center gap-5">

                {/* Rank */}
                <span className="font-body text-sm text-white/20 w-6 flex-shrink-0">{i + 1}</span>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 flex-shrink-0">
                  {creator.avatar_url
                    ? <img src={creator.avatar_url} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-lg">👤</div>
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-white">
                    {creator.full_name || creator.username}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <a href={`https://thelibaas.pk/${creator.username}`}
                      target="_blank"
                      className="font-body text-xs hover:text-[#C9A84C] transition-colors"
                      style={{ color: 'rgba(255,255,255,0.3)' }}>
                      libaas.pk/{creator.username}
                    </a>
                    {creator.instagram && (
                      <a href={`https://instagram.com/${creator.instagram}`}
                        target="_blank"
                        className="font-body text-xs hover:text-[#C9A84C] transition-colors"
                        style={{ color: 'rgba(255,255,255,0.3)' }}>
                        @{creator.instagram}
                      </a>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 flex-shrink-0">
                  {[
                    { label: 'Picks', value: creator.productsCount },
                    { label: 'Clicks', value: creator.clicks },
                    { label: 'Orders', value: creator.orders },
                    { label: 'Earned', value: `PKR ${creator.earned.toLocaleString()}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <p className="font-display text-xl" style={{ color: '#C9A84C' }}>{value}</p>
                      <p className="font-body text-xs text-white/30">{label}</p>
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