import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useProduct } from "../hooks/useProduct";

const fmtPrice = (amount, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

const CategoryCarousel = () => {
  const { handleGetAllCategory } = useProduct();

  const [categoryData, setCategoryData] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const intervalRef = useRef(null);

  const fetchCategoryData = async () => {
    try {
      const res = await handleGetAllCategory();
      setCategoryData(res || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  // Detect active card while scrolling
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !categoryData.length) return;

    const handleScroll = () => {
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;

      let closest = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - center);

        if (distance < minDistance) {
          minDistance = distance;
          closest = index;
        }
      });

      setActiveIdx(closest);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      track.removeEventListener("scroll", handleScroll);
    };
  }, [categoryData]);

  const scrollToIdx = (index) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    setActiveIdx(index);
  };

  // Auto-scroll
  useEffect(() => {
    if (!categoryData.length) return;

    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % categoryData.length;

        cardRefs.current[next]?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });

        return next;
      });
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [categoryData]);

  if (!categoryData.length) return null;

  return (
    <div className="w-full">
      {/* Carousel */}
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth px-4"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {categoryData.map((cat, index) => (
          <motion.button
            key={cat._id}
            ref={(el) => (cardRefs.current[index] = el)}
            onClick={() => scrollToIdx(index)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: index * 0.08,
            }}
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="relative shrink-0 snap-center w-[80%] sm:w-[50%] lg:w-[32%] aspect-[3/4] overflow-hidden rounded-2xl text-left"
          >
            {/* Image */}
            <img
              src={cat.image?.url}
              alt={cat.name}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-5 sm:p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
            >
              <h3 className="text-white text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-none mb-3">
                {cat.name}
              </h3>

              {cat.startingPrice && (
                <span className="inline-block rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-stone-900">
                  Starting at {fmtPrice(cat.startingPrice)}
                </span>
              )}
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-2">
        {categoryData.map((cat, index) => (
          <motion.button
            key={cat._id}
            onClick={() => scrollToIdx(index)}
            aria-label={`Go to ${cat.name}`}
            animate={{
              width: index === activeIdx ? 24 : 8,
            }}
            transition={{
              duration: 0.3,
            }}
            className={`h-2 rounded-full ${
              index === activeIdx
                ? "bg-stone-900 dark:bg-white"
                : "bg-stone-300 dark:bg-stone-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
