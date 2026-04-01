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
  .creator-card { background: #fff; border-radius: 16px; border: 1px solid #F0F0F0; padding: 24px; text-decoration: none; color: inherit; display: block; transition: all 0.22s; }
  .creator-card:hover { border-color: #E0E0E0; box-shadow: 0 4px 20px rgba(0,0,0,0.08); transform: translateY(-2px); }
  .search-input { background: #fff; border: 1px solid #E8E8E8; border-radius: 100px; padding: 11px 20px; font-size: 14px; color: #1A1A1A; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.2s; width: 280px; }
  .search-input:focus { border-color: #1A1A1A; }
  .search-input::placeholder { color: #C4C4C4; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; transition: color 0.2s; }
  .nav-link:hover { color: #1A1A1A; }
  .pill { border-radius: 100px; padding: 7px 18px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid #E8E8E8; background: #fff; color: #6B6B6B; transition: all 0.18s; font-family: 'Inter', sans-serif; }
  .pill:hover { border-color: #1A1A1A; color: #1A1A1A; }
  .pill-active { background: #1A1A1A !important; color: #fff !important; border-color: #1A1A1A !important; }
`

const SPECIALTIES = ['All', 'Formal', 'Lawn', 'Casual', 'Luxury', 'Winter', 'Party']

export default function ShoppersDashboard() {
  const [user, setUser] = useState(null)
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }
      setUser(user)

      // Fetch all active creators with their storefront product count
      const { data: creatorsData } = await supabase
        .from('creators')
        .select('id, username, full_name, bio, avatar_url, instagram')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (creatorsData && creatorsData.length > 0) {
        // Get product counts per creator from storefronts
        const { data: storefrontCounts } = await supabase
          .from('storefronts')
          .select('creator_id')

        const countMap = {}
        storefrontCounts?.forEach(s => {
          countMap[s.creator_id] = (countMap[s.creator_id] || 0) + 1
        })

        setCreators(creatorsData.map(c => ({
          ...c,
          picks: countMap[c.id] || 0,
        })).filter(c => c.picks > 0)) // only show creators with products
      }

      setLoading(false)
    }
    load()
  }, [])

  const filtered = creators.filter(c => {
    const matchSearch = !search ||
      c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.username?.toLowerCase().includes(search.toLowerCase()) ||
      c.bio?.toLowerCase().includes(search.toLowerCase())
    return matchSearch
  })

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#9B9B9B' }}>Loading...</p>
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Inter', sans-serif" }}>
      <style>{S}</style>

      {/* NAV */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/shoppers/dashboard" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            Log Out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 10 }}>Discover</p>
          <h1 className="display" style={{ fontSize: 48, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Browse Storefronts
          </h1>
          <p style={{ fontSize: 15, color: '#6B6B6B', fontWeight: 300 }}>
            Shop curated picks from Pakistan's best fashion creators.
          </p>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search creators..."
            className="search-input"
          />
          <p style={{ fontSize: 13, color: '#9B9B9B' }}>
            {filtered.length} creator{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Creator grid */}
        {filtered.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #F0F0F0', borderRadius: 16, padding: '60px 24px', textAlign: 'center' }}>
            <p className="display" style={{ fontSize: 28, color: '#C4C4C4', marginBottom: 8 }}>
              {search ? 'No creators found' : 'No storefronts yet'}
            </p>
            <p style={{ fontSize: 14, color: '#9B9B9B' }}>
              {search ? 'Try a different search term' : 'Check back soon — creators are setting up their shops!'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filtered.map(creator => (
              <Link key={creator.id} href={`/${creator.username}`} className="creator-card">

                {/* Avatar + name row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', background: '#F5F5F5', border: '2px solid #F0F0F0', flexShrink: 0 }}>
                    {creator.avatar_url
                      ? <img src={creator.avatar_url} alt={creator.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👤</div>
                    }
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p className="display" style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {creator.full_name || creator.username}
                    </p>
                    {creator.instagram && (
                      <p style={{ fontSize: 12, color: '#B8952A', fontWeight: 500 }}>@{creator.instagram}</p>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {creator.bio && (
                  <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {creator.bio}
                  </p>
                )}

                {/* Footer row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: creator.bio ? 0 : 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{creator.picks}</span>
                    <span style={{ fontSize: 12, color: '#9B9B9B' }}>picks</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>Shop Now →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
