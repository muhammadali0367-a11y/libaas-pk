import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  const { slug } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  try {
    const { data: link } = await supabase
      .from('affiliate_links')
      .select('id, product_id, creator_id')
      .eq('slug', slug)
      .single()

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 })
    }

    await supabase.from('clicks').insert({
      affiliate_link_id: link.id,
      user_agent: request.headers.get('user-agent') || '',
      referrer: request.headers.get('referer') || '',
    })

    await supabase.rpc('increment_clicks', { link_id: link.id })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}