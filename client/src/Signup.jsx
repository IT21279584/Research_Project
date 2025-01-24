import React, { useState, useEffect } from "react";
import Select from "react-select";
import signup from "./assets/sign-up.png";
import logo from "./assets/logo.png";
import Footer from "./Footer";
import Header from "./Header";

const Signup = () => {
  const [value, setValue] = useState(null);
  const [countries, setCountries] = useState([]); // State to store country options


  // Fetch countries dynamically from the API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        // Sort countries alphabetically by their common name (label)
        const countryOptions = data
          .map((country) => ({
            label: country.name.common,
            value: country.cca2, // ISO Alpha-2 code
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Alphabetical sorting
        setCountries(countryOptions);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error("Error fetching countries: ", err);
        setError("Failed to load countries");
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Custom styles for react-select
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#f3f4f6", // Matches the background of other inputs
      borderRadius: "0.375rem", // Rounded corners
      border: "none", // Remove border
      paddingLeft: "2.5rem", // Match padding of other inputs
      height: "2.5rem", // Consistent height with other fields
      boxShadow: "none", // Remove any shadow
    }),
    placeholder: (base) => ({
      ...base,
      color: "#6b7280", // Placeholder text color to match other inputs
      fontSize: "1rem", // Font size to match the other fields
    }),
    singleValue: (base) => ({
      ...base,
      color: "#374151", // Text color for the selected value
      fontSize: "1rem", // Font size to match the other fields
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#6b7280", // Icon color (gray)
    }),
    indicatorSeparator: () => ({
      display: "none", // Hide separator
    }),
    menu: (base) => ({
      ...base,
      marginTop: "0.25rem", // Adjust menu position to match other inputs
      borderRadius: "0.375rem", // Rounded corners for the dropdown menu
    }),
  };

    return (
        <div>
            <Header/>
        <div
          className="flex min-h-screen bg-center bg-cover font-archivo"
          style={{
            backgroundImage: `url(${signup})`,
          }}
        >
          {/* Left Section - Form */}
          <div className="w-full max-w-md p-12 my-auto bg-white rounded-lg shadow-lg md:max-w-lg md:ml-16">
            {/* Logo */}
            <div className="flex items-center justify-center w-auto h-20 mb-6">
              <img
                src={logo} // Replace with the "Farm Guard" logo path
                alt="Farm Guard"
                className="w-auto h-28" // Increased height and kept w-auto for aspect ratio
              />
            </div>

            {/* Heading */}
            <h2 className="mb-4 text-2xl font-semibold text-center">
              Create an account
            </h2>

            {/* Form */}
            <form>
              <div className="space-y-4">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                    <i className="fas fa-user"></i>
                  </span>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>

                {/* Country Dropdown */}
                <div className="relative">
                  <Select
                    options={countries}
                    value={value}
                    onChange={setValue}
                    placeholder="Select Country"
                    styles={customStyles} // Apply custom styles to the Select component
                    className="w-full" // Make the Select take full width of the container
                  />
                  <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                </div>

                {/* Password Field */}
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    className="w-full px-10 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <span className="absolute inset-y-0 flex items-center text-gray-500 left-3">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-green-500 focus:ring-green-500 focus:outline-none"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree with{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Terms, Conditions & Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              {/* Sign-Up Button */}
              <button
                type="submit"
                className="w-full py-2 mt-6 font-medium text-white bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Sign Up
              </button>

              {/* Sign-In Link */}
              <p className="mt-4 text-sm text-center text-gray-600">
                Already have an account?{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Sign in
                </a>
              </p>
            </form>
          </div>
            </div>
            <Footer/>
      </div>
    );
};

export default Signup;
