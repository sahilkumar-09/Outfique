import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useProfile } from "../hooks/useProfile";

/* ─── reusable display field ──────────────────────────────────────── */
const DataField = ({ label, value }) => (
  <div className="flex flex-col gap-[6px]">
    <span
      className="text-[8px] tracking-[0.22em] uppercase text-[#999] dark:text-[#555]"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {label}
    </span>
    <span
      className="text-[12px] tracking-[0.08em] uppercase text-[#111] dark:text-white"
      style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}
    >
      {value || "NOT PROVIDED"}
    </span>
  </div>
);

/* ─── section heading with red left-bar ──────────────────────────── */
const SectionHeading = ({ children }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="w-[3px] h-[18px] bg-[#e63b1f] flex-shrink-0" />
    <h2
      className="tracking-[0.2em] text-[#111] dark:text-white"
      style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px" }}
    >
      {children}
    </h2>
  </div>
);

/* ─── dashboard menu card ─────────────────────────────────────────── */
const MenuCard = ({ title, subtitle, icon, onClick }) => (
  <div
    onClick={onClick}
    className="
      group flex items-start justify-between p-6 cursor-pointer
      border border-[#e0e0e0] dark:border-[#1e1e1e]
      hover:border-[#111] dark:hover:border-[#333]
      bg-white dark:bg-transparent
      transition-all duration-300
    "
  >
    <div>
      <p
        className="text-[8px] tracking-[0.22em] uppercase text-[#bbb] dark:text-[#444] mb-2"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        Dashboard Section
      </p>
      <h3
        className="text-[#111] dark:text-white mb-2 leading-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "22px",
          letterSpacing: "0.06em",
        }}
      >
        {title}
      </h3>
      <p
        className="text-[10px] tracking-[0.1em] text-[#999] dark:text-[#444] leading-relaxed"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        {subtitle}
      </p>
    </div>

    {/* icon circle — dark: white-on-dark hover / light: black-on-white hover */}
    <div
      className="
        w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ml-4
        border border-[#ddd] dark:border-[#2a2a2a]
        group-hover:bg-[#111] group-hover:border-[#111]
        dark:group-hover:bg-white dark:group-hover:border-white
        transition-all duration-300
      "
    >
      <i
        className={`
          ${icon} text-base transition-colors duration-300
          text-[#999] dark:text-[#555]
          group-hover:text-white dark:group-hover:text-black
        `}
      />
    </div>
  </div>
);

/* ─── main component — all original logic preserved ───────────────── */
const Profile = () => {
  /* ── original logic: untouched ── */
  const user = useSelector((state) => state.auth.user);
  const { handleLogout } = useAuth();
  const { handleGetProfileDetails } = useProfile();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const userid = user?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await handleGetProfileDetails();
        setProfileData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  const profileMenus = [
    {
      title: "Shopping Cart",
      subtitle: "Manage products ready for checkout",
      icon: "ri-shopping-bag-3-line",
      path: "/cart",
    },
    {
      title: "Wishlist",
      subtitle: "Your saved luxury selections",
      icon: "ri-heart-3-line",
      path: `/user/style-list`,
    },
    {
      title: "Security",
      subtitle: "Password & account settings",
      icon: "ri-shield-keyhole-line",
      path: "/security",
    },
  ];
  /* ── end original logic ── */

  const nameParts = (profileData?.fullName || user?.name || "MEMBER")
    .toUpperCase()
    .split(" ");

  return (
    <div
      className="min-h-screen bg-[#f7f7f7] dark:bg-[#0a0a0a] text-[#111] dark:text-white"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* ── HERO — giant stacked name ─────────────────────────────── */}
      <section className="px-5 md:px-10 lg:px-16 pt-8 pb-0">
        <p
          className="text-[9px] tracking-[0.28em] uppercase text-[#aaa] dark:text-[#555] mb-4"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          LUXURY ACCOUNT
        </p>

        <div className="overflow-hidden">
          {nameParts.map((part, i) => (
            <div
              key={i}
              className="select-none leading-[0.88] text-[#111] dark:text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(64px, 20vw, 150px)",
                letterSpacing: "-0.01em",
              }}
            >
              {part}
            </div>
          ))}
        </div>
      </section>

      {/* ── DIVIDER ───────────────────────────────────────────────── */}
      <div className="h-px bg-[#e0e0e0] dark:bg-[#1e1e1e] mx-5 md:mx-10 lg:mx-16 mt-12 mb-12" />

      {/* ── PERSONAL IDENTITY + REGISTERED ADDRESS ────────────────── */}
      <section className="px-5 md:px-10 lg:px-16 mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Personal Identity */}
          <div>
            <SectionHeading>Personal Identity</SectionHeading>
            <div className="flex flex-col gap-8">
              <DataField label="Email Address" value={user?.email} />
              <DataField label="Phone Number" value={profileData?.contact} />
              <DataField
                label="Alternate Contact"
                value={profileData?.alternateContact}
              />
              <DataField
                label="Address Type"
                value={profileData?.addressType}
              />
            </div>
          </div>

          {/* Registered Address */}
          <div>
            <SectionHeading>Registered Address</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
              <DataField
                label="House No / Name"
                value={
                  profileData?.houseNo
                    ? `${profileData.houseNo}${profileData.street ? ", " + profileData.street : ""}`
                    : undefined
                }
              />
              <DataField label="Street" value={profileData?.street} />
              <DataField label="Landmark" value={profileData?.landmark} />
              <DataField
                label="City / State"
                value={
                  profileData?.city && profileData?.state
                    ? `${profileData.city} / ${profileData.state}`
                    : profileData?.city || profileData?.state
                }
              />
              <DataField label="Pincode" value={profileData?.pincode} />
              <DataField label="Country" value={profileData?.country} />
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ───────────────────────────────────────────────── */}
      <div className="h-px bg-[#e0e0e0] dark:bg-[#1e1e1e] mx-5 md:mx-10 lg:mx-16 mb-14" />

      {/* ── PURCHASE ARCHIVE CTA ──────────────────────────────────── */}
      <section className="px-5 md:px-10 lg:px-16 mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2
              className="leading-none mb-3 text-[#111] dark:text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(34px, 8vw, 60px)",
                letterSpacing: "0.02em",
              }}
            >
              PURCHASE ARCHIVE
            </h2>
            <p
              className="text-[9px] tracking-[0.2em] uppercase text-[#999] dark:text-[#555]"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              REVIEW YOUR CURATED ACQUISITIONS FROM THE SEASONAL ARCHIVES.
            </p>
          </div>

          <button
            onClick={() => navigate("/user/orders")}
            className="flex items-center gap-3 flex-shrink-0 bg-transparent border-0 cursor-pointer group"
          >
            <span
              className="
                text-[9px] tracking-[0.28em] uppercase
                text-[#999] dark:text-[#555]
                group-hover:text-[#111] dark:group-hover:text-white
                transition-colors duration-200
              "
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              VIEW ALL ORDERS
            </span>
            <div
              className="
                w-9 h-9 rounded-full flex items-center justify-center
                border border-[#ddd] dark:border-[#2a2a2a]
                group-hover:bg-[#111] group-hover:border-[#111]
                dark:group-hover:bg-white dark:group-hover:border-white
                transition-all duration-200
              "
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <polyline
                  points="12 5 19 12 12 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </button>
        </div>
      </section>

      {/* ── DASHBOARD MENU CARDS ──────────────────────────────────── */}
      <section className="px-5 md:px-10 lg:px-16 mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profileMenus.map((menu, index) => (
            <MenuCard
              key={index}
              title={menu.title}
              subtitle={menu.subtitle}
              icon={menu.icon}
              onClick={() => navigate(menu.path)}
            />
          ))}
        </div>
      </section>

      {/* ── ACTIONS: EDIT + LOGOUT ────────────────────────────────── */}
      <section className="px-5 md:px-10 lg:px-16 mb-24">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Edit Profile */}
          <button
            onClick={() => navigate(`/create-profile/${userid}`)}
            className="
              flex items-center justify-between
              px-6 py-5 min-w-[220px] border-0 cursor-pointer
              bg-[#111] dark:bg-white
              text-white dark:text-black
              hover:bg-[#333] dark:hover:bg-[#f5f0e8]
              active:scale-[0.99] transition-all duration-200
            "
          >
            <span
              className="text-[14px] tracking-[4px]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              EDIT PROFILE
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="ml-6"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              handleLogout();
              toast.success("Logout Successfully", { icon: "✓" });
              setTimeout(() => navigate("/"), 1200);
            }}
            className="
              flex items-center justify-between
              px-6 py-5 min-w-[180px] cursor-pointer
              bg-transparent
              text-[#e63b1f]
              border border-[#e63b1f]/40
              hover:bg-[#e63b1f]/8 hover:border-[#e63b1f]
              active:scale-[0.99] transition-all duration-200
            "
          >
            <span
              className="text-[14px] tracking-[4px]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              LOGOUT
            </span>
            <i className="ri-logout-box-r-line text-[#e63b1f]/60 ml-6 text-base" />
          </button>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer
        className="
          border-t px-5 md:px-10 lg:px-16 pt-12 pb-10
          bg-[#efefef] dark:bg-[#0d0d0d]
          border-[#e0e0e0] dark:border-[#1e1e1e]
        "
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          {/* brand */}
          <div className="max-w-[260px]">
            <p
              className="mb-3 text-[#111] dark:text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "22px",
                letterSpacing: "3px",
              }}
            >
              OUTFIQUE
            </p>
            <p
              className="text-[9px] tracking-[0.18em] uppercase text-[#aaa] dark:text-[#444] leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              CURATING THE ESSENTIALS OF MODERN IDENTITY THROUGH BRUTALIST
              ARCHITECTURE AND EDITORIAL MINIMALISM.
            </p>
          </div>

          {/* footer nav */}
          <div className="flex gap-12 sm:gap-20">
            <div className="flex flex-col gap-4">
              {["Shipping & Returns", "Privacy Policy", "Terms of Service"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="
                    text-[9px] tracking-[0.18em] uppercase no-underline transition-colors duration-200
                    text-[#aaa] dark:text-[#555]
                    hover:text-[#111] dark:hover:text-white
                  "
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {link}
                  </a>
                ),
              )}
            </div>
            <div className="flex flex-col gap-4">
              {["Instagram", "Twitter", "Archive"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="
                    text-[9px] tracking-[0.18em] uppercase no-underline transition-colors duration-200
                    text-[#aaa] dark:text-[#555]
                    hover:text-[#111] dark:hover:text-white
                  "
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="
            flex items-center justify-between pt-6
            border-t border-[#ddd] dark:border-[#1a1a1a]
          "
        >
          <p
            className="text-[9px] tracking-[0.18em] uppercase text-[#ccc] dark:text-[#333]"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            © 2026 OUTFIQUE COLLECTIVE
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;