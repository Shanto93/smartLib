import logo from "../assets/smartlib.svg";

const Footer = () => {
  return (
    <footer className="bg-[#1e1b4b] text-white py-10 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center">
          <img
            className="w-20 sm:w-20 md:w-24 h-auto object-contain"
            src={logo}
            alt="SmartLib Logo"
          />
          <span className="text-2xl font-semibold tracking-wider">
            SmartLib
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <a href="/" className="hover:text-[#18dcff] transition">
            Home
          </a>
          <a href="/books" className="hover:text-[#18dcff] transition">
            Books
          </a>
          <a href="/create-book" className="hover:text-[#18dcff] transition">
            Add Book
          </a>
          <a href="/borrow-summary" className="hover:text-[#18dcff] transition">
            Borrow Summary
          </a>
        </div>

        <div className="text-sm text-white/70 text-center md:text-right">
          <p>Email: shantoislam7363@gmail.com</p>
          <p>Phone: +8801997266467</p>
          <p>Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-white/50">
        &copy; {new Date().getFullYear()} SmartLib — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
