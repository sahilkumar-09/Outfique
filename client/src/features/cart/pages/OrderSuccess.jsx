import React from "react";
import { useLocation, useNavigate } from "react-router";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");

  return (
    <div className="min-h-screen bg-[#f6f2eb] text-[#1c1c1c] flex items-center justify-center">
      <div className="max-w-2xl w-full bg-[#f8f6f2] border border-[#ddd3c5] p-10 text-center rounded-xl shadow-sm">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-light mb-3">
          Order Confirmed
        </h1>

        <p className="text-[#6f6658] mb-6 text-sm tracking-wide">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {/* Divider */}
        <div className="w-14 h-px bg-[#c8b89a] mx-auto mb-6" />

        {/* Order ID */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8a7f6e] mb-2">
            Order ID
          </p>
          <p className="text-lg font-semibold break-all">{orderId}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#1c1c1c] text-white text-xs uppercase tracking-[0.25em] hover:bg-[#333] transition-all"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/view-orders")}
            className="px-6 py-3 border border-[#1c1c1c] text-[#1c1c1c] text-xs uppercase tracking-[0.25em] hover:bg-[#eeeeee] transition-all"
          >
            View Orders
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-[#8a7f6e] mt-6">
          A confirmation email has been sent to your registered email.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
