import { useState, useRef } from "react";

const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "INR", "AED", "CHF"];

export default function CreateProduct() {
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({
    title: "",
    curator: "",
    description: "",
    price: "",
    currency: "USD",
  });
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const urls = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#131313", color: "#f0f0f0" }}
    >
      <div className="max-w-2xl mx-auto px-5 py-10 pb-16 ">
        {/* Header */}
        <p
          className="text-[10px] tracking-[0.18em] uppercase font-semibold mb-2"
          style={{ color: "#ffffff" }}
        >
          Inventory Management
        </p>
        <h1
          className="text-[2rem] sm:text-[2.5rem] font-bold leading-tight tracking-tight"
          style={{ color: "#ffffff" }}
        >
          Add a New Piece
        </h1>
        <div
          className=" h-[2px] mb-8 mt-3"
          style={{ backgroundColor: "#ffffff" }}
        />
        <form action="">
          {/* Image Upload */}
          <div
            className="p-5 mb-4 border"
            style={{ borderColor: "#2e2e2e", backgroundColor: "#1a1a1a" }}
          >
            <p
              className="text-[10px] tracking-[0.14em] uppercase font-semibold mb-3"
              style={{ color: "#9a9a9a" }}
            >
              Product Imagery
            </p>

            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden group"
                    style={{ border: "1px solid #2e2e2e" }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover grayscale"
                    />
                    <button
                      onClick={() =>
                        setImages((p) => p.filter((_, j) => j !== i))
                      }
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-lg"
                      style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center gap-2 py-12 cursor-pointer transition-all duration-200"
              style={{
                border: `1px dashed ${dragging ? "#ffffff" : "#3e3e3e"}`,
                backgroundColor: dragging ? "#1f1f1f" : "#161616",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#ffffff";
                e.currentTarget.style.backgroundColor = "#1c1c1c";
              }}
              onMouseLeave={(e) => {
                if (!dragging) {
                  e.currentTarget.style.borderColor = "#3e3e3e";
                  e.currentTarget.style.backgroundColor = "#161616";
                }
              }}
            >
              <svg
                className="w-8 h-8"
                style={{ color: "#ffffff" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className="text-sm text-center leading-relaxed"
                style={{ color: "#6a6a6a" }}
              >
                Drag &amp; Drop visual assets here
                <br />
                <span
                  className="underline underline-offset-2 cursor-pointer"
                  style={{ color: "#d0d0d0" }}
                >
                  or browse stellar files
                </span>
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
          </div>

          {/* Details Card */}
          <div
            className="p-5 mb-4 flex flex-col gap-5 border"
            style={{ borderColor: "#2e2e2e", backgroundColor: "#1a1a1a" }}
          >
            <div>
              <label
                className="block text-[10px] tracking-[0.14em] uppercase font-semibold mb-2"
                style={{ color: "#9a9a9a" }}
              >
                Piece Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Midnight Velvet Blazer"
                className="w-full px-0 py-2 text-sm outline-none transition-colors duration-200"
                style={{
                  backgroundColor: "transparent",
                  borderBottom: "1px solid #2e2e2e",
                  color: "#f0f0f0",
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = "#ffffff")}
                onBlur={(e) => (e.target.style.borderBottomColor = "#2e2e2e")}
              />
            </div>

            <div style={{ borderTop: "1px solid #222222" }} />

            <div>
              <label
                className="block text-[10px] tracking-[0.14em] uppercase font-semibold mb-2"
                style={{ color: "#9a9a9a" }}
              >
                Editorial Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the silhouette, fabric sourcing, and inspiration behind this piece..."
                className="w-full px-3.5 py-2.5 text-sm outline-none resize-y leading-relaxed transition-colors duration-200"
                style={{
                  backgroundColor: "#161616",
                  border: "1px solid #2e2e2e",
                  color: "#f0f0f0",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#ffffff")}
                onBlur={(e) => (e.target.style.borderColor = "#2e2e2e")}
              />
            </div>
          </div>

          {/* Pricing Card */}
          <div
            className="p-5 mb-8 border"
            style={{ borderColor: "#2e2e2e", backgroundColor: "#1a1a1a" }}
          >
            <p
              className="text-[10px] tracking-[0.14em] uppercase font-semibold mb-3"
              style={{ color: "#9a9a9a" }}
            >
              Retail Value
            </p>
            <div className="grid grid-cols-[1fr_130px] sm:grid-cols-[1fr_150px] gap-3">
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3.5 py-2.5 text-sm outline-none transition-colors duration-200"
                style={{
                  backgroundColor: "#161616",
                  border: "1px solid #2e2e2e",
                  color: "#f0f0f0",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#ffffff")}
                onBlur={(e) => (e.target.style.borderColor = "#2e2e2e")}
              />
              <div className="relative">
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="w-full appearance-none px-3.5 py-2.5 text-sm outline-none cursor-pointer pr-8 transition-colors duration-200"
                  style={{
                    backgroundColor: "#161616",
                    border: "1px solid #2e2e2e",
                    color: "#f0f0f0",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#ffffff")}
                  onBlur={(e) => (e.target.style.borderColor = "#2e2e2e")}
                >
                  {CURRENCIES.map((c) => (
                    <option
                      key={c}
                      value={c}
                      style={{ backgroundColor: "#1a1a1a" }}
                    >
                      {c}
                    </option>
                  ))}
                </select>
                <span
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                  style={{ color: "#9a9a9a" }}
                >
                  ▾
                </span>
              </div>
            </div>
          </div>

          {/* Publish Button */}
          <button className="w-full py-4 font-semibold text-sm tracking-[0.12em] uppercase transition-all duration-200 active:scale-[0.99] bg-yellow-500 text-black rounded-xl cursor-pointer hover:bg-yellow-600">
            Publish Piece
          </button>
        </form>
      </div>
    </div>
  );
}
