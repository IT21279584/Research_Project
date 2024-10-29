import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="py-4 bg-white shadow-sm">
      <div className="container flex items-center justify-between px-4 mx-auto">
        
        {/* Logo (Hidden on small screens, visible on md and larger) */}
        <div className="hidden text-xl font-bold md:block">
          <a href="#" className="text-gray-900">Brand</a>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-black focus:outline-none">
            {menuOpen ? (
              <FontAwesomeIcon icon={faTimes} size="lg" /> // Close icon
            ) : (
              <FontAwesomeIcon icon={faBars} size="lg" />  // Hamburger icon
            )}
          </button>
        </div>

        {/* Full Navigation Links (hidden on small screens) */}
        <nav className={`md:flex space-x-6 ${menuOpen ? 'block' : 'hidden'} md:block absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent z-20`}>
          <a href="#" className="block py-2 text-gray-600 md:inline hover:text-black md:py-0">Home</a>
          <a href="#" className="block py-2 text-gray-600 md:inline hover:text-black md:py-0">About</a>
          <a href="#" className="block py-2 font-semibold text-gray-600 md:inline hover:text-black md:py-0">Services <span className="text-xs">&#9662;</span></a>
          <a href="#" className="block py-2 text-gray-600 md:inline hover:text-black md:py-0">Projects <span className="text-xs">&#9662;</span></a>
          <a href="#" className="block py-2 text-gray-600 md:inline hover:text-black md:py-0">News <span className="text-xs">&#9662;</span></a>
          <a href="#" className="block py-2 text-gray-600 md:inline hover:text-black md:py-0">Shop <span className="text-xs">&#9662;</span></a>
          <a href="#" className="block py-2 text-gray-600 md:inline hover:text-black md:py-0">Contact</a>
        </nav>

        {/* Right-side Search and Cart Icons */}
        <div className="flex space-x-6">
          {/* Search Icon */}
          <a href="#" className="text-gray-600 hover:text-black">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </a>

          {/* Cart Icon */}
          <div className="relative">
            <a href="#" className="text-gray-600 hover:text-black">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </a>
            {/* Cart Badge */}
            <span className="absolute px-2 py-1 text-xs text-white bg-green-500 rounded-full -top-2 -right-2">0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
