import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useProfile } from "../hooks/useProfile.js";

/* ─── tiny reusable input ─────────────────────────────────────────── */
const InputField = ({ label, name, value, onChange, placeholder = "" }) => (
  <div className="flex flex-col gap-2">
    <label
      className="text-[8.5px] tracking-[0.28em] uppercase text-[#555]"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
        w-full bg-transparent border-0 border-b border-[#222]
        py-2 px-0
        font-['Bebas_Neue'] text-[16px] tracking-[0.12em] text-[#e63b1f]
        placeholder:text-[#2a2a2a]
        outline-none
        focus:border-b-[#e63b1f]
        transition-colors duration-200
      "
    />
  </div>
);

/* ─── address-type toggle button ──────────────────────────────────── */
const TypeBtn = ({ label, value, current, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(value)}
    className={`
      flex-1 py-3
      font-['Bebas_Neue'] text-[13px] tracking-[0.22em]
      border transition-all duration-200 cursor-pointer
      ${
        current === value
          ? "bg-white text-black border-white"
          : "bg-transparent text-[#555] border-[#222] hover:border-[#444] hover:text-[#888]"
      }
    `}
  >
    {label}
  </button>
);

/* ─── main page ───────────────────────────────────────────────────── */
const CreateProfile = () => {
  const { userid } = useParams();
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    alternateContact: "",
    houseNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    addressType: "home",
  });

  /* ── unchanged logic ── */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { handelCreateUserProfile } = useProfile();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await handelCreateUserProfile(userid, {
        fullName: formData.fullName,
        contact: formData.contact,
        alternateContact: formData.alternateContact,
        houseNo: formData.houseNo,
        street: formData.street,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country,
        addressType: formData.addressType,
      });

      if (data) {
        toast.success("Profile Created Successfully");
        setTimeout(() => navigate("/user/profile"), 1200);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  /* ── render ── */
  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* ── Page content ── */}
      <div className="px-5 md:px-10 lg:px-20 pt-9 pb-20">
        {/* Page header */}
        <div className="mb-8">
          <p className="text-[9px] tracking-[3px] uppercase text-[#555] mb-2">
            Personal Information
          </p>
          <h1
            className="text-[40px] sm:text-[52px] leading-none text-white mb-5"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "2px",
            }}
          >
            CREATE
            <br />
            PROFILE
          </h1>
          <div className="h-px bg-[#1e1e1e]" />
        </div>

        <form onSubmit={handleSubmit}>
          {/* ── Personal Details ── */}
          <section className="mb-10">
            <p
              className="text-[18px] tracking-[3px] text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              PERSONAL DETAILS
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="ALEXANDER VANE"
              />
              <InputField
                label="Contact Number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="+91 00000 00000"
              />
              <InputField
                label="Alternate Contact"
                name="alternateContact"
                value={formData.alternateContact}
                onChange={handleChange}
                placeholder="+91 00000 00000"
              />
            </div>
          </section>

          {/* divider */}
          <div className="h-px bg-[#1e1e1e] mb-10" />

          {/* ── Address Details ── */}
          <section className="mb-10">
            <p
              className="text-[18px] tracking-[3px] text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ADDRESS DETAILS
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="House No."
                name="houseNo"
                value={formData.houseNo}
                onChange={handleChange}
                placeholder="101/A"
              />
              <InputField
                label="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="BRUTALIST BOULEVARD"
              />
              <InputField
                label="Landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="OPPOSITE THE MONOLITH"
              />
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="NEW DELHI"
              />
              <InputField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="DELHI"
              />
              <InputField
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="110001"
              />
              <InputField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="INDIA"
              />

              {/* Address Type — toggle buttons replacing select */}
              <div className="flex flex-col gap-3">
                <span
                  className="text-[8.5px] tracking-[0.28em] uppercase text-[#555]"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Address Type
                </span>
                <div className="flex gap-2">
                  <TypeBtn
                    label="HOME"
                    value="home"
                    current={formData.addressType}
                    onClick={(v) =>
                      setFormData({ ...formData, addressType: v })
                    }
                  />
                  <TypeBtn
                    label="WORK"
                    value="work"
                    current={formData.addressType}
                    onClick={(v) =>
                      setFormData({ ...formData, addressType: v })
                    }
                  />
                  <TypeBtn
                    label="OTHER"
                    value="other"
                    current={formData.addressType}
                    onClick={(v) =>
                      setFormData({ ...formData, addressType: v })
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── Save CTA ── */}
          <button
            onClick={() => {
              navigate("/user/profile")
            }}
            type="submit"
            className="
              w-full flex items-center justify-between
              px-6 py-5
              bg-white text-black
              border-0 cursor-pointer
              hover:bg-[#f5f0e8]
              active:scale-[0.99]
              transition-all duration-200
            "
          >
            <span
              className="text-[15px] tracking-[4px]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              SAVE PROFILE
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="1.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

        {/* Watermark */}
        <div className="text-center overflow-hidden mt-10 select-none">
          <span
            className="text-[#111] text-[72px] leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "8px",
            }}
          >
            SYSTEM
          </span>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-[#0d0d0d] border-t border-[#1e1e1e] px-5 py-8">
        <p
          className="text-[18px] tracking-[3px] text-white mb-1"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          OUTFIQUE
        </p>
        <p className="text-[10px] tracking-[1px] text-[#444] mb-5">
          © 2026 OUTFIQUE COLLECTIVE
        </p>
        <div className="flex flex-wrap gap-5 mb-3">
          <a
            href="#"
            className="text-[10px] tracking-[1.5px] uppercase text-[#444] no-underline hover:text-[#888] transition-colors"
          >
            Shipping & Returns
          </a>
          <a
            href="#"
            className="text-[10px] tracking-[1.5px] uppercase text-[#444] no-underline hover:text-[#888] transition-colors"
          >
            Privacy Policy
          </a>
        </div>
        <div className="flex gap-5">
          <a
            href="#"
            className="text-[10px] tracking-[1.5px] uppercase text-[#444] no-underline hover:text-[#888] transition-colors"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-[10px] tracking-[1.5px] uppercase text-[#888] no-underline hover:text-[#888] transition-colors"
          >
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
};

export default CreateProfile;
