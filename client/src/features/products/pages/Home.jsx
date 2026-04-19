import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const products = useSelector((state) => state.product.allProducts);
  const user = useSelector((state) => state.auth.user);
  const { handleGetAllProducts } = useProduct();

  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-[#C9A96E]/30"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Navbar */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          {/* Hero Section */}
          <div className="pt-12 sm:pt-20 pb-14 sm:pb-20 text-center flex flex-col items-center">
            <span
              className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium mb-4 sm:mb-6"
              style={{ color: "#C9A96E" }}
            >
              The Collection
            </span>

            <h1
              className="text-3xl sm:text-5xl lg:text-7xl font-light leading-tight mb-4 sm:mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#1b1c1a",
              }}
            >
              Curated Archive
            </h1>

            <p
              className="max-w-xl mx-auto text-xs sm:text-base leading-relaxed px-2"
              style={{ color: "#7A6E63" }}
            >
              Discover our latest curation of premium minimalist pieces,
              meticulously designed for effortless elegance and enduring
              quality.
            </p>
          </div>

          {/* Product Grid */}
          {products && products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-x-8 lg:gap-y-14 pb-20 sm:pb-32">
              {products.map((product) => {
                const imageUrl =
                  product.productImages && product.productImages.length > 0
                    ? product.productImages[0].url
                    : "/snitch_editorial_warm.png";

                return (
                  <div
                    onClick={() => navigate(`/product/${product._id}`)}
                    key={product._id}
                    className="group cursor-pointer flex flex-col"
                  >
                    {/* Product Image */}
                    <div
                      className="aspect-[4/5] overflow-hidden mb-3 sm:mb-6"
                      style={{ backgroundColor: "#f5f3f0" }}
                    >
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <h3
                        className="text-sm sm:text-xl leading-snug transition-colors duration-300 group-hover:text-[#C9A96E]"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          color: "#1b1c1a",
                        }}
                      >
                        {product.title}
                      </h3>

                      <p
                        className="text-[10px] sm:text-sm line-clamp-2 leading-relaxed"
                        style={{ color: "#7A6E63" }}
                      >
                        {product.description}
                      </p>

                      <div className="mt-1 sm:mt-2">
                        <span
                          className="text-[9px] sm:text-xs uppercase tracking-[0.1em] font-medium"
                          style={{ color: "#1b1c1a" }}
                        >
                          {product.price?.currency}{" "}
                          {product.price?.amount?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 sm:py-24 text-center flex flex-col items-center">
              <h2
                className="text-xl sm:text-2xl mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1b1c1a",
                }}
              >
                No pieces available.
              </h2>

              <p
                className="max-w-md mx-auto text-sm leading-relaxed px-4"
                style={{ color: "#7A6E63" }}
              >
                We are currently preparing our next collection. Please check
                back later.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer
          className="border-t py-8 sm:py-12 text-center"
          style={{ borderColor: "#e4e2df" }}
        >
          <span
            className="text-[10px] sm:text-xs uppercase tracking-[0.25em]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#C9A96E",
            }}
          >
            Snitch. © {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    </>
  );
};

export default Home;
