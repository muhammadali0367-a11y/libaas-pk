'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { AdminLayout } from '../page'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .row { background: #fff; border-radius: 12px; border: 1px solid #F0F0F0; padding: 20px; transition: all 0.2s; }
  .row:hover { border-color: #E0E0E0; }
  .badge-active { background: rgba(22,163,74,0.1); color: #16a34a; border-radius: 100px; padding: 4px 12px; font-size: 11px; font-weight: 500; }
  .badge-inactive { background: #F5F5F5; color: #9B9B9B; border-radius: 100px; padding: 4px 12px; font-size: 11px; font-weight: 500; }
  .btn-sm { border-radius: 100px; padding: 6px 14px; font-size: 12px; font-weight: 500; cursor: pointer; border: none; font-family: 'Inter', sans-serif; transition: all 0.2s; }
  .input-sm { background: #fff; border: 1px solid #E8E8E8; border-radius: 8px; padding: 7px 12px; font-size: 13px; color: #1A1A1A; font-family: 'Inter', sans-serif; outline: none; width: 80px; text-align: center; }
  .input-sm:focus { border-color: #1A1A1A; }
`

export default function AdminBrands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState(null)
  const [editingRate, setEditingRate] = useState({})
  const [savingRate, setSavingRate] = useState(null)

  useEffect(() => {
    async function load() {
      const { data: brandsData } = await supabase
        .from('brands')
        .select('*')
        .order('created_at', { ascending: false })

      if (brandsData?.length > 0) {
        const { data: products } = await supabase.from('products').select('brand_id, is_active')
        const { data: orders } = await supabase.from('orders').select('brand_id, order_amount, status')
        const { data: links } = await supabase.from('affiliate_links').select('product_id, clicks, creator_id')
        const { data: allProducts } = await supabase.from('products').select('id, brand_id')

        const productMap = {}
        products?.forEach(p => {
          if (!productMap[p.brand_id]) productMap[p.brand_id] = { total: 0, active: 0 }
          productMap[p.brand_id].total++
          if (p.is_active) productMap[p.brand_id].active++
        })

        const productIdToBrand = {}
        allProducts?.forEach(p => { productIdToBrand[p.id] = p.brand_id })

        const clickMap = {}
        const creatorMap = {}
        links?.forEach(l => {
          const brandId = productIdToBrand[l.product_id]
          if (brandId) {
            clickMap[brandId] = (clickMap[brandId] || 0) + (l.clicks || 0)
            if (!creatorMap[brandId]) creatorMap[brandId] = new Set()
            creatorMap[brandId].add(l.creator_id)
          }
        })

        const orderMap = {}
        orders?.forEach(o => {
          if (!orderMap[o.brand_id]) orderMap[o.brand_id] = { total: 0, gmv: 0 }
          orderMap[o.brand_id].total++
          if (o.status === 'confirmed') orderMap[o.brand_id].gmv += o.order_amount || 0
        })

        setBrands(brandsData.map(b => ({
          ...b,
          products: productMap[b.id] || { total: 0, active: 0 },
          clicks: clickMap[b.id] || 0,
          creators: creatorMap[b.id]?.size || 0,
          orders: orderMap[b.id]?.total || 0,
          gmv: orderMap[b.id]?.gmv || 0,
        })))
      }
      setLoading(false)
    }
    load()
  }, [])

  async function toggleBrand(id, current) {
    setToggling(id)
    await supabase.from('brands').update({ is_active: !current }).eq('id', id)
    setBrands(prev => prev.map(b => b.id === id ? { ...b, is_active: !current } : b))
    setToggling(null)
  }

  async function saveCommissionRate(id) {
    const rate = editingRate[id]
    if (!rate || isNaN(rate)) return
    setSavingRate(id)
    await supabase.from('brands').update({ commission_rate: parseFloat(rate) }).eq('id', id)
    setBrands(prev => prev.map(b => b.id === id ? { ...b, commission_rate: parseFloat(rate) } : b))
    setEditingRate(prev => { const next = { ...prev }; delete next[id]; return next })
    setSavingRate(null)
  }

  return (
    <AdminLayout active="/admin/brands">
      <style>{S}</style>

      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Platform</p>
        <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Brands</h1>
        <p style={{ fontSize: 13, color: '#9B9B9B', marginTop: 4 }}>{brands.length} total · {brands.filter(b => b.is_active).length} active</p>
      </div>

      {loading ? (
        <p style={{ fontSize: 14, color: '#9B9B9B' }}>Loading...</p>
      ) : brands.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #F0F0F0', padding: '48px 24px', textAlign: 'center' }}>
          <p className="display" style={{ fontSize: 24, color: '#C4C4C4' }}>No brands yet</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {brands.map(brand => (
            <div key={brand.id} className="row">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏷️</div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{brand.name}</p>
                    <p style={{ fontSize: 12, color: '#9B9B9B' }}>/{brand.slug}</p>
                  </div>
                  <span className={brand.is_active ? 'badge-active' : 'badge-inactive'}>
                    {brand.is_active ? '● Active' : '○ Inactive'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => toggleBrand(brand.id, brand.is_active)}
                    disabled={toggling === brand.id}
                    className="btn-sm"
                    style={{ background: brand.is_active ? '#FEF2F2' : '#F0FDF4', color: brand.is_active ? '#DC2626' : '#16a34a', opacity: toggling === brand.id ? 0.5 : 1 }}>
                    {toggling === brand.id ? '...' : brand.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 14 }}>
                {[
                  { label: 'Products', value: `${brand.products.active} / ${brand.products.total}` },
                  { label: 'Creators', value: brand.creators },
                  { label: 'Clicks', value: brand.clicks },
                  { label: 'Orders', value: brand.orders },
                  { label: 'Confirmed GMV', value: `PKR ${brand.gmv.toLocaleString()}` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: '#FAFAFA', borderRadius: 10, padding: '12px 16px' }}>
                    <p className="display" style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{value}</p>
                    <p style={{ fontSize: 11, color: '#9B9B9B', fontWeight: 500 }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Commission rate editor */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <p style={{ fontSize: 12, color: '#6B6B6B', fontWeight: 500 }}>Commission Rate:</p>
                <input
                  type="number"
                  value={editingRate[brand.id] ?? brand.commission_rate}
                  onChange={e => setEditingRate(prev => ({ ...prev, [brand.id]: e.target.value }))}
                  className="input-sm"
                  min="1" max="30" step="0.5"
                />
                <p style={{ fontSize: 12, color: '#9B9B9B' }}>%</p>
                {editingRate[brand.id] !== undefined && editingRate[brand.id] !== String(brand.commission_rate) && (
                  <button
                    onClick={() => saveCommissionRate(brand.id)}
                    disabled={savingRate === brand.id}
                    className="btn-sm"
                    style={{ background: '#1A1A1A', color: '#fff', opacity: savingRate === brand.id ? 0.5 : 1 }}>
                    {savingRate === brand.id ? 'Saving...' : 'Save Rate'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
