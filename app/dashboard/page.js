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
  .stat-card { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; padding: 24px; }
  .action-card { background: #fff; border-radius: 14px; border: 1px solid #F0F0F0; padding: 24px; text-decoration: none; color: inherit; display: block; transition: all 0.2s; }
  .action-card:hover { border-color: #E0E0E0; box-shadow: 0 2px 12px rgba(0,0,0,0.06); transform: translateY(-1px); }
  .action-icon { width: 40px; height: 40px; background: #F5F5F5; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 14px; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; transition: color 0.2s; }
  .nav-link:hover { color: #1A1A1A; }
`

export default function Dashboard() {
  const [creator, setCreator] = useState(null)
  const [stats, setStats] = useState({ clicks: 0, orders: 0, earnings: 0 })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }
      const { data: creatorData } = await supabase.from('creators').select('*').eq('user_id', user.id).single()
      if (!creatorData) { router.push('/auth'); return }
      setCreator(creatorData)
      const { data: links } = await supabase.from('affiliate_links').select('clicks').eq('creator_id', creatorData.id)
      const { data: orders } = await supabase.from('orders').select('commission_amount, status').eq('creator_id', creatorData.id).eq('status', 'confirmed')
      setStats({
        clicks: links?.reduce((s, l) => s + (l.clicks || 0), 0) || 0,
        orders: orders?.length || 0,
        earnings: orders?.reduce((s, o) => s + (o.commission_amount || 0), 0) || 0,
      })
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#9B9B9B' }}>Loading...</p>
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Inter', sans-serif" }}>
      <style>{S}</style>

      {/* NAV */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo links to dashboard when logged in */}
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 20, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Link href={`/${creator.username}`} className="nav-link" target="_blank">View My Storefront ↗</Link>
            <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
              className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Log Out</button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Welcome back</p>
          <h1 className="display" style={{ fontSize: 40, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, letterSpacing: '-0.01em' }}>
            {creator.full_name || creator.username}
          </h1>
          <p style={{ fontSize: 13, color: '#9B9B9B' }}>libaas.pk/{creator.username}</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Clicks', value: stats.clicks },
            { label: 'Confirmed Orders', value: stats.orders },
            { label: 'PKR Earned', value: `PKR ${stats.earnings.toLocaleString()}` },
          ].map(({ label, value }) => (
            <div key={label} className="stat-card">
              <p className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, letterSpacing: '-0.01em' }}>{value}</p>
              <p style={{ fontSize: 11, color: '#9B9B9B', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { href: '/dashboard/storefront', icon: '🛍️', title: 'Manage Storefront', desc: 'Add or remove products from your page' },
            { href: '/dashboard/earnings', icon: '📊', title: 'Earnings & Payouts', desc: 'View your commission history' },
            { href: '/dashboard/profile', icon: '👤', title: 'Edit Profile', desc: 'Update bio, avatar, JazzCash number' },
            { href: `/${creator.username}`, icon: '🔗', title: 'My Storefront', desc: 'See how your page looks to followers', target: '_blank' },
          ].map(({ href, icon, title, desc, target }) => (
            <Link key={href} href={href} target={target} className="action-card">
              <div className="action-icon">{icon}</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>{title}</p>
              <p style={{ fontSize: 13, color: '#9B9B9B' }}>{desc}</p>
            </Link>
          ))}
        </div>

        {/* Profile completion */}
        {(!creator.bio || !creator.jazzcash_number) && (
          <div style={{ background: '#FBF8F1', border: '1px solid #E8D5A0', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#92700A', marginBottom: 4 }}>Complete your profile</p>
              <p style={{ fontSize: 13, color: '#B8952A' }}>Add your bio and JazzCash number to start receiving payouts</p>
            </div>
            <Link href="/dashboard/profile" style={{ background: '#B8952A', color: '#fff', borderRadius: 100, padding: '9px 20px', fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap', marginLeft: 20 }}>
              Complete Now
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
