import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link as ScrollLink } from "react-scroll"; // Import Link from react-scroll
import logo from "./assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="py-1 bg-white shadow-sm font-archivo">
      <div className="container flex items-center justify-between px-4 mx-auto">
        {/* Logo (Hidden on small screens, visible on md and larger) */}
        <div className="hidden md:block">
          <a href="/" className="text-gray-900">
            <img src={logo} alt="Farm Guard" className="w-32" />{" "}
            {/* Set width for the logo */}
          </a>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-black focus:outline-none"
          >
            {menuOpen ? (
              <FontAwesomeIcon icon={faTimes} size="lg" /> // Close icon
            ) : (
              <FontAwesomeIcon icon={faBars} size="lg" /> // Hamburger icon
            )}
          </button>
        </div>

        {/* Full Navigation Links (hidden on small screens) */}
        <nav
          className={`md:flex space-x-6 ${
            menuOpen ? "block" : "hidden"
          } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent z-20`}
        >
          {/* Home Link */}
          <a
            href="/"
            className="block py-2 text-gray-600 cursor-pointer md:inline hover:text-black md:py-0"
          >
            Home
          </a>

          {/* Services Link (With smooth scrolling) */}
          <ScrollLink
            to="services" // Link to section with id="services"
            smooth={true}
            duration={500}
            className="block py-2 text-gray-600 cursor-pointer md:inline hover:text-black md:py-0"
          >
            Services
          </ScrollLink>

          {/* News Link (With smooth scrolling) */}
          <ScrollLink
            to="news" // Link to section with id="news"
            smooth={true}
            duration={500}
            className="block py-2 text-gray-600 cursor-pointer md:inline hover:text-black md:py-0"
          >
            News
          </ScrollLink>

          {/* Community Link (With smooth scrolling) */}
          <ScrollLink
            to="community" // Link to section with id="community"
            smooth={true}
            duration={500}
            className="block py-2 text-gray-600 cursor-pointer md:inline hover:text-black md:py-0"
          >
            Community
          </ScrollLink>

          {/* About Us Link  */}
          <a
            href="#about-us"
            className="block py-2 text-gray-600 cursor-pointer md:inline hover:text-black md:py-0"
          >
            About Us
          </a>
        </nav>

        {/* Right-side Search and Cart Icons */}
        <div className="flex space-x-6">
          {/* Search Icon */}
          <a href="#" className="text-gray-600 hover:text-black">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </a>

          {/* Login Button */}
          <a
            href="/sign-in"
            className="px-4 py-2 text-gray-600 border border-green-800 rounded-lg hover:bg-green-800 hover:text-white"
          >
            Login
          </a>

          {/* Signup Button */}
          <a
            href="/sign-up"
            className="px-4 py-2 text-white bg-green-800 border border-green-800 rounded-lg hover:bg-white hover:text-gray-500"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
