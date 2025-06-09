import { Link } from "react-router-dom";
import Banner from "../../components/Banner/banner";
import FeaturedFoods from "../../components/FeaturedFoods/FeaturedFoods";

import OurApp from "../../components/OurApp/OurApp";
import About from "../../components/About/About";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="w-[90%] mx-auto ">
        <FeaturedFoods />
      </div>
      <div className="flex justify-center mb-4">
        <Link to="/availableFoods">
          <button className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-300 cursor-pointer">
            Show All
          </button>
        </Link>
      </div>
    
      
      <div className="">
        <OurApp />
      </div>
      <div>
        <About></About>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
