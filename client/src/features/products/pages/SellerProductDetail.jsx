import React, { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useParams, useNavigate } from "react-router";
import Nav from "../components/Nav";

const sym = { INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥" };

const SellerProductDetail = () => {
  const { handleAddProductVariants, handleGetProductById } = useProduct();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);

  const [newVariant, setNewVariant] = useState({
    stock: "",
    price: { amount: "" },
    attributes: [{ key: "", value: "" }],
    productImages: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await handleGetProductById(productId);
      setProduct(data);
      setVariants(data?.variants || []);
    };
    fetchProduct();
  }, [productId]);

  const handleAttributes = () => {
    setNewVariant((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { key: "", value: "" }],
    }));
  };

  const handleAttributesChange = (index, field, value) => {
    const updated = [...newVariant.attributes];
    updated[index][field] = value;

    setNewVariant((prev) => ({
      ...prev,
      attributes: updated,
    }));
  };

  const handleChangeImage = (e) => {
    const files = Array.from(e.target.files);

    const formattedFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewVariant((prev) => ({
      ...prev,
      productImages: [...prev.productImages, ...formattedFiles],
    }));
  };

  const submitVariantHandler = async () => {
    const attrs = {};

    newVariant.attributes.forEach((a) => {
      if (a.key && a.value) {
        attrs[a.key] = a.value;
      }
    });

    const payload = {
      ...newVariant,
      attributes: attrs,
    };

    const createdVariant = await handleAddProductVariants(productId, payload);

    if (createdVariant) {
      setVariants((prev) => [...prev, createdVariant]);

      setNewVariant({
        stock: "",
        price: { amount: "" },
        attributes: [{ key: "", value: "" }],
        productImages: [],
      });
    }
  };

  const currency = sym[product?.price?.currency] ?? product?.price?.currency;

  return (
    <div
      className="min-h-screen bg-[#f0ede8]"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      <Nav />

      {!product ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xs tracking-[0.25em] uppercase text-[#8a7f6e]">
            Loading...
          </p>
        </div>
      ) : (
        <div className="px-4 sm:px-8 md:px-16 py-10 max-w-7xl mx-auto">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 text-xs tracking-[0.15em] uppercase text-[#8a7f6e] hover:text-[#1c1c1c]"
          >
            ← Back
          </button>

          {/* Product Info */}
          <div className="grid md:grid-cols-2 gap-10 mb-14">
            <div className="grid grid-cols-2 gap-4">
              {product.productImages?.map((img) => (
                <div key={img._id} className="overflow-hidden bg-[#e8e4de]">
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-[260px] object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-5">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#8a7f6e] mb-2">
                  Product Details
                </p>
                <h1 className="text-4xl text-[#1c1c1c] mb-3">
                  {product.title}
                </h1>
                <div className="w-10 h-px bg-[#c4b99a]" />
              </div>

              <p className="text-3xl font-semibold text-[#1c1c1c]">
                {currency}
                {product.price?.amount}
              </p>

              <p className="text-[#8a7f6e] text-lg leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Add Variant Form */}
          <div className="bg-[#f7f3ee] border border-[#e0dbd3] p-8 rounded-sm mb-14">
            <h2 className="text-3xl text-[#1c1c1c] mb-6">
              Add Product Variant
            </h2>

            <input
              type="number"
              placeholder="Enter stock"
              value={newVariant.stock}
              onChange={(e) =>
                setNewVariant((prev) => ({ ...prev, stock: e.target.value }))
              }
              className="w-full mb-4 p-3 border border-[#d6d0c7] bg-white outline-none"
            />

            <input
              type="number"
              placeholder="Enter variant price"
              value={newVariant.price.amount}
              onChange={(e) =>
                setNewVariant((prev) => ({
                  ...prev,
                  price: { ...prev.price, amount: e.target.value },
                }))
              }
              className="w-full mb-6 p-3 border border-[#d6d0c7] bg-white outline-none"
            />

            <div className="space-y-3 mb-4">
              {newVariant.attributes.map((attr, idx) => (
                <div key={idx} className="grid md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Attribute name"
                    value={attr.key}
                    onChange={(e) =>
                      handleAttributesChange(idx, "key", e.target.value)
                    }
                    className="p-3 border border-[#d6d0c7] bg-white outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={attr.value}
                    onChange={(e) =>
                      handleAttributesChange(idx, "value", e.target.value)
                    }
                    className="p-3 border border-[#d6d0c7] bg-white outline-none"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleAttributes}
              className="mb-6 px-4 py-2 border border-[#1c1c1c] text-[#1c1c1c] text-xs tracking-[0.2em] uppercase hover:bg-[#1c1c1c] hover:text-white transition"
            >
              Add Attribute
            </button>

            <input
              type="file"
              multiple
              onChange={handleChangeImage}
              className="block mb-4"
            />

            <div className="flex gap-3 flex-wrap mb-6">
              {newVariant.productImages.map((img, i) => (
                <img
                  key={i}
                  src={img.preview}
                  alt=""
                  className="w-24 h-24 object-cover border border-[#d6d0c7]"
                />
              ))}
            </div>

            <button
              onClick={submitVariantHandler}
              className="w-full py-4 bg-[#1c1c1c] text-[#f0ede8] text-xs tracking-[0.25em] uppercase hover:bg-[#333] transition"
            >
              Save Variant
            </button>
          </div>

          {/* Variant Cards */}
          <div>
            <h2 className="text-3xl text-[#1c1c1c] mb-6">Product Variants</h2>

            {variants.length === 0 ? (
              <p className="text-[#8a7f6e] text-lg">No variants added yet.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {variants.map((variant, index) => (
                  <div
                    key={index}
                    className="bg-[#f7f3ee] border border-[#e0dbd3] overflow-hidden"
                  >
                    <img
                      src={
                        variant.productImages?.[0]?.url ||
                        variant.productImages?.[0]?.preview
                      }
                      alt=""
                      className="w-full h-64 object-cover"
                    />

                    <div className="p-4">
                      <p className="text-2xl font-semibold text-[#1c1c1c] mb-2">
                        ₹{variant.price?.amount}
                      </p>

                      <p className="text-sm text-[#8a7f6e] mb-3">
                        Stock: {variant.stock}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {variant.attributes &&
                          Object.entries(variant.attributes).map(
                            ([key, value]) => (
                              <span
                                key={key}
                                className="px-3 py-1 text-xs uppercase tracking-[0.15em] border border-[#d6d0c7] text-[#1c1c1c]"
                              >
                                {key}: {value}
                              </span>
                            ),
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProductDetail;
