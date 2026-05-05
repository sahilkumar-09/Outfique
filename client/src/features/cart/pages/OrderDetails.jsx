import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      // 🔹 Replace with API
      const dummyOrder = {
        _id: id,
        amount: 2599,
        items: [
          {
            title: "T-Shirt",
            price: 999,
            quantity: 2,
            image: "/outique_editorial_warm.png",
          },
          {
            title: "Jeans",
            price: 601,
            quantity: 1,
            image: "/outique_editorial_warm.png",
          },
        ],
      };

      setOrder(dummyOrder);
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#f6f2eb] text-[#1c1c1c]">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8a7f6e] mb-2">
            Order Details
          </p>
          <h1 className="text-3xl font-light">{order._id}</h1>
          <div className="w-14 h-px bg-[#c8b89a] mt-4" />
        </div>

        {/* Items */}
        <div className="space-y-6">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex gap-5 border-b border-[#ddd3c5] pb-5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div>
                <h2 className="text-lg font-medium">{item.title}</h2>
                <p className="text-sm text-[#6f6658]">
                  Qty: {item.quantity}
                </p>
                <p className="font-semibold">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-8 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{order.amount}</span>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;