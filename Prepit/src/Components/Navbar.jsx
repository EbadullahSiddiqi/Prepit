import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/prepit.webp";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-2">
            <img className="h-12 w-12 rounded-full" src={logo} alt="Prepit Logo" />
            <p className="text-white text-2xl font-bold font-mono">Prepit AI</p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-16 text-white text-lg font-semibold">
            <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-blue-200 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-blue-200 transition-colors">Contact</Link>
            <Link to="/ai" className="hover:text-blue-200 transition-colors">Use Now!</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 transition-colors"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col gap-4 pt-4 text-white text-lg font-semibold">
              <a href="#" className="hover:text-blue-200 transition-colors">Home</a>
              <a href="#" className="hover:text-blue-200 transition-colors">About</a>
              <a href="#" className="hover:text-blue-200 transition-colors">Contact</a>
              <a href="#" className="hover:text-blue-200 transition-colors">Use Now!</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}