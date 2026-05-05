import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // 🔹 Replace with API call
  useEffect(() => {
    const fetchOrders = async () => {
      // Example response (replace with backend)
      const dummyOrders = [
        {
          _id: "order_123",
          amount: 2599,
          createdAt: new Date(),
          status: "Paid",
        },
        {
          _id: "order_456",
          amount: 1499,
          createdAt: new Date(),
          status: "Paid",
        },
      ];
      setOrders(dummyOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f2eb] text-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8a7f6e] mb-2">
            Your Orders
          </p>
          <h1 className="text-4xl font-light">Order History</h1>
          <div className="w-14 h-px bg-[#c8b89a] mt-4" />
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#f8f6f2] border border-[#ddd3c5] p-6 rounded-xl"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <p className="text-xs text-[#8a7f6e] uppercase tracking-wide">
                    Order ID
                  </p>
                  <p className="font-semibold">{order._id}</p>

                  <p className="text-xs text-[#8a7f6e] mt-2 uppercase tracking-wide">
                    Date
                  </p>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-xs text-[#8a7f6e] uppercase tracking-wide">
                    Total
                  </p>
                  <p className="text-lg font-semibold">₹{order.amount}</p>

                  <p className="text-xs text-[#8a7f6e] mt-2 uppercase tracking-wide">
                    Status
                  </p>
                  <p className="text-green-600 font-medium">{order.status}</p>
                </div>
              </div>

              {/* Button */}
              <div className="mt-5">
                <button
                  onClick={() => navigate(`/orders/${order._id}`)}
                  className="px-6 py-3 bg-[#1c1c1c] text-white text-xs uppercase tracking-[0.25em] hover:bg-[#333]"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
