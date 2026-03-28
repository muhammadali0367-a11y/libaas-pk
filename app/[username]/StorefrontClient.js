'use client'
import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['All', 'Pret', 'Lawn', 'Kurta', 'Winter', 'Formal']

export default function StorefrontClient({ creator, products }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredId, setHoveredId] = useState(null)

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  async function handleProductClick(slug, productUrl) {
    // Track click
    if (slug) {
      await fetch(`/api/track/${slug}`, { method: 'POST' }).catch(() => {})
    }
    window.open(productUrl, '_blank')
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .product-card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.12); }
        .product-img { transition: transform 0.5s ease; }
        .product-card:hover .product-img { transform: scale(1.04); }
        .shop-btn { opacity: 0; transform: translateY(8px); transition: all 0.25s ease; }
        .product-card:hover .shop-btn { opacity: 1; transform: translateY(0); }
        .pill-active { background: #0A0A0A; color: #FAF7F2; }
        .pill-inactive { background: transparent; color: #6B6B6B; border: 1px solid #D1C9BC; }
        .pill-inactive:hover { border-color: #0A0A0A; color: #0A0A0A; }
      `}</style>

      {/* Top banner */}
      <div style={{ background: '#0A0A0A' }} className="text-center py-2.5 px-4">
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#9B9185', letterSpacing: '0.05em' }}>
          Shop through this page to support{' '}
          <span style={{ color: '#C9A84C' }}>{creator.full_name || creator.username}</span>
          {' '}✨
        </p>
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-[#E5DDD4] backdrop-blur-md"
        style={{ background: 'rgba(250,247,242,0.92)' }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl tracking-wider" style={{ color: '#C9A84C' }}>
            LIBAAS
          </Link>
          <p className="text-xs text-[#9B9185]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            libaas.pk/{creator.username}
          </p>
          <a href="mailto:hello@thelibaas.pk"
            className="text-xs px-4 py-2 rounded-full"
            style={{ background: '#0A0A0A', color: '#FAF7F2', fontFamily: "'DM Sans', sans-serif" }}>
            Join as Creator
          </a>
        </div>
      </nav>

      {/* CREATOR PROFILE */}
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-10 text-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-white shadow-lg">
          {creator.avatar_url
            ? <img src={creator.avatar_url} alt={creator.full_name} className="w-full h-full object-cover" />
            : (
              <div className="w-full h-full flex items-center justify-center text-3xl"
                style={{ background: '#E5DDD4' }}>
                👤
              </div>
            )
          }
        </div>

        {/* Name */}
        <h1 className="font-display text-4xl mb-1" style={{ color: '#0A0A0A' }}>
          {creator.full_name || creator.username}
        </h1>

        {creator.instagram && (
          <a href={`https://instagram.com/${creator.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm mb-4 inline-block hover:opacity-70 transition-opacity"
            style={{ color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}>
            @{creator.instagram}
          </a>
        )}

        {creator.bio && (
          <p className="text-sm max-w-md mx-auto leading-relaxed mb-6 mt-2"
            style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>
            {creator.bio}
          </p>
        )}

        {/* Stats */}
        <div className="flex justify-center gap-10 mb-8">
          {[
            { number: products.length, label: 'Picks' },
            { number: [...new Set(products.map(p => p.brands?.name))].length, label: 'Brands' },
          ].map(({ number, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-2xl" style={{ color: '#0A0A0A' }}>{number}</p>
              <p className="text-xs tracking-widest uppercase"
                style={{ color: '#9B9185', fontFamily: "'DM Sans', sans-serif" }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.filter(c =>
            c === 'All' || products.some(p => p.category === c)
          ).map(col => (
            <button
              key={col}
              onClick={() => setActiveCategory(col)}
              className={`text-xs px-5 py-2 rounded-full transition-all ${activeCategory === col ? 'pill-active' : 'pill-inactive'}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {col}
              {col !== 'All' && (
                <span className="ml-1 opacity-50">
                  ({products.filter(p => p.category === col).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-[#E5DDD4]" />
          <p className="text-xs tracking-[0.2em] uppercase"
            style={{ color: '#9B9185', fontFamily: "'DM Sans', sans-serif" }}>
            {filtered.length} picks
          </p>
          <div className="flex-1 h-px bg-[#E5DDD4]" />
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl mb-2" style={{ color: '#9B9185' }}>
              No picks yet
            </p>
            <p className="text-sm" style={{ color: '#9B9185', fontFamily: "'DM Sans', sans-serif" }}>
              Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => (
              <div
                key={product.id}
                className="product-card bg-white rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleProductClick(product.affiliate_slug, product.product_url)}>

                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F0EB]">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="product-img w-full h-full object-cover"
                    onError={e => { e.target.src = 'https://via.placeholder.com/300x400/F5F0EB/9B9185?text=No+Image' }}
                  />
                  {/* Brand badge */}
                  <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.9)', color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif", fontSize: '10px' }}>
                    {product.brands?.name}
                  </span>
                  {/* Shop button */}
                  <div className="shop-btn absolute bottom-3 left-3 right-3 text-center text-xs py-2.5 rounded-xl font-medium"
                    style={{ background: '#0A0A0A', color: '#FAF7F2', fontFamily: "'DM Sans', sans-serif" }}>
                    Shop Now →
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-medium truncate mb-1"
                    style={{ color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif" }}>
                    {product.name}
                  </p>
                  <p className="text-xs" style={{ color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}>
                    PKR {product.price?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM CTA */}
      <div className="border-t border-[#E5DDD4] py-16 text-center" style={{ background: '#0A0A0A' }}>
        <p className="font-display text-3xl text-white mb-2">Want a storefront like this?</p>
        <p className="text-sm mb-8" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>
          Join Libaas and start earning from your fashion picks.
        </p>
        <a href="mailto:hello@thelibaas.pk"
          className="inline-block text-sm px-8 py-4 rounded-full font-medium"
          style={{ background: '#C9A84C', color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif" }}>
          Get Early Access
        </a>
      </div>
    </main>
  )
}