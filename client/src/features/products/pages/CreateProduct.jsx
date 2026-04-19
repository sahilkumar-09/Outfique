import React, { useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useNavigate } from "react-router";

const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 7) {
      alert("You can only select up to 7 images in total.");
      e.target.value = "";
      return;
    }
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[indexToRemove].url);
      newImages.splice(indexToRemove, 1);
      return newImages;
    });
  };

  const { handleCreateProducts } = useProduct();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("amount", formData.amount);
    fd.append("currency", formData.currency);
    images.forEach((img) => {
      fd.append("productImages", img.file);
    });

    try {
      const data = await handleCreateProducts(fd);
      console.log(data);
      navigate("/seller/dashboard");
      setFormData({ title: "", description: "", amount: "", currency: "" });
      setImages([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f0ede8] flex items-center justify-center p-6"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[0.65rem] tracking-[0.28em] uppercase text-[#8a7f6e] mb-2">
            Seller Dashboard
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide text-[#1c1c1c] mb-1">
            Create Product
          </h1>
          <div className="w-10 h-px bg-[#c4b99a] mt-3" />
          <p className="text-[#8a7f6e] text-base mt-3 font-light">
            Add a new item to your inventory
          </p>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8"
          onSubmit={submitHandler}
        >
          {/* ── Left Column ── */}
          <div className="space-y-7">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="title"
                className="text-[0.62rem] tracking-[0.2em] uppercase text-[#8a7f6e]"
              >
                Product Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={onChangeHandler}
                placeholder="e.g. Minimalist Watch"
                className="w-full px-0 py-2 bg-transparent border-b border-[#c4b99a] text-[#1c1c1c] text-base placeholder-[#b5aa96] focus:outline-none focus:border-[#1c1c1c] transition-colors duration-300"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-[0.62rem] tracking-[0.2em] uppercase text-[#8a7f6e]"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="5"
                value={formData.description}
                onChange={onChangeHandler}
                placeholder="Detailed description of the product..."
                className="w-full px-0 py-2 bg-transparent border-b border-[#c4b99a] text-[#1c1c1c] text-base placeholder-[#b5aa96] focus:outline-none focus:border-[#1c1c1c] transition-colors duration-300 resize-none"
              />
            </div>

            {/* Amount + Currency */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="amount"
                  className="text-[0.62rem] tracking-[0.2em] uppercase text-[#8a7f6e]"
                >
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={formData.amount}
                  onChange={onChangeHandler}
                  placeholder="0.00"
                  className="w-full px-0 py-2 bg-transparent border-b border-[#c4b99a] text-[#1c1c1c] text-base placeholder-[#b5aa96] focus:outline-none focus:border-[#1c1c1c] transition-colors duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="currency"
                  className="text-[0.62rem] tracking-[0.2em] uppercase text-[#8a7f6e]"
                >
                  Currency
                </label>
                <select
                  name="currency"
                  id="currency"
                  value={formData.currency}
                  onChange={onChangeHandler}
                  className="w-full px-0 py-2 bg-transparent border-b border-[#c4b99a] text-[#1c1c1c] text-base focus:outline-none focus:border-[#1c1c1c] transition-colors duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Select Currency</option>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="flex flex-col justify-between gap-8">
            {/* Image Upload */}
            <div className="flex flex-col gap-3 flex-1">
              <label
                htmlFor="images"
                className="text-[0.62rem] tracking-[0.2em] uppercase text-[#8a7f6e]"
              >
                Product Images ({images.length}/7)
              </label>

              {/* Drop Zone */}
              <div className="relative flex items-center justify-center border border-dashed border-[#c4b99a] hover:border-[#1c1c1c] bg-transparent hover:bg-[#e8e4de] transition-all duration-300 cursor-pointer min-h-[160px] group">
                <input
                  type="file"
                  name="productImages"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center gap-3 group-hover:scale-105 transition-transform duration-300 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#8a7f6e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-[#1c1c1c] text-sm tracking-wide">
                      Drop images here
                    </p>
                    <p className="text-[#8a7f6e] text-xs mt-1 tracking-wide">
                      or click to browse
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square overflow-hidden border border-[#c4b99a]"
                    >
                      <img
                        src={img.url}
                        alt={`preview ${index}`}
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-[#1c1c1c]/80 hover:bg-[#1c1c1c] text-[#f0ede8] p-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-[#1c1c1c] text-[#f0ede8] text-[0.7rem] tracking-[0.3em] uppercase hover:bg-[#3a3a3a] transition-colors duration-300 cursor-pointer"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
