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
  .product-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #F0F0F0; transition: all 0.2s; }
  .product-card:hover { border-color: #E0E0E0; box-shadow: 0 2px 12px rgba(0,0,0,0.06); transform: translateY(-1px); }
  .tab { padding: 8px 20px; border-radius: 100px; border: none; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; }
  .tab-active { background: #1A1A1A; color: #fff; }
  .tab-inactive { background: transparent; color: #9B9B9B; }
  .pill { border-radius: 100px; padding: 6px 14px; font-size: 12px; font-weight: 500; cursor: pointer; border: 1px solid #E8E8E8; background: #fff; color: #6B6B6B; transition: all 0.18s; font-family: 'Inter', sans-serif; }
  .pill-active { background: #1A1A1A !important; color: #fff !important; border-color: #1A1A1A !important; }
  .pill:hover { border-color: #C4C4C4; color: #1A1A1A; }
  .search-input { background: #fff; border: 1px solid #E8E8E8; border-radius: 10px; padding: 10px 16px; font-size: 14px; color: #1A1A1A; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.2s; width: 260px; }
  .search-input:focus { border-color: #1A1A1A; }
  .search-input::placeholder { color: #C4C4C4; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; }
`

export default function StorefrontManager() {
  const [creator, setCreator] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [myProducts, setMyProducts] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterBrand, setFilterBrand] = useState('All')
  const [filterCategory, setFilterCategory] = useState('All')
  const [adding, setAdding] = useState(null)
  const [removing, setRemoving] = useState(null)
  const [tab, setTab] = useState('browse')
  const router = useRouter()

  const brands = ['All', 'Beechtree', 'Saya', 'Asim Jofa', 'Limelight', 'Alkaram', 'Ethnic', 'Zellbury', 'Bonanza', 'Baroque', 'Stylo']
  const categories = ['All', 'Pret', 'Lawn', 'Kurta', 'Winter', 'Formal']

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }
      const { data: creatorData } = await supabase.from('creators').select('*').eq('user_id', user.id).single()
      if (!creatorData) { router.push('/auth'); return }
      setCreator(creatorData)
      const { data: products } = await supabase.from('products').select('*, brands(name, commission_rate)').eq('is_active', true).order('created_at', { ascending: false })
      const { data: storefront } = await supabase.from('storefronts').select('product_id').eq('creator_id', creatorData.id)
      setAllProducts(products || [])
      setMyProducts(new Set(storefront?.map(s => s.product_id) || []))
      setLoading(false)
    }
    load()
  }, [])

  async function addProduct(productId) {
    setAdding(productId)
    const { error } = await supabase.from('storefronts').insert({ creator_id: creator.id, product_id: productId })
    if (!error) {
      const slug = `${creator.username}-${productId.slice(0, 8)}`
      await supabase.from('affiliate_links').insert({ creator_id: creator.id, product_id: productId, slug })
      setMyProducts(prev => new Set([...prev, productId]))
    }
    setAdding(null)
  }

  async function removeProduct(productId) {
    setRemoving(productId)
    await supabase.from('storefronts').delete().eq('creator_id', creator.id).eq('product_id', productId)
    await supabase.from('affiliate_links').delete().eq('creator_id', creator.id).eq('product_id', productId)
    setMyProducts(prev => { const next = new Set(prev); next.delete(productId); return next })
    setRemoving(null)
  }

  const filtered = allProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchBrand = filterBrand === 'All' || p.brands?.name === filterBrand
    const matchCat = filterCategory === 'All' || p.category === filterCategory
    return matchSearch && matchBrand && matchCat
  })
  const displayProducts = tab === 'my' ? filtered.filter(p => myProducts.has(p.id)) : filtered

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#9B9B9B' }}>Loading...</p>
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Inter', sans-serif" }}>
      <style>{S}</style>

      <nav style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 20, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link href={`/${creator.username}`} className="nav-link" target="_blank">View Storefront ↗</Link>
            <Link href="/dashboard" className="nav-link">← Dashboard</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 6 }}>Creator Tools</p>
            <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Manage Storefront</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="display" style={{ fontSize: 40, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.02em' }}>{myProducts.size}</p>
            <p style={{ fontSize: 11, color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Products Added</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#F5F5F5', padding: 4, borderRadius: 100, width: 'fit-content' }}>
          {[{ key: 'browse', label: 'Browse All' }, { key: 'my', label: `My Picks (${myProducts.size})` }].map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)} className={`tab ${tab === key ? 'tab-active' : 'tab-inactive'}`}>{label}</button>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16, alignItems: 'center' }}>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="search-input" />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {brands.map(b => (
              <button key={b} onClick={() => setFilterBrand(b)} className={`pill ${filterBrand === b ? 'pill-active' : ''}`}>{b}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilterCategory(c)} className={`pill ${filterCategory === c ? 'pill-active' : ''}`}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        {displayProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p className="display" style={{ fontSize: 28, color: '#C4C4C4', marginBottom: 8 }}>No products found</p>
            <p style={{ fontSize: 14, color: '#9B9B9B' }}>Try a different filter or search term</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {displayProducts.map(product => {
              const isAdded = myProducts.has(product.id)
              const isAdding = adding === product.id
              const isRemoving = removing === product.id
              return (
                <div key={product.id} className="product-card">
                  <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#F5F5F5' }}>
                    <img src={product.image_url} alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.src = 'https://via.placeholder.com/300x400/F5F5F5/C4C4C4?text=No+Image' }} />
                    {isAdded && (
                      <div style={{ position: 'absolute', top: 10, right: 10, width: 24, height: 24, background: '#1A1A1A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff' }}>✓</div>
                    )}
                    <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.9)', color: '#6B6B6B', borderRadius: 100, padding: '3px 8px', fontSize: 10, fontWeight: 500 }}>
                      {product.brands?.name}
                    </span>
                  </div>
                  <div style={{ padding: 12 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <p style={{ fontSize: 12, color: '#B8952A', fontWeight: 500 }}>PKR {product.price?.toLocaleString()}</p>
                      <p style={{ fontSize: 11, color: '#9B9B9B' }}>{product.brands?.commission_rate}%</p>
                    </div>
                    <button onClick={() => isAdded ? removeProduct(product.id) : addProduct(product.id)}
                      disabled={isAdding || isRemoving}
                      style={{
                        width: '100%', padding: '8px', borderRadius: 100, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: 'none',
                        background: isAdded ? '#FEF2F2' : '#F5F5F5',
                        color: isAdded ? '#DC2626' : '#1A1A1A',
                        fontFamily: "'Inter', sans-serif",
                        opacity: (isAdding || isRemoving) ? 0.5 : 1,
                        transition: 'all 0.2s',
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
