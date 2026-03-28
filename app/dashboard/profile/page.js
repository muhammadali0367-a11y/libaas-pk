'use client'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditProfile() {
  const [creator, setCreator] = useState(null)
  const [form, setForm] = useState({
    full_name: '',
    bio: '',
    instagram: '',
    jazzcash_number: '',
    avatar_url: '',
  })
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

      const { data } = await supabase
        .from('creators')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (!data) { router.push('/auth'); return }
      setCreator(data)
      setForm({
        full_name: data.full_name || '',
        bio: data.bio || '',
        instagram: data.instagram || '',
        jazzcash_number: data.jazzcash_number || '',
        avatar_url: data.avatar_url || '',
      })
      setLoading(false)
    }
    load()
  }, [])

  async function handleAvatarUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setError('')

    const fileExt = file.name.split('.').pop()
    const fileName = `${creator.id}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)

    setForm(prev => ({ ...prev, avatar_url: publicUrl }))
    setUploading(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)

    const { error: updateError } = await supabase
      .from('creators')
      .update(form)
      .eq('id', creator.id)

    if (updateError) {
      setError(updateError.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
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
        input, textarea { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* NAV */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-wider" style={{ color: '#C9A84C' }}>LIBAAS</Link>
        <Link href="/dashboard" className="font-body text-xs text-white/40 hover:text-white transition-colors">
          ← Back to Dashboard
        </Link>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="font-body text-xs tracking-widest text-white/30 uppercase mb-1">Settings</p>
          <h1 className="font-display text-4xl">Edit Profile</h1>
        </div>

        {/* Avatar upload */}
        <div className="flex items-center gap-5 mb-8 p-5 bg-[#141414] rounded-2xl border border-white/5">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-white/5">
              {form.avatar_url
                ? <img src={form.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-white/20 text-3xl">👤</div>
              }
            </div>
            {uploading && (
              <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <div>
            <p className="font-body text-sm text-white mb-1">{form.full_name || 'Your Name'}</p>
            <p className="font-body text-xs text-white/30 mb-3">libaas.pk/{creator.username}</p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              className="font-body text-xs px-4 py-2 rounded-full border border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all disabled:opacity-50">
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {[
            { key: 'full_name', label: 'Full Name', placeholder: 'Ayesha Malik', type: 'text' },
            { key: 'instagram', label: 'Instagram Handle', placeholder: 'ayesha.malik (without @)', type: 'text' },
            { key: 'jazzcash_number', label: 'JazzCash Number', placeholder: '03001234567', type: 'tel' },
          ].map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label className="font-body text-xs text-white/40 block mb-1.5">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
          ))}

          {/* Bio */}
          <div>
            <label className="font-body text-xs text-white/40 block mb-1.5">Bio</label>
            <textarea
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
              placeholder="Fashion lover based in Lahore 🌸 Curating the best of Pakistani fashion..."
              rows={3}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
            />
          </div>

          {error && (
            <p className="font-body text-xs text-red-400 bg-red-400/10 rounded-xl px-4 py-3">{error}</p>
          )}

          {saved && (
            <p className="font-body text-xs text-green-400 bg-green-400/10 rounded-xl px-4 py-3">
              ✅ Profile saved successfully!
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 rounded-xl text-sm font-body font-medium transition-opacity disabled:opacity-50"
            style={{ background: '#C9A84C', color: '#000' }}>
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </main>
  )
}