import React from 'react'

const Right = () => {

  return (
      <div className="lg:w-1/2 w-full flex items-center justify-center px-6 py-10 lg:px-16">
          <div className="w-full max-w-md">
            <p className="text-yellow-500 tracking-widest uppercase text-xs mb-2">
              Login
            </p>
            <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>
    </div>
  );
}

export default Right