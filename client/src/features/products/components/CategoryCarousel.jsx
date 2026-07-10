import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProduct } from "../hooks/useProduct";

const CategoryCarousel = () => {
  const { handleGetAllCategory } = useProduct();

  const [categoryData, setCategoryData] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);

  const intervalRef = useRef(null);
  const isAnimating = useRef(false);

  // ---------------- Fetch ----------------
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await handleGetAllCategory();
        setCategoryData(res || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategoryData();
  }, []);

  const total = categoryData.length;

  // ---------------- Navigation ----------------
  const go = (dir) => {
    if (isAnimating.current || total <= 1) return;
    isAnimating.current = true;
    setActiveIdx((prev) => (prev + dir + total) % total);
    setTimeout(() => (isAnimating.current = false), 500);
  };

  // ---------------- Auto Scroll ----------------
  useEffect(() => {
    if (!total) return;
    intervalRef.current = setInterval(() => go(1), 3000);
    return () => clearInterval(intervalRef.current);
  }, [total]);

  const pauseAuto = () => clearInterval(intervalRef.current);
  const resumeAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => go(1), 3000);
  };

  if (!total) return null;

  const getCard = (offset) =>
    categoryData[(activeIdx + offset + total) % total];

  const slots = [
    {
      offset: -2,
      width: "w-[70px] md:w-[90px]",
      height: "h-[180px] md:h-[230px]",
      opacity: 0.35,
      scale: 0.8,
      blur: true,
      z: 1,
    },
    {
      offset: -1,
      width: "w-[140px] md:w-[180px]",
      height: "h-[300px] md:h-[380px]",
      opacity: 0.7,
      scale: 0.92,
      blur: false,
      z: 2,
    },
    {
      offset: 0,
      width: "w-[320px] md:w-[480px] lg:w-[620px]",
      height: "h-[340px] md:h-[420px] lg:h-[500px]",
      opacity: 1,
      scale: 1,
      blur: false,
      z: 5,
    },
    {
      offset: 1,
      width: "w-[150px] md:w-[150px]",
      height: "h-[360px] md:h-[340px]",
      opacity: 0.7,
      scale: 0.92,
      blur: false,
      z: 2,
    },
    {
      offset: 2,
      width: "w-[70px] md:w-[90px]",
      height: "h-[180px] md:h-[230px]",
      opacity: 0.35,
      scale: 0.8,
      blur: true,
      z: 1,
    },
  ];

  return (
    <div
      className="w-full py-10 select-none overflow-hidden"
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAuto}
    >
      {/* ── Carousel + Arrows ── */}
      <div className="relative flex justify-center items-center gap-4 md:gap-6">
        {/* ── Left Arrow ── */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-4 md:left-8 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 dark:bg-stone-800/90 text-stone-800 dark:text-white shadow-lg hover:scale-110 active:scale-95 transition-transform backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* ── Cards ── */}
        {slots.map((slot) => {
          const cat = getCard(slot.offset);
          const isCenter = slot.offset === 0;
          const isLeft = slot.offset < 0;
          const isRight = slot.offset > 0;

          return (
            <motion.div
              key={`${cat._id}-${slot.offset}`}
              layout
              onClick={() => {
                if (isLeft) go(-1);
                if (isRight) go(1);
              }}
              animate={{ opacity: slot.opacity, scale: slot.scale }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                zIndex: slot.z,
                filter: slot.blur ? "blur(2px)" : "none",
              }}
              className={`
                ${slot.width} ${slot.height}
                relative overflow-hidden rounded-[40px] shrink-0
                ${!isCenter ? "cursor-pointer" : ""}
              `}
            >
              <img
                src={cat.image?.url}
                alt={cat.name}
                draggable={false}
                className="w-full h-full object-cover"
              />

              <div
                className={`absolute inset-0 ${isCenter ? "bg-gradient-to-t from-black/70 via-black/10 to-transparent" : "bg-black/25"}`}
              />

              {isCenter && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cat._id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-0 left-0 right-0 p-8"
                  >
                    <h2 className="text-white text-3xl md:text-5xl font-extrabold uppercase tracking-wider">
                      {cat.name}
                    </h2>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}

        {/* ── Right Arrow ── */}
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-4 md:right-8 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 dark:bg-stone-800/90 text-stone-800 dark:text-white shadow-lg hover:scale-110 active:scale-95 transition-transform backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* ── Dots ── */}
      <div className="flex justify-center mt-8 gap-2">
        {categoryData.map((item, index) => (
          <motion.button
            key={item._id}
            type="button"
            onClick={() => setActiveIdx(index)}
            animate={{ width: index === activeIdx ? 28 : 8 }}
            transition={{ duration: 0.3 }}
            className={`h-2 rounded-full ${
              index === activeIdx
                ? "bg-black dark:bg-white"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
