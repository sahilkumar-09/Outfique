import React, { useEffect } from "react";
import { useWishlist } from "../hooks/useWishlist";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const items = useSelector(state => state.wishlist.items)
  const { handleGetWishlist, handleDeleteWishlist } = useWishlist();



  useEffect(() => {
    handleGetWishlist()
  }, []);


  const navigate = useNavigate()
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen bg-[#fbf9f6] px-4 sm:px-8 lg:px-16 py-12"
        style={{
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* HEADER */}
        <div className="text-center mb-16">


          <div className="flex justify-center mt-6">
            <i className="ri-heart-3-line text-5xl text-black"></i>
          </div>

          <h1
            className="text-5xl sm:text-6xl mt-5 font-semibold text-[#1b1c1a]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Style List
          </h1>
        </div>

        {/* TABLE HEADER */}
        <div
          className="hidden md:grid grid-cols-[80px_1.5fr_1fr_1fr_1fr] 
    border-b border-gray-300 pb-4 text-sm uppercase tracking-wide text-gray-500"
        >
          <div></div>
          <div>Product Name</div>
          <div>Unit Price</div>
          <div>Stock Status</div>
          <div></div>
        </div>

        {/* ITEMS */}
        <div className="mt-2 flex flex-col gap-5">
          {items?.map((item) => {
            const product = item.productId;

            const variant = product?.variants?.find(
              (v) => v._id === item.variantId,
            );

            return (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-[80px_1.5fr_1fr_1fr_1fr] 
          items-center gap-5 border-b border-gray-200 pb-6"
              >
                {/* DELETE */}
                <button
                  className="w-10 h-10 border border-gray-300 
            flex items-center justify-center hover:bg-black 
            hover:text-white transition-all duration-300"
                  onClick={() => {
                    handleDeleteWishlist(product._id, variant?._id);
                  }}
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
                {/* PRODUCT */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-24 h-28 bg-gray-100 overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 rounded-2xl"
                    onClick={() => {
                      navigate(`/product/${product._id}`);
                    }}
                  >
                    <img
                      src={
                        variant?.productImages?.[0]?.url ||
                        product?.productImages?.[0]?.url
                      }
                      alt={product?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h2
                      className="text-xl text-[#1b1c1a]"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {product?.title}
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {variant?.attributes &&
                        Object.entries(variant.attributes).map(
                          ([key, value]) => (
                            <span
                              key={key}
                              className="px-3 py-1 border border-gray-200 text-xs uppercase tracking-wide"
                            >
                              {value}
                            </span>
                          ),
                        )}
                    </div>
                  </div>
                </div>

                {/* PRICE */}
                <div className="text-lg font-medium text-[#1b1c1a]">
                  ₹
                  {variant?.price?.amount?.toLocaleString() ||
                    product?.price?.amount?.toLocaleString()}
                </div>

                {/* STOCK */}
                <div>
                  <span
                    className="px-4 py-2 border border-black 
              text-sm uppercase tracking-wide"
                  >
                    In Stock
                  </span>
                </div>

                {/* BUTTON */}
                <div>
                  <button
                    className="bg-black text-white px-8 py-3 
              uppercase tracking-[0.15em] text-xs 
              hover:bg-[#1b1c1a] transition-all duration-300 active:scale-95 cursor-pointer"
                    onClick={() => {
                      navigate("/cart")
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY */}
        {items?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28">
            <div
              className="w-24 h-24 border border-gray-300 
        flex items-center justify-center"
            >
              <i className="ri-heart-3-line text-4xl text-gray-400"></i>
            </div>

            <h2
              className="text-4xl mt-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mt-3">
              Save your favorite pieces here.
            </p>

            <button
              className="mt-8 bg-black text-white px-10 py-4 
        uppercase tracking-[0.2em] text-xs cursor-pointer"
              onClick={() => {
                navigate('/')
              }}
            >
              Explore Collection
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
