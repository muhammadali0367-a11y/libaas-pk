import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// ─── Load .env.local manually ───────────────────────────────────────────────
const env = {}
try {
  const lines = readFileSync('.env.local', 'utf8').split('\n')
  for (const line of lines) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) env[key.trim()] = rest.join('=').trim()
  }
} catch {
  console.error('Could not read .env.local')
  process.exit(1)
}

// ─── Config ─────────────────────────────────────────────────────────────────
const POSHAK_URL = 'https://lvqgdpcozbuerkbglzsu.supabase.co'
const POSHAK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cWdkcGNvemJ1ZXJrYmdsenN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1OTk2MDUsImV4cCI6MjA4OTE3NTYwNX0.0xZCicS0DLhWcnk1QFHAArpgWmum2CTnl10lEZiWrjo'

const LIBAAS_URL = env.NEXT_PUBLIC_SUPABASE_URL
const LIBAAS_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!LIBAAS_URL || !LIBAAS_KEY) {
  console.error('❌ Missing Libaas env vars. Check your .env.local')
  process.exit(1)
}

if (POSHAK_KEY === 'PASTE_YOUR_POSHAK_ANON_KEY_HERE') {
  console.error('❌ Please paste your Poshak anon key into this script first.')
  process.exit(1)
}

// ─── Supabase clients ────────────────────────────────────────────────────────
const poshak = createClient(POSHAK_URL, POSHAK_KEY)
const libaas = createClient(LIBAAS_URL, LIBAAS_KEY)

// ─── Brand mapping ───────────────────────────────────────────────────────────
// Poshak brand name → Libaas brand UUID
const BRAND_MAP = {
  'Beechtree':        '00000000-0000-0000-0000-000000000001',
  'Saya':             '00000000-0000-0000-0000-000000000002',
  'Asim Jofa':        '00000000-0000-0000-0000-000000000003',
  'Limelight':        '00000000-0000-0000-0000-000000000004',
  'Alkaram':          '00000000-0000-0000-0000-000000000005',
  'Ethnic':           '00000000-0000-0000-0000-000000000006',
  'Zellbury':         '00000000-0000-0000-0000-000000000007',
  'Bonanza Satrangi': '00000000-0000-0000-0000-000000000008',
  'Baroque':          '00000000-0000-0000-0000-000000000009',
  'Stylo':            '00000000-0000-0000-0000-000000000010',
}

// ─── Category normalizer ─────────────────────────────────────────────────────
function mapCategory(cat) {
  if (!cat) return 'Pret'
  const c = cat.toLowerCase()
  if (c.includes('lawn'))                                     return 'Lawn'
  if (c.includes('kurta'))                                    return 'Kurta'
  if (c.includes('winter') || c.includes('khaddar') || c.includes('linen')) return 'Winter'
  if (c.includes('formal') || c.includes('luxury') || c.includes('chiffon') || c.includes('bridal')) return 'Formal'
  return 'Pret'
}

// ─── Main migration ──────────────────────────────────────────────────────────
async function migrate() {
  console.log('🚀 Starting migration from Poshak → Libaas...\n')

  const PAGE_SIZE = 500
  let page = 0
  let totalFetched = 0
  let totalMigrated = 0
  let totalSkipped = 0
  let totalErrors = 0

  while (true) {
    const from = page * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    console.log(`📦 Fetching page ${page + 1} (rows ${from}–${to})...`)

    const { data: products, error: fetchError } = await poshak
      .from('products')
      .select('id, name, price, image_url, product_url, category, brand')
      .not('image_url', 'is', null)
      .not('price', 'is', null)
      .not('brand', 'is', null)
      .in('brand', Object.keys(BRAND_MAP))
      .gt('price', 0)
      .range(from, to)

    if (fetchError) {
      console.error('❌ Fetch error:', fetchError.message)
      break
    }

    if (!products || products.length === 0) {
      console.log('\n✅ No more products to fetch.')
      break
    }

    totalFetched += products.length

    // Transform
    const toInsert = []
    for (const p of products) {
      const brandId = BRAND_MAP[p.brand]
      if (!brandId) { totalSkipped++; continue }
      if (!p.name || !p.product_url) { totalSkipped++; continue }

      toInsert.push({
        id: p.id,
        brand_id: brandId,
        name: p.name.trim(),
        price: Math.round(p.price),
        image_url: p.image_url,
        product_url: p.product_url,
        category: mapCategory(p.category),
        is_active: true,
      })
    }

    if (toInsert.length === 0) {
      console.log(`   ⚠️  All ${products.length} products skipped (missing data)`)
      page++
      continue
    }

    // Insert in batches of 100 to avoid payload limits
    const BATCH = 100
    for (let i = 0; i < toInsert.length; i += BATCH) {
      const batch = toInsert.slice(i, i + BATCH)
      const { error: insertError } = await libaas
        .from('products')
        .upsert(batch, { onConflict: 'id', ignoreDuplicates: true })

      if (insertError) {
        console.error(`   ❌ Insert error (batch ${i / BATCH + 1}):`, insertError.message)
        totalErrors += batch.length
      } else {
        totalMigrated += batch.length
      }
    }

    console.log(`   ✅ Page ${page + 1}: ${toInsert.length} migrated, ${products.length - toInsert.length} skipped`)
    page++

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 200))
  }

  console.log('\n─────────────────────────────────────')
  console.log(`📊 Migration Summary`)
  console.log(`   Total fetched:   ${totalFetched}`)
  console.log(`   Total migrated:  ${totalMigrated}`)
  console.log(`   Total skipped:   ${totalSkipped}`)
  console.log(`   Total errors:    ${totalErrors}`)
  console.log('─────────────────────────────────────')

  if (totalMigrated > 0) {
    console.log(`\n🎉 Done! ${totalMigrated} products are now in Libaas.`)
  } else {
    console.log('\n⚠️  No products were migrated. Check your Poshak anon key.')
  }
}

migrate().catch(console.error)
