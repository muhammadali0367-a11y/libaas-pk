'use client'
import { useEffect, useState, useRef } from 'react'
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
  .btn-primary { background: #1A1A1A; color: #fff; border: none; border-radius: 10px; padding: 13px 24px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; transition: opacity 0.2s; width: 100%; }
  .btn-primary:hover { opacity: 0.85; }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .nav-link { font-size: 13px; color: #6B6B6B; text-decoration: none; }
`

export default function EditProfile() {
  const [creator, setCreator] = useState(null)
  const [form, setForm] = useState({ full_name: '', bio: '', instagram: '', jazzcash_number: '', avatar_url: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }
      const { data } = await supabase.from('creators').select('*').eq('user_id', user.id).single()
      if (!data) { router.push('/auth'); return }
      setCreator(data)
      setForm({ full_name: data.full_name || '', bio: data.bio || '', instagram: data.instagram || '', jazzcash_number: data.jazzcash_number || '', avatar_url: data.avatar_url || '' })
      setLoading(false)
    }
    load()
  }, [])

  async function handleAvatarUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const { error: uploadError } = await supabase.storage.from('avatars').upload(`${creator.id}.${fileExt}`, file, { upsert: true })
    if (uploadError) { setError(uploadError.message); setUploading(false); return }
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(`${creator.id}.${fileExt}`)
    setForm(prev => ({ ...prev, avatar_url: publicUrl }))
    setUploading(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const { error: updateError } = await supabase.from('creators').update(form).eq('id', creator.id)
    if (updateError) { setError(updateError.message) } else { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    setSaving(false)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#9B9B9B' }}>Loading...</p>
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Inter', sans-serif" }}>
      <style>{S}</style>

      <nav style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 20, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <Link href="/dashboard" className="nav-link">← Back to Dashboard</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 8 }}>Settings</p>
          <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Edit Profile</h1>
        </div>

        {/* Avatar */}
        <div style={{ background: '#fff', border: '1px solid #F0F0F0', borderRadius: 16, padding: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', background: '#F5F5F5', border: '2px solid #F0F0F0' }}>
              {form.avatar_url
                ? <img src={form.avatar_url} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>👤</div>
              }
            </div>
            {uploading && (
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>...</div>
            )}
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 2 }}>{form.full_name || 'Your Name'}</p>
            <p style={{ fontSize: 12, color: '#9B9B9B', marginBottom: 12 }}>libaas.pk/{creator.username}</p>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarUpload} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current.click()} disabled={uploading}
              style={{ background: '#F5F5F5', border: '1px solid #E8E8E8', borderRadius: 100, padding: '7px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: "'Inter', sans-serif', color: '#1A1A1A" }}>
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #F0F0F0', borderRadius: 16, padding: 24 }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { key: 'full_name', label: 'Full Name', placeholder: 'Ayesha Malik', type: 'text' },
              { key: 'instagram', label: 'Instagram Handle', placeholder: 'ayesha.malik (without @)', type: 'text' },
              { key: 'jazzcash_number', label: 'JazzCash Number', placeholder: '03001234567', type: 'tel' },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="label">{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder} className="input-field" />
              </div>
            ))}
            <div>
              <label className="label">Bio</label>
              <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                placeholder="Fashion lover based in Lahore 🌸 Curating the best of Pakistani fashion..."
                rows={3} className="input-field" style={{ resize: 'none' }} />
            </div>

            {error && <p style={{ fontSize: 13, color: '#DC2626', background: '#FEF2F2', padding: '10px 14px', borderRadius: 10 }}>{error}</p>}
            {saved && <p style={{ fontSize: 13, color: '#16a34a', background: '#F0FDF4', padding: '10px 14px', borderRadius: 10 }}>✓ Profile saved successfully!</p>}

            <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Profile'}</button>
          </form>
        </div>
      </div>
    </main>
  )
}
