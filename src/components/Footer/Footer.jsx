import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-12 lg:px-24">
      {/* Branding */}
      <div className="flex flex-col items-center mb-12">
        <NavLink to="/" className="mb-3">
          <img
            src="https://i.postimg.cc/W17nfMmr/Chat-GPT-Image-Jun-7-2025-02-34-26-PM.png"
            alt="FoodFuse Logo"
            className="w-28 rounded-3xl shadow-lg"
          />
        </NavLink>
        <h2 className="text-3xl font-extrabold text-orange-500 tracking-wide">FoodFuse</h2>
        <p className="text-sm mt-2 text-gray-400 italic">Connecting taste, one bite at a time.</p>
        <p className="text-xs mt-1 text-gray-500">
          © {new Date().getFullYear()} FoodFuse. All rights reserved.
        </p>
      </div>

      {/* Navigation & Social */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm md:text-base text-center md:text-left max-w-7xl mx-auto">
        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-orange-400 mb-5 uppercase tracking-wide">Quick Links</h4>
          <ul className="space-y-3">
            <li><NavLink to="/" className="hover:text-orange-500 transition-colors duration-300">Home</NavLink></li>
            <li><NavLink to="/menu" className="hover:text-orange-500 transition-colors duration-300">Menu</NavLink></li>
            <li><NavLink to="/about" className="hover:text-orange-500 transition-colors duration-300">About</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-orange-500 transition-colors duration-300">Contact</NavLink></li>
          </ul>
        </div>

        {/* User */}
        <div>
          <h4 className="font-semibold text-orange-400 mb-5 uppercase tracking-wide">User</h4>
          <ul className="space-y-3">
            <li><NavLink to="/login" className="hover:text-orange-500 transition-colors duration-300">Login</NavLink></li>
            <li><NavLink to="/register" className="hover:text-orange-500 transition-colors duration-300">Register</NavLink></li>
            <li><NavLink to="/dashboard" className="hover:text-orange-500 transition-colors duration-300">Dashboard</NavLink></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-orange-400 mb-5 uppercase tracking-wide">Resources</h4>
          <ul className="space-y-3">
            <li><NavLink to="/blog" className="hover:text-orange-500 transition-colors duration-300">Blog</NavLink></li>
            <li><NavLink to="/faq" className="hover:text-orange-500 transition-colors duration-300">FAQ</NavLink></li>
            <li><NavLink to="/terms" className="hover:text-orange-500 transition-colors duration-300">Terms</NavLink></li>
            <li><NavLink to="/privacy" className="hover:text-orange-500 transition-colors duration-300">Privacy</NavLink></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold text-orange-400 mb-5 uppercase tracking-wide">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-6 text-orange-400">
            {/* Facebook */}
            <a href="https://www.facebook.com/rahat78613" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-orange-600 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .73.593 1.324 1.325 1.324h11.495v-9.294h-3.13v-3.622h3.13v-2.672c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.594 1.324-1.325V1.325c0-.732-.594-1.325-1.324-1.325z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/nazmulrahat78613/?source=omni_redirect" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange-600 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5C19.774 2 22 4.226 22 7.75v8.5c0 3.524-2.226 5.75-5.75 5.75h-8.5C4.226 22 2 19.774 2 16.25v-8.5C2 4.226 4.226 2 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
              </svg>
            </a>

            {/* GitHub */}
            <a href="https://github.com/nazmulrahat786" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-orange-600 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.087-.744.084-.729.084-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.997.108-.776.42-1.305.763-1.605-2.665-.3-5.467-1.333-5.467-5.931 0-1.31.468-2.38 1.236-3.22-.123-.302-.536-1.52.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.655 1.657.243 2.875.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.628-5.48 5.922.43.37.823 1.1.823 2.222v3.293c0 .321.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

        
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
