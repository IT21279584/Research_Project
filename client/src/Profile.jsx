import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Footer from "./Footer";
import profile from "./assets/profile.png";
import Header from "./Header";
import Swal from "sweetalert2";

import { BASE_URL_USER } from "./constants";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    country: "",
    password: "",
    profilePicture: "",
  });
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("Authentication required. Please log in.");
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL_USER}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          name: response.data.name,
          email: response.data.email,
          country: response.data.country,
          password: "",
          profilePicture: response.data.profilePicture || profile,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile information.");
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const countryOptions = data
          .map((country) => ({
            label: country.name.common,
            value: country.name.common,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryOptions);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Failed to load countries.");
      }
    };

    fetchProfile();
    fetchCountries();
  }, [token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setSelectedFilePreview(URL.createObjectURL(file));
  };

  const uploadProfilePicture = async () => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      const response = await axios.put(
        `${BASE_URL_USER}/api/users/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.profilePicture;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = user.profilePicture;

      if (selectedFile) {
        imageUrl = await uploadProfilePicture();
      }

      await axios.put(
        `${BASE_URL_USER}/api/users/profile`,
        {
          name: user.name,
          email: user.email,
          country: user.country,
          password: user.password ? user.password : undefined,
          profilePicture: imageUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await Swal.fire({
        title: "Profile Updated!",
        text: "Your profile has been successfully updated.",
        icon: "success", // Success icon
        background: "#ffffff", // Clean white background
        color: "#333", // Dark text color for readability
        confirmButtonColor: "#2c6b2f", // Dark green button for a professional look
        confirmButtonText: "OK",
        showCloseButton: true, // Show a close button for cleaner interaction
        padding: "20px"
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
      await Swal.fire({
        title: "Error!",
        text: "Failed to update profile.",
        icon: "error",
        background: "#ffffff", // Clean white background
        color: "#333", // Dark text color for readability
        confirmButtonColor: "#2c6b2f", // Dark green button for a professional look
        confirmButtonText: "OK",
        showCloseButton: true, // Show a close button for a cleaner look
        padding: "20px", // Add padding for spacing
      });
      
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#f3f4f6",
      borderRadius: "0.375rem",
      border: "none",
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
      <div className="flex flex-col items-center min-h-screen p-4 font-archivo">
        {/* Profile Title */}
        <div className="w-full mb-4 text-left sm:w-3/4">
          <h1 className="text-4xl font-bold">Profile</h1>
        </div>

        <div className="flex flex-col w-full gap-4 p-6 rounded-lg md:flex-row sm:w-3/4 md:gap-6">
          {/* Profile Info Card */}
          <div className="flex flex-col items-center w-full h-auto p-4 bg-white border border-gray-300 rounded-lg sm:w-1/3 sm:h-96">
            <div className="relative">
              <img
                src={selectedFilePreview || user.profilePicture || profile}
                alt="Profile"
                className="w-32 h-32 border-white rounded-full shadow-md sm:w-40 sm:h-40"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="profileUpload"
              />
              <label
                htmlFor="profileUpload"
                className="absolute bottom-0 right-0 p-1 bg-gray-200 rounded-full shadow-md cursor-pointer"
              >
                <i className="text-xs text-gray-700 fas fa-edit"></i>
              </label>
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-xl font-semibold text-green-800">
                {user.name}
              </h3>
              <p className="pb-4 text-gray-600">{user.country}</p>
            </div>
            <hr className="w-full py-2 border-t-2" />
            <div className="mt-2 text-center">
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* Edit Profile Section */}
          <div className="w-full p-6 bg-white border border-gray-300 rounded-lg sm:w-2/3">
            <h2 className="mb-4 text-3xl font-bold">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full p-2 bg-gray-100 border-none rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium">
                  Country
                </label>
                <Select
                  options={countries}
                  value={countries.find(
                    (country) => country.value === user.country
                  )}
                  onChange={(selectedOption) =>
                    setUser({ ...user, country: selectedOption.value })
                  }
                  placeholder="Select a country"
                  styles={customStyles}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full p-2 bg-gray-100 border-none rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="w-full p-2 bg-gray-100 border-none rounded-md outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <hr className="w-full py-2 border-t-2" />

              {/* Buttons Row */}
              <div className="flex flex-col justify-between gap-4 mt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.setItem("isLogin", "false");
                    window.location.href = "/"; // Redirect to Home
                  }}
                  className="w-full px-4 py-2 text-green-800 border border-green-600 rounded-lg sm:w-auto hover:bg-green-700 hover:text-white"
                >
                  Logout
                </button>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-green-700 rounded-lg sm:w-auto hover:bg-green-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
