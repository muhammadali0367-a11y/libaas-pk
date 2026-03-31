'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

const CATEGORIES = ['All', 'Pret', 'Lawn', 'Kurta', 'Winter', 'Formal']

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  body { font-family: 'Inter', sans-serif; background: #fff; }
  .product-card { background: #fff; border-radius: 16px; overflow: hidden; cursor: pointer; transition: all 0.25s; border: 1px solid #F0F0F0; }
  .product-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); transform: translateY(-3px); border-color: #E0E0E0; }
  .product-img { transition: transform 0.4s ease; width: 100%; height: 100%; object-fit: cover; }
  .product-card:hover .product-img { transform: scale(1.04); }
  .shop-btn { opacity: 0; transform: translateY(6px); transition: all 0.22s ease; }
  .product-card:hover .shop-btn { opacity: 1; transform: translateY(0); }
  .pill { border-radius: 100px; padding: 7px 18px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid #E8E8E8; background: #fff; color: #6B6B6B; transition: all 0.18s; font-family: 'Inter', sans-serif; }
  .pill:hover { border-color: #1A1A1A; color: #1A1A1A; }
  .pill-active { background: #1A1A1A !important; color: #fff !important; border-color: #1A1A1A !important; }
  .nav-storefront { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid #F0F0F0; }
`

export default function StorefrontClient({ creator, products }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOwnStorefront, setIsOwnStorefront] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setIsLoggedIn(true)
        supabase.from('creators').select('username').eq('user_id', user.id).single()
          .then(({ data }) => {
            if (data?.username === creator.username) setIsOwnStorefront(true)
          })
      }
    })
  }, [creator.username])

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory)

  async function handleProductClick(slug, productUrl) {
    if (slug) await fetch(`/api/track/${slug}`, { method: 'POST' }).catch(() => {})
    window.open(productUrl, '_blank')
  }

  const logoLink = isLoggedIn ? (isOwnStorefront ? '/dashboard' : '/dashboard') : '/'

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: '#fff', minHeight: '100vh' }}>
      <style>{S}</style>

      {/* Support banner */}
      <div style={{ background: '#1A1A1A', textAlign: 'center', padding: '10px 16px' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif" }}>
          Shop through this page to support{' '}
          <span style={{ color: '#D4AF50', fontWeight: 500 }}>{creator.full_name || creator.username}</span> ✨
        </p>
      </div>

      {/* NAV */}
      <nav className="nav-storefront">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href={logoLink} style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 20, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <p style={{ fontSize: 12, color: '#9B9B9B', fontFamily: "'Inter', sans-serif" }}>
            libaas.pk/{creator.username}
          </p>
          {/* Only show Join as Creator if NOT logged in */}
          {!isLoggedIn && (
            <Link href="/join" style={{ background: '#1A1A1A', color: '#fff', borderRadius: 100, padding: '8px 18px', fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
              Join as Creator
            </Link>
          )}
          {isLoggedIn && !isOwnStorefront && (
            <Link href="/dashboard" style={{ fontSize: 13, color: '#6B6B6B', textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
              Dashboard
            </Link>
          )}
          {isOwnStorefront && (
            <Link href="/dashboard" style={{ background: '#F5F5F5', color: '#1A1A1A', borderRadius: 100, padding: '8px 18px', fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
              Edit Storefront
            </Link>
          )}
        </div>
      </nav>

      {/* CREATOR PROFILE */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 24px 36px', textAlign: 'center' }}>
        {/* Avatar */}
        <div style={{ width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: '3px solid #F0F0F0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          {creator.avatar_url
            ? <img src={creator.avatar_url} alt={creator.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ width: '100%', height: '100%', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>👤</div>
          }
        </div>

        <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', marginBottom: 8, letterSpacing: '-0.01em' }}>
          {creator.full_name || creator.username}
        </h1>

        {creator.instagram && (
          <a href={`https://instagram.com/${creator.instagram}`} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 14, color: '#B8952A', fontWeight: 500, textDecoration: 'none', display: 'block', marginBottom: 12 }}>
            @{creator.instagram}
          </a>
        )}

        {creator.bio && (
          <p style={{ fontSize: 14, color: '#6B6B6B', maxWidth: 440, margin: '0 auto 24px', lineHeight: 1.7, fontWeight: 300 }}>
            {creator.bio}
          </p>
        )}

        {/* Stats */}
        <div style={{ display: 'inline-flex', gap: 0, border: '1px solid #F0F0F0', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
          {[
            { number: products.length, label: 'Picks' },
            { number: [...new Set(products.map(p => p.brands?.name))].filter(Boolean).length, label: 'Brands' },
          ].map(({ number, label }, i) => (
            <div key={label} style={{ padding: '14px 32px', borderRight: i === 0 ? '1px solid #F0F0F0' : 'none', textAlign: 'center' }}>
              <p className="display" style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{number}</p>
              <p style={{ fontSize: 11, color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {CATEGORIES.filter(c => c === 'All' || products.some(p => p.category === c)).map(col => (
            <button key={col} onClick={() => setActiveCategory(col)}
              className={`pill ${activeCategory === col ? 'pill-active' : ''}`}>
              {col}
              {col !== 'All' && (
                <span style={{ marginLeft: 4, opacity: 0.5, fontSize: 11 }}>
                  ({products.filter(p => p.category === col).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ flex: 1, height: 1, background: '#F0F0F0' }} />
          <p style={{ fontSize: 11, color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>
            {filtered.length} picks
          </p>
          <div style={{ flex: 1, height: 1, background: '#F0F0F0' }} />
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p className="display" style={{ fontSize: 28, color: '#C4C4C4', marginBottom: 8 }}>No picks yet</p>
            <p style={{ fontSize: 14, color: '#9B9B9B' }}>Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
            {filtered.map(product => (
              <div key={product.id} className="product-card"
                onClick={() => handleProductClick(product.affiliate_slug, product.product_url)}>
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#F5F5F5' }}>
                  <img src={product.image_url} alt={product.name} className="product-img"
                    onError={e => { e.target.src = 'https://via.placeholder.com/300x400/F5F5F5/C4C4C4?text=No+Image' }} />
                  <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.92)', color: '#6B6B6B', borderRadius: 100, padding: '4px 10px', fontSize: 11, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                    {product.brands?.name}
                  </span>
                  <div className="shop-btn" style={{ position: 'absolute', bottom: 12, left: 12, right: 12, background: '#1A1A1A', color: '#fff', textAlign: 'center', padding: '10px', borderRadius: 100, fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                    Shop Now →
                  </div>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</p>
                  <p style={{ fontSize: 13, color: '#B8952A', fontWeight: 500 }}>PKR {product.price?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM CTA — only show if not logged in */}
      {!isLoggedIn && (
        <div style={{ background: '#FAFAFA', borderTop: '1px solid #F0F0F0', padding: '56px 24px', textAlign: 'center' }}>
          <h3 className="display" style={{ fontSize: 32, fontWeight: 600, color: '#1A1A1A', marginBottom: 10 }}>Want a storefront like this?</h3>
          <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 28, fontWeight: 300 }}>
            Join Libaas and start earning from your fashion picks.
          </p>
          <Link href="/join" style={{ background: '#1A1A1A', color: '#fff', borderRadius: 100, padding: '13px 32px', fontSize: 14, fontWeight: 500, textDecoration: 'none', display: 'inline-block', fontFamily: "'Inter', sans-serif" }}>
            Get Started Free →
          </Link>
        </div>
      )}
    </main>
  )
}
