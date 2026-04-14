import React from 'react'

const Left = () => {
  return (
    <div className="relative lg:w-1/2 h-[50vh] lg:h-auto md:h-auto flex ">
      <img
        className="grayscale w-full h-auto object-cover "
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMMaxdCACe_dAs_BWPKjx5paDm6QjrCIMHXDiDoQdviHGRz46q_Xaw95ECAbMoa-QkziNc-dzjKyBOvgTnViIB8p5mjzQC1HbEScaGj7I7yrAZuLJFx3rzE4Goi_SBLatrRFj7Ed8Y9JaWeMKwq0cFkP1emsa2br7nbsoQTWWzAYM6NwfxYDjiIfG4RaIXPmUx-vNYs0b01opN2ywLu0WniPZZTonAn30WujJ7cE7wwLFby6Sv8Imklfi_p0XCYp_gk5FUbdOOxRY"
        alt=""
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
        <h1 className="text-3xl lg:text-5xl font-bold tracking-wide">
          THE DIGITAL ATELIER
        </h1>
        <p className="mt-3 text-sm lg:text-base text-gray-300 max-w-md">
          Exclusive access to bespoke collections and curated noir aesthetics.
          Join the circle of the refined.
        </p>
      </div>
    </div>
  );
}

export default Left