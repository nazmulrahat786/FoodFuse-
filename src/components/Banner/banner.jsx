import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Banner = () => {
  const { user } = useContext(AuthContext);
  const imageUrl =
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1600&q=80";

  return (
    <div
      className="relative  overflow-hidden"
      style={{ height: "65vh" }} // ভিউপোর্টের ৬৫% উচ্চতা
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end items-center text-center text-white pb-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-xl mb-4">
          Welcome to <span className="text-orange-400">FoodFuse</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl text-white/90">
          Share surplus food, fight hunger, and connect with your community through FoodFuse.
        </p>

        {user ? (
          <Link
            to="/addFood"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            Join Now
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            Join Now
          </Link>
        )}
      </div>
    </div>
  );
};

export default Banner;
