'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function StorefrontManager() {
  const [creator, setCreator] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [myProducts, setMyProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterBrand, setFilterBrand] = useState('All')
  const [filterCategory, setFilterCategory] = useState('All')
  const [adding, setAdding] = useState(null)
  const [removing, setRemoving] = useState(null)
  const [tab, setTab] = useState('browse') // 'browse' | 'my'
  const router = useRouter()

  const brands = ['All', 'Beechtree', 'Saya', 'Asim Jofa', 'Limelight', 'Alkaram', 'Ethnic', 'Zellbury', 'Bonanza', 'Baroque', 'Stylo']
  const categories = ['All', 'Pret', 'Lawn', 'Kurta', 'Winter', 'Formal']

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

      // Load all products with brand info
      const { data: products } = await supabase
        .from('products')
        .select('*, brands(name, commission_rate)')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      // Load my storefront
      const { data: storefront } = await supabase
        .from('storefronts')
        .select('product_id')
        .eq('creator_id', creatorData.id)

      const myProductIds = new Set(storefront?.map(s => s.product_id) || [])

      setAllProducts(products || [])
      setMyProducts(myProductIds)
      setLoading(false)
    }
    load()
  }, [])

  async function addProduct(productId) {
    setAdding(productId)
    const { error } = await supabase
      .from('storefronts')
      .insert({ creator_id: creator.id, product_id: productId })

    if (!error) {
      // Also create affiliate link
      const slug = `${creator.username}-${productId.slice(0, 8)}`
      await supabase.from('affiliate_links').insert({
        creator_id: creator.id,
        product_id: productId,
        slug,
      })
      setMyProducts(prev => new Set([...prev, productId]))
    }
    setAdding(null)
  }

  async function removeProduct(productId) {
    setRemoving(productId)
    await supabase
      .from('storefronts')
      .delete()
      .eq('creator_id', creator.id)
      .eq('product_id', productId)

    await supabase
      .from('affiliate_links')
      .delete()
      .eq('creator_id', creator.id)
      .eq('product_id', productId)

    setMyProducts(prev => {
      const next = new Set(prev)
      next.delete(productId)
      return next
    })
    setRemoving(null)
  }

  const filtered = allProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchBrand = filterBrand === 'All' || p.brands?.name === filterBrand
    const matchCat = filterCategory === 'All' || p.category === filterCategory
    return matchSearch && matchBrand && matchCat
  })

  const displayProducts = tab === 'my'
    ? filtered.filter(p => myProducts.has(p.id))
    : filtered

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
        input, select { font-family: 'DM Sans', sans-serif; }
        .product-card { transition: all 0.2s ease; }
        .product-card:hover { transform: translateY(-2px); }
        .pill { transition: all 0.2s ease; cursor: pointer; }
      `}</style>

      {/* NAV */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0A0A0A] z-10">
        <Link href="/" className="font-display text-xl tracking-wider" style={{ color: '#C9A84C' }}>LIBAAS</Link>
        <div className="flex items-center gap-4">
          <Link href={`/${creator.username}`} target="_blank"
            className="font-body text-xs text-white/40 hover:text-white transition-colors">
            View Storefront →
          </Link>
          <Link href="/dashboard"
            className="font-body text-xs text-white/40 hover:text-white transition-colors">
            ← Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-body text-xs tracking-widest text-white/30 uppercase mb-1">Creator Tools</p>
            <h1 className="font-display text-4xl">Manage Storefront</h1>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl" style={{ color: '#C9A84C' }}>{myProducts.size}</p>
            <p className="font-body text-xs text-white/30 uppercase tracking-widest">Products Added</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-[#141414] rounded-xl p-1 w-fit">
          {[
            { key: 'browse', label: '🛍️ Browse All' },
            { key: 'my', label: `✨ My Picks (${myProducts.size})` },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)}
              className="font-body text-xs px-5 py-2.5 rounded-lg transition-all"
              style={{
                background: tab === key ? '#C9A84C' : 'transparent',
                color: tab === key ? '#000' : '#666',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors w-64"
          />

          {/* Brand filter */}
          <div className="flex gap-2 flex-wrap">
            {brands.map(b => (
              <button key={b} onClick={() => setFilterBrand(b)}
                className="pill font-body text-xs px-3 py-2 rounded-full border"
                style={{
                  borderColor: filterBrand === b ? '#C9A84C' : '#333',
                  color: filterBrand === b ? '#C9A84C' : '#666',
                  background: filterBrand === b ? 'rgba(201,168,76,0.08)' : 'transparent',
                }}>
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setFilterCategory(c)}
              className="pill font-body text-xs px-3 py-2 rounded-full border"
              style={{
                borderColor: filterCategory === c ? '#C9A84C' : '#222',
                color: filterCategory === c ? '#C9A84C' : '#555',
                background: filterCategory === c ? 'rgba(201,168,76,0.08)' : 'transparent',
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {displayProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-white/20 mb-2">No products found</p>
            <p className="font-body text-sm text-white/20">Try a different filter or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {displayProducts.map(product => {
              const isAdded = myProducts.has(product.id)
              const isAdding = adding === product.id
              const isRemoving = removing === product.id

              return (
                <div key={product.id}
                  className="product-card bg-[#141414] rounded-2xl overflow-hidden border border-white/5">

                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.src = 'https://via.placeholder.com/300x400/141414/333?text=No+Image' }}
                    />
                    {/* Added badge */}
                    {isAdded && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                        style={{ background: '#C9A84C', color: '#000' }}>
                        ✓
                      </div>
                    )}
                    {/* Brand badge */}
                    <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.7)', color: '#C9A84C', fontSize: '9px', fontFamily: "'DM Sans', sans-serif" }}>
                      {product.brands?.name}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="font-body text-xs font-medium text-white truncate mb-1">
                      {product.name}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-body text-xs" style={{ color: '#C9A84C' }}>
                        PKR {product.price?.toLocaleString()}
                      </p>
                      <p className="font-body text-xs text-white/30">
                        {product.brands?.commission_rate}% comm
                      </p>
                    </div>

                    {/* Add/Remove button */}
                    <button
                      onClick={() => isAdded ? removeProduct(product.id) : addProduct(product.id)}
                      disabled={isAdding || isRemoving}
                      className="w-full py-2 rounded-xl text-xs font-body font-medium transition-all disabled:opacity-50"
                      style={{
                        background: isAdded ? 'rgba(255,80,80,0.1)' : 'rgba(201,168,76,0.1)',
                        color: isAdded ? '#ff5050' : '#C9A84C',
                        border: `1px solid ${isAdded ? 'rgba(255,80,80,0.2)' : 'rgba(201,168,76,0.2)'}`,
                      }}>
                      {isAdding ? 'Adding...' : isRemoving ? 'Removing...' : isAdded ? '− Remove' : '+ Add to Shop'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}