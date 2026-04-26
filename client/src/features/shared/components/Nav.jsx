import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const Nav = () => {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector(state => state.cart.items)
  
  const cartCount = cartItems?.length || 0
  console.log(cartCount)
  return (
    <div className="bg-[#F6F2EB]">
      <nav className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-5 sm:py-8 flex flex-row items-center justify-between gap-4 border-b border-[#ccb58a]">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg sm:text-xl font-medium tracking-[0.25em] uppercase hover:opacity-80 transition-opacity"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#C9A96E",
          }}
        >
          Outfique.
        </Link>

        {/* Right Section */}
        <div
          className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium"
          style={{ color: "#7A6E63" }}
        >
          {user ? (
            <>
              <span style={{ color: "#1b1c1a" }}>{user.fullname}</span>

              {user.role === "seller" && (
                <Link
                  to="/seller/dashboard"
                  className="transition-colors hover:text-[#C9A96E]"
                >
                  Seller Dashboard
                </Link>
              )}

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="w-5 h-5 hover:text-[#C9A96E] transition-colors relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full"
                >
                  <path d="M6.00488 9H19.9433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V9ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-3 -right-3  text-[12px] font-bold  min-w-[16px] h-4 px-1 flex items-center justify-center text-zinc-700 ">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/auth/user/login"
                className="transition-colors hover:text-[#C9A96E]"
              >
                Sign In
              </Link>

              <Link
                to="/auth/user/register"
                className="transition-colors hover:text-[#C9A96E]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
