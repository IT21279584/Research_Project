import React from "react";
import sigin from "./assets/sign-in.jpg";
import logo from "./assets/logo.png";
import Footer from "./Footer";
import Header from "./Header";

const Signin = () => {
  return (
    <div>
      <Header />
      <div
        className="flex min-h-screen bg-center bg-cover font-archivo"
        style={{
          backgroundImage: `url(${sigin})`,
        }}
      >
        {/* Left Section - Form */}
        <div className="flex justify-end w-full p-6 sm:px-12 lg:px-24">
          <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-lg sm:max-w-md sm:p-12 lg:max-w-lg">
            {/* Logo */}
            <div className="flex items-center justify-center w-auto h-20 mb-6">
              <img
                src={logo}
                alt="Farm Guard"
                className="w-auto h-16 sm:h-20"
              />
            </div>

            {/* Heading */}
            <h2 className="mb-6 text-2xl font-semibold text-center sm:text-3xl">
              Sign In
            </h2>

            {/* Form */}
            <form>
              <div className="space-y-6">
                {/* Email Field */}
                <div className="relative">
                  <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Sign-In Button */}
              <button
                type="submit"
                className="w-full py-2 mt-6 font-medium text-white bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Sign In
              </button>

              {/* Horizontal Line with "OR" */}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <p className="my-8 text-xs text-center text-gray-500">
                By continuing, you agree to the updated{" "}
                <span className="font-bold">Terms, Conditions</span> and{" "}
                <span className="font-bold">Privacy Policy</span>.
              </p>

              {/* Google Button */}
              <button
                type="submit"
                className="flex items-center justify-center w-full gap-2 py-2 mt-6 font-medium text-red-700 border border-red-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <i className="fab fa-google"></i>
                Continue with Google
              </button>

              {/* Sign-In Link */}
              <p className="mt-8 text-sm text-center text-gray-600">
                Do not have an account?{" "}
                <a href="#" className="font-bold text-blue-500 hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
