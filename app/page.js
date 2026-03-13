"use client";

import { useState, useEffect, useRef } from "react";

// ─── CURATED PRODUCTS ─────────────────────────────────────────────────────────
// Add your products here. Each one needs: id, name, brand, price, category,
// mood, image, product_url, badge (optional), featured (optional: true)
const PRODUCTS = [
  // ── EID EDIT ──
  { id:1,  name:"Embroidered Lawn 3-Piece",   brand:"Khaadi",         price:4800,  category:"Women",      mood:"Eid",     image:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80", product_url:"https://www.khaadi.com/pk/women/",                          badge:"Bestseller", featured:true },
  { id:2,  name:"Luxury Eid Chiffon",         brand:"Sapphire",       price:11500, category:"Women",      mood:"Eid",     image:"https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=600&q=80", product_url:"https://pk.sapphireonline.pk/collections/eid",              badge:"Exclusive",  featured:true },
  { id:3,  name:"Festive Silk Collection",    brand:"Alkaram Studio", price:9200,  category:"Women",      mood:"Eid",     image:"https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80", product_url:"https://www.alkaramstudio.com/collections/festive",         badge:"New" },
  { id:4,  name:"White Eid Luxury 3-Pc",      brand:"Gul Ahmed",      price:8800,  category:"Women",      mood:"Eid",     image:"https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?w=600&q=80", product_url:"https://www.gulahmedshop.com/collections/eid",              badge:"Trending" },
  // ── WEDDING EDIT ──
  { id:5,  name:"Bridal Silk Gharara",        brand:"Limelight",      price:12000, category:"Women",      mood:"Wedding", image:"https://images.unsplash.com/photo-1614886137799-1629b5a17c4c?w=600&q=80", product_url:"https://www.limelightpk.com/collections/formal-wear",      badge:"Premium",    featured:true },
  { id:6,  name:"Luxury Bridal Chiffon",      brand:"Khaadi",         price:18900, category:"Women",      mood:"Wedding", image:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80", product_url:"https://www.khaadi.com/pk/women/",                          badge:"Exclusive" },
  { id:7,  name:"Karandi Wedding Sherwani",   brand:"Alkaram Studio", price:8500,  category:"Men",        mood:"Wedding", image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80", product_url:"https://www.alkaramstudio.com/collections/men",             badge:"Premium" },
  { id:8,  name:"Bridal Kundan Necklace",     brand:"Sapphire",       price:4500,  category:"Jewelry",    mood:"Wedding", image:"https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80", product_url:"https://pk.sapphireonline.pk/collections/accessories",      badge:"New" },
  // ── EVERYDAY EDIT ──
  { id:9,  name:"Casual Linen Co-ord",        brand:"Limelight",      price:2800,  category:"Women",      mood:"Everyday",image:"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80", product_url:"https://www.limelightpk.com/collections/pret-wear",         badge:"Sale" },
  { id:10, name:"Printed Pret Kurta",         brand:"Sapphire",       price:3200,  category:"Women",      mood:"Everyday",image:"https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80", product_url:"https://pk.sapphireonline.pk/collections/pret",             badge:"New" },
  { id:11, name:"Men's Lawn Kurta",           brand:"Sapphire",       price:2900,  category:"Men",        mood:"Everyday",image:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80", product_url:"https://pk.sapphireonline.pk/collections/men",             badge:null },
  { id:12, name:"Pastel Summer Pret",         brand:"Alkaram Studio", price:2500,  category:"Women",      mood:"Everyday",image:"https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=80", product_url:"https://www.alkaramstudio.com/collections/summer",          badge:"Sale" },
  // ── WINTER EDIT ──
  { id:13, name:"Karandi Winter Suit",        brand:"Gul Ahmed",      price:6800,  category:"Women",      mood:"Winter",  image:"https://images.unsplash.com/photo-1623091411395-09e79fdbfcf6?w=600&q=80", product_url:"https://www.gulahmedshop.com/collections/winter",           badge:null,         featured:true },
  { id:14, name:"Embroidered Waistcoat",      brand:"Gul Ahmed",      price:4200,  category:"Men",        mood:"Winter",  image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", product_url:"https://www.gulahmedshop.com/collections/men",              badge:"New" },
  // ── ACCESSORIES ──
  { id:15, name:"Gold Jhumka Earrings",       brand:"Khaadi",         price:1200,  category:"Jewelry",    mood:"Eid",     image:"https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80", product_url:"https://www.khaadi.com/pk/accessories/",                   badge:"New" },
  { id:16, name:"Oxidised Choker Set",        brand:"Sapphire",       price:950,   category:"Jewelry",    mood:"Everyday",image:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80", product_url:"https://pk.sapphireonline.pk/collections/accessories",      badge:"Sale" },
  { id:17, name:"Embroidered Clutch",         brand:"Sapphire",       price:1650,  category:"Jewelry",    mood:"Wedding", image:"https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80", product_url:"https://pk.sapphireonline.pk/collections/accessories",      badge:"Trending" },
  // ── KIDS ──
  { id:18, name:"Girls Eid Frock",            brand:"Khaadi",         price:1800,  category:"Kids",       mood:"Eid",     image:"https://images.unsplash.com/photo-1518831959646-742c3a14ebf6?w=600&q=80", product_url:"https://www.khaadi.com/pk/kids/",                           badge:"New" },
  { id:19, name:"Boys Eid Kurta Set",         brand:"Gul Ahmed",      price:2200,  category:"Kids",       mood:"Eid",     image:"https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80", product_url:"https://www.gulahmedshop.com/collections/kids",             badge:"Festive" },
];

const MOODS   = ["All", "Eid", "Wedding", "Everyday", "Winter"];
const FILTERS = ["All", "Women", "Men", "Kids", "Jewelry"];

const BADGE_STYLES = {
  Bestseller: { bg:"#1a1a1a",    color:"#c9a96e" },
  New:        { bg:"#1e3a2a",    color:"#6abf8a" },
  Sale:       { bg:"#3a1a1a",    color:"#e07070" },
  Exclusive:  { bg:"#2a1a3a",    color:"#b088d0" },
  Premium:    { bg:"#1a2a3a",    color:"#7aaad0" },
  Trending:   { bg:"#3a2a10",    color:"#d0a050" },
  Festive:    { bg:"#3a1a20",    color:"#d07090" },
};

// ─── EDITORIAL COLLECTIONS ────────────────────────────────────────────────────
const COLLECTIONS = [
  { id:"eid",     label:"The Eid Edit",     urdu:"عید کا انتخاب",     desc:"Curated pieces for your most luminous celebration",  mood:"Eid",     accent:"#c9a96e" },
  { id:"wedding", label:"The Wedding Edit", urdu:"شادی کا انتخاب",    desc:"From the baraat to the walima — dressed to remember", mood:"Wedding", accent:"#b088d0" },
  { id:"winter",  label:"The Winter Edit",  urdu:"سردیوں کا انتخاب",  desc:"Rich textures, warm layers, effortless elegance",     mood:"Winter",  accent:"#7aaad0" },
  { id:"everyday",label:"The Daily Edit",   urdu:"روزمرہ کا انتخاب",  desc:"Effortless style for every ordinary moment",          mood:"Everyday",accent:"#6abf8a" },
];

// ─── FEATURED BRANDS ─────────────────────────────────────────────────────────
const BRANDS = ["Khaadi","Sapphire","Gul Ahmed","Limelight","Alkaram Studio","Bonanza","Beechtree","Zellbury"];

export default function Libaas() {
  const [activeMood,    setActiveMood]    = useState("All");
  const [activeFilter,  setActiveFilter]  = useState("All");
  const [wishlist,      setWishlist]      = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loaded,        setLoaded]        = useState(false);
  const [activeSection, setActiveSection] = useState(null); // collection section open
  const heroRef = useRef(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProduct ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProduct]);

  const toggleWish = (id, e) => {
    e?.stopPropagation();
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  };

  const filtered = PRODUCTS.filter(p =>
    (activeMood   === "All" || p.mood     === activeMood) &&
    (activeFilter === "All" || p.category === activeFilter)
  );

  const featuredProducts = PRODUCTS.filter(p => p.featured);

  const collectionProducts = (mood) => PRODUCTS.filter(p => p.mood === mood);

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#0e0b08", minHeight:"100vh", color:"#f0ebe3" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&family=Noto+Nastaliq+Urdu:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { overflow-x:hidden; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#0e0b08; }
        ::-webkit-scrollbar-thumb { background:#c9a96e; border-radius:2px; }

        /* NAV */
        .nav { position:fixed; top:0; left:0; right:0; z-index:200; padding:20px 40px; display:flex; align-items:center; justify-content:space-between; background:linear-gradient(180deg,rgba(14,11,8,.95) 0%,transparent 100%); backdrop-filter:blur(2px); }
        .wordmark { font-family:'Playfair Display',serif; font-size:1.6rem; font-weight:400; letter-spacing:.06em; color:#f0ebe3; cursor:pointer; }
        .wordmark span { color:#c9a96e; font-style:italic; }
        .nav-links { display:flex; gap:32px; }
        .nav-link { font-size:.72rem; letter-spacing:.2em; text-transform:uppercase; color:#888; cursor:pointer; transition:color .2s; background:none; border:none; font-family:'DM Sans',sans-serif; }
        .nav-link:hover, .nav-link.active { color:#c9a96e; }

        /* HERO */
        .hero { position:relative; height:100vh; display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .hero-bg { position:absolute; inset:0; background:linear-gradient(135deg,#1a0e08 0%,#0e0b08 40%,#120d10 100%); }
        .hero-grain { position:absolute; inset:0; opacity:.04; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); }
        .hero-accent { position:absolute; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(201,169,110,.12) 0%,transparent 70%); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; }
        .hero-content { position:relative; text-align:center; z-index:2; padding:0 24px; }
        .hero-eyebrow { font-size:.65rem; letter-spacing:.45em; text-transform:uppercase; color:#c9a96e; margin-bottom:20px; opacity:0; animation:fadeUp .8s .2s ease forwards; }
        .hero-title { font-family:'Playfair Display',serif; font-size:clamp(3rem,8vw,7rem); font-weight:400; line-height:1.0; margin-bottom:10px; opacity:0; animation:fadeUp .8s .4s ease forwards; }
        .hero-title-italic { font-style:italic; color:#c9a96e; }
        .hero-urdu { font-family:'Noto Nastaliq Urdu',serif; font-size:clamp(1.2rem,3vw,2rem); color:#c9a96e; opacity:.6; margin-bottom:28px; direction:rtl; opacity:0; animation:fadeUp .8s .55s ease forwards; }
        .hero-sub { font-size:.82rem; letter-spacing:.12em; color:#888; margin-bottom:44px; opacity:0; animation:fadeUp .8s .65s ease forwards; max-width:420px; margin-left:auto; margin-right:auto; line-height:1.8; }
        .hero-cta { display:inline-flex; gap:16px; opacity:0; animation:fadeUp .8s .8s ease forwards; flex-wrap:wrap; justify-content:center; }
        .btn-primary { background:#c9a96e; color:#0e0b08; border:none; padding:14px 36px; font-family:'DM Sans',sans-serif; font-size:.75rem; letter-spacing:.18em; text-transform:uppercase; font-weight:500; cursor:pointer; border-radius:2px; transition:all .25s; }
        .btn-primary:hover { background:#e0c080; transform:translateY(-2px); }
        .btn-outline { background:transparent; color:#f0ebe3; border:1px solid rgba(240,235,227,.25); padding:14px 36px; font-family:'DM Sans',sans-serif; font-size:.75rem; letter-spacing:.18em; text-transform:uppercase; cursor:pointer; border-radius:2px; transition:all .25s; }
        .btn-outline:hover { border-color:#c9a96e; color:#c9a96e; }
        .hero-scroll { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; opacity:0; animation:fadeUp .8s 1.1s ease forwards; }
        .hero-scroll-line { width:1px; height:48px; background:linear-gradient(180deg,#c9a96e,transparent); animation:scrollPulse 2s infinite; }
        .hero-scroll-text { font-size:.58rem; letter-spacing:.3em; text-transform:uppercase; color:#555; }

        /* COLLECTIONS NAV */
        .collections-bar { border-top:1px solid rgba(240,235,227,.06); border-bottom:1px solid rgba(240,235,227,.06); padding:0 40px; display:flex; align-items:center; gap:0; overflow-x:auto; background:#0e0b08; position:sticky; top:60px; z-index:100; scrollbar-width:none; }
        .collections-bar::-webkit-scrollbar { display:none; }
        .coll-tab { padding:18px 28px; font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:#555; cursor:pointer; border:none; background:none; font-family:'DM Sans',sans-serif; transition:all .2s; white-space:nowrap; border-bottom:2px solid transparent; position:relative; top:1px; }
        .coll-tab:hover { color:#c9a96e; }
        .coll-tab.active { color:#c9a96e; border-bottom-color:#c9a96e; }

        /* SECTION HEADERS */
        .section-header { padding:80px 40px 40px; max-width:1400px; margin:0 auto; }
        .section-eyebrow { font-size:.62rem; letter-spacing:.35em; text-transform:uppercase; color:#c9a96e; margin-bottom:12px; }
        .section-title { font-family:'Playfair Display',serif; font-size:clamp(2rem,4vw,3.2rem); font-weight:400; color:#f0ebe3; line-height:1.15; }
        .section-title-italic { font-style:italic; color:#c9a96e; }
        .section-desc { font-size:.82rem; color:#666; margin-top:10px; letter-spacing:.04em; line-height:1.8; max-width:500px; }
        .section-urdu { font-family:'Noto Nastaliq Urdu',serif; font-size:1.1rem; color:#c9a96e; opacity:.5; direction:rtl; margin-top:6px; }

        /* FEATURED EDITORIAL GRID */
        .featured-grid { display:grid; grid-template-columns:1fr 1fr 1fr; grid-template-rows:auto; gap:2px; padding:0 2px; }
        .featured-card { position:relative; overflow:hidden; cursor:pointer; background:#1a1510; }
        .featured-card:first-child { grid-column:1/3; grid-row:1/2; }
        .featured-card img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .6s ease; min-height:400px; }
        .featured-card:first-child img { min-height:560px; }
        .featured-card:hover img { transform:scale(1.04); }
        .featured-overlay { position:absolute; inset:0; background:linear-gradient(180deg,transparent 40%,rgba(14,11,8,.85) 100%); }
        .featured-info { position:absolute; bottom:0; left:0; right:0; padding:24px; }
        .featured-brand { font-size:.6rem; letter-spacing:.2em; text-transform:uppercase; color:#c9a96e; margin-bottom:6px; }
        .featured-name { font-family:'Playfair Display',serif; font-size:1.15rem; font-weight:400; color:#f0ebe3; line-height:1.3; margin-bottom:8px; }
        .featured-price { font-size:.82rem; color:#888; }
        .featured-wish { position:absolute; top:16px; right:16px; background:rgba(14,11,8,.7); border:1px solid rgba(240,235,227,.15); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s; backdrop-filter:blur(4px); z-index:2; }
        .featured-wish:hover { border-color:#c9a96e; }
        .featured-badge { position:absolute; top:16px; left:16px; font-size:.58rem; letter-spacing:.14em; text-transform:uppercase; padding:4px 10px; border-radius:2px; font-weight:500; z-index:2; }

        /* PRODUCT GRID */
        .product-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:2px; padding:2px; }
        .product-card { position:relative; overflow:hidden; cursor:pointer; background:#1a1510; transition:all .3s; }
        .product-card:hover { z-index:2; }
        .product-card img { width:100%; height:360px; object-fit:cover; display:block; transition:transform .5s ease; background:#1a1510; }
        .product-card:hover img { transform:scale(1.04); }
        .product-overlay { position:absolute; inset:0; background:linear-gradient(180deg,transparent 50%,rgba(14,11,8,.9) 100%); opacity:0; transition:opacity .3s; }
        .product-card:hover .product-overlay { opacity:1; }
        .product-info { position:absolute; bottom:0; left:0; right:0; padding:20px; transform:translateY(8px); transition:transform .3s; }
        .product-card:hover .product-info { transform:translateY(0); }
        .product-brand { font-size:.58rem; letter-spacing:.18em; text-transform:uppercase; color:#c9a96e; margin-bottom:4px; }
        .product-name { font-family:'Playfair Display',serif; font-size:1rem; color:#f0ebe3; line-height:1.3; margin-bottom:6px; }
        .product-price { font-size:.8rem; color:#888; margin-bottom:12px; }
        .product-cta { background:#c9a96e; color:#0e0b08; border:none; padding:10px 20px; font-family:'DM Sans',sans-serif; font-size:.68rem; letter-spacing:.15em; text-transform:uppercase; font-weight:500; cursor:pointer; border-radius:2px; transition:all .2s; width:100%; }
        .product-cta:hover { background:#e0c080; }
        .product-wish { position:absolute; top:14px; right:14px; background:rgba(14,11,8,.7); border:1px solid rgba(240,235,227,.15); border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s; backdrop-filter:blur(4px); font-size:.85rem; }
        .product-wish:hover { border-color:#c9a96e; }
        .product-badge { position:absolute; top:14px; left:14px; font-size:.56rem; letter-spacing:.12em; text-transform:uppercase; padding:3px 8px; border-radius:2px; font-weight:500; }

        /* COLLECTION STRIPS */
        .coll-strip { border-top:1px solid rgba(240,235,227,.06); padding:60px 40px; max-width:1400px; margin:0 auto; }
        .coll-strip-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:32px; }
        .coll-strip-title { font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:400; color:#f0ebe3; }
        .coll-strip-title em { color:#c9a96e; font-style:italic; }
        .coll-strip-urdu { font-family:'Noto Nastaliq Urdu',serif; font-size:.9rem; color:#555; direction:rtl; }
        .coll-see-all { font-size:.68rem; letter-spacing:.2em; text-transform:uppercase; color:#555; cursor:pointer; background:none; border:none; font-family:'DM Sans',sans-serif; transition:color .2s; white-space:nowrap; }
        .coll-see-all:hover { color:#c9a96e; }
        .coll-scroll { display:flex; gap:2px; overflow-x:auto; scrollbar-width:none; scroll-snap-type:x mandatory; }
        .coll-scroll::-webkit-scrollbar { display:none; }
        .coll-item { flex-shrink:0; width:260px; position:relative; overflow:hidden; cursor:pointer; scroll-snap-align:start; background:#1a1510; }
        .coll-item img { width:100%; height:320px; object-fit:cover; display:block; transition:transform .5s; }
        .coll-item:hover img { transform:scale(1.04); }
        .coll-item-overlay { position:absolute; inset:0; background:linear-gradient(180deg,transparent 50%,rgba(14,11,8,.88) 100%); }
        .coll-item-info { position:absolute; bottom:0; left:0; right:0; padding:18px; }
        .coll-item-brand { font-size:.56rem; letter-spacing:.16em; text-transform:uppercase; color:#c9a96e; margin-bottom:3px; }
        .coll-item-name { font-family:'Playfair Display',serif; font-size:.9rem; color:#f0ebe3; line-height:1.3; margin-bottom:4px; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
        .coll-item-price { font-size:.75rem; color:#666; }

        /* BRANDS MARQUEE */
        .brands-section { padding:48px 0; border-top:1px solid rgba(240,235,227,.06); border-bottom:1px solid rgba(240,235,227,.06); overflow:hidden; }
        .brands-track { display:flex; gap:60px; animation:marquee 20s linear infinite; white-space:nowrap; }
        .brand-name { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:400; color:#333; letter-spacing:.1em; transition:color .2s; flex-shrink:0; cursor:default; }
        .brand-name:hover { color:#c9a96e; }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* MOOD FILTER BAR */
        .filter-bar { padding:32px 40px 0; max-width:1400px; margin:0 auto; display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        .mood-pill { background:transparent; border:1px solid rgba(240,235,227,.12); color:#666; padding:8px 20px; border-radius:40px; font-family:'DM Sans',sans-serif; font-size:.7rem; letter-spacing:.12em; text-transform:uppercase; cursor:pointer; transition:all .2s; }
        .mood-pill:hover { border-color:#c9a96e; color:#c9a96e; }
        .mood-pill.active { background:#c9a96e; border-color:#c9a96e; color:#0e0b08; font-weight:500; }
        .filter-divider { width:1px; height:20px; background:rgba(240,235,227,.1); margin:0 4px; }
        .cat-pill { background:transparent; border:1px solid rgba(240,235,227,.08); color:#555; padding:8px 16px; border-radius:40px; font-family:'DM Sans',sans-serif; font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; cursor:pointer; transition:all .2s; }
        .cat-pill:hover { border-color:#888; color:#888; }
        .cat-pill.active { border-color:#f0ebe3; color:#f0ebe3; }

        /* MODAL */
        .modal-overlay { position:fixed; inset:0; background:rgba(8,6,4,.85); backdrop-filter:blur(8px); z-index:1000; display:flex; align-items:center; justify-content:center; padding:24px; animation:mfade .25s ease; }
        @keyframes mfade { from{opacity:0} to{opacity:1} }
        .modal { background:#141008; border:1px solid rgba(240,235,227,.08); border-radius:4px; width:100%; max-width:880px; max-height:90vh; overflow-y:auto; display:grid; grid-template-columns:1fr 1fr; animation:mslide .3s ease; }
        @keyframes mslide { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .modal img { width:100%; height:100%; object-fit:cover; min-height:500px; display:block; }
        .modal-body { padding:40px; display:flex; flex-direction:column; justify-content:center; }
        .modal-close { position:absolute; top:20px; right:20px; background:rgba(14,11,8,.8); border:1px solid rgba(240,235,227,.15); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#888; font-size:.9rem; transition:all .2s; }
        .modal-close:hover { border-color:#c9a96e; color:#c9a96e; }
        .modal-brand { font-size:.62rem; letter-spacing:.2em; text-transform:uppercase; color:#c9a96e; margin-bottom:10px; }
        .modal-name { font-family:'Playfair Display',serif; font-size:2rem; font-weight:400; color:#f0ebe3; line-height:1.2; margin-bottom:8px; }
        .modal-price { font-family:'Playfair Display',serif; font-size:1.4rem; color:#f0ebe3; margin-bottom:24px; }
        .modal-detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:28px; padding:20px; background:rgba(240,235,227,.03); border:1px solid rgba(240,235,227,.06); border-radius:3px; }
        .modal-detail-label { font-size:.58rem; letter-spacing:.18em; text-transform:uppercase; color:#444; margin-bottom:4px; }
        .modal-detail-value { font-size:.82rem; color:#c9a96e; font-weight:500; }
        .modal-disclaimer { font-size:.68rem; color:#555; line-height:1.6; margin-bottom:20px; padding:12px 14px; border:1px solid rgba(240,235,227,.06); border-radius:3px; }
        .modal-cta { background:#c9a96e; color:#0e0b08; border:none; padding:15px 24px; font-family:'DM Sans',sans-serif; font-size:.75rem; letter-spacing:.18em; text-transform:uppercase; font-weight:500; cursor:pointer; border-radius:2px; transition:all .22s; width:100%; margin-bottom:10px; }
        .modal-cta:hover { background:#e0c080; }
        .modal-save { background:transparent; color:#888; border:1px solid rgba(240,235,227,.12); padding:12px 24px; font-family:'DM Sans',sans-serif; font-size:.72rem; letter-spacing:.15em; text-transform:uppercase; cursor:pointer; border-radius:2px; transition:all .2s; width:100%; }
        .modal-save:hover { border-color:#c9a96e; color:#c9a96e; }

        /* FOOTER */
        .footer { border-top:1px solid rgba(240,235,227,.06); padding:60px 40px 40px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:40px; max-width:1400px; margin:0 auto; }
        .footer-brand { font-family:'Playfair Display',serif; font-size:1.4rem; color:#f0ebe3; margin-bottom:10px; }
        .footer-brand span { color:#c9a96e; font-style:italic; }
        .footer-tagline { font-size:.72rem; color:#444; letter-spacing:.1em; line-height:1.8; }
        .footer-col-title { font-size:.62rem; letter-spacing:.25em; text-transform:uppercase; color:#c9a96e; margin-bottom:16px; }
        .footer-link { display:block; font-size:.75rem; color:#555; margin-bottom:10px; cursor:pointer; transition:color .2s; text-decoration:none; }
        .footer-link:hover { color:#f0ebe3; }
        .footer-bottom { border-top:1px solid rgba(240,235,227,.04); padding:24px 40px; text-align:center; font-size:.62rem; color:#333; letter-spacing:.1em; max-width:1400px; margin:0 auto; }

        /* ANIMATIONS */
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scrollPulse { 0%,100%{opacity:.3} 50%{opacity:1} }

        @media(max-width:768px) {
          .nav { padding:16px 20px; }
          .nav-links { display:none; }
          .featured-grid { grid-template-columns:1fr; }
          .featured-card:first-child { grid-column:1; }
          .modal { grid-template-columns:1fr; }
          .modal img { min-height:280px; max-height:320px; }
          .footer { grid-template-columns:1fr; }
          .filter-bar { padding:24px 20px 0; }
          .section-header { padding:60px 20px 30px; }
          .coll-strip { padding:40px 20px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="wordmark">Libaas<span>.</span>pk</div>
        <div className="nav-links">
          {["Women","Men","Kids","Jewelry","The Edits"].map(l => (
            <button key={l} className="nav-link">{l}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:"20px", alignItems:"center" }}>
          {wishlist.length > 0 && (
            <span style={{ fontSize:".72rem", color:"#c9a96e", letterSpacing:".06em" }}>♥ {wishlist.length}</span>
          )}
          <button className="nav-link">Saved</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg" />
        <div className="hero-grain" />
        <div className="hero-accent" />
        <div className="hero-content">
          <p className="hero-eyebrow">Pakistan's Editorial Fashion Destination</p>
          <h1 className="hero-title">
            Dress for<br />
            <span className="hero-title-italic">every moment</span>
          </h1>
          <p className="hero-urdu">ہر لمحے کے لیے لباس</p>
          <p className="hero-sub">Curated collections from Pakistan's finest brands — all in one place</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => document.getElementById('featured')?.scrollIntoView({behavior:'smooth'})}>
              Explore The Edit
            </button>
            <button className="btn-outline" onClick={() => document.getElementById('collections')?.scrollIntoView({behavior:'smooth'})}>
              View Collections
            </button>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll</span>
        </div>
      </section>

      {/* ── BRANDS MARQUEE ── */}
      <div className="brands-section">
        <div className="brands-track">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="brand-name">
              {b} <span style={{ color:"#2a2018", margin:"0 0 0 60px" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED EDITORIAL GRID ── */}
      <section id="featured">
        <div className="section-header">
          <p className="section-eyebrow">✦ Editor's Picks</p>
          <h2 className="section-title">The Featured <span className="section-title-italic">Edit</span></h2>
          <p className="section-urdu">خاص انتخاب</p>
          <p className="section-desc">Hand-selected pieces from across Pakistan's most beloved brands</p>
        </div>
        <div className="featured-grid">
          {featuredProducts.map((p, i) => (
            <div key={p.id} className="featured-card" onClick={() => setSelectedProduct(p)}>
              <img src={p.image} alt={p.name} />
              <div className="featured-overlay" />
              <div className="featured-info">
                <div className="featured-brand">{p.brand}</div>
                <div className="featured-name">{p.name}</div>
                <div className="featured-price">Rs. {p.price.toLocaleString()}</div>
              </div>
              {p.badge && (
                <div className="featured-badge" style={{ background: BADGE_STYLES[p.badge]?.bg || "#1a1a1a", color: BADGE_STYLES[p.badge]?.color || "#c9a96e" }}>
                  {p.badge}
                </div>
              )}
              <button className="featured-wish" onClick={e => toggleWish(p.id, e)}>
                <span style={{ color: wishlist.includes(p.id) ? "#c9a96e" : "#666", fontSize:".9rem" }}>
                  {wishlist.includes(p.id) ? "♥" : "♡"}
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section id="collections">
        {COLLECTIONS.map(coll => {
          const items = collectionProducts(coll.mood);
          if (!items.length) return null;
          return (
            <div key={coll.id} className="coll-strip">
              <div className="coll-strip-header">
                <div>
                  <div className="coll-strip-title">
                    {coll.label.split(" ").map((w, i) =>
                      i === coll.label.split(" ").length - 1
                        ? <em key={i}> {w}</em>
                        : <span key={i}>{w} </span>
                    )}
                  </div>
                  <div className="coll-strip-urdu">{coll.urdu}</div>
                  <div style={{ fontSize:".72rem", color:"#555", marginTop:"6px", letterSpacing:".04em" }}>{coll.desc}</div>
                </div>
                <button className="coll-see-all" onClick={() => setActiveMood(coll.mood)}>
                  See All →
                </button>
              </div>
              <div className="coll-scroll">
                {items.map(p => (
                  <div key={p.id} className="coll-item" onClick={() => setSelectedProduct(p)}>
                    <img src={p.image} alt={p.name} />
                    <div className="coll-item-overlay" />
                    <div className="coll-item-info">
                      <div className="coll-item-brand">{p.brand}</div>
                      <div className="coll-item-name">{p.name}</div>
                      <div className="coll-item-price">Rs. {p.price.toLocaleString()}</div>
                    </div>
                    {p.badge && (
                      <div className="featured-badge" style={{ background: BADGE_STYLES[p.badge]?.bg || "#1a1a1a", color: BADGE_STYLES[p.badge]?.color || "#c9a96e", top:12, left:12 }}>
                        {p.badge}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ── BROWSE ALL ── */}
      <section>
        <div className="section-header">
          <p className="section-eyebrow">✦ Browse</p>
          <h2 className="section-title">Shop The <span className="section-title-italic">Collection</span></h2>
        </div>
        <div className="filter-bar">
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {MOODS.map(m => (
              <button key={m} className={`mood-pill ${activeMood === m ? "active" : ""}`} onClick={() => setActiveMood(m)}>{m}</button>
            ))}
          </div>
          <div className="filter-divider" />
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {FILTERS.map(f => (
              <button key={f} className={`cat-pill ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
          <span style={{ marginLeft:"auto", fontSize:".68rem", color:"#444", letterSpacing:".08em" }}>
            {filtered.length} pieces
          </span>
        </div>
        <div style={{ padding:"24px 2px 2px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"80px", color:"#444" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"2rem", marginBottom:"12px", fontStyle:"italic" }}>No pieces found</div>
              <button className="btn-outline" onClick={() => { setActiveMood("All"); setActiveFilter("All"); }}>Clear Filters</button>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map(p => (
                <div key={p.id} className="product-card" onClick={() => setSelectedProduct(p)}>
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <div className="product-overlay" />
                  <div className="product-info">
                    <div className="product-brand">{p.brand}</div>
                    <div className="product-name">{p.name}</div>
                    <div className="product-price">Rs. {p.price.toLocaleString()}</div>
                    <a href={p.product_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }} onClick={e => e.stopPropagation()}>
                      <button className="product-cta">View on {p.brand} →</button>
                    </a>
                  </div>
                  {p.badge && (
                    <div className="product-badge" style={{ background: BADGE_STYLES[p.badge]?.bg || "#1a1a1a", color: BADGE_STYLES[p.badge]?.color || "#c9a96e" }}>
                      {p.badge}
                    </div>
                  )}
                  <button className="product-wish" onClick={e => toggleWish(p.id, e)}>
                    <span style={{ color: wishlist.includes(p.id) ? "#c9a96e" : "#555" }}>
                      {wishlist.includes(p.id) ? "♥" : "♡"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer">
          <div>
            <div className="footer-brand">Libaas<span>.</span>pk</div>
            <p className="footer-tagline">Pakistan's editorial fashion destination. Curated pieces from the brands you love — all in one place.</p>
            <p style={{ fontFamily:"'Noto Nastaliq Urdu',serif", fontSize:".85rem", color:"#333", direction:"rtl", marginTop:"12px" }}>پاکستان کا فیشن</p>
          </div>
          <div>
            <div className="footer-col-title">The Edits</div>
            {COLLECTIONS.map(c => (
              <span key={c.id} className="footer-link" onClick={() => setActiveMood(c.mood)}>{c.label}</span>
            ))}
          </div>
          <div>
            <div className="footer-col-title">Brands</div>
            {BRANDS.slice(0,6).map(b => (
              <span key={b} className="footer-link">{b}</span>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Libaas.pk · Pakistan's Fashion Discovery Engine · All links lead to official brand websites
        </div>
      </footer>

      {/* ── PRODUCT MODAL ── */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setSelectedProduct(null); }}>
          <div className="modal" style={{ position:"relative" }}>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <div className="modal-body">
              <div className="modal-brand">{selectedProduct.brand}</div>
              <h2 className="modal-name">{selectedProduct.name}</h2>
              <div className="modal-price">Rs. {selectedProduct.price.toLocaleString()}</div>
              <div className="modal-detail-grid">
                {[["Mood", selectedProduct.mood], ["Category", selectedProduct.category]].map(([l,v]) => (
                  <div key={l}>
                    <div className="modal-detail-label">{l}</div>
                    <div className="modal-detail-value">{v}</div>
                  </div>
                ))}
              </div>
              <div className="modal-disclaimer">
                ℹ This links to {selectedProduct.brand}'s official website. Stock and pricing are controlled by the brand and may vary.
              </div>
              <a href={selectedProduct.product_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
                <button className="modal-cta">View & Buy on {selectedProduct.brand} →</button>
              </a>
              <button className="modal-save" onClick={e => toggleWish(selectedProduct.id, e)}>
                {wishlist.includes(selectedProduct.id) ? "♥ Saved to Wishlist" : "♡ Save to Wishlist"}
              </button>
            </div>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
