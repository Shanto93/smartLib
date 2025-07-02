import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/smartlib.svg";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded-md transition duration-300 font-medium ${
      isActive ? "text-[#18dcff]" : "text-white hover:text-[#18dcff]"
    }`;

  return (
    <nav className="bg-[#1e1b4b] text-white shadow-xl backdrop-blur-md border-b border-white/10 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              className="w-20 sm:w-20 md:w-24 h-auto object-contain"
              src={logo}
              alt="SmartLib Logo"
            />
            <span className="text-xl md:text-2xl font-bold tracking-wider text-white hover:tracking-widest transition-all duration-300">
              SmartLib
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-lg">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/books" className={navLinkClass}>
              All Books
            </NavLink>
            <NavLink to="/create-book" className={navLinkClass}>
              Add Book
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#18dcff] focus:outline-none transition"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-[#5e17eb]/90 space-y-1">
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            All Books
          </NavLink>
          <NavLink
            to="/create-book"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Add Book
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
