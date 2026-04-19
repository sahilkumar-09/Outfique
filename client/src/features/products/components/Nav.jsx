import React from 'react'
import { Link } from "react-router"
import { useSelector } from 'react-redux'

const Nav = () => {
      const user = useSelector((state) => state.auth.user);
        
  return (
      <div>
          <nav
          className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-5 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b"
          style={{ borderColor: "#e4e2df" }}
        >
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

          <div
            className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium"
            style={{ color: "#7A6E63" }}
          >
            {user ? (
              <>
                <span className="text-center" style={{ color: "#1b1c1a" }}>
                  {user.fullname}
                </span>
                {user.role === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    className="transition-colors hover:text-[#C9A96E]"
                  >
                    Seller Dashboard
                  </Link>
                )}
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
  )
}

export default Nav