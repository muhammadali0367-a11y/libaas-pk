'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
  { id: 'f7de483a-78fc-4861-94e4-38c1209a8858', name: 'Embroidered Shirt', price: 2250, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bts22-l-36.jpg?v=1651229583', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts22-l-36-pink' },
  { id: '8d46c72b-eb46-4886-8fd7-76e6bf09e29d', name: 'Ajpb-20 Lawn 2 Pcs', price: 4250, image: 'https://cdn.shopify.com/s/files/1/0690/7320/7593/files/051A0851.jpg?v=1748668369', brand: 'Asim Jofa', category: 'Lawn', url: 'https://asimjofa.com/products/ajpb-20' },
  { id: '62b3ae95-3b05-47cf-96e2-13cebbd0061b', name: 'Embroidered Shirt', price: 1930, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BTS22-SH-219.jpg?v=1654329423', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts22-sh-219-blue' },
  { id: '191b03fb-cae9-400b-acd7-9d716294b8ff', name: 'Printed Strip Lawn Stitched 2 Piece', price: 6398, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/sp-11377-1Thumbnail_a0e549f2-1bb7-4073-86df-c0259c4d0328.jpg?v=1766379785', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/printed-strip-lawn-stitched-2-piece-shirt-trouser-wp2p-2506' },
  { id: '717ee5a9-34ca-4584-9a7d-a55181c01440', name: 'Embroidered Jacquard Shirt', price: 2390, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/files/BTEASWW230607_1.jpg?v=1698652679', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bteasww230607-navy' },
  { id: '2dc39de3-d273-4611-a0bd-1446faf6413e', name: 'Embroidered Shirt', price: 1925, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bts20-ch-355-red.jpg?v=1617353816', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts20-ch-355-red' },
  { id: 'ccaca33b-6041-4df0-ae01-436eca44414c', name: 'Printed Silver Lawn Shirt', price: 854, image: 'https://cdn.shopify.com/s/files/1/0623/6481/1444/files/SLR-24-24-5-Green-1_f21862d8-e16b-4697-bd35-c86c217bf1b3.jpg?v=1718491834', brand: 'Alkaram', category: 'Pret / Ready to Wear', url: 'https://www.alkaramstudio.com/products/1-pc-printed-silver-lawn-shirt-slr-24-24-5-green' },
  { id: '4bf1fc5e-a9d0-4591-803d-49087d33767d', name: '2 Piece Yarn Dyed Embroidered Suit', price: 5999, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/A2581ST-SML-329-2PieceYarnDyedSuit-Embroidered_Pret_1.jpg?v=1763978765', brand: 'Limelight', category: 'Pret / Ready to Wear', url: 'https://www.limelight.pk/products/a2581st-xsl-329' },
  { id: '8b93b9a0-445a-471c-9c93-014709206ce8', name: 'Cambric Solid Stitched Shirt', price: 7798, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/SP-10467-1thumbnail.jpg?v=1761223861', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/cambric-solid-stitched-shirt-wp1s-1080' },
  { id: '79be4909-eb9f-4c5c-a921-f347fafdbad1', name: 'Embroidered Shirt', price: 2225, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/Layer4009.jpg?v=1664980852', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw221-sh-91b-purple' },
  { id: '57d1aced-e74f-4ec7-bc29-594842d879dd', name: 'Gleam Green Embroidered 3P', price: 2350, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT4S22U90_1_08c9c24e-a6f2-4330-b2bf-355d8530988c.jpg?v=1667279846', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt4s22u90-green' },
  { id: '0cf9ed23-e229-4971-b792-1b635545ea14', name: 'Cotton Jacquard Pants', price: 749, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/ST-7058-1Thumbnail.jpg?v=1759151275', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/cotton-jacquard-pants-wbpj-131' },
  { id: '31cfb2ea-4579-425a-85d2-bd602f4755d0', name: 'Printed Lawn Stitched 2 Piece', price: 4998, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/sp-10344_a461fbf3-8b9f-41e6-aa9f-790d848a6974.jpg?v=1770892838', brand: 'Saya', category: 'Lawn', url: 'https://saya.pk/products/printed-lawn-stitched-2-piece-shirt-trouser-wp2p-wp2p-1908' },
  { id: '12d9528b-6030-4d24-a231-2ac45b7feefd', name: 'Printed Shirt', price: 1295, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw21-dp-324_1.jpg?v=1636712454', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw21-dp-324-multi' },
  { id: '5a06bd30-d56e-40f1-a4ae-bbce9ba4b585', name: 'Embroidered Slack Pants', price: 879, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/files/BTEASWW230395_1.jpg?v=1756360661', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bteasww230395-o-white' },
  { id: 'bb916394-ee6e-4e24-9a79-55109ffb5c75', name: 'Embroidered Shirt', price: 2316, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw21-mgc-64_1.jpg?v=1637929515', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw21-mgc-64-pink' },
  { id: 'd09948c7-410a-4fff-8492-49f07db92054', name: 'Bliss 3 Pc Suit', price: 2694, image: 'https://cdn.shopify.com/s/files/1/0872/1278/5848/files/imgi_6_WU3PPBS25LIUN22_1_800x800_07be4ef3-98cd-40fc-8d94-62abb95aa86f.jpg?v=1758892243', brand: 'Bonanza', category: 'Pret / Ready to Wear', url: 'https://bonanzasatrangi.com/products/wu3ppbs25liun18' },
  { id: '694271d4-4d9f-419b-994a-b7694e342f74', name: 'Saffron Unstitched', price: 1720, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bt2s21u59-mustard.jpg?v=1617714098', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt2s21u59-mustard' },
  { id: 'cdaa9b70-8b94-40ff-b1ba-922dca9f8711', name: 'Western Pants', price: 2390, image: 'https://cdn.shopify.com/s/files/1/2290/7917/files/E2420-108-120_1.jpg?v=1752560780', brand: 'Ethnic', category: 'Pret / Ready to Wear', url: 'https://shop.ethnic.pk/products/western-top-e2420-108-120-120' },
  { id: '2773d980-edfb-4b2e-8402-766fd5d00883', name: 'Kurta', price: 1990, image: 'https://cdn.shopify.com/s/files/1/0595/3260/7535/files/WPW2512650_8.jpg?v=1760358204', brand: 'Zellbury', category: 'Kurta', url: 'https://www.zellbury.com/products/kurta-wpw2512650' },
  { id: '5dd29db9-b9d8-4e00-85f5-4deac465abd0', name: 'Embroidered Chiffon Frock', price: 19950, image: 'https://cdn.shopify.com/s/files/1/2277/5269/products/80_8.jpg?v=1662969378', brand: 'Baroque', category: 'Pret / Ready to Wear', url: 'https://baroque.pk/products/plain-chiffon-frock-pr-685' },
  { id: 'e3099db3-1128-42e2-b750-e755e6efabb6', name: 'Mineral 1 Piece', price: 1720, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT4S21U56_1.jpg?v=1623409038', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt4s21u56-grey' },
  { id: '9453327b-2371-47df-9f3c-3ae331797af0', name: 'Kurta', price: 1990, image: 'https://cdn.shopify.com/s/files/1/0595/3260/7535/files/WPW2512651_5.jpg?v=1762159060', brand: 'Zellbury', category: 'Kurta', url: 'https://www.zellbury.com/products/kurta-wpw2512651' },
  { id: 'b44176cd-a23c-4928-b236-a97ef1cf460f', name: 'Printed Shirt', price: 1575, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw19-k-217-charcoal.jpg?v=1617359448', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw19-k-217-charcoal' },
  { id: '1d6fb230-f5b8-44e4-aeee-4f9e111fe4e7', name: 'Embroidered Shirt', price: 1825, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bts21-sh-296_1.jpg?v=1625840963', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts21-sh-296-grey' },
  { id: '99786000-7539-4922-a34b-8638f4ebb7dd', name: 'Embroidered Shirt With Dupatta', price: 3892, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bts21-f-790-yellow.jpg?v=1617356911', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts21-f-790-yellow' },
  { id: '877367da-117a-43bb-8afe-4695841ed60d', name: 'Embroidered Viscose Shirt', price: 1544, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/files/BTS231110077_1.jpg?v=1685335472', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts231110077-blue' },
  { id: '8b1ac5d7-b174-489c-b685-adc442531d1a', name: 'Embroidered Cambric Pant', price: 1798, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/ST-9608-1thumbnail.jpg?v=1759129736', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/embroidered-cambric-pant-wbpe-324' },
  { id: '0f5abe0f-a286-4331-9d4a-9b4f83c0e42f', name: 'Embroidered Yarn Dyed Shirt', price: 714, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT1W22U93_1.jpg?v=1663156464', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt1w22u93-green' },
  { id: '702c316a-c7d4-4e8b-8f5e-22c5f01b6772', name: 'Jacquard Cotton Stitched Shirt', price: 2999, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/sp-9246-1Thumbnail.jpg?v=1748419055', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/jacquard-cotton-stitched-shirt-343' },
  { id: 'cd8b9aeb-d204-48bd-9e86-81936d5b5baf', name: 'Sheen Grip Pants', price: 4499, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/W2024PT-028-034-SheenGripPants_1.jpg?v=1767962992', brand: 'Limelight', category: 'Pret / Ready to Wear', url: 'https://www.limelight.pk/products/w2024pt-026-034' },
  { id: '77fe9edb-aeb8-40ac-a2e9-7aad00129030', name: 'Embroidered Cotton Jacquard 2 Piece', price: 3899, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/SP-6807-1Thumbnail.jpg?v=1753882249', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/embroidered-cotton-jacquard-stitched-2-piece-26' },
  { id: 'a76c93b0-af4a-492e-b677-45b7cbe87581', name: '2 Piece Grip Suit Printed', price: 4899, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/A2796ST-XSL-610-2PieceGripSuit-Embroidered_Pret_1.jpg?v=1767780293', brand: 'Limelight', category: 'Pret / Ready to Wear', url: 'https://www.limelight.pk/products/a2796st-xsl-610' },
  { id: '124c76ff-6163-4b4a-a64a-74f1ea2f5483', name: 'Basic Yarn Dyed Shirt', price: 1290, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/files/BT12402JAPR0055_1.jpg?v=1754657958', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt12402japr0055-multi' },
  { id: '4ed3bee1-802b-448b-95ec-1f83dd180a3a', name: 'Printed Khaddar Stitched Shirt', price: 5798, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/SP-4371_P17-23118-55B1Pc.jpg?v=1740122984', brand: 'Saya', category: 'Winter Collection', url: 'https://saya.pk/products/printed-khaddar-stitched-shirt-32' },
  { id: '170bb757-8b1a-4918-a5f3-bdc05cdbe0d2', name: 'Tropical Bloom Printed 1P', price: 525, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT4S22U02_1_1c5d8b8a-6678-4b63-91f0-3657be4b4195.jpg?v=1667280615', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt4s22u02-multi' },
  { id: '7fc78882-941d-48e5-ac46-af713eb66fea', name: 'Printed Strip Lawn Stitched Dress', price: 3398, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/SP-10778-1thumbnail_2b06fd9f-caf9-4a6e-84b5-405894189b9b.jpg?v=1761662008', brand: 'Saya', category: 'Lawn', url: 'https://saya.pk/products/printed-strip-lawn-stitched-dress-wp1p-2255' },
  { id: '9326804c-7c0e-4087-acc7-b859ae15b9b4', name: 'Embroidered Shirt', price: 2008, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BTS23-F-702_1.jpg?v=1678102216', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts23-f-702-black' },
  { id: 'b170ae1f-aed9-49fb-9024-fb9e9bbcb2e6', name: 'Pant', price: 1025, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw19-tst-514-o-white.jpg?v=1617360222', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw19-tst-514-o-white' },
  { id: '5823fd83-c7b6-41f4-babf-1fe8a58d06b2', name: '2 Piece Printed Khaddar Suit', price: 2082, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT3W22U05_1.jpg?v=1669904725', brand: 'Beechtree', category: 'Winter Collection', url: 'https://www.beechtree.pk/products/bt3w22u05-green' },
  { id: '13573530-a975-48e6-925c-ad604ac80861', name: 'Embroidered Shirt', price: 2900, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/bts20-f-407-teal_9e80c806-6d2b-4ea1-a821-d198e1bdca25.jpg?v=1617354315', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts20-f-407-teal' },
  { id: 'eca6603c-9cab-4938-b28a-9d0015bcc6cb', name: 'Designers Stitched Embroidered 3 Pcs', price: 36050, image: 'https://cdn.shopify.com/s/files/1/0690/7320/7593/products/3-29_57bb1f0d-6f3b-4a80-b07a-4663516c517e.jpg?v=1735220288', brand: 'Asim Jofa', category: 'Pret / Ready to Wear', url: 'https://asimjofa.com/products/ajhj-17-stitched' },
  { id: '31c092dd-51d8-4243-bf82-00f7886c5fee', name: 'Basic Shirt', price: 1825, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BTS22-SH-255_1.jpg?v=1651225426', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bts22-sh-255-grey' },
  { id: '050d5edb-322b-4f23-882a-10040e773e3c', name: 'Embroidered Shirt', price: 1930, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw21-sh-172_1.jpg?v=1636712307', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw21-sh-172-blue' },
  { id: 'e0ade302-d066-4e6d-acbd-eb4b58c8bf10', name: 'Embroidered Lawn Stitched 3 PCS', price: 28900, image: 'https://cdn.shopify.com/s/files/1/0690/7320/7593/files/005A1184_e46ac30e-c5b2-4900-9de5-6dab98b8abee.jpg?v=1754307313', brand: 'Asim Jofa', category: 'Lawn', url: 'https://asimjofa.com/products/ajell-07-ds-s' },
  { id: '00aca26e-8d63-42aa-a872-247e60df7678', name: 'Oriental Chic Printed 3P', price: 1985, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BT4S22U35_1_eae6ca2f-f8a2-4b10-8101-1556e0244ab3.jpg?v=1667280113', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/bt4s22u35-multi' },
  { id: '8a6e7ad0-31fd-4458-a280-7a3ad0f0b518', name: '3 PC Embellished Suit', price: 15800, image: 'https://cdn.shopify.com/s/files/1/0485/1459/7030/files/PF611718.png?v=1773221610', brand: 'Stylo', category: 'Pret / Ready to Wear', url: 'https://www.stylo.pk/products/3-pc-embellished-suit-pf6117' },
  { id: '844ce313-071d-454c-9538-2a916d76d920', name: 'Embroidered Shirt', price: 1725, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/btw20-nk-55-blue.jpg?v=1617362176', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw20-nk-55-blue' },
  { id: '788d3468-49a1-4939-aabb-c8d154113621', name: 'Jacquard Cotton Stitched Shirt', price: 4099, image: 'https://cdn.shopify.com/s/files/1/0184/5074/3360/files/SP-3673_AI.jpg?v=1738930920', brand: 'Saya', category: 'Pret / Ready to Wear', url: 'https://saya.pk/products/jacquard-cotton-stitched-shirt-181' },
  { id: '9daaf3cc-36e6-4101-9389-b670f62950a1', name: 'Embroidered Shirt With Dupatta', price: 3250, image: 'https://cdn.shopify.com/s/files/1/0488/9201/8848/products/BTW221-F-757W_1.png?v=1663242633', brand: 'Beechtree', category: 'Pret / Ready to Wear', url: 'https://www.beechtree.pk/products/btw221-f-757w-teal' },
]

const CATEGORY_MAP = {
  'All': null,
  'Pret': 'Pret / Ready to Wear',
  'Lawn': 'Lawn',
  'Kurta': 'Kurta',
  'Winter': 'Winter Collection',
  'Formal': 'Pret / Ready to Wear',
}

export default function DemoStorefront() {
  const [activeCollection, setActiveCollection] = useState('All')
  const [hoveredId, setHoveredId] = useState(null)

  const filtered = activeCollection === 'All'
    ? DEMO_PRODUCTS
    : DEMO_PRODUCTS.filter(p => p.category === CATEGORY_MAP[activeCollection])

  return (
    <main className="min-h-screen bg-[#FAF7F2]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root {
          --gold: #C9A84C;
          --black: #0A0A0A;
          --cream: #FAF7F2;
          --dark-cream: #F0EBE3;
        }
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .product-card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.12); }
        .product-img { transition: transform 0.5s ease; }
        .product-card:hover .product-img { transform: scale(1.04); }
        .pill-active { background: #0A0A0A; color: #FAF7F2; }
        .pill-inactive { background: transparent; color: #6B6B6B; border: 1px solid #D1C9BC; }
        .pill-inactive:hover { border-color: #0A0A0A; color: #0A0A0A; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .animate-in { animation: fadeUp 0.6s ease forwards; }
        .shop-btn {
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.25s ease;
        }
        .product-card:hover .shop-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .demo-banner {
          background: linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%);
        }
      `}</style>

      {/* DEMO BANNER */}
      <div className="demo-banner text-white text-center py-3 px-4">
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '0.05em' }}>
          ✨ This is a demo storefront — <Link href="/" className="underline" style={{ color: '#C9A84C' }}>Join Libaas</Link> to build yours
        </p>
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5DDD4]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl tracking-wider" style={{ color: '#C9A84C' }}>LIBAAS</Link>
          <p className="text-xs text-[#6B6B6B] hidden md:block">libaas.pk/{CREATOR.username}</p>
          <a href="mailto:hello@thelibaas.pk"
            className="text-xs px-4 py-2 rounded-full"
            style={{ background: '#0A0A0A', color: '#FAF7F2', fontFamily: "'DM Sans', sans-serif" }}>
            Join as Creator
          </a>
        </div>
      </nav>

      {/* CREATOR PROFILE */}
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-10">
        <div className="flex flex-col items-center text-center animate-in">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-5 ring-4 ring-white shadow-lg">
            <img src={CREATOR.avatar} alt={CREATOR.name} className="w-full h-full object-cover" />
          </div>

          {/* Name */}
          <h1 className="font-display text-4xl mb-1" style={{ color: '#0A0A0A' }}>{CREATOR.name}</h1>
          <p className="text-sm mb-4" style={{ color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}>
            @{CREATOR.instagram} · {CREATOR.followers} followers
          </p>

          {/* Bio */}
          <p className="text-sm max-w-md leading-relaxed mb-6" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>
            {CREATOR.bio}
          </p>

          {/* Stats */}
          <div className="flex gap-8 mb-8">
            {[
              { number: '50', label: 'Picks' },
              { number: '10', label: 'Brands' },
              { number: '10–15%', label: 'Commission' },
            ].map(({ number, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-2xl" style={{ color: '#0A0A0A' }}>{number}</p>
                <p className="text-xs tracking-widest uppercase" style={{ color: '#9B9185', fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Collection pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {CREATOR.collections.map(col => (
              <button
                key={col}
                onClick={() => setActiveCollection(col)}
                className={`text-xs px-5 py-2 rounded-full transition-all ${activeCollection === col ? 'pill-active' : 'pill-inactive'}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {col}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-[#E5DDD4]" />
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: '#9B9185', fontFamily: "'DM Sans', sans-serif" }}>
            {filtered.length} picks
          </p>
          <div className="flex-1 h-px bg-[#E5DDD4]" />
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-2xl overflow-hidden cursor-pointer"
              style={{ animationDelay: `${i * 30}ms` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F0EB]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400/F5F0EB/9B9185?text=No+Image' }}
                />
                {/* Brand badge */}
                <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.9)', color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif", fontSize: '10px' }}>
                  {product.brand}
                </span>
                {/* Shop button on hover */}
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shop-btn absolute bottom-3 left-3 right-3 text-center text-xs py-2.5 rounded-xl font-medium"
                  style={{ background: '#0A0A0A', color: '#FAF7F2', fontFamily: "'DM Sans', sans-serif" }}
                  onClick={(e) => e.stopPropagation()}>
                  Shop Now →
                </a>
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-xs font-medium truncate mb-1" style={{ color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif" }}>
                  {product.name}
                </p>
                <p className="text-xs" style={{ color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}>
                  PKR {product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
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
