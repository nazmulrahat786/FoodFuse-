import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json";

const Login = () => {
  const location = useLocation();
 
  const [signToggle, setSignToggle] = useState(false);
  const navigate = useNavigate();
  const { loginWithEmail, loginInWithGoogle, user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleLoginForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginWithEmail(email, password)
      .then(() => {
        toast.success("Login successfully");
       navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        // Handle Firebase-style error codes
        if (error.code === "auth/user-not-found") {
          toast.error("No user found with this email.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password.");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email format.");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      });
  };

  const handleToggleSignBtn = () => {
    setSignToggle(!signToggle);
  };

  const handleLoginGoogle = () => {
    loginInWithGoogle()
      .then(() => {
        toast.success("Google Login successfully");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch(() => {
        toast.error("Google Login failed. Please try again.");
      });
  };

  return (
    <div className="py-20 px-8 bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-[90%] max-w-3xl flex flex-col lg:flex-row-reverse items-center lg:items-start gap-8">
        {/* Lottie Animation */}
        <div className="w-full lg:w-1/2">
          <Lottie animationData={loginAnimation} loop autoplay />
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Login Now!
          </h2>

          <form onSubmit={handleLoginForm}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type={signToggle ? "text" : "password"}
                name="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute -top-1"
                onClick={handleToggleSignBtn}
              >
                {signToggle ? (
                  <FaEyeSlash className="absolute right-2 top-12 text-xl" />
                ) : (
                  <IoEyeSharp className="absolute right-2 top-12 text-xl" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all cursor-pointer font-bold"
            >
              Login
            </button>
          </form>

          <div className="divider text-gray-600 mt-4">Or login with</div>

          <div className="text-center mt-4">
            <button
              onClick={handleLoginGoogle}
              className="flex items-center gap-2 justify-center mt-2 py-2 px-4 w-full rounded-lg border-2 border-indigo-600 text-balance font-bold hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
            >
              <FcGoogle className="text-xl" /> Google
            </button>
          </div>

          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-orange-500 font-medium hover:underline">
              Register Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
