import React, { useState } from "react";
import Nav from "../components/Nav";

import { useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";

const productImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
  "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
];

const ProductDetail = () => {
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1,
    );
    };

    const { handleGetProductById } = useProduct();
    
    const { productId } = useParams()
    console.log(productId)
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
            fontFamily: "'Inter', serif",
          }}
        >
          <Nav />

          <div className="w-full px-4 sm:px-6 md:px-10 py-6 md:py-10 flex justify-center">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-4 sm:p-6 md:p-8">
              {/* IMAGE SECTION */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnails */}
                <div className="order-2 md:order-1 flex md:flex-col gap-3 md:w-[18%] overflow-x-auto md:overflow-y-auto md:h-[70vh] p-2 rounded-2xl bg-[#f9f3e9]">
                  {productImages.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`min-w-[70px] h-20 sm:h-24 md:h-28 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 shrink-0 ${
                        activeImage === index
                          ? "border-[#C9A96E] scale-105"
                          : "border-transparent hover:border-[#d8c09a]"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Main Image */}
                <div className="order-1 md:order-2 relative w-full md:w-[82%] h-[300px] sm:h-[450px] md:h-[70vh] rounded-2xl md:rounded-3xl overflow-hidden bg-[#f7f2ea] group">
                  <img
                    src={productImages[activeImage]}
                    alt="product"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />

                  {/* Left Arrow */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg p-2 md:p-3 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
                  >
                    <i className="ri-arrow-left-s-line text-lg md:text-2xl text-black"></i>
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={nextImage}
                    className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg p-2 md:p-3 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
                  >
                    <i className="ri-arrow-right-s-line text-lg md:text-2xl text-black"></i>
                  </button>
                </div>
              </div>

              {/* DETAILS SECTION */}
              <div className="flex flex-col justify-center px-1 sm:px-2 md:px-4">
                <p className="text-xs sm:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#C9A96E] font-medium">
                  Premium Collection
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1f1f1f] mt-3 md:mt-4 leading-tight">
                  Relaxed Fit Lounge Pants
                </h1>

                <p className="text-2xl sm:text-3xl font-bold text-[#1f1f1f] mt-4 md:mt-6">
                  ₹899
                </p>

                <p className="text-[#666] text-sm sm:text-base md:text-lg leading-relaxed mt-4 md:mt-6 max-w-lg">
                  Crafted from soft breathable cotton, these lounge pants offer
                  exceptional comfort with a refined relaxed silhouette—perfect
                  for effortless everyday wear.
                </p>

                <button className="mt-6 md:mt-10 w-full sm:w-fit px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl bg-[#1f1f1f] text-white tracking-[0.2em] md:tracking-[0.25em] uppercase text-xs sm:text-sm hover:bg-[#333] hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 md:gap-3">
                  <i className="ri-shopping-cart-line text-base md:text-lg"></i>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default ProductDetail;
