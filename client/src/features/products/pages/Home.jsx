import { useEffect, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────
const CATEGORIES = ["ALL", "TEES", "DENIM", "OUTERWEAR", "TROUSERS", "ARCHIVE"];

const FEATURED = [
  {
    id: 1,
    title: "Structural Oversized Tee",
    price: "€120",
    meta: "NEW / HEAVY COTTON",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Brutalist Raw Denim",
    price: "€245",
    meta: "DENIM / 24SS",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Archive Cargo Trouser",
    price: "€185",
    meta: "OLIVE / TECH-NYLON",
    img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Signature Trench Coat",
    price: "€420",
    meta: "BONE / WEATHER-PROOF",
    img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1400&auto=format&fit=crop",
  },
];

const PRODUCTS = FEATURED; // reuse for the grid below

// ─── Carousel ─────────────────────────────────────────────────────────────
const FeaturedCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % FEATURED.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden border-b border-white/10">
      <div className="relative h-[420px] sm:h-[520px]">
        {FEATURED.map((item, i) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-6 sm:left-10">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#e63b1f] mb-2">
                Featured
              </p>
              <h3
                className="text-white text-3xl sm:text-5xl font-black uppercase leading-none mb-2"
                style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-zinc-300 text-sm font-semibold">{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 right-6 sm:right-10 flex gap-2">
        {FEATURED.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-[#e63b1f]" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// ─── Category Bar ───────────────────────────────────────────────────────────
const CategoryBar = ({ active, onSelect }) => (
  <nav className="w-full border-b border-white/10 bg-[#141414]">
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect(cat)}
          className={`relative whitespace-nowrap px-4 py-3 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-200 ${
            active === cat
              ? "text-white"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {cat}
          {active === cat && (
            <span className="absolute left-4 right-4 bottom-0 h-[2px] bg-[#e63b1f]" />
          )}
        </button>
      ))}
    </div>
  </nav>
);

// ─── Product Card ────────────────────────────────────────────────────────────
const ProductCard = ({ item }) => (
  <div className="relative group">
    <div className="relative overflow-hidden bg-[#1a1a1a] aspect-[3/4]">
      <img
        src={item.img}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <button
        type="button"
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:text-[#e63b1f] hover:border-[#e63b1f]/50 transition-all duration-200"
      >
        <i className="ri-heart-3-line text-[15px]" />
      </button>
    </div>
    <div className="flex items-start justify-between pt-3">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-wide text-white">
          {item.title}
        </p>
        <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 mt-1">
          {item.meta}
        </p>
      </div>
      <span className="text-[13px] font-bold text-[#e63b1f] flex-shrink-0 ml-3">
        {item.price}
      </span>
    </div>
  </div>
);

// ─── Home Page ────────────────────────────────────────────────────────────────
const Home = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="bg-[#0d0d0d] min-h-screen text-white">
        {/* ══════ CATEGORY NAV (replaces logo block) ══════ */}
        <CategoryBar active={activeCategory} onSelect={setActiveCategory} />

        {/* ══════ FEATURED CAROUSEL ══════ */}
        <FeaturedCarousel />

        {/* ══════ ABOUT / INFO STRIP ══════ */}
        <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[11px] uppercase tracking-[0.15em]">
          <div>
            <p className="text-zinc-500 mb-1">Outfit</p>
            <p className="text-zinc-300 font-semibold normal-case tracking-normal leading-relaxed text-[12px]">
              Created by the +helloHello team, this store and signature
              collection celebrates our collective creativity and passion for
              apparel. Carefully designed with industrial silhouettes and
              brutalist aesthetics.
            </p>
          </div>
          <div className="sm:text-right sm:col-start-3">
            <p className="text-zinc-500 mb-1">Visit ++ Website</p>
            <p className="text-zinc-400 normal-case tracking-normal text-[12px]">
              Shipping &amp; returns
              <br />
              © 2026
            </p>
          </div>
        </section>

        {/* ══════ PRODUCT GRID ══════ */}
        <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PRODUCTS.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* ══════ JOIN THE ARCHIVE ══════ */}
        <section className="bg-[#141414] border-t border-white/10 py-16 text-center px-4">
          <h2
            className="text-3xl sm:text-5xl font-black uppercase tracking-wide mb-3"
            style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif" }}
          >
            Join The Archive
          </h2>
          <p className="text-zinc-400 text-sm mb-6">
            Sign up for early access to drops and exclusive editorial content.
          </p>
          <div className="max-w-md mx-auto flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full h-11 px-4 rounded-md bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-zinc-500 text-center focus:outline-none focus:border-[#e63b1f]/50"
            />
            <button
              type="button"
              className="w-full h-11 rounded-md bg-white text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors duration-200"
            >
              Subscribe
            </button>
          </div>
        </section>

        {/* ══════ FOOTER ══════ */}
        <footer className="bg-[#0d0d0d] border-t border-white/10 py-10 px-4 sm:px-6">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-[11px]">
            <div>
              <p
                className="text-lg font-black uppercase mb-3"
                style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif" }}
              >
                OUTFIT
              </p>
              <p className="text-zinc-500 tracking-wide">© 2026 OUTFIT ARCHIVE</p>
            </div>
            <div>
              <p className="text-zinc-500 font-bold tracking-[0.2em] uppercase mb-3">
                Pages
              </p>
              <ul className="space-y-2 text-zinc-400">
                <li>Mission</li>
                <li>Shipping &amp; Returns</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div>
              <p className="text-zinc-500 font-bold tracking-[0.2em] uppercase mb-3">
                Social
              </p>
              <ul className="space-y-2 text-zinc-400">
                <li>Instagram</li>
                <li>TikTok</li>
              </ul>
            </div>
            <div>
              <p className="text-zinc-500 font-bold tracking-[0.2em] uppercase mb-3">
                Location
              </p>
              <ul className="space-y-2 text-zinc-400">
                <li>Berlin, DE</li>
                <li>10115 Mitte</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;