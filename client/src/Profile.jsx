import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    country: "",
    password: "",
    profilePicture: "https://via.placeholder.com/100",
  });
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem("token");


useEffect(() => {
  const fetchProfile = async () => {
    if (!token) {
      setError("Authentication required. Please log in.");
      return; // Prevent making the request if the token is missing
    }
    try {
      const response = await axios.get(
        "http://localhost:5012/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser({
        name: response.data.name,
        email: response.data.email,
        country: response.data.country, // Ensure the country is being fetched
        password: "",
        profilePicture:
          response.data.profilePicture || "https://via.placeholder.com/100",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
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
          value: country.cca2, // Make sure the value corresponds to a valid country code
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



  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const uploadProfilePicture = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5012/api/users/profile", // Assuming you have a separate endpoint for updating profile picture
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser({ ...user, profilePicture: response.data.profilePicture });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5012/api/users/profile",
        {
          name: user.name,
          email: user.email,
          country: user.country,
          password: user.password ? user.password : undefined, // Only send password if modified
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen font-archivo">
        <div className="flex w-3/4 gap-6 p-6 rounded-lg">
          <div className="flex flex-col items-center w-1/3 p-6 bg-white rounded-lg">
            <div className="relative">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-24 h-24 border-4 border-white rounded-full shadow-md"
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
                ✎
              </label>
            </div>
            <button
              onClick={uploadProfilePicture}
              className="mt-2 text-sm text-blue-600"
            >
              Upload Image
            </button>
            <h2 className="mt-4 text-lg font-semibold text-green-600">
              {user.name}
            </h2>
            <p className="text-gray-500">{user.country}</p>
            <p className="mt-2 text-gray-600">{user.email}</p>
          </div>
          <div className="w-2/3 p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-3xl font-semibold">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <Select
                options={countries}
                className="w-full"
                isSearchable
                placeholder="Select a country"
                value={countries.find((c) => c.value === user.country)}
                onChange={(selected) =>
                  setUser({ ...user, country: selected.value })
                }
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-700 rounded-lg"
              >
                Save information
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
