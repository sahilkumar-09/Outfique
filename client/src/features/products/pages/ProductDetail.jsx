import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../hooks/useProduct";
import Nav from "../components/Nav";

const sym = { INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥" };

const ProductDetail = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState(null);

  const { handleGetProductById } = useProduct();
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const data = await handleGetProductById(productId);
      setProduct(data);
    };
    fetch();
  }, [productId]);

  const images = product?.productImages ?? [];
  const currency = sym[product?.price?.currency] ?? product?.price?.currency;

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div
      className="min-h-screen bg-[#f0ede8]"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      <Nav />

      {!product && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xs tracking-[0.25em] uppercase text-[#8a7f6e]">
            Loading...
          </p>
        </div>
      )}

      {product && (
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10 lg:py-14">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[#8a7f6e] hover:text-[#1c1c1c] transition-colors cursor-pointer mb-6 md:mb-8"
          >
            ← Back
          </button>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20">
            {/* IMAGE SECTION */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Thumbnails */}
              <div className="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[520px]">
                {images.map((img, i) => (
                  <button
                    key={img._id}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      activeImage === i
                        ? "border-[#1c1c1c] opacity-100"
                        : "border-transparent opacity-40 hover:opacity-70"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div
                className="order-1 lg:order-2 relative overflow-hidden bg-[#e8e4de] group w-full rounded-sm aspect-2/3"
                style={{
                  height: "clamp(550px, 65vw, 540px)",
                  maxWidth: "420px",
                }}
              >
                {images.length > 0 && (
                  <img
                    src={images[activeImage]?.url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                )}

                {/* Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 bg-[#f0ede8]/80 hover:bg-[#f0ede8] p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                    >
                      <i className="ri-arrow-left-s-line text-lg text-[#1c1c1c]" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-[#f0ede8]/80 hover:bg-[#f0ede8] p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                    >
                      <i className="ri-arrow-right-s-line text-lg text-[#1c1c1c]" />
                    </button>
                  </>
                )}

                {/* Counter */}
                <span className="absolute bottom-3 right-3 text-[10px] sm:text-xs tracking-[0.15em] uppercase bg-[#f0ede8]/90 text-[#1c1c1c] px-2 py-1">
                  {activeImage + 1} / {images.length}
                </span>
              </div>
            </div>

            {/* DETAILS SECTION */}
            <div className="flex flex-col justify-center gap-5 md:gap-6">
              {/* Title */}
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#8a7f6e] mb-2">
                  Premium Collection
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#1c1c1c] leading-tight tracking-wide mb-3">
                  {product.title}
                </h1>
                <div className="w-10 h-px bg-[#c4b99a]" />
              </div>

              {/* Price */}
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#8a7f6e] mb-1">
                  Price
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1c1c1c]">
                  {currency}
                  {product.price?.amount?.toLocaleString()}
                </p>
              </div>

              <div className="w-full h-px bg-[#e0dbd3]" />

              {/* Description */}
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#8a7f6e] mb-3">
                  Description
                </p>
                <p className="text-sm sm:text-base md:text-lg text-[#8a7f6e] font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-2 text-[11px] sm:text-xs tracking-[0.15em] uppercase text-[#b5aa96] border-t border-[#e0dbd3] pt-4">
                <span>
                  {images.length} product photo{images.length !== 1 ? "s" : ""}
                </span>
                <span>
                  Listed{" "}
                  {new Date(product.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button className="flex-1 py-3 md:py-4 bg-[#1c1c1c] text-[#f0ede8] text-xs tracking-[0.25em] uppercase hover:bg-transparent hover:border hover:border-[#1c1c1c] hover:text-[#1c1c1c] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
                  <i className="ri-shopping-cart-line text-base" />
                  Add to Cart
                </button>

                <button className="flex-1 py-3 md:py-4 border border-[#1c1c1c] text-[#1c1c1c] text-xs tracking-[0.25em] uppercase hover:bg-[#1c1c1c] hover:text-[#f0ede8] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
                  <i className="ri-flashlight-line text-base" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-[#e0dbd3] px-4 sm:px-8 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 mt-10">
        <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#b5aa96] text-center">
          © 2026 Outfique
        </span>
        <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#b5aa96] text-center">
          The Digital Atelier
        </span>
      </div>
    </div>
  );
};

export default ProductDetail;
