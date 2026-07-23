import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import Product from "../components/Product";
import { useProduct } from "../hooks/useProduct";

const LIVE_FILTER_FIELDS = new Set(["size", "color"]);
const FILTER_KEYS = [
  "size",
  "color",
  "pattern",
  "fit",
  "material",
  "collar",
  "sleeves",
];

const FILTER_GROUPS = [
  { id: "size", label: "Size", options: ["XS", "S", "M", "L", "XL", "XXL"] },
  {
    id: "color",
    label: "Color",
    options: ["Black", "White", "Brown", "Navy", "Beige", "Red"],
  },
  {
    id: "pattern",
    label: "Pattern",
    options: ["Solid", "Striped", "Printed", "Textured"],
  },
  { id: "fit", label: "Fit", options: ["Slim", "Regular", "Oversized"] },
  {
    id: "material",
    label: "Material",
    options: ["Cotton", "Linen", "Polyester", "Knit"],
  },
  {
    id: "collar",
    label: "Collar",
    options: ["Round Neck", "Polo", "Mandarin"],
  },
  {
    id: "sleeves",
    label: "Sleeves",
    options: ["Half Sleeve", "Full Sleeve", "Sleeveless"],
  },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const FilterSidebar = ({
  selected,
  toggleOption,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  clearAll,
  appliedCount,
  onApply,
}) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-between px-1 pb-4">
      <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-zinc-900 dark:text-zinc-100">
        Filters
      </h2>
    </div>

    <Accordion type="multiple" className="flex-1 overflow-y-auto">
      {FILTER_GROUPS.map((group) => {
        const isLive = LIVE_FILTER_FIELDS.has(group.id);
        return (
          <AccordionItem
            key={group.id}
            value={group.id}
            className="border-zinc-200 dark:border-zinc-800"
          >
            <AccordionTrigger className="text-xs font-bold tracking-[0.12em] uppercase text-zinc-900 dark:text-zinc-100 hover:no-underline py-4">
              <span className="flex items-center gap-2">
                {group.label}
                {!isLive && (
                  <span className="text-[9px] normal-case tracking-normal font-medium px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    Soon
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="flex flex-col gap-3">
                {group.options.map((option) => {
                  const key = `${group.id}:${option}`;
                  const checked = selected[group.id].includes(option);
                  return (
                    <label
                      key={key}
                      className={`flex items-center gap-2.5 group ${
                        isLive
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-50"
                      }`}
                    >
                      <Checkbox
                        checked={checked}
                        disabled={!isLive}
                        onCheckedChange={() => toggleOption(group.id, option)}
                        className="rounded-[4px] border-zinc-400 dark:border-zinc-600 data-[state=checked]:bg-[#e63b1f] data-[state=checked]:border-[#e63b1f]"
                      />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>

    {/* Price range */}
    <div className="py-4 border-t border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xs font-bold tracking-[0.12em] uppercase text-zinc-900 dark:text-zinc-100 mb-3">
        Price
      </h3>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#141414] text-zinc-900 dark:text-zinc-100 text-sm px-3 py-2 outline-none focus:border-[#e63b1f]"
        />
        <span className="text-zinc-400 text-sm">–</span>
        <input
          type="number"
          min="0"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#141414] text-zinc-900 dark:text-zinc-100 text-sm px-3 py-2 outline-none focus:border-[#e63b1f]"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <Button
        variant="outline"
        onClick={clearAll}
        className="rounded-full border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        Clear
      </Button>
      <Button
        onClick={onApply}
        className="rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        Apply {appliedCount > 0 ? `(${appliedCount})` : ""}
      </Button>
    </div>
  </div>
);

const ProductGridSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="flex flex-col gap-3">
        <div className="aspect-[3/4] rounded-2xl bg-zinc-100 dark:bg-[#141414] animate-pulse" />
        <div className="h-3.5 w-4/5 rounded bg-zinc-100 dark:bg-[#141414] animate-pulse" />
        <div className="h-3.5 w-1/3 rounded bg-zinc-100 dark:bg-[#141414] animate-pulse" />
      </div>
    ))}
  </div>
);

const CategoryWiseProduct = () => {
  const { handleGetProductBySlug } = useProduct();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "newest";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const filters = FILTER_KEYS.reduce((acc, key) => {
    const raw = searchParams.get(key);
    acc[key] = raw ? raw.split(",").filter(Boolean) : [];
    return acc;
  }, {});

  const toggleOption = (group, option) => {
    const current = filters[group];
    const next = current.includes(option)
      ? current.filter((v) => v !== option)
      : [...current, option];

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        next.length ? params.set(group, next.join(",")) : params.delete(group);
        return params;
      },
      { replace: true },
    );
  };

  const setSort = (value) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set("sort", value);
        return params;
      },
      { replace: true },
    );
  };

  const setMinPrice = (value) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        value ? params.set("minPrice", value) : params.delete("minPrice");
        return params;
      },
      { replace: true },
    );
  };

  const setMaxPrice = (value) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        value ? params.set("maxPrice", value) : params.delete("maxPrice");
        return params;
      },
      { replace: true },
    );
  };

  const clearAll = () => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        FILTER_KEYS.forEach((key) => params.delete(key));
        params.delete("minPrice");
        params.delete("maxPrice");
        return params;
      },
      { replace: true },
    );
  };

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const query = Object.fromEntries(searchParams);
      const response = await handleGetProductBySlug(slug, query);
      setProductData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) return;

    const timer = setTimeout(() => {
      fetchProductData();
    }, 400);

    return () => clearTimeout(timer);
  }, [slug, searchParams.toString()]);

  const formattedTitle = slug?.replace(/-/g, " ");
  const appliedCount =
    Object.values(filters).reduce((total, arr) => total + arr.length, 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0d]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-50">
              {formattedTitle}
            </h1>
            {!loading && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {productData.length}{" "}
                {productData.length === 1 ? "item" : "items"}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden rounded-full border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                >
                  <i className="ri-filter-3-line mr-1.5" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-white dark:bg-[#0d0d0d] border-zinc-200 dark:border-zinc-800 w-[85vw] sm:w-[380px] px-5"
              >
                <FilterSidebar
                  selected={filters}
                  toggleOption={toggleOption}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  clearAll={clearAll}
                  appliedCount={appliedCount}
                  onApply={() => setFilterSheetOpen(false)}
                />
              </SheetContent>
            </Sheet>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[160px] rounded-full border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#141414] text-zinc-900 dark:text-zinc-100 text-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#141414] border-zinc-200 dark:border-zinc-800">
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8 xl:gap-10">
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-6">
              <FilterSidebar
                selected={filters}
                toggleOption={toggleOption}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                clearAll={clearAll}
                appliedCount={appliedCount}
                // no onApply here — desktop sidebar isn't inside a drawer
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductGridSkeleton />
                </motion.div>
              ) : productData.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-[60vh] text-center"
                >
                  <p className="text-zinc-900 dark:text-zinc-100 text-lg font-semibold mb-1">
                    No products found
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs">
                    Try adjusting or clearing your filters to see more results.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Product products={productData} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProduct;
