import React, { useState } from "react";
import sigin from "./assets/sign-in.jpg";
import logo from "./assets/logo.png";
import Footer from "./Footer";
import Header from "./Header";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5012/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in.");
      }

      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLogin", "true"); 
      console.log("Login successful:", data);
      // Redirect to home
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div
        className="flex min-h-screen bg-center bg-cover font-archivo"
        style={{
          backgroundImage: `url(${sigin})`,
        }}
      >
        <div className="flex justify-end w-full p-6 sm:px-12 lg:px-24">
          <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-lg sm:max-w-md sm:p-12 lg:max-w-lg">
            <div className="flex items-center justify-center w-auto h-20 mb-6">
              <img
                src={logo}
                alt="Farm Guard"
                className="w-auto h-16 sm:h-20"
              />
            </div>

            <h2 className="mb-6 text-2xl font-semibold text-center sm:text-3xl">
              Sign In
            </h2>

            {error && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSignIn}>
              <div className="space-y-6">
                <div className="relative">
                  <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-6 font-medium text-white bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

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

              <button
                type="button"
                className="flex items-center justify-center w-full gap-2 py-2 mt-6 font-medium text-red-700 border border-red-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <i className="fab fa-google"></i>
                Continue with Google
              </button>

              <p className="mt-8 text-sm text-center text-gray-600">
                Do not have an account?{" "}
                <a
                  href="/signup"
                  className="font-bold text-blue-500 hover:underline"
                >
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
