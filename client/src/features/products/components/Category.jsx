import { useEffect, useRef, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { Link, useNavigate } from "react-router";

const Category = () => {
  const { handleGetAllCategory } = useProduct();

  const [categoryData, setCategoryData] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const itemRefs = useRef({});

  const fetchCategoryData = async () => {
    try {
      const res = await handleGetAllCategory();
      setCategoryData(res);
      if (res?.length) setActiveId(res[0]._id);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryData();
  }, []);

  if (!categoryData.length) return null;

  return (
    <div className="px-4 py-6 flex justify-center">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-1">
        {categoryData.map((cat) => {
          const isActive = activeId === cat._id;

          return (
            <Link
              key={cat._id}
              ref={(el) => (itemRefs.current[cat._id] = el)}
              to={`/${cat.slug}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveId(cat._id);
                navigate(`/${cat.slug}`);
              }}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-2 transition-all duration-200 ${
                  isActive
                    ? "ring-[#e63b1f]"
                    : "ring-transparent group-hover:ring-zinc-300 dark:group-hover:ring-zinc-700"
                }`}
              >
                <img
                  src={cat.image?.url}
                  alt={cat.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isActive ? "scale-105" : "group-hover:scale-105"
                  }`}
                />
              </div>

              <span
                className={`text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? "text-[#e63b1f]"
                    : "text-zinc-900 dark:text-zinc-100"
                }`}
              >
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
