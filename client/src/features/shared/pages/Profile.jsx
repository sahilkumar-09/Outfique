import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const { handleLogout } = useAuth();
  const navigate = useNavigate()
  const profileMenus = [
    {
      title: "My Orders",
      subtitle: "Track and manage your purchases",
      icon: "ri-shopping-bag-line",
    },
    {
      title: "Saved Addresses",
      subtitle: "Manage shipping destinations",
      icon: "ri-map-pin-line",
    },
    {
      title: "Wishlist",
      subtitle: "Your saved luxury selections",
      icon: "ri-heart-line",
    },
    {
      title: "Security",
      subtitle: "Password & account settings",
      icon: "ri-shield-check-line",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#f0ede8] px-6 py-10 md:px-16 md:py-14"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      {/* Header */}
      <div className="mb-14">
        <p className="text-[0.65rem] tracking-[0.28em] uppercase text-[#8a7f6e] mb-2">
          Account Overview
        </p>

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-wide text-[#1c1c1c] mb-1">
              My Profile
            </h1>

            <div className="w-10 h-px bg-[#c4b99a] mt-3" />
          </div>

          <button
            className="
              flex items-center gap-2
              py-2.5 px-7
              bg-[#1c1c1c]
              text-[#f0ede8]
              text-[0.65rem]
              tracking-[0.3em]
              uppercase
              hover:bg-[#343434]
              hover:scale-[1.03]
              active:scale-95
              transition-all
              duration-300
              cursor-pointer
              shadow-lg
              hover:shadow-2xl
            "
          >
            <i className="ri-pencil-line text-lg"></i>
            Edit Profile
          </button>
        </div>

        <p className="text-[#8a7f6e] text-base mt-3 font-light">
          Manage your account settings and personal details
        </p>
      </div>

      {/* Profile Card */}
      {/* Profile Card */}
      <div
        className="
    bg-[#f0ede8]
    border
    border-[#ddd8d0]
    hover:border-[#1c1c1c]
    transition-all
    duration-500
    hover:shadow-[0_8px_32px_rgba(28,28,28,0.10)]
    p-8
    mb-10
    group
  "
      >
        <div className="flex flex-col gap-8">
          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-[0.65rem] tracking-[0.28em] uppercase text-[#8a7f6e] mb-1">
                  Full Name
                </p>

                <h2 className="text-3xl font-semibold text-[#1c1c1c] tracking-wide">
                  {user?.fullname || "Guest User"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <div>
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#b5aa96] mb-1">
                    Email Address
                  </p>

                  <p className="text-[#1c1c1c] text-lg font-light">
                    {user?.email || "example@gmail.com"}
                  </p>
                </div>

                <div>
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#b5aa96] mb-1">
                    Phone Number
                  </p>

                  <p className="text-[#1c1c1c] text-lg font-light">
                    {user?.phone || "+91 9876543210"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profileMenus.map((menu, index) => {
          return (
            <div
              key={index}
              className="
                group
                bg-[#f0ede8]
                border
                border-[#ddd8d0]
                hover:border-[#1c1c1c]
                p-6
                cursor-pointer
                transition-all
                duration-500
                hover:shadow-[0_8px_32px_rgba(28,28,28,0.10)]
                hover:-translate-y-1
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#b5aa96] mb-2">
                    Dashboard Section
                  </p>

                  <h3 className="text-2xl text-[#1c1c1c] font-semibold tracking-wide">
                    {menu.title}
                  </h3>

                  <p className="text-[#8a7f6e] mt-2 text-base font-light">
                    {menu.subtitle}
                  </p>
                </div>

                <div
                  className="
                    w-12 h-12
                    flex items-center justify-center
                    border border-[#c4b99a]
                    rounded-full
                    group-hover:bg-[#1c1c1c]
                    group-hover:text-[#f0ede8]
                    transition-all
                    duration-500
                  "
                >
                  <i className={`${menu.icon} text-[20px]`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <div className="mt-12">
        <button
          className="
      flex items-center gap-3
      px-8 py-3
      border border-[#1c1c1c]
      text-[#1c1c1c]
      text-[0.65rem]
      tracking-[0.3em]
      uppercase
      hover:bg-[#1c1c1c]
      hover:text-[#f0ede8]
      hover:shadow-xl
      hover:scale-[1.02]
      active:scale-95
      transition-all
      duration-300
      cursor-pointer
    "
          onClick={() => {
            handleLogout();

            toast.success("Logout Successfully", {
              icon: "✓",
            });

            setTimeout(() => {
              navigate("/");
            }, 1200);
          }}
        >
          <i className="ri-logout-box-line text-lg"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
