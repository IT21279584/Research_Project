import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faBars,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import profile from "./assets/profile.png";
import { Link as ScrollLink } from "react-scroll";
import logo from "./assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
    const token = localStorage.getItem("token");

  const [user, setUser] = useState({
    name: "",
    email: "",
    country: "",
    password: "",
    profilePicture: "",
  });

  // Check login state when component mounts
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin") === "true";
    setIsLoggedIn(loginStatus);

    if (loginStatus) {
      fetchProfile();
    }
  }, []);



      const fetchProfile = async () => {
        if (!token) {
          setError("Authentication required. Please log in.");
          return;
        }
        try {
          const response = await axios.get(
            "http://localhost:5012/api/users/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data && response.data.profilePicture) {
            setProfilePic(response.data.profilePicture);
          } else {
            setProfilePic(profile);
          }
          
        } catch (error) {
          console.error("Error fetching profile pic", error);
          setError("Error fetching profile pic.");
        }
      };

  // Toggle Menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="py-1 bg-white shadow-sm font-archivo">
      <div className="container flex items-center justify-between px-4 mx-auto">
        {/* Logo */}
        <div className="hidden md:block">
          <a href="/" className="text-gray-900">
            <img src={logo} alt="Farm Guard" className="w-32" />
          </a>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-black focus:outline-none"
          >
            {menuOpen ? (
              <FontAwesomeIcon icon={faTimes} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="lg" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`md:flex space-x-6 ${
            menuOpen ? "block" : "hidden"
          } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent z-20`}
        >
          <a
            href="/"
            className="block py-2 text-gray-600 cursor-pointer md:inline hover:text-black md:py-0"
          >
            Home
          </a>
          <ScrollLink
            to="services"
            smooth={true}
            duration={500}
            className="block py-2 text-gray-600 cursor-pointer md:inline hover:text-black md:py-0"
          >
            Services
          </ScrollLink>
          <ScrollLink
            to="news"
            smooth={true}
            duration={500}
            className="block py-2 text-gray-600 cursor-pointer md:inline hover:text-black md:py-0"
          >
            News
          </ScrollLink>
          <ScrollLink
            to="community"
            smooth={true}
            duration={500}
            className="block py-2 text-gray-600 cursor-pointer md:inline hover:text-black md:py-0"
          >
            Community
          </ScrollLink>
          <a
            href="#about-us"
            className="block py-2 text-gray-600 cursor-pointer md:inline hover:text-black md:py-0"
          >
            About Us
          </a>
        </nav>

        {/* Right-side Icons */}
        <div className="flex items-center space-x-6">
          {/* Search Icon */}
          <a href="#" className="text-gray-600 hover:text-black">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </a>

          {/* Conditional Rendering for Profile Picture */}
          {isLoggedIn ? (
            <a href="/profile" className="flex items-center">
              <img
                src={profilePic || profile}
                alt="User Profile"
                className="w-8 h-8 border border-gray-300 rounded-full"
              />
            </a>
          ) : (
            <>
              <a
                href="/sign-in"
                className="px-4 py-2 text-gray-600 border border-green-800 rounded-lg hover:bg-green-800 hover:text-white"
              >
                Login
              </a>
              <a
                href="/sign-up"
                className="px-4 py-2 text-white bg-green-800 border border-green-800 rounded-lg hover:bg-white hover:text-gray-500"
              >
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
