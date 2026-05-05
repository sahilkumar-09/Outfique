import React, { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useRazorpay } from "react-razorpay";

const sym = { INR: "₹", JPY: "¥", GBP: "£", EUR: "€", USD: "$" };

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const [cartItem, setCartItem] = useState([]);
  const {
    handleGetAllAddToCart,
    handleIncrementItems,
    handleDecrementItems,
    handleDeleteItems,
    handleAddToCartOrder,
    handleVerifyCartOrderPayment
  } = useCart();

  const { error, isLoading, Razorpay } = useRazorpay();

 

  const navigate = useNavigate();

  useEffect(() => {
     const fetchData = async () => {
       const data = await handleGetAllAddToCart(cartItems);
       setCartItem(data.items);
     };
    fetchData();
  }, []);

  const subtotal = cartItem.reduce((total, item) => {
    return total + item.price.amount * item.quantity;
  }, 0);

  async function handleCheckOut() { 
    const order = await handleAddToCartOrder()
    console.log(order);

    const options = {
      key: "rzp_test_Skzbfc4S9CRuaF",
      amount: order.amount,
      currency: order.currency,
      name: "Outfique",
      description: "Test Transaction",
      order_id: order.id,
      handler:  async (response) => {
        const isValid = await handleVerifyCartOrderPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        })

        if (isValid) {
         navigate(`/order/success?order_id=${response?.razorpay_order_id}`)
        }
      },
      prefill: {
        name: user?.fullName,
        email: user?.email,
        contact: user?.contact || ""
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  }

 return (
    <div className="min-h-screen bg-[#f6f2eb] text-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8a7f6e] mb-2">
            Your Selection
          </p>
          <h1 className="text-4xl md:text-5xl font-light">Shopping Cart</h1>
          <div className="w-14 h-px bg-[#c8b89a] mt-4" />
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12">
          {/* Cart Items */}
          <div className="space-y-6">
            {cartItem?.map((item) => {
              const product = item.productId;
              const selectedVariant = product.variants
              const image =
                product.productImages[0]?.url || "/outique_editorial_warm.png";
              const variantPrice = product.price
              const cartPrice = item.price

              return (
                <div
                  key={item._id}
                  className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-5 border-b border-[#ddd3c5] pb-6"
                >
                  {/* Product Image */}
                  <div className="bg-[#ece7df] overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg md:text-xl font-medium mb-2">
                        {product.title}
                      </h2>

                      <div className="flex flex-wrap gap-4 text-sm text-[#6f6658] mb-3 uppercase tracking-wide">
                        {selectedVariant &&
                          Object.entries(selectedVariant.attributes).map(
                            ([key, value]) => (
                              <span key={key}>
                                {key}: {value}
                              </span>
                            ),
                          )}
                      </div>

                      <p className="text-lg font-semibold text-[#1c1c1c]">
                        {sym[variantPrice?.currency]}
                        {variantPrice ? variantPrice.amount : "—"}
                      </p>
                      <small
                        className="text-[#a5a19b]
  tracking-[0.15em] uppercase"
                      >
                        Stocks -{" "}
                        <span className="font-semibold">
                          {selectedVariant.stock}
                        </span>
                      </small>

                      {variantPrice?.amount !== cartPrice?.amount && (
                        <div className="flex items-center gap-3 mt-1.5">
                           <div className="text-xs font-semibold tracking-wide">
                            {variantPrice.amount < cartPrice.amount ? (
                              <span className="text-red-500">Price Increased to {sym[variantPrice.currency]}{cartPrice.amount}</span>
                            ) : (
                              <span className="text-green-500">Price Dropped to {sym[variantPrice.currency]}{cartPrice.amount}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-[#d6d0c7] overflow-hidden rounded-full">
                        <button
                          onClick={() => {
                            handleDecrementItems({
                              productId: product._id,
                              variantId: item.variantId,
                            });

                            setCartItem((prev) =>
                              prev.map((cart) =>
                                cart.productId._id === product._id &&
                                cart.variantId === item.variantId
                                  ? { ...cart, quantity: cart.quantity - 1 }
                                  : cart,
                              ),
                            );
                          }}
                          disabled={item.quantity <= 1}
                          className="cursor-pointer px-3 py-2 hover:bg-[#ece7df] disabled:opacity-40 disabled:cursor-not-allowed "
                        >
                          −
                        </button>
                        <span className="px-4  py-2 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            handleIncrementItems({
                              productId: product._id,
                              variantId: item.variantId,
                            });

                            setCartItem((prev) =>
                              prev.map((cart) =>
                                cart.productId._id === product._id &&
                                cart.variantId === item.variantId
                                  ? { ...cart, quantity: cart.quantity + 1 }
                                  : cart,
                              ),
                            );
                          }}
                          disabled={selectedVariant.stock <= item.quantity}
                          className="cursor-pointer px-3 py-2 hover:bg-[#ece7df] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="cursor-pointer h-5 w-5 text-sm uppercase tracking-[0.18em] text-[#8a7f6e] hover:text-[#1c1c1c]"
                        onClick={() => {
                          handleDeleteItems({
                            productId: product._id,
                            variantId: item.variantId,
                          });

                          setCartItem((prev) =>
                            prev.filter(
                              (cart) =>
                                !(
                                  cart.productId._id === product._id &&
                                  cart.variantId === item.variantId
                                ),
                            ),
                          );
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-[#f8f6f2] border border-[#ddd3c5] p-6 h-fit sticky top-10">
            <p className="text-4xl uppercase tracking-[0.15em] text-[#8a7f6e] mb-4">
              The Total
            </p>

            <div className="w-full mb-3 h-px bg-[#c8b89a] mt-4" />

            <div className="space-y-4 border-b border-[#d8cec0] pb-5">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span></span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between mt-5 mb-6 text-lg font-semibold">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex flex-col w-full gap-2">
             <button className="w-full py-4 bg-[#1c1c1c] text-white text-xs uppercase tracking-[0.25em] hover:bg-[#333]  active:scale-95 cursor-pointer transition-all" onClick={() => {
                handleCheckOut()
              }}>
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 py-4 border border-[#1c1c1c] text-[#1c1c1c] text-xs tracking-[0.25em] uppercase hover:bg-[#eeeeee] active:scale-95 cursor-pointer transition-all"
              >
                Continue Shoping
              </button>
            </div>
            <p className="text-xs text-[#8a7f6e] mt-4 text-center leading-relaxed">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Cart;
