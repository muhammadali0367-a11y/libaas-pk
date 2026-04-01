import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import StorefrontClient from './StorefrontClient'

export async function generateMetadata({ params }) {
  const { username } = await params
  const { data: creator } = await supabase
    .from('creators')
    .select('full_name, bio')
    .eq('username', username)
    .single()

  if (!creator) return { title: 'Not Found' }

  return {
    title: `${creator.full_name || username} — Libaas`,
    description: creator.bio || `Shop ${creator.full_name}'s curated Pakistani fashion picks on Libaas.`,
  }
}

export default async function StorefrontPage({ params }) {
  const { username } = await params

  // Fetch creator
  const { data: creator } = await supabase
    .from('creators')
    .select('*')
    .eq('username', username)
    .eq('is_active', true)
    .single()

  if (!creator) return notFound()

  // Fetch their storefront products
  const { data: storefrontItems } = await supabase
    .from('storefronts')
    .select(`
      product_id,
      display_order,
      products (
        id, name, price, image_url, product_url, category,
        brands ( name, commission_rate )
      )
    `)
    .eq('creator_id', creator.id)
    .order('display_order', { ascending: true })

  // Fetch affiliate links for this creator
  const { data: affiliateLinks } = await supabase
    .from('affiliate_links')
    .select('product_id, slug')
    .eq('creator_id', creator.id)

  const linkMap = {}
  affiliateLinks?.forEach(l => { linkMap[l.product_id] = l.slug })

  const products = storefrontItems
    ?.map(item => ({
      ...item.products,
      affiliate_slug: linkMap[item.product_id] || null,
    }))
    .filter(Boolean) || []

  return <StorefrontClient creator={creator} products={products} />
}