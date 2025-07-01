// import logo from "../assets/smartlib.svg";

// const Footer = () => {
//   return (
//     <footer className="bg-[#5e17eb] text-white pt-10 pb-6 px-6 sm:px-10 lg:px-20">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//         {/* Logo + Description */}
//         <div>
//           <div className="flex items-center space-x-2 mb-4">
//             <img
//               src={logo}
//               alt="SmartLib Logo"
//               className="w-16 sm:w-20 md:w-24 h-auto object-contain"
//             />
//             <span className="text-xl font-bold tracking-wide">SmartLib</span>
//           </div>
//           <p className="text-sm text-white/80 leading-relaxed">
//             A smarter way to manage your library. Discover, organize, and
//             read—all in one place.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h4 className="text-lg font-semibold mb-3 text-[#18dcff]">
//             Quick Links
//           </h4>
//           <ul className="space-y-2 text-sm text-white/90">
//             <li>
//               <a href="/" className="hover:text-[#18dcff] transition">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="/books" className="hover:text-[#18dcff] transition">
//                 All Books
//               </a>
//             </li>
//             <li>
//               <a href="/addBook" className="hover:text-[#18dcff] transition">
//                 Add Book
//               </a>
//             </li>

//           </ul>
//         </div>

//         {/* Resources */}
//         <div>
//           <h4 className="text-lg font-semibold mb-3 text-[#18dcff]">
//             Resources
//           </h4>
//           <ul className="space-y-2 text-sm text-white/90">
//             <li>
//               <a href="#" className="hover:text-[#18dcff] transition">
//                 Privacy Policy
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-[#18dcff] transition">
//                 Terms of Use
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-[#18dcff] transition">
//                 FAQs
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <h4 className="text-lg font-semibold mb-3 text-[#18dcff]">Contact</h4>
//           <ul className="space-y-2 text-sm text-white/90">
//             <li>Email: shantoislam7363@gmail.com</li>
//             <li>Phone: +8801997266467</li>
//             <li>Location: Dhaka, Bangladesh</li>
//           </ul>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-white/10 mt-10 pt-4 text-center text-sm text-white/60">
//         &copy; {new Date().getFullYear()} SmartLib. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

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
          <a href="/addBook" className="hover:text-[#18dcff] transition">
            Add Book
          </a>
          <a href="/contact" className="hover:text-[#18dcff] transition">
            Contact
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
