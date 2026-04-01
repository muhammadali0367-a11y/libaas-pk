'use client'
import { useState } from 'react'
import Link from 'next/link'

const CREATOR = {
  name: 'Ayesha Malik',
  username: 'ayeshamalik',
  bio: 'Fashion lover based in Lahore 🌸 Curating the best of Pakistani fashion — affordable, elegant & always on-trend.',
  instagram: 'ayesha.malik',
  followers: '28.4K',
  avatar: 'https://i.pravatar.cc/150?img=47',
  collections: ['All', 'Pret', 'Lawn', 'Kurta', 'Winter', 'Formal'],
}

const DEMO_PRODUCTS = [
  { id: 'f7de483a', name: 'Embroidered Shirt', price: 2250, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bts22-l-36.jpg?v=1651229583', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts22-l-36-pink' },
  { id: '8d46c72b', name: 'Ajpb-20 Lawn 2 Pcs', price: 4250, image: 'https://cdn.shopify.com/s/files/1/0690/7320/7593/files/051A0851.jpg?v=1748668369', brand: 'Asim Jofa', category: 'Lawn', url: 'https://asimjofa.com/products/ajpb-20' },
  { id: '62b3ae95', name: 'Embroidered Shirt', price: 1930, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BTS22-SH-219.jpg?v=1654329423', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts22-sh-219-blue' },
  { id: '191b03fb', name: 'Printed Strip Lawn Stitched 2 Piece', price: 6398, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/sp-11377-1Thumbnail_a0e549f2-1bb7-4073-86df-c0259c4d0328.jpg?v=1766379785', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/printed-strip-lawn-stitched-2-piece-shirt-trouser-wp2p-2506' },
  { id: '717ee5a9', name: 'Embroidered Jacquard Shirt', price: 2390, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/files/BTEASWW230607_1.jpg?v=1698652679', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bteasww230607-navy' },
  { id: '2dc39de3', name: 'Embroidered Shirt', price: 1925, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bts20-ch-355-red.jpg?v=1617353816', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts20-ch-355-red' },
  { id: 'ccaca33b', name: 'Printed Silver Lawn Shirt', price: 854, image: 'https://cdn.shopify.com/s/files/1/0623/6481/1444/files/SLR-24-24-5-Green-1_f21862d8-e16b-4697-bd35-c86c217bf1b3.jpg?v=1718491834', brand: 'Alkaram', category: 'Pret / Ready to Wear', url: 'https://www.alkaramstudio.com/products/1-pc-printed-silver-lawn-shirt-slr-24-24-5-green' },
  { id: '4bf1fc5e', name: '2 Piece Yarn Dyed Embroidered Suit', price: 5999, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/A2581ST-SML-329-2PieceYarnDyedSuit-Embroidered_Pret_1.jpg?v=1763978765', brand: 'Limelight', category: 'Pret / Ready to Wear', url: 'https://www.limelight.pk/products/a2581st-xsl-329' },
  { id: '8b93b9a0', name: 'Cambric Solid Stitched Shirt', price: 7798, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/SP-10467-1thumbnail.jpg?v=1761223861', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/cambric-solid-stitched-shirt-wp1s-1080' },
  { id: '79be4909', name: 'Embroidered Shirt', price: 2225, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/Layer4009.jpg?v=1664980852', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw221-sh-91b-purple' },
  { id: '57d1aced', name: 'Gleam Green Embroidered 3P', price: 2350, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT4S22U90_1_08c9c24e-a6f2-4330-b2bf-355d8530988c.jpg?v=1667279846', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt4s22u90-green' },
  { id: '0cf9ed23', name: 'Cotton Jacquard Pants', price: 749, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/ST-7058-1Thumbnail.jpg?v=1759151275', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/cotton-jacquard-pants-wbpj-131' },
  { id: '31cfb2ea', name: 'Printed Lawn Stitched 2 Piece', price: 4998, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/sp-10344_a461fbf3-8b9f-41e6-aa9f-790d848a6974.jpg?v=1770892838', brand: 'Saya', category: 'Lawn', url: 'https://saya.pk/products/printed-lawn-stitched-2-piece-shirt-trouser-wp2p-wp2p-1908' },
  { id: '12d9528b', name: 'Printed Shirt', price: 1295, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw21-dp-324_1.jpg?v=1636712454', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw21-dp-324-multi' },
  { id: '5a06bd30', name: 'Embroidered Slack Pants', price: 879, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/files/BTEASWW230395_1.jpg?v=1756360661', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bteasww230395-o-white' },
  { id: 'bb916394', name: 'Embroidered Shirt', price: 2316, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw21-mgc-64_1.jpg?v=1637929515', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw21-mgc-64-pink' },
  { id: 'd09948c7', name: 'Bliss 3 Pc Suit', price: 2694, image: 'https://cdn.shopify.com/s/files/1/0872/1278/5848/files/imgi_6_WU3PPBS25LIUN22_1_800x800_07be4ef3-98cd-40fc-8d94-62abb95aa86f.jpg?v=1758892243', brand: 'Bonanza', category: 'Pret / Ready to Wear', url: 'https://bonanzasatrangi.com/products/wu3ppbs25liun18' },
  { id: '694271d4', name: 'Saffron Unstitched', price: 1720, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bt2s21u59-mustard.jpg?v=1617714098', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt2s21u59-mustard' },
  { id: 'cdaa9b70', name: 'Western Pants', price: 2390, image: 'https://cdn.shopify.com/s/files/1/2290/7917/files/E2420-108-120_1.jpg?v=1752560780', brand: 'Ethnic', category: 'Pret / Ready to Wear', url: 'https://shop.ethnic.pk/products/western-top-e2420-108-120-120' },
  { id: '2773d980', name: 'Kurta', price: 1990, image: 'https://cdn.shopify.com/s/files/1/0595/3260/7535/files/WPW2512650_8.jpg?v=1760358204', brand: 'Zellbury', category: 'Kurta', url: 'https://www.zellbury.com/products/kurta-wpw2512650' },
  { id: '5dd29db9', name: 'Embroidered Chiffon Frock', price: 19950, image: 'https://cdn.shopify.com/s/files/1/2277/5269/products/80_8.jpg?v=1662969378', brand: 'Baroque', category: 'Pret / Ready to Wear', url: 'https://baroque.pk/products/plain-chiffon-frock-pr-685' },
  { id: 'e3099db3', name: 'Mineral 1 Piece', price: 1720, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT4S21U56_1.jpg?v=1623409038', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt4s21u56-grey' },
  { id: '9453327b', name: 'Kurta', price: 1990, image: 'https://cdn.shopify.com/s/files/1/0595/3260/7535/files/WPW2512651_5.jpg?v=1762159060', brand: 'Zellbury', category: 'Kurta', url: 'https://www.zellbury.com/products/kurta-wpw2512651' },
  { id: 'b44176cd', name: 'Printed Shirt', price: 1575, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw19-k-217-charcoal.jpg?v=1617359448', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw19-k-217-charcoal' },
  { id: '1d6fb230', name: 'Embroidered Shirt', price: 1825, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bts21-sh-296_1.jpg?v=1625840963', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts21-sh-296-grey' },
  { id: '99786000', name: 'Embroidered Shirt With Dupatta', price: 3892, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bts21-f-790-yellow.jpg?v=1617356911', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts21-f-790-yellow' },
  { id: '877367da', name: 'Embroidered Viscose Shirt', price: 1544, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/files/BTS231110077_1.jpg?v=1685335472', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts231110077-blue' },
  { id: '8b1ac5d7', name: 'Embroidered Cambric Pant', price: 1798, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/ST-9608-1thumbnail.jpg?v=1759129736', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/embroidered-cambric-pant-wbpe-324' },
  { id: '0f5abe0f', name: 'Embroidered Yarn Dyed Shirt', price: 714, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT1W22U93_1.jpg?v=1663156464', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt1w22u93-green' },
  { id: '702c316a', name: 'Jacquard Cotton Stitched Shirt', price: 2999, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/sp-9246-1Thumbnail.jpg?v=1748419055', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/jacquard-cotton-stitched-shirt-343' },
  { id: 'cd8b9aeb', name: 'Sheen Grip Pants', price: 4499, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/W2024PT-028-034-SheenGripPants_1.jpg?v=1767962992', brand: 'Limelight', category: 'Pret / Ready to Wear', url: 'https://www.limelight.pk/products/w2024pt-026-034' },
  { id: '77fe9edb', name: 'Embroidered Cotton Jacquard 2 Piece', price: 3899, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/SP-6807-1Thumbnail.jpg?v=1753882249', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/embroidered-cotton-jacquard-stitched-2-piece-26' },
  { id: 'a76c93b0', name: '2 Piece Grip Suit Printed', price: 4899, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/A2796ST-XSL-610-2PieceGripSuit-Embroidered_Pret_1.jpg?v=1767780293', brand: 'Limelight', category: 'Pret / Ready to Wear', url: 'https://www.limelight.pk/products/a2796st-xsl-610' },
  { id: '124c76ff', name: 'Basic Yarn Dyed Shirt', price: 1290, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/files/BT12402JAPR0055_1.jpg?v=1754657958', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt12402japr0055-multi' },
  { id: '4ed3bee1', name: 'Printed Khaddar Stitched Shirt', price: 5798, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/SP-4371_P17-23118-55B1Pc.jpg?v=1740122984', brand: 'Saya', category: 'Winter Collection', url: 'https://saya.pk/products/printed-khaddar-stitched-shirt-32' },
  { id: '170bb757', name: 'Tropical Bloom Printed 1P', price: 525, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT4S22U02_1_1c5d8b8a-6678-4b63-91f0-3657be4b4195.jpg?v=1667280615', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt4s22u02-multi' },
  { id: '7fc78882', name: 'Printed Strip Lawn Stitched Dress', price: 3398, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/SP-10778-1thumbnail_2b06fd9f-caf9-4a6e-84b5-405894189b9b.jpg?v=1761662008', brand: 'Saya', category: 'Lawn', url: 'https://saya.pk/products/printed-strip-lawn-stitched-dress-wp1p-2255' },
  { id: '9326804c', name: 'Embroidered Shirt', price: 2008, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BTS23-F-702_1.jpg?v=1678102216', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts23-f-702-black' },
  { id: 'b170ae1f', name: 'Pant', price: 1025, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw19-tst-514-o-white.jpg?v=1617360222', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw19-tst-514-o-white' },
  { id: '5823fd83', name: '2 Piece Printed Khaddar Suit', price: 2082, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT3W22U05_1.jpg?v=1669904725', brand: 'Beechtree', category: 'Winter Collection', url: 'https://www.beechtree.pk/products/bt3w22u05-green' },
  { id: '13573530', name: 'Embroidered Shirt', price: 2900, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bts20-f-407-teal_9e80c806-6d2b-4ea1-a821-d198e1bdca25.jpg?v=1617354315', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts20-f-407-teal' },
  { id: 'eca6603c', name: 'Designers Stitched Embroidered 3 Pcs', price: 36050, image: 'https://cdn.shopify.com/s/files/1/0690/7320/7593/products/3-29_57bb1f0d-6f3b-4a80-b07a-4663516c517e.jpg?v=1735220288', brand: 'Asim Jofa', category: 'Pret / Ready to Wear', url: 'https://asimjofa.com/products/ajhj-17-stitched' },
  { id: '31c092dd', name: 'Basic Shirt', price: 1825, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BTS22-SH-255_1.jpg?v=1651225426', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts22-sh-255-grey' },
  { id: '050d5edb', name: 'Embroidered Shirt', price: 1930, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw21-sh-172_1.jpg?v=1636712307', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw21-sh-172-blue' },
  { id: 'e0ade302', name: 'Embroidered Lawn Stitched 3 PCS', price: 28900, image: 'https://cdn.shopify.com/s/files/1/0690/7320/7593/files/005A1184_e46ac30e-c5b2-4900-9de5-6dab98b8abee.jpg?v=1754307313', brand: 'Asim Jofa', category: 'Lawn', url: 'https://asimjofa.com/products/ajell-07-ds-s' },
  { id: '00aca26e', name: 'Oriental Chic Printed 3P', price: 1985, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT4S22U35_1_eae6ca2f-f8a2-4b10-8101-1556e0244ab3.jpg?v=1667280113', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt4s22u35-multi' },
  { id: '8a6e7ad0', name: '3 PC Embellished Suit', price: 15800, image: 'https://cdn.shopify.com/s/files/1/0485/1459/7030/files/PF611718.png?v=1773221610', brand: 'Stylo', category: 'Pret / Ready to Wear', url: 'https://www.stylo.pk/products/3-pc-embellished-suit-pf6117' },
  { id: '844ce313', name: 'Embroidered Shirt', price: 1725, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw20-nk-55-blue.jpg?v=1617362176', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw20-nk-55-blue' },
  { id: '788d3468', name: 'Jacquard Cotton Stitched Shirt', price: 4099, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/SP-3673_AI.jpg?v=1738930920', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/jacquard-cotton-stitched-shirt-181' },
  { id: '9daaf3cc', name: 'Embroidered Shirt With Dupatta', price: 3250, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BTW221-F-757W_1.png?v=1663242633', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw221-f-757w-teal' },
]

const CATEGORY_MAP = {
  'All': null,
  'Pret': 'Pret / Ready to Wear',
  'Lawn': 'Lawn',
  'Kurta': 'Kurta',
  'Winter': 'Winter Collection',
  'Formal': 'Pret / Ready to Wear',
}

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  body { font-family: 'Inter', sans-serif; }
  .product-card { background: #fff; border-radius: 14px; overflow: hidden; cursor: pointer; transition: all 0.25s; border: 1px solid #F0F0F0; }
  .product-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.1); transform: translateY(-3px); border-color: #E0E0E0; }
  .product-img { transition: transform 0.4s ease; width: 100%; height: 100%; object-fit: cover; }
  .product-card:hover .product-img { transform: scale(1.04); }
  .shop-btn { opacity: 0; transform: translateY(6px); transition: all 0.22s ease; }
  .product-card:hover .shop-btn { opacity: 1; transform: translateY(0); }
  .pill { border-radius: 100px; padding: 7px 18px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid #E8E8E8; background: #fff; color: #6B6B6B; transition: all 0.18s; font-family: 'Inter', sans-serif; }
  .pill:hover { border-color: #1A1A1A; color: #1A1A1A; }
  .pill-active { background: #1A1A1A !important; color: #fff !important; border-color: #1A1A1A !important; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  .animate-in { animation: fadeUp 0.6s ease forwards; }
`

export default function DemoStorefront() {
  const [activeCollection, setActiveCollection] = useState('All')

  const filtered = activeCollection === 'All'
    ? DEMO_PRODUCTS
    : DEMO_PRODUCTS.filter(p => p.category === CATEGORY_MAP[activeCollection])

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: '#fff', minHeight: '100vh' }}>
      <style>{S}</style>

      {/* DEMO BANNER */}
      <div style={{ background: '#1A1A1A', textAlign: 'center', padding: '10px 16px' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.02em' }}>
          ✨ This is a demo storefront —{' '}
          <Link href="/join" style={{ color: '#D4AF50', textDecoration: 'underline' }}>Join Libaas</Link>
          {' '}to build yours
        </p>
      </div>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{ fontSize: 20, fontWeight: 600, color: '#1A1A1A' }}>Libaas</span>
          </Link>
          <p style={{ fontSize: 12, color: '#9B9B9B', fontFamily: "'Inter', sans-serif" }}>
            libaas.pk/{CREATOR.username}
          </p>
          <Link href="/join" style={{ background: '#1A1A1A', color: '#fff', borderRadius: 100, padding: '8px 18px', fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
            Join as Creator
          </Link>
        </div>
      </nav>

      {/* CREATOR PROFILE */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 24px 36px', textAlign: 'center' }} className="animate-in">

        {/* Avatar */}
        <div style={{ width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: '3px solid #F0F0F0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <img src={CREATOR.avatar} alt={CREATOR.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Name */}
        <h1 className="display" style={{ fontSize: 36, fontWeight: 700, color: '#1A1A1A', marginBottom: 8, letterSpacing: '-0.01em' }}>
          {CREATOR.name}
        </h1>
        <p style={{ fontSize: 14, color: '#B8952A', fontWeight: 500, marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
          @{CREATOR.instagram} · {CREATOR.followers} followers
        </p>
        <p style={{ fontSize: 14, color: '#6B6B6B', maxWidth: 440, margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300, fontFamily: "'Inter', sans-serif" }}>
          {CREATOR.bio}
        </p>

        {/* Stats */}
        <div style={{ display: 'inline-flex', gap: 0, border: '1px solid #F0F0F0', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
          {[
            { number: '50', label: 'Picks' },
            { number: '10', label: 'Brands' },
            { number: '10–15%', label: 'Commission' },
          ].map(({ number, label }, i) => (
            <div key={label} style={{ padding: '14px 28px', borderRight: i < 2 ? '1px solid #F0F0F0' : 'none', textAlign: 'center' }}>
              <p className="display" style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{number}</p>
              <p style={{ fontSize: 11, color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {CREATOR.collections.map(col => (
            <button key={col} onClick={() => setActiveCollection(col)}
              className={`pill ${activeCollection === col ? 'pill-active' : ''}`}>
              {col}
            </button>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ flex: 1, height: 1, background: '#F0F0F0' }} />
          <p style={{ fontSize: 11, color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
            {filtered.length} picks
          </p>
          <div style={{ flex: 1, height: 1, background: '#F0F0F0' }} />
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {filtered.map(product => (
            <div key={product.id} className="product-card">
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#F5F5F5' }}>
                <img src={product.image} alt={product.name} className="product-img"
                  onError={e => { e.target.src = 'https://via.placeholder.com/300x400/F5F5F5/C4C4C4?text=No+Image' }} />
                <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.92)', color: '#6B6B6B', borderRadius: 100, padding: '4px 10px', fontSize: 11, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                  {product.brand}
                </span>
                <a href={product.url} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="shop-btn"
                  style={{ position: 'absolute', bottom: 12, left: 12, right: 12, background: '#1A1A1A', color: '#fff', textAlign: 'center', padding: '10px', borderRadius: 100, fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif", textDecoration: 'none', display: 'block' }}>
                  Shop Now →
                </a>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>
                  {product.name}
                </p>
                <p style={{ fontSize: 13, color: '#B8952A', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                  PKR {product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background: '#1A1A1A', borderTop: '1px solid #F0F0F0', padding: '56px 24px', textAlign: 'center' }}>
        <h3 className="display" style={{ fontSize: 32, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
          Want a storefront like this?
        </h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 28, fontWeight: 300, fontFamily: "'Inter', sans-serif" }}>
          Join Libaas and start earning from your fashion picks. Free forever.
        </p>
        <Link href="/join" style={{ background: '#D4AF50', color: '#1A1A1A', borderRadius: 100, padding: '13px 32px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', fontFamily: "'Inter', sans-serif" }}>
          Create Your Free Storefront →
        </Link>
      </div>
    </main>
  )
}
