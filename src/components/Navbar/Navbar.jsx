import { useContext, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const logoImg =
  "https://i.postimg.cc/KYMY8593/Chat-GPT-Image-Jun-7-2025-02-34-26-PM-removebg-preview.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const titleMap = {
      "/": "Home | FoodFuse",
      "/allFoods": "All Foods | FoodFuse",
      "/availableFoods": "Available Foods | FoodFuse",
      "/addFood": "Add Food | FoodFuse",
      "/manageMyFoods": "Manage My Foods | FoodFuse",
      "/myFoodRequest": "My Food Request | FoodFuse",
      "/login": "Login | FoodFuse",
      "/register": "Register | FoodFuse",
    };

    if (/^\/food\/[^/]+$/.test(path)) {
      document.title = "Food Details | FoodFuse";
    } else if (/^\/updateFoods\/[^/]+$/.test(path)) {
      document.title = "Update Food | FoodFuse";
    } else {
      document.title = titleMap[path] || "FoodFuse";
    }
  }, [location]);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-orange-600 font-bold border-b-2 border-orange-600"
      : "hover:text-orange-600 transition";

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>Home</NavLink>
      <NavLink to="/allFoods" className={navLinkClass}>All Foods</NavLink>
      <NavLink to="/availableFoods" className={navLinkClass}>Available Foods</NavLink>
      {user && (
        <>
          <NavLink to="/addFood" className={navLinkClass}>Add Food</NavLink>
          <NavLink to="/manageMyFoods" className={navLinkClass}>Manage My Foods</NavLink>
          <NavLink to="/myFoodRequest" className={navLinkClass}>My Food Request</NavLink>
        </>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut().then(() => toast.success("Logged out successfully"));
  };

  return (
    <div className="bg-orange-50 shadow-md fixed top-0 left-0 right-0 z-50">
      <header className="text-black pt-6 w-11/12 xl:container mx-auto">
        <nav className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Toggle menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </button>
              <ul className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box gap-2 text-md font-semibold z-50">
                {links}
              </ul>
            </div>
            <Link to="/" className="flex items-center space-x-2">
              <img className="w-16 h-auto" src={logoImg} alt="FoodFuse Logo" />
              <span className="hidden lg:inline text-xl font-bold text-orange-600">
                FoodFuse
              </span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-8 text-md font-semibold">
              {links}
            </ul>
          </div>

          <div className="navbar-end gap-2">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="tooltip" data-tip={user?.displayName || "User"}>
                  <img src={user?.photoURL || "https://via.placeholder.com/40"}
                    alt="User Avatar" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border" />
                </div>
                <button onClick={handleLogOut}
                  className="py-2 px-4 text-white bg-orange-600 hover:bg-orange-500 text-sm lg:text-base rounded-lg transition">
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 lg:gap-4">
                <Link to="/login"
                  className="py-2 px-4 text-orange-600 font-bold text-sm lg:text-base border border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition">
                  Login
                </Link>
                <span className="text-gray-500">or</span>
                <Link to="/register"
                  className="py-2 px-4 text-orange-600 font-bold text-sm lg:text-base border border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition">
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
