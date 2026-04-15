import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Right = () => {

  const navigate = useNavigate()

  const {handleRegister} = useAuth()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    isSeller: false,
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const submitHandler = async(e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const data = await handleRegister({
      email: formData.email,
      contact: formData.contact,
      password: formData.password,
      fullName: formData.fullName,
      isSeller: formData.isSeller,
    })
    navigate("/")
      setError("");
      setFormData({
        fullName: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
        isSeller: false,
      })
  };

  return (
    <div className="lg:w-1/2 w-full flex items-center justify-center px-6 py-10 lg:px-16">
      <div className="w-full max-w-md">
        <p className="text-yellow-500 tracking-widest uppercase text-xs mb-2">
          Registration
        </p>
        <h1 className="text-3xl font-semibold tracking-wider mb-6 ">
          Create your account
        </h1>

        <form className="space-y-6" onSubmit={submitHandler}>
          <div className="md:grid-cols-2 gap-5 flex flex-col ">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Enter your phone"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="cursor-pointer absolute right-3 top-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="ri-eye-off-fill"></i>
                ) : (
                  <i className="ri-eye-fill"></i>
                )}
              </button>
            </div>

            <div>
              <div className="relative mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
                  placeholder="Enter your confirm password"
                />
                <button
                  type="button"
                  className="cursor-pointer absolute right-3 top-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <i className="ri-eye-off-fill"></i>
                  ) : (
                    <i className="ri-eye-fill"></i>
                  )}
                </button>
              </div>

              <div className="flex">
                <input
                  id="isSeller"
                  type="checkbox"
                  name="isSeller"
                  checked={formData.isSeller || false}
                  onChange={handleChange}
                  className="w-5 h-5 text-yellow-500 cursor-pointer font-medium accent-yellow-500 "
                />
                <label
                  htmlFor="isSeller"
                  className="ml-2 text-sm cursor-pointer font-medium text-zinc-500"
                >
                  Register as a seller
                </label>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full cursor-pointer px-4 uppercase tracking-wider py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Create Account
            </button>
          </div>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/auth/user/login"
              className="text-yellow-500 hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>

          <div className="flex items-center gap-3 my-2">
            <hr className="flex-1 border-gray-700" />
            <span className="text-xs text-gray-500 uppercase tracking-widest">or</span>
            <hr className="flex-1 border-gray-700" />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => window.location.href = "/api/auth/google"}
              className="w-full cursor-pointer px-4 uppercase tracking-wider py-2 bg-transparent text-zinc-200 border border-zinc-700 rounded-lg flex items-center justify-center gap-3 hover:bg-zinc-800 hover:border-zinc-500 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Right;
