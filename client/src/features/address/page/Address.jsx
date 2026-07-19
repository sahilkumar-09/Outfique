import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { useAddress } from "../hooks/useAddress";

const ease = [0.22, 1, 0.36, 1];

const ADDRESS_TYPES = [
  { value: "HOME", label: "Home", icon: "ri-home-4-line" },
  { value: "WORK", label: "Work", icon: "ri-briefcase-line" },
  { value: "OTHER", label: "Other", icon: "ri-map-pin-line" },
];

const inputClass =
  "w-full h-11 px-4 rounded-xl bg-zinc-100 dark:bg-white/[0.06] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#e63b1f]/50 focus:ring-1 focus:ring-[#e63b1f]/30 transition-colors duration-200";

const labelClass =
  "text-xs font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400";

const initialFormData = {
  fullName: "",
  phone: "",
  alternatePhone: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  country: "India",
  postalCode: "",
  addressType: "HOME",
  isDefault: false,
};

const Address = () => {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const { handleCreateAddress } = useAddress();

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMsg("Enter a valid 10-digit phone number.");
      return;
    }
    if (formData.alternatePhone && !/^\d{10}$/.test(formData.alternatePhone)) {
      setErrorMsg("Alternate phone must be a valid 10-digit number.");
      return;
    }
    if (!formData.postalCode.trim()) {
      setErrorMsg("Postal code is required.");
      return;
    }

    setSubmitting(true);
    try {
      await handleCreateAddress(formData);
      toast.success("Address saved successfully");
      navigate(-1);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while saving the address. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#0d0d0d] text-zinc-900 dark:text-white transition-colors px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="mb-8"
        >
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-500 dark:text-zinc-400">
            Delivery Address
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
            Add a new address
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            We'll deliver your orders here.
          </p>
          <div className="mt-6 h-px bg-zinc-200 dark:bg-white/10" />
        </motion.div>

        <motion.form
          initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 0.1 }}
          onSubmit={submitHandler}
          className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#141414] shadow-sm p-6 sm:p-8 space-y-6"
        >
          {/* Full name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className={labelClass}>
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={onChangeHandler}
              placeholder="Sahil Kumar"
              required
              className={inputClass}
            />
          </div>

          {/* Phone + Alternate phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={formData.phone}
                onChange={onChangeHandler}
                placeholder="9876501234"
                required
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="alternatePhone" className={labelClass}>
                Alternate Phone
                <span className="normal-case tracking-normal text-zinc-400 dark:text-zinc-500 font-normal">
                  {" "}
                  (optional)
                </span>
              </label>
              <input
                id="alternatePhone"
                name="alternatePhone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={formData.alternatePhone}
                onChange={onChangeHandler}
                placeholder="9123405678"
                className={inputClass}
              />
            </div>
          </div>

          {/* Address lines */}
          <div className="flex flex-col gap-2">
            <label htmlFor="addressLine1" className={labelClass}>
              Address Line 1
            </label>
            <input
              id="addressLine1"
              name="addressLine1"
              type="text"
              value={formData.addressLine1}
              onChange={onChangeHandler}
              placeholder="Flat No. 302, Green Valley Apartments"
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="addressLine2" className={labelClass}>
              Address Line 2
              <span className="normal-case tracking-normal text-zinc-400 dark:text-zinc-500 font-normal">
                {" "}
                (optional)
              </span>
            </label>
            <input
              id="addressLine2"
              name="addressLine2"
              type="text"
              value={formData.addressLine2}
              onChange={onChangeHandler}
              placeholder="Hirapur"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="landmark" className={labelClass}>
              Landmark
              <span className="normal-case tracking-normal text-zinc-400 dark:text-zinc-500 font-normal">
                {" "}
                (optional)
              </span>
            </label>
            <input
              id="landmark"
              name="landmark"
              type="text"
              value={formData.landmark}
              onChange={onChangeHandler}
              placeholder="Near Big Bazaar"
              className={inputClass}
            />
          </div>

          {/* City + State */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={onChangeHandler}
                placeholder="Dhanbad"
                required
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="state" className={labelClass}>
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={onChangeHandler}
                placeholder="Jharkhand"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Country + Postal code */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className={labelClass}>
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={onChangeHandler}
                placeholder="India"
                required
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="postalCode" className={labelClass}>
                Postal Code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={formData.postalCode}
                onChange={onChangeHandler}
                placeholder="826001"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Address type */}
          <div className="flex flex-col gap-2">
            <span className={labelClass}>Address Type</span>
            <div className="flex gap-2">
              {ADDRESS_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, addressType: type.value }))
                  }
                  aria-pressed={formData.addressType === type.value}
                  className={`flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl border text-sm font-medium transition-colors duration-200 ${
                    formData.addressType === type.value
                      ? "bg-[#e63b1f] text-white border-[#e63b1f]"
                      : "border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-white/30"
                  }`}
                >
                  <i className={`${type.icon} text-sm`} />
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Default address */}
          <label
            htmlFor="isDefault"
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <input
              id="isDefault"
              name="isDefault"
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))
              }
              className="peer sr-only"
            />
            <span className="w-10 h-6 rounded-full bg-zinc-200 dark:bg-white/10 peer-checked:bg-[#e63b1f] relative transition-colors duration-200 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-200 peer-checked:after:translate-x-4" />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              Set as default address
            </span>
          </label>

          {errorMsg && (
            <p className="text-xs text-rose-500 text-center">{errorMsg}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={submitting}
              className="flex-1 h-11 rounded-xl border border-zinc-200 dark:border-white/10 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 h-11 rounded-xl bg-[#e63b1f] text-white text-sm font-semibold hover:bg-[#ff4f30] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Address"
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Address;