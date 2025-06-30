import { Link } from "react-router-dom";
import Banner from "../../components/Banner/banner";
import FeaturedFoods from "../../components/FeaturedFoods/FeaturedFoods";


import About from "../../components/About/About";
import ReviewSection from "../../components/ReviewSection/ReviewSection";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";

const Home = () => {
  return (
    <div className=" ">
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
      <div>
        <UpcomingEvents></UpcomingEvents>
      </div>
    
      

      <div>
        <ReviewSection></ReviewSection>
      </div>
      <div>
        <About></About>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
