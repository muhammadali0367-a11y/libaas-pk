'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { AdminLayout } from '../page'

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .card { background: #fff; border-radius: 12px; border: 1px solid #F0F0F0; padding: 20px; }
  .row { padding: 16px 20px; border-bottom: 1px solid #F0F0F0; display: flex; align-items: center; gap: 16px; }
  .row:last-child { border-bottom: none; }
  .badge { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 500; }
  .badge-green { background: rgba(22,163,74,0.1); color: #16a34a; }
  .badge-amber { background: rgba(184,149,42,0.12); color: #92700A; }
  .btn-pay { background: #1A1A1A; color: #fff; border: none; border-radius: 100px; padding: 8px 18px; font-size: 12px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; transition: opacity 0.2s; }
  .btn-pay:hover { opacity: 0.82; }
  .btn-pay:disabled { opacity: 0.4; cursor: not-allowed; }
`

export default function AdminPayouts() {
  const [unpaid, setUnpaid] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(null)

  useEffect(() => {
    async function load() {
      // Get all creators with confirmed earnings not yet paid
      const { data: creators } = await supabase
        .from('creators')
        .select('id, full_name, username, avatar_url, jazzcash_number')
        .eq('is_active', true)

      if (creators?.length > 0) {
        const { data: orders } = await supabase
          .from('orders')
          .select('creator_id, commission_amount, status')
          .eq('status', 'confirmed')

        const { data: payouts } = await supabase
          .from('payouts')
          .select('creator_id, amount, status')
          .eq('status', 'paid')

        const earningsMap = {}
        orders?.forEach(o => {
          earningsMap[o.creator_id] = (earningsMap[o.creator_id] || 0) + (o.commission_amount || 0)
        })

        const paidMap = {}
        payouts?.forEach(p => {
          paidMap[p.creator_id] = (paidMap[p.creator_id] || 0) + (p.amount || 0)
        })

        const unpaidCreators = creators
          .map(c => ({
            ...c,
            totalEarned: earningsMap[c.id] || 0,
            totalPaid: paidMap[c.id] || 0,
            outstanding: (earningsMap[c.id] || 0) - (paidMap[c.id] || 0)
          }))
          .filter(c => c.outstanding > 0)
          .sort((a, b) => b.outstanding - a.outstanding)

        setUnpaid(unpaidCreators)
      }

      // Payout history
      const { data: payoutHistory } = await supabase
        .from('payouts')
        .select('*, creators(full_name, username)')
        .order('created_at', { ascending: false })
        .limit(20)

      setHistory(payoutHistory || [])
      setLoading(false)
    }
    load()
  }, [])

  async function markAsPaid(creator) {
    setPaying(creator.id)
    const { error } = await supabase.from('payouts').insert({
      creator_id: creator.id,
      amount: creator.outstanding,
      method: creator.jazzcash_number ? 'JazzCash' : 'Bank Transfer',
      status: 'paid',
      paid_at: new Date().toISOString()
    })
    if (!error) {
      setUnpaid(prev => prev.filter(c => c.id !== creator.id))
      // Refresh history
      const { data: payoutHistory } = await supabase
        .from('payouts')
        .select('*, creators(full_name, username)')
        .order('created_at', { ascending: false })
        .limit(20)
      setHistory(payoutHistory || [])
    }
    setPaying(null)
  }

  const totalOutstanding = unpaid.reduce((s, c) => s + c.outstanding, 0)

  return (
    <AdminLayout active="/admin/payouts">
      <style>{S}</style>

      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Platform</p>
        <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Payouts</h1>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Creators Owed', value: unpaid.length },
          { label: 'Total Outstanding', value: `PKR ${totalOutstanding.toLocaleString()}`, gold: true },
          { label: 'Total Paid Out', value: `PKR ${history.filter(h => h.status === 'paid').reduce((s, h) => s + (h.amount || 0), 0).toLocaleString()}` },
        ].map(({ label, value, gold }) => (
          <div key={label} className="card">
            <p className="display" style={{ fontSize: 32, fontWeight: 700, color: gold ? '#B8952A' : '#1A1A1A', marginBottom: 6, letterSpacing: '-0.01em' }}>{value}</p>
            <p style={{ fontSize: 11, color: '#9B9B9B', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Unpaid creators */}
      <div style={{ marginBottom: 32 }}>
        <h2 className="display" style={{ fontSize: 24, fontWeight: 600, color: '#1A1A1A', marginBottom: 16 }}>Outstanding Payouts</h2>
        {loading ? (
          <p style={{ fontSize: 14, color: '#9B9B9B' }}>Loading...</p>
        ) : unpaid.length === 0 ? (
          <div className="card" style={{ padding: '36px 24px', textAlign: 'center' }}>
            <p className="display" style={{ fontSize: 22, color: '#C4C4C4', marginBottom: 6 }}>All caught up!</p>
            <p style={{ fontSize: 13, color: '#9B9B9B' }}>No pending payouts</p>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {unpaid.map(creator => (
              <div key={creator.id} className="row">
                {/* Avatar */}
                <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: '#F5F5F5', flexShrink: 0 }}>
                  {creator.avatar_url
                    ? <img src={creator.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>👤</div>
                  }
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 2 }}>{creator.full_name || creator.username}</p>
                  <p style={{ fontSize: 12, color: '#9B9B9B' }}>
                    libaas.pk/{creator.username}
                    {creator.jazzcash_number
                      ? ` · JazzCash: ${creator.jazzcash_number}`
                      : ' · ⚠️ No JazzCash number'}
                  </p>
                </div>

                {/* Amounts */}
                <div style={{ textAlign: 'right', marginRight: 20 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#B8952A' }}>PKR {creator.outstanding.toLocaleString()}</p>
                  <p style={{ fontSize: 11, color: '#9B9B9B' }}>outstanding</p>
                </div>
                <div style={{ textAlign: 'right', marginRight: 20 }}>
                  <p style={{ fontSize: 13, color: '#6B6B6B' }}>PKR {creator.totalEarned.toLocaleString()}</p>
                  <p style={{ fontSize: 11, color: '#9B9B9B' }}>total earned</p>
                </div>

                {/* Pay button */}
                <button
                  onClick={() => markAsPaid(creator)}
                  disabled={paying === creator.id || !creator.jazzcash_number}
                  className="btn-pay"
                  title={!creator.jazzcash_number ? 'Creator has no JazzCash number' : ''}
                  style={{ opacity: (paying === creator.id || !creator.jazzcash_number) ? 0.4 : 1 }}>
                  {paying === creator.id ? 'Processing...' : 'Mark as Paid'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payout history */}
      <div>
        <h2 className="display" style={{ fontSize: 24, fontWeight: 600, color: '#1A1A1A', marginBottom: 16 }}>Payout History</h2>
        {history.length === 0 ? (
          <div className="card" style={{ padding: '32px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: '#9B9B9B' }}>No payouts recorded yet</p>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {history.map((payout, i) => (
              <div key={payout.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: i < history.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A' }}>{payout.creators?.full_name || payout.creators?.username}</p>
                  <p style={{ fontSize: 12, color: '#9B9B9B', marginTop: 2 }}>
                    via {payout.method} · {new Date(payout.created_at).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>PKR {payout.amount?.toLocaleString()}</p>
                  <span className={`badge ${payout.status === 'paid' ? 'badge-green' : 'badge-amber'}`}>{payout.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
