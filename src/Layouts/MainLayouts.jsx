import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";
const MainLayouts = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between"> 
      <div className="px-4 mb-15 lg:px-12 bg-orange-50">
        
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
       <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

MainLayouts.propTypes = {};

export default MainLayouts;
