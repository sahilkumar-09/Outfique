import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const messages = [
  "Page not found 😅",
  "Did you get lost? 🗺️",
  "Nothing here at all!",
  "Check the URL? 🔍",
  "I've waited so long…",
  "Any doubt? Ask me! 🙋",
  "It's gone. Bye! 👋",
  "404 is my home now 🏠",
];

const NotFound = () => {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loader
    setTimeout(() => setLoading(false), 800);

    // Message rotation
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex items-center justify-center relative overflow-hidden">
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FFF8F3] z-50">
          <div className="w-14 h-14 border-4 border-[#FFE0D0] border-t-[#FF7043] rounded-full animate-spin" />
        </div>
      )}

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-70 animate-[float_8s_linear_infinite]"
          style={{
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 40}px`,
            backgroundColor: ["#FF7043", "#FFB300", "#42A5F5", "#66BB6A"][
              i % 4
            ],
            animationDuration: `${6 + Math.random() * 6}s`,
          }}
        />
      ))}

      {/* Main Content */}
      <div
        className={`text-center transition-all duration-700 ${loading ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
      >
        {/* 404 */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-[120px] md:text-[160px] font-black text-[#2B2B2B]">
            4
          </span>

          {/* O with face */}
          <div className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px]">
            {/* Ring */}
            <div className="w-full h-full border-[10px] md:border-[14px] border-[#2B2B2B] rounded-full bg-white shadow-[4px_4px_0_#2B2B2B]" />

            {/* Face */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex gap-3 mb-2">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              </div>
              <div className="w-6 h-3 border-b-2 border-black rounded-b-full"></div>
            </div>
          </div>

          <span className="text-[120px] md:text-[160px] font-black text-[#2B2B2B]">
            4
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-6 text-gray-500 font-semibold text-lg">
          Oops! <span className="text-[#FF7043]">Page not found.</span>
        </p>

        {/* Rotating message */}
        <p className="mt-2 text-sm text-gray-400 transition-opacity duration-300">
          {messages[msgIndex]}
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-8 py-3 bg-[#FF7043] text-white rounded-full font-semibold shadow-md hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
        >
          ← Go Back Home
        </button>
      </div>

      {/* Custom animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); opacity: 0.8; }
            100% { transform: translateY(-110vh); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
