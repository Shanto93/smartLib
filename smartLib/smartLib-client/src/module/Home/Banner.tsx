import { Button } from "@/components/ui/button";
import bannerImage from "./../../assets/banner.jpg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="bg-gradient-to-br from-[#5e17eb]/90 to-[#1e1b4b] md:h-screen text-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl md:mt-14  mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-wide mb-6">
            Welcome to <span className="text-[#18dcff]">SmartLib</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Manage your library the smart way. Discover, organize, and track
            books with ease using our modern digital library system.
          </p>

          <Link to="/books">
            <Button className="inline-block bg-[#18dcff] text-[#1e1b4b] font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-white hover:text-[#5e17eb] transition duration-300">
              Explore Books
            </Button>
          </Link>
        </div>

        <div className="flex-1">
          <img
            src={bannerImage}
            alt="Library Banner"
            className="w-full max-w-md mx-auto md:max-w-full object-contain animate-fade-in-up"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
