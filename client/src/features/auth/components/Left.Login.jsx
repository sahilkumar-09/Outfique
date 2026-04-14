import React from "react";

const Left = () => {
  return (
    <div className="relative group lg:w-1/2 h-[50vh] lg:h-auto md:h-auto flex ">
      <img
        className="grayscale group-hover:grayscale-0 transition duration-500 ease-in-out blur-[1px]group-hover:blur-none  w-full h-auto object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv3bAG5WVvRhHBQDwRGBthH5pAqTJv3Un45f0fWbwyJlAccoVuN2hV7K9nTE2zb7PIGmzyPuTdWuaLeVPuDjWOqr7YbDHFizxziL7lOByhXHggMGjA1njCSN0YpbLM7v0lWRZz4OtDJzJG0ElKO2FCTbrhLfb963cqqR3EgY007TcqAQlAJ6erDauHIaYdskylhFI3k-kyoKcrBzS_K2jPw0qWrpYMzHxGCsB_ClwxlF_QBBzZ_4Jr2KAMIaF4JUqsgNejDFIjEII"
        alt=""
      />
      <h1 className="absolute top-2 left-2 text-yellow-500 text-xl font-medium uppercase tracking-widest">
        Outfique
      </h1>
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
        <h1 className="text-3xl lg:text-5xl font-bold tracking-wide hover:scale-115 transition-all duration-600 w-fit cursor-auto">
          ESTABLISHING THE NEW VANTAGE.
        </h1>
        <p className="mt-3 text-sm lg:text-base text-gray-300 max-w-md">
          Where craftsmanship meets digital innovation. A curated space for
          visionaries who shape the future of style.
        </p>
      </div>
    </div>
  );
};

export default Left;
