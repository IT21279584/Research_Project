import { useState, useEffect } from "react";
import Select from "react-select";
import Footer from "./Footer";
import Header from "./Header";

export default function Profile() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
        setError("Failed to load countries. Please try again later.");
      }
    };

    fetchCountries();
  }, []);

    return (
      <div>
        <Header />
        <div className="flex items-center justify-center min-h-screen font-archivo">
          <div className="flex w-3/4 gap-6 p-6 rounded-lg">
            {/* Profile Card */}
            <div className="flex flex-col items-center w-1/3 p-6 bg-white rounded-lg">
              <div className="relative">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="w-24 h-24 border-4 border-white rounded-full shadow-md"
                />
                <button className="absolute bottom-0 right-0 p-1 bg-gray-200 rounded-full shadow-md">
                  ✎
                </button>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-green-600">
                Jay Rutherford
              </h2>
              <p className="text-gray-500">Sri Lanka</p>
              <p className="mt-2 text-gray-600">jayrutherford@gmail.com</p>
            </div>

            {/* Edit Profile Form */}
            <div className="w-2/3 p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-3xl font-semibold">Edit Profile</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    defaultValue="Jay Rutherford"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Country</label>
                  {error ? (
                    <p className="text-red-500">{error}</p>
                  ) : (
                    <Select
                      options={countries}
                      className="w-full"
                      isSearchable
                      placeholder="Select a country"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    defaultValue="jayrutherford@gmail.com"
                    disabled
                  />
                </div>
                <div className="relative">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    className="w-full p-2 pr-10 border border-gray-300 rounded-lg"
                    defaultValue="********"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button className="px-4 py-2 text-green-700 bg-white border border-green-700 rounded-lg">
                    Logout
                  </button>
                  <button className="px-4 py-2 text-white bg-green-700 rounded-lg">
                    Save information
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
