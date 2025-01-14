import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="py-4 bg-white shadow-sm font-archivo">
      <div className="container flex items-center justify-between px-4 mx-auto">
        {/* Logo (Hidden on small screens, visible on md and larger) */}
        <div className="hidden text-xl font-bold md:block">
          <a href="#" className="text-gray-900">
            Brand
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
          <a
            href="/"
            className="block py-2 text-gray-600 md:inline hover:text-black md:py-0"
          >
            Home
          </a>
          <a
            href="#"
            className="block py-2 text-gray-600 md:inline hover:text-black md:py-0"
          >
            Services
          </a>
          <a
            href="#"
            className="block py-2 text-gray-600 md:inline hover:text-black md:py-0"
          >
            News
          </a>
          <a
            href="#"
            className="block py-2 text-gray-600 md:inline hover:text-black md:py-0"
          >
            Community
          </a>
          <a
            href="#"
            className="block py-2 text-gray-600 md:inline hover:text-black md:py-0"
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
            href="#"
            className="px-4 py-2 text-gray-600 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
          >
            Login
          </a>

          {/* Signup Button */}
          <a
            href="#"
            className="px-4 py-2 text-white bg-green-500 border border-green-500 rounded-lg hover:bg-white hover:text-gray-500"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
