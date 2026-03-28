'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function BrandProducts() {
  const [brand, setBrand] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', price: '', image_url: '', product_url: '', category: 'Pret' })
  const [error, setError] = useState('')
  const router = useRouter()

  const CATEGORIES = ['Pret', 'Lawn', 'Kurta', 'Winter', 'Formal']

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

      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('brand_id', brandData.id)
        .order('created_at', { ascending: false })

      setProducts(productsData || [])
      setLoading(false)
    }
    load()
  }, [])

  async function handleAddProduct(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const { data, error: insertError } = await supabase
      .from('products')
      .insert({
        brand_id: brand.id,
        name: form.name,
        price: parseFloat(form.price),
        image_url: form.image_url,
        product_url: form.product_url,
        category: form.category,
        is_active: true,
      })
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
    } else {
      setProducts(prev => [data, ...prev])
      setForm({ name: '', price: '', image_url: '', product_url: '', category: 'Pret' })
      setShowAdd(false)
    }
    setSaving(false)
  }

  async function toggleProduct(productId, currentStatus) {
    await supabase
      .from('products')
      .update({ is_active: !currentStatus })
      .eq('id', productId)

    setProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, is_active: !currentStatus } : p
    ))
  }

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
            <h1 className="font-display text-4xl">Products</h1>
            <p className="font-body text-sm text-white/30 mt-1">{products.length} products listed</p>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="font-body text-sm px-5 py-2.5 rounded-full transition-all"
            style={{ background: '#C9A84C', color: '#000' }}>
            + Add Product
          </button>
        </div>

        {/* Add product form */}
        {showAdd && (
          <div className="bg-[#141414] border border-[#C9A84C]/20 rounded-2xl p-6 mb-6">
            <h2 className="font-display text-2xl mb-5">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-4">
              {[
                { key: 'name', label: 'Product Name', placeholder: 'Embroidered Lawn Suit', type: 'text', full: true },
                { key: 'price', label: 'Price (PKR)', placeholder: '3500', type: 'number' },
                { key: 'product_url', label: 'Product URL', placeholder: 'https://yourbrand.pk/products/...', type: 'url' },
                { key: 'image_url', label: 'Image URL', placeholder: 'https://...image.jpg', type: 'url' },
              ].map(({ key, label, placeholder, type, full }) => (
                <div key={key} className={full ? 'col-span-2' : ''}>
                  <label className="font-body text-xs text-white/40 block mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="font-body text-xs text-white/40 block mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {error && (
                <div className="col-span-2">
                  <p className="font-body text-xs text-red-400 bg-red-400/10 rounded-xl px-4 py-3">{error}</p>
                </div>
              )}

              <div className="col-span-2 flex gap-3">
                <button type="submit" disabled={saving}
                  className="font-body text-sm px-6 py-3 rounded-xl font-medium disabled:opacity-50"
                  style={{ background: '#C9A84C', color: '#000' }}>
                  {saving ? 'Adding...' : 'Add Product'}
                </button>
                <button type="button" onClick={() => setShowAdd(false)}
                  className="font-body text-sm px-6 py-3 rounded-xl border border-white/10 text-white/40 hover:text-white transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products list */}
        {products.length === 0 ? (
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-16 text-center">
            <p className="font-display text-3xl text-white/20 mb-2">No products yet</p>
            <p className="font-body text-sm text-white/20 mb-6">Add your first product to get started</p>
            <button onClick={() => setShowAdd(true)}
              className="font-body text-sm px-6 py-3 rounded-full"
              style={{ background: '#C9A84C', color: '#000' }}>
              + Add First Product
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map(product => (
              <div key={product.id}
                className="bg-[#141414] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-14 h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                  {product.image_url && (
                    <img src={product.image_url} alt="" className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none' }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-white truncate">{product.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="font-body text-xs" style={{ color: '#C9A84C' }}>
                      PKR {product.price?.toLocaleString()}
                    </p>
                    <span className="font-body text-xs text-white/30">{product.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <a href={product.product_url} target="_blank"
                    className="font-body text-xs text-white/30 hover:text-white transition-colors">
                    View ↗
                  </a>
                  <button
                    onClick={() => toggleProduct(product.id, product.is_active)}
                    className="font-body text-xs px-3 py-1.5 rounded-full transition-all"
                    style={{
                      background: product.is_active ? 'rgba(76,175,130,0.1)' : 'rgba(255,255,255,0.05)',
                      color: product.is_active ? '#4CAF82' : '#666',
                      border: `1px solid ${product.is_active ? 'rgba(76,175,130,0.2)' : 'rgba(255,255,255,0.1)'}`,
                    }}>
                    {product.is_active ? '● Active' : '○ Inactive'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}