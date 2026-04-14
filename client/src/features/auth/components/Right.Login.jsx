import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";

const Right = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await handleLogin({
      email,
      password,
    });

    navigate("/")

    setEmail("")
    setPassword("")
    
  };

  return (
    <div className="lg:w-1/2 w-full flex items-center justify-center px-6 py-10 lg:px-16">
      <div className="w-full max-w-md">
        <p className="text-yellow-500 tracking-widest uppercase text-xs mb-2">
          Login
        </p>
        <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-3 top-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="ri-eye-off-fill"></i>
              ) : (
                <i className="ri-eye-fill"></i>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Sign In
          </button>
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/auth/user/register"
              className="text-yellow-500 hover:underline cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Right;
