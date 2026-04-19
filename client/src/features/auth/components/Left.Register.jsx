// ─── Left.Register.jsx ───────────────────────────────────────────────────────
import React from "react";

export const Left = () => {
  return (
    // hidden on mobile, visible from lg breakpoint
    <div className="relative hidden h-auto  w-full md:w-1/2
 lg:block lg:w-1/2 overflow-hidden">
      <img
        className="w-full h-full object-cover grayscale-[15%] brightness-[0.85] transition-all duration-700"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMMaxdCACe_dAs_BWPKjx5paDm6QjrCIMHXDiDoQdviHGRz46q_Xaw95ECAbMoa-QkziNc-dzjKyBOvgTnViIB8p5mjzQC1HbEScaGj7I7yrAZuLJFx3rzE4Goi_SBLatrRFj7Ed8Y9JaWeMKwq0cFkP1emsa2br7nbsoQTWWzAYM6NwfxYDjiIfG4RaIXPmUx-vNYs0b01opN2ywLu0WniPZZTonAn30WujJ7cE7wwLFby6Sv8Imklfi_p0XCYp_gk5FUbdOOxRY"
        alt="Fashion model"
      />

      {/* Dark gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Brand name top-left */}
      <span
        className="absolute top-8 left-10 text-[#f0ede8] text-[0.62rem] tracking-[0.35em] uppercase font-semibold"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Outfique
      </span>

      {/* Bottom tagline */}
      <div className="absolute bottom-12 left-10 right-10">
        <h2
          className="text-[2.6rem] font-bold text-[#f0ede8] uppercase tracking-widest leading-[1.1] mb-3"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          The Digital
          <br />
          Atelier
        </h2>
        <p
          className="text-[0.85rem] text-[#f0ede8]/75 leading-relaxed max-w-xs font-light"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Exclusive access to bespoke collections and curated noir aesthetics.
          Join the circle of the refined.
        </p>
      </div>
    </div>
  );
};

export default Left;
