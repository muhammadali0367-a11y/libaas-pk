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
  .input-field { width: 100%; background: #fff; border: 1px solid #E8E8E8; border-radius: 10px; padding: 12px 16px; font-size: 14px; color: #1A1A1A; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.2s; }
  .input-field:focus { border-color: #1A1A1A; box-shadow: 0 0 0 3px rgba(26,26,26,0.06); }
  .input-field::placeholder { color: #C4C4C4; }
  .label { font-size: 12px; font-weight: 500; color: #6B6B6B; display: block; margin-bottom: 6px; }
  .btn-primary { background: #1A1A1A; color: #fff; border: none; border-radius: 100px; padding: 10px 22px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; transition: opacity 0.2s; text-decoration: none; display: inline-block; }
  .btn-primary:hover { opacity: 0.82; }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-secondary { background: #fff; color: #1A1A1A; border: 1.5px solid #E8E8E8; border-radius: 100px; padding: 9px 22px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
  .btn-secondary:hover { border-color: #1A1A1A; }
  .product-row { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; padding: 16px 20px; display: flex; align-items: center; gap: 16px; transition: all 0.2s; }
  .product-row:hover { border-color: #E0E0E0; }
  .badge-active { background: rgba(22,163,74,0.1); color: #16a34a; border-radius: 100px; padding: 5px 12px; font-size: 12px; font-weight: 500; border: none; cursor: pointer; font-family: 'Inter', sans-serif; }
  .badge-inactive { background: #F5F5F5; color: #9B9B9B; border-radius: 100px; padding: 5px 12px; font-size: 12px; font-weight: 500; border: none; cursor: pointer; font-family: 'Inter', sans-serif; }
  .form-card { background: #fff; border: 1px solid #E8E8E8; border-radius: 16px; padding: 28px; margin-bottom: 20px; }
  .select-field { width: 100%; background: #fff; border: 1px solid #E8E8E8; border-radius: 10px; padding: 12px 16px; font-size: 14px; color: #1A1A1A; font-family: 'Inter', sans-serif; outline: none; }
  .select-field:focus { border-color: #1A1A1A; }
`

const CATEGORIES = ['Pret', 'Lawn', 'Kurta', 'Winter', 'Formal']

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

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }
      const { data: brandData } = await supabase.from('brands').select('*').eq('user_id', user.id).single()
      if (!brandData) { router.push('/auth'); return }
      setBrand(brandData)
      const { data: productsData } = await supabase.from('products').select('*').eq('brand_id', brandData.id).order('created_at', { ascending: false })
      setProducts(productsData || [])
      setLoading(false)
    }
    load()
  }, [])

  async function handleAddProduct(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const { data, error: insertError } = await supabase.from('products').insert({ brand_id: brand.id, name: form.name, price: parseFloat(form.price), image_url: form.image_url, product_url: form.product_url, category: form.category, is_active: true }).select().single()
    if (insertError) { setError(insertError.message) } else { setProducts(prev => [data, ...prev]); setForm({ name: '', price: '', image_url: '', product_url: '', category: 'Pret' }); setShowAdd(false) }
    setSaving(false)
  }

  async function toggleProduct(productId, currentStatus) {
    await supabase.from('products').update({ is_active: !currentStatus }).eq('id', productId)
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, is_active: !currentStatus } : p))
  }

  function downloadTemplate() {
    const headers = ['name', 'price', 'image_url', 'product_url', 'category']
    const example = ['Embroidered Lawn Suit', '3500', 'https://yourbrand.pk/images/product1.jpg', 'https://yourbrand.pk/products/embroidered-lawn-suit', 'Lawn']
    const csv = [headers.join(','), example.join(',')].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'libaas_products_template.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  async function handleCSVUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setCsvUploading(true); setCsvResult(null)
    try {
      const text = await file.text()
      const lines = text.trim().split('\n')
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
      const required = ['name', 'price', 'image_url', 'product_url', 'category']
      const missing = required.filter(r => !headers.includes(r))
      if (missing.length > 0) { setCsvResult({ error: true, message: `Missing columns: ${missing.join(', ')}` }); setCsvUploading(false); return }
      const VALID_CATEGORIES = ['Pret', 'Lawn', 'Kurta', 'Winter', 'Formal']
      const productsToInsert = []; const errors = []
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim(); if (!line) continue
        const values = line.match(/(".*?"|[^,]+)(?=,|$)/g)?.map(v => v.replace(/^"|"$/g, '').trim()) || line.split(',').map(v => v.trim())
        const row = {}; headers.forEach((h, idx) => { row[h] = values[idx] || '' })
        if (!row.name) { errors.push(`Row ${i}: missing name`); continue }
        if (!row.product_url) { errors.push(`Row ${i}: missing product_url`); continue }
        const price = parseFloat(row.price)
        if (isNaN(price) || price <= 0) { errors.push(`Row ${i}: invalid price`); continue }
        productsToInsert.push({ brand_id: brand.id, name: row.name, price: Math.round(price), image_url: row.image_url || null, product_url: row.product_url, category: VALID_CATEGORIES.includes(row.category) ? row.category : 'Pret', is_active: true })
      }
      if (productsToInsert.length === 0) { setCsvResult({ error: true, message: `No valid products found. ${errors.length > 0 ? errors[0] : 'Check your CSV format.'}` }); setCsvUploading(false); return }
      let inserted = 0
      for (let i = 0; i < productsToInsert.length; i += 100) {
        const batch = productsToInsert.slice(i, i + 100)
        const { data, error: insertError } = await supabase.from('products').insert(batch).select()
        if (insertError) { setCsvResult({ error: true, message: `Upload failed: ${insertError.message}` }); setCsvUploading(false); return }
        inserted += data.length; setProducts(prev => [...data, ...prev])
      }
      setCsvResult({ error: false, message: errors.length > 0 ? `✓ ${inserted} products uploaded. ${errors.length} rows skipped.` : `✓ All ${inserted} products uploaded successfully!` })
    } catch (err) { setCsvResult({ error: true, message: `Failed to parse CSV: ${err.message}` }) }
    setCsvUploading(false); e.target.value = ''
  }

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
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Brand Tools</p>
            <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Products</h1>
            <p style={{ fontSize: 13, color: '#9B9B9B', marginTop: 4 }}>{products.length} products listed</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => { setShowAdd(!showAdd); setShowCSV(false) }} className="btn-primary">+ Add Product</button>
            <button onClick={() => { setShowCSV(!showCSV); setShowAdd(false); setCsvResult(null) }} className="btn-secondary">↑ Bulk Upload CSV</button>
          </div>
        </div>

        {/* Add product form */}
        {showAdd && (
          <div className="form-card">
            <h2 className="display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, color: '#1A1A1A' }}>Add New Product</h2>
            <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              {[{ key: 'name', label: 'Product Name', placeholder: 'Embroidered Lawn Suit', type: 'text', full: true }, { key: 'price', label: 'Price (PKR)', placeholder: '3500', type: 'number' }, { key: 'product_url', label: 'Product URL', placeholder: 'https://yourbrand.pk/products/...', type: 'url' }, { key: 'image_url', label: 'Image URL', placeholder: 'https://...image.jpg', type: 'url' }].map(({ key, label, placeholder, type, full }) => (
                <div key={key} style={{ gridColumn: full ? '1 / -1' : 'auto' }}>
                  <label className="label">{label}</label>
                  <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} required className="input-field" />
                </div>
              ))}
              <div>
                <label className="label">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="select-field">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {error && <div style={{ gridColumn: '1 / -1' }}><p style={{ fontSize: 13, color: '#DC2626', background: '#FEF2F2', padding: '10px 14px', borderRadius: 10 }}>{error}</p></div>}
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10 }}>
                <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Adding...' : 'Add Product'}</button>
                <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* CSV Upload */}
        {showCSV && (
          <div className="form-card">
            <h2 className="display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: '#1A1A1A' }}>Bulk Upload via CSV</h2>
            <p style={{ fontSize: 13, color: '#9B9B9B', marginBottom: 20 }}>Upload multiple products at once. Download the template, fill it in, then upload.</p>
            <button onClick={downloadTemplate} className="btn-secondary" style={{ marginBottom: 20, display: 'block' }}>↓ Download CSV Template</button>
            <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '16px', marginBottom: 20 }}>
              <p style={{ fontSize: 12, color: '#9B9B9B', marginBottom: 6, fontWeight: 500 }}>Required columns:</p>
              <p style={{ fontSize: 13, color: '#1A1A1A', fontFamily: 'monospace' }}>name, price, image_url, product_url, category</p>
              <p style={{ fontSize: 12, color: '#9B9B9B', marginTop: 6 }}>Category: Pret, Lawn, Kurta, Winter, or Formal</p>
            </div>
            <input type="file" accept=".csv" onChange={handleCSVUpload} disabled={csvUploading} className="input-field" style={{ cursor: 'pointer', marginBottom: 12 }} />
            {csvUploading && <p style={{ fontSize: 13, color: '#9B9B9B' }}>Uploading products...</p>}
            {csvResult && <p style={{ fontSize: 13, padding: '10px 14px', borderRadius: 10, background: csvResult.error ? '#FEF2F2' : '#F0FDF4', color: csvResult.error ? '#DC2626' : '#16a34a' }}>{csvResult.message}</p>}
            <button type="button" onClick={() => { setShowCSV(false); setCsvResult(null) }} style={{ background: 'none', border: 'none', fontSize: 13, color: '#9B9B9B', cursor: 'pointer', marginTop: 12, fontFamily: "'Inter', sans-serif" }}>Cancel</button>
          </div>
        )}

        {/* Products list */}
        {products.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #F0F0F0', borderRadius: 16, padding: 60, textAlign: 'center' }}>
            <p className="display" style={{ fontSize: 26, color: '#C4C4C4', marginBottom: 8 }}>No products yet</p>
            <p style={{ fontSize: 14, color: '#9B9B9B', marginBottom: 24 }}>Add your first product or bulk upload via CSV</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={() => setShowAdd(true)} className="btn-primary">+ Add Product</button>
              <button onClick={() => setShowCSV(true)} className="btn-secondary">↑ Bulk Upload CSV</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {products.map(product => (
              <div key={product.id} className="product-row">
                <div style={{ width: 52, height: 60, borderRadius: 10, overflow: 'hidden', background: '#F5F5F5', flexShrink: 0 }}>
                  {product.image_url && <img src={product.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 3 }}>
                    <p style={{ fontSize: 13, color: '#B8952A', fontWeight: 500 }}>PKR {product.price?.toLocaleString()}</p>
                    <span style={{ fontSize: 12, color: '#9B9B9B' }}>{product.category}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                  <a href={product.product_url} target="_blank" style={{ fontSize: 13, color: '#9B9B9B', textDecoration: 'none' }}>View ↗</a>
                  <button onClick={() => toggleProduct(product.id, product.is_active)} className={product.is_active ? 'badge-active' : 'badge-inactive'}>
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
