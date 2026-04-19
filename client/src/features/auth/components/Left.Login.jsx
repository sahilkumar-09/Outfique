import React from "react";

const Left = () => {
  return (
    <div className="relative group hidden lg:flex lg:w-1/2 h-screen overflow-hidden">
      <img
        className="  w-full h-full object-cover"
        src="https://i.pinimg.com/736x/66/34/b5/6634b58db1c1f85b094d491f6debc989.jpg"
        alt=""
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Brand */}
      <h1
        className="absolute top-8 left-10 text-[#f0ede8] text-[0.62rem] tracking-[0.35em] uppercase font-semibold"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Outfique
      </h1>

      {/* Bottom tagline */}
      <div className="absolute bottom-12 left-10 right-10">
        <h2
          className="text-[2.6rem] font-bold text-[#f0ede8] uppercase tracking-widest leading-[1.1] mb-3 hover:scale-105 transition-all duration-500 w-fit cursor-default"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Establishing
          <br />
          The New
          <br />
          Vantage.
        </h2>
        <p
          className="text-[0.85rem] text-[#f0ede8]/75 leading-relaxed max-w-xs font-light"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Where craftsmanship meets digital innovation. A curated space for
          visionaries who shape the future of style.
        </p>
      </div>
    </div>
  );
};

export default Left;
