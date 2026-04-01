'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { AdminLayout } from '../page'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .row { background: #fff; border-radius: 12px; border: 1px solid #F0F0F0; padding: 16px 20px; display: flex; align-items: center; gap: 16px; transition: all 0.2s; }
  .row:hover { border-color: #E0E0E0; }
  .badge-active { background: rgba(22,163,74,0.1); color: #16a34a; border-radius: 100px; padding: 4px 12px; font-size: 11px; font-weight: 500; }
  .badge-inactive { background: #F5F5F5; color: #9B9B9B; border-radius: 100px; padding: 4px 12px; font-size: 11px; font-weight: 500; }
  .btn-sm { border-radius: 100px; padding: 6px 14px; font-size: 12px; font-weight: 500; cursor: pointer; border: none; font-family: 'Inter', sans-serif; transition: all 0.2s; }
  .search-input { background: #fff; border: 1px solid #E8E8E8; border-radius: 100px; padding: 10px 18px; font-size: 13px; color: #1A1A1A; font-family: 'Inter', sans-serif; outline: none; width: 260px; }
  .search-input:focus { border-color: #1A1A1A; }
  .search-input::placeholder { color: #C4C4C4; }
`

export default function AdminCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [toggling, setToggling] = useState(null)

  useEffect(() => {
    async function load() {
      const { data: creatorsData } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: false })

      if (creatorsData?.length > 0) {
        // Get clicks per creator
        const { data: links } = await supabase
          .from('affiliate_links')
          .select('creator_id, clicks')

        // Get storefront counts
        const { data: storefronts } = await supabase
          .from('storefronts')
          .select('creator_id')

        // Get confirmed earnings per creator
        const { data: orders } = await supabase
          .from('orders')
          .select('creator_id, commission_amount, status')
          .eq('status', 'confirmed')

        const clickMap = {}
        links?.forEach(l => { clickMap[l.creator_id] = (clickMap[l.creator_id] || 0) + (l.clicks || 0) })

        const pickMap = {}
        storefronts?.forEach(s => { pickMap[s.creator_id] = (pickMap[s.creator_id] || 0) + 1 })

        const earningsMap = {}
        orders?.forEach(o => { earningsMap[o.creator_id] = (earningsMap[o.creator_id] || 0) + (o.commission_amount || 0) })

        setCreators(creatorsData.map(c => ({
          ...c,
          clicks: clickMap[c.id] || 0,
          picks: pickMap[c.id] || 0,
          earnings: earningsMap[c.id] || 0,
        })))
      }
      setLoading(false)
    }
    load()
  }, [])

  async function toggleCreator(id, current) {
    setToggling(id)
    await supabase.from('creators').update({ is_active: !current }).eq('id', id)
    setCreators(prev => prev.map(c => c.id === id ? { ...c, is_active: !current } : c))
    setToggling(null)
  }

  const filtered = creators.filter(c =>
    !search ||
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.username?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout active="/admin/creators">
      <style>{S}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Platform</p>
          <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Creators</h1>
          <p style={{ fontSize: 13, color: '#9B9B9B', marginTop: 4 }}>{creators.length} total · {creators.filter(c => c.is_active).length} active</p>
        </div>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search creators..." className="search-input" />
      </div>

      {loading ? (
        <p style={{ fontSize: 14, color: '#9B9B9B' }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #F0F0F0', padding: '48px 24px', textAlign: 'center' }}>
          <p className="display" style={{ fontSize: 24, color: '#C4C4C4' }}>No creators found</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(creator => (
            <div key={creator.id} className="row">
              {/* Avatar */}
              <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', background: '#F5F5F5', flexShrink: 0 }}>
                {creator.avatar_url
                  ? <img src={creator.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>
                }
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 2 }}>{creator.full_name || creator.username}</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 12, color: '#9B9B9B' }}>libaas.pk/{creator.username}</span>
                  {creator.instagram && <span style={{ fontSize: 12, color: '#B8952A' }}>@{creator.instagram}</span>}
                  {creator.jazzcash_number && <span style={{ fontSize: 12, color: '#6B6B6B' }}>JC: {creator.jazzcash_number}</span>}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
                {[
                  { label: 'Picks', value: creator.picks },
                  { label: 'Clicks', value: creator.clicks },
                  { label: 'Earned', value: `PKR ${creator.earnings.toLocaleString()}` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <p className="display" style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>{value}</p>
                    <p style={{ fontSize: 10, color: '#9B9B9B', fontWeight: 500 }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Status + Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span className={creator.is_active ? 'badge-active' : 'badge-inactive'}>
                  {creator.is_active ? '● Active' : '○ Inactive'}
                </span>
                <a href={`/${creator.username}`} target="_blank"
                  style={{ fontSize: 12, color: '#9B9B9B', textDecoration: 'none' }}>View ↗</a>
                <button
                  onClick={() => toggleCreator(creator.id, creator.is_active)}
                  disabled={toggling === creator.id}
                  className="btn-sm"
                  style={{
                    background: creator.is_active ? '#FEF2F2' : '#F0FDF4',
                    color: creator.is_active ? '#DC2626' : '#16a34a',
                    opacity: toggling === creator.id ? 0.5 : 1
                  }}>
                  {toggling === creator.id ? '...' : creator.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
