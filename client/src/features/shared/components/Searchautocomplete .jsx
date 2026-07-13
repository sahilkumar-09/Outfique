import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useProduct } from "@/features/products/hooks/useProduct";
import { Input } from "@/components/ui/input";

const ease = [0.22, 1, 0.36, 1];

const formatPrice = (price) => {
  const amount = Number(price?.amount ?? price);
  if (Number.isNaN(amount)) return "";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: price?.currency || "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${amount}`;
  }
};

const defaultGetProductHref = (product) =>
  `/product/${product.category?.slug}/${product.productSlug}`;

const SearchAutocomplete = forwardRef(function SearchAutocomplete(
  {
    placeholder = "Search products…",
    className = "",
    inputClassName = "",
    maxResults = 6,
    debounceMs = 400,
    clearOnSelect = true,
    getProductHref = defaultGetProductHref,
    onNavigate, // optional callback, e.g. to close a mobile search bar
  },
  forwardedRef,
) {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const { handleSearchProducts } = useProduct();
  const listboxId = useId();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const requestIdRef = useRef(0);
  const isMountedRef = useRef(true);

  // expose the input node to the parent (e.g. Navbar's searchRef.focus())
  const setRefs = (node) => {
    inputRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // debounced fetch, guarded against races and stale/empty queries
  useEffect(() => {
    const query = search.trim();

    if (!query) {
      requestIdRef.current += 1; // invalidate any in-flight request
      setResults([]);
      setLoading(false);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    setLoading(true);
    setOpen(true);

    const timer = setTimeout(async () => {
      const thisRequestId = ++requestIdRef.current;
      try {
        const res = await handleSearchProducts(query);
        if (!isMountedRef.current || thisRequestId !== requestIdRef.current)
          return;
        const list = Array.isArray(res)
          ? res
          : res?.products || res?.data || [];
        setResults(list.slice(0, maxResults));
        setActiveIndex(-1);
      } catch (err) {
        if (thisRequestId === requestIdRef.current) {
          console.error(err);
          setResults([]);
        }
      } finally {
        if (isMountedRef.current && thisRequestId === requestIdRef.current) {
          setLoading(false);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, debounceMs);

    return () => clearTimeout(timer);
    // handleSearchProducts intentionally excluded — hooks like this often
    // return a new function reference each render, which would restart the
    // debounce on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, debounceMs, maxResults]);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToSearchPage = (query) => {
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    setActiveIndex(-1);
    onNavigate?.();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const selectProduct = (product) => {
    setOpen(false);
    setActiveIndex(-1);
    if (clearOnSelect) setSearch("");
    onNavigate?.();
    navigate(getProductHref(product));
  };

  const clearSearch = () => {
    setSearch("");
    setResults([]);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const query = search.trim();

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
      return;
    }
    if (e.key === "ArrowDown") {
      if (!open) return;
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      if (!open) return;
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < results.length) {
        selectProduct(results[activeIndex]);
      } else {
        goToSearchPage(search);
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 text-sm pointer-events-none z-10" />

      <Input
        ref={setRefs}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => query && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        autoComplete="off"
        className={`pl-9 pr-9 h-9 w-full text-[13px] rounded-full bg-zinc-100 dark:bg-white/[0.06] border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-[#e63b1f]/40 focus-visible:border-[#e63b1f]/40 transition-all duration-200 ${inputClassName}`}
      />

      {loading ? (
        <i className="ri-loader-4-line animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 text-sm" />
      ) : (
        search.length > 0 && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={clearSearch}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
          >
            <i className="ri-close-line text-sm" />
          </button>
        )
      )}

      <AnimatePresence>
        {open && query && (
          <motion.div
            id={listboxId}
            role="listbox"
            initial={reduceMotion ? {} : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease }}
            className="absolute left-0 right-0 top-full mt-2 z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xl"
          >
            {loading ? (
              <div className="p-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2.5 animate-pulse"
                  >
                    <div className="w-11 h-11 rounded-lg bg-zinc-100 dark:bg-white/[0.06] shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-3/4 rounded bg-zinc-100 dark:bg-white/[0.06]" />
                      <div className="h-3 w-1/4 rounded bg-zinc-100 dark:bg-white/[0.06]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                <i className="ri-search-eye-line text-2xl text-zinc-300 dark:text-zinc-600" />
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  No products found
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  for &ldquo;{query}&rdquo;
                </p>
              </div>
            ) : (
              <div className="p-1.5">
                {results.map((product, index) => {
                  const active = index === activeIndex;
                  const thumb = product.productImages?.[0]?.url;
                  const categoryName = product.category?.name;
                  return (
                    <button
                      key={product._id || product.productSlug || index}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => selectProduct(product)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-150 ${
                        active
                          ? "bg-zinc-100 dark:bg-white/[0.07]"
                          : "hover:bg-zinc-50 dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-zinc-100 dark:bg-white/[0.06] shrink-0 flex items-center justify-center">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <i className="ri-image-line text-zinc-300 dark:text-zinc-600" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100 truncate">
                          {product.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-semibold text-[#e63b1f]">
                            {formatPrice(product.price)}
                          </span>
                          {categoryName && (
                            <span className="text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-white/8 text-zinc-500 dark:text-zinc-400">
                              {categoryName}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default SearchAutocomplete;
