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
  const [showCSV, setShowCSV] = useState(false)
  const [saving, setSaving] = useState(false)
  const [csvUploading, setCsvUploading] = useState(false)
  const [csvResult, setCsvResult] = useState(null)
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

  function downloadTemplate() {
    const headers = ['name', 'price', 'image_url', 'product_url', 'category']
    const example = [
      'Embroidered Lawn Suit',
      '3500',
      'https://yourbrand.pk/images/product1.jpg',
      'https://yourbrand.pk/products/embroidered-lawn-suit',
      'Lawn'
    ]
    const csv = [headers.join(','), example.join(',')].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'libaas_products_template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleCSVUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    setCsvUploading(true)
    setCsvResult(null)

    try {
      const text = await file.text()
      const lines = text.trim().split('\n')
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())

      // Validate headers
      const required = ['name', 'price', 'image_url', 'product_url', 'category']
      const missing = required.filter(r => !headers.includes(r))
      if (missing.length > 0) {
        setCsvResult({ error: true, message: `Missing columns: ${missing.join(', ')}` })
        setCsvUploading(false)
        return
      }

      const VALID_CATEGORIES = ['Pret', 'Lawn', 'Kurta', 'Winter', 'Formal']
      const products = []
      const errors = []

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        // Handle commas inside quoted fields
        const values = line.match(/(".*?"|[^,]+)(?=,|$)/g)?.map(v =>
          v.replace(/^"|"$/g, '').trim()
        ) || line.split(',').map(v => v.trim())

        const row = {}
        headers.forEach((h, idx) => { row[h] = values[idx] || '' })

        // Validate row
        if (!row.name) { errors.push(`Row ${i}: missing name`); continue }
        if (!row.product_url) { errors.push(`Row ${i}: missing product_url`); continue }
        const price = parseFloat(row.price)
        if (isNaN(price) || price <= 0) { errors.push(`Row ${i}: invalid price`); continue }
        const category = VALID_CATEGORIES.includes(row.category) ? row.category : 'Pret'

        products.push({
          brand_id: brand.id,
          name: row.name,
          price: Math.round(price),
          image_url: row.image_url || null,
          product_url: row.product_url,
          category,
          is_active: true,
        })
      }

      if (products.length === 0) {
        setCsvResult({
          error: true,
          message: `No valid products found. ${errors.length > 0 ? errors[0] : 'Check your CSV format.'}`
        })
        setCsvUploading(false)
        return
      }

      // Insert in batches of 100
      let inserted = 0
      for (let i = 0; i < products.length; i += 100) {
        const batch = products.slice(i, i + 100)
        const { data, error: insertError } = await supabase
          .from('products')
          .insert(batch)
          .select()

        if (insertError) {
          setCsvResult({ error: true, message: `Upload failed: ${insertError.message}` })
          setCsvUploading(false)
          return
        }
        inserted += data.length
        setProducts(prev => [...data, ...prev])
      }

      const msg = errors.length > 0
        ? `✅ ${inserted} products uploaded. ${errors.length} rows skipped.`
        : `✅ All ${inserted} products uploaded successfully!`

      setCsvResult({ error: false, message: msg })

    } catch (err) {
      setCsvResult({ error: true, message: `Failed to parse CSV: ${err.message}` })
    }

    setCsvUploading(false)
    e.target.value = ''
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
          <div className="flex gap-3">
            <button
              onClick={() => { setShowAdd(!showAdd); setShowCSV(false) }}
              className="font-body text-sm px-5 py-2.5 rounded-full transition-all"
              style={{ background: '#C9A84C', color: '#000' }}>
              + Add Product
            </button>
            <button
              onClick={() => { setShowCSV(!showCSV); setShowAdd(false); setCsvResult(null) }}
              className="font-body text-sm px-5 py-2.5 rounded-full border border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
              ↑ Bulk Upload CSV
            </button>
          </div>
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

        {/* CSV Upload */}
        {showCSV && (
          <div className="bg-[#141414] border border-[#C9A84C]/20 rounded-2xl p-6 mb-6">
            <h2 className="font-display text-2xl mb-2">Bulk Upload via CSV</h2>
            <p className="font-body text-xs text-white/40 mb-5">
              Upload multiple products at once. Download the template, fill it in, then upload.
            </p>

            {/* Template download */}
            <button
              onClick={downloadTemplate}
              className="font-body text-xs px-4 py-2 rounded-full border border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all mb-5 block">
              ↓ Download CSV Template
            </button>

            {/* Format guide */}
            <div className="bg-black/30 rounded-xl p-4 mb-5">
              <p className="font-body text-xs text-white/40 mb-2">Required columns:</p>
              <p className="font-mono text-xs" style={{ color: '#C9A84C' }}>
                name, price, image_url, product_url, category
              </p>
              <p className="font-body text-xs text-white/30 mt-2">
                Category must be one of: Pret, Lawn, Kurta, Winter, Formal
              </p>
            </div>

            {/* File input */}
            <div className="relative">
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                disabled={csvUploading}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[#C9A84C] transition-colors disabled:opacity-50 cursor-pointer"
              />
              {csvUploading && (
                <p className="font-body text-xs text-white/40 mt-2">Uploading products...</p>
              )}
            </div>

            {/* Result */}
            {csvResult && (
              <div className={`mt-4 font-body text-xs px-4 py-3 rounded-xl ${
                csvResult.error
                  ? 'text-red-400 bg-red-400/10'
                  : 'text-green-400 bg-green-400/10'
              }`}>
                {csvResult.message}
              </div>
            )}

            <button
              type="button"
              onClick={() => { setShowCSV(false); setCsvResult(null) }}
              className="font-body text-xs text-white/30 hover:text-white transition-colors mt-4 block">
              Cancel
            </button>
          </div>
        )}

        {/* Products list */}
        {products.length === 0 ? (
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-16 text-center">
            <p className="font-display text-3xl text-white/20 mb-2">No products yet</p>
            <p className="font-body text-sm text-white/20 mb-6">Add your first product or bulk upload via CSV</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowAdd(true)}
                className="font-body text-sm px-6 py-3 rounded-full"
                style={{ background: '#C9A84C', color: '#000' }}>
                + Add Product
              </button>
              <button onClick={() => setShowCSV(true)}
                className="font-body text-sm px-6 py-3 rounded-full border border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                ↑ Bulk Upload CSV
              </button>
            </div>
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
