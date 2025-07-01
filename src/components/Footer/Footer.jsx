import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Footer = () => {
  const { user } = useContext(AuthContext);
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/allFoods", label: "All Foods" },
    { path: "/availableFoods", label: "Available Foods" },
  ];

  const authLinks = user
    ? [
        { path: "/addFood", label: "Add Food" },
        { path: "/manageMyFoods", label: "Manage My Foods" },
        { path: "/myFoodRequest", label: "My Food Request" },
      ]
    : [
        { path: "/login", label: "Login" },
        { path: "/register", label: "Register" },
      ];

  return (
    <footer className="bg-orange-50 border-t mt-16 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand Section */}
        <div className="space-y-4">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src="https://i.postimg.cc/KYMY8593/Chat-GPT-Image-Jun-7-2025-02-34-26-PM-removebg-preview.png"
              alt="Logo"
              className="w-12 h-12"
            />
            <span className="text-xl font-extrabold text-orange-600">
              FoodFuse
            </span>
          </NavLink>
          <p className="text-sm text-gray-500">
            Connecting taste, one bite at a time.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-md font-bold mb-3 text-orange-600">Explore</h3>
          <ul className="space-y-2 text-sm">
            {footerLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className="hover:text-orange-600 transition-colors"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-bold mb-3 text-orange-600">Account</h3>
          <ul className="space-y-2 text-sm">
            {authLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className="hover:text-orange-600 transition-colors"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-md font-bold mb-3 text-orange-600">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-orange-500">
            <a
              href="https://facebook.com/rahat78613"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-orange-600 transition-colors"
            >
              <i className="fab fa-facebook text-lg"></i>
            </a>
            <a
              href="https://instagram.com/nazmulrahat78613"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-orange-600 transition-colors"
            >
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a
              href="https://github.com/nazmulrahat786"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-orange-600 transition-colors"
            >
              <i className="fab fa-github text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-gray-500 pb-6">
        © {currentYear} FoodFuse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
