import React, { useState, useEffect } from "react";
import Select from "react-select";
import signup from "./assets/sign-up.png";
import logo from "./assets/logo.png";
import Footer from "./Footer";
import Header from "./Header";

const Signup = () => {
  const [value, setValue] = useState(null); // Selected country
  const [countries, setCountries] = useState([]); // List of countries
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch countries dynamically from the API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryOptions = data
          .map((country) => ({
            label: country.name.common,
            value: country.cca2,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryOptions);
      } catch (err) {
        console.error("Error fetching countries: ", err);
        setError("Failed to load countries.");
      }
    };

    fetchCountries();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword, termsAccepted } = formData;

    // Basic validations
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5012/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          country: value?.label || "", // Include selected country
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false,
        });
       window.location.href = "/sign-in";

        setValue(null);
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during signup: ", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#f3f4f6",
      borderRadius: "0.375rem",
      border: "none",
      paddingLeft: "2.5rem",
      height: "2.5rem",
      boxShadow: "none",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#6b7280",
      fontSize: "1rem",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#374151",
      fontSize: "1rem",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#6b7280",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (base) => ({
      ...base,
      marginTop: "0.25rem",
      borderRadius: "0.375rem",
    }),
  };

  return (
    <div>
      <Header />
      <div
        className="flex min-h-screen bg-center bg-cover font-archivo"
        style={{ backgroundImage: `url(${signup})` }}
      >
        <div className="w-full max-w-md p-12 my-auto bg-white rounded-lg shadow-lg md:max-w-lg md:ml-16">
          <div className="flex items-center justify-center w-auto h-20 mb-6">
            <img src={logo} alt="Farm Guard" className="w-auto h-28" />
          </div>

          <h2 className="mb-4 text-2xl font-semibold text-center">
            Create an account
          </h2>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 mb-4 text-sm text-green-700 bg-green-200 rounded-md">
                {success}
              </div>
            )}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              <div className="relative">
                <Select
                  options={countries}
                  value={value}
                  onChange={setValue}
                  placeholder="Select Country"
                  styles={customStyles}
                  className="w-full"
                />
                <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-500 focus:ring-green-500 focus:outline-none"
                />
                <label
                  htmlFor="termsAccepted"
                  className="ml-2 text-sm text-gray-600"
                >
                  I agree with{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Terms, Conditions & Privacy Policy
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-6 font-medium text-white bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
