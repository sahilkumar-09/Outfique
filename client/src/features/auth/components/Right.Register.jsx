import React, { useState } from "react";
import { Link } from "react-router";

const Right = () => {
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

  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

      setError("");
      setFormData({
        fullName: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
        isSeller: false,
      })
    console.log("Form Data -> ", formData);
  };

  return (
    <div className="lg:w-1/2 w-full flex items-center justify-center px-6 py-10 lg:px-16">
      <div className="w-full max-w-md">
        <p className="text-yellow-500 tracking-widest uppercase text-xs mb-2">
          Registration
        </p>
        <h1 className="text-3xl font-bold mb-6">Create your account</h1>

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

              <div>
                <input
                  type="checkbox"
                  name="isSeller"
                  checked={formData.isSeller || false}
                  onChange={handleChange}
                  className="w-4 h-4 cursor-pointer text-yellow-500 bg-gray-900 border-gray-700 rounded focus:ring-yellow-500"
                />
                <label className="ml-2 text-sm cursor-pointer font-medium text-gray-400">
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
        </form>
      </div>
    </div>
  );
};

export default Right;
