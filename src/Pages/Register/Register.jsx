import { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/register.json";

const Register = () => {
  const [signToggle, setSignToggle] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const {
    registerWithEmail,
    updateUserProfile,
    setRefetch,
    loginInWithGoogle,
    user,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const minLength = /.{6,}/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;

  if (user) {
    return <Navigate to="/" />;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photoURL.value;
    const password = e.target.password.value;
    setPasswordError("");

    const validatePassword = (password) => {
      if (!minLength.test(password))
        return "Password should be at least 6 characters long";
      if (!hasUpperCase.test(password))
        return "Password must include an uppercase letter";
      if (!hasLowerCase.test(password))
        return "Password must include a lowercase letter";
      return "";
    };

    const errorMessage = validatePassword(password);
    if (errorMessage) {
      setPasswordError(errorMessage);
      return;
    }

    registerWithEmail(email, password)
      .then(() => {
        e.target.reset();
        toast.success("Registered Successfully");
        navigate("/");
        updateUserProfile({ displayName: name, photoURL: photo }).then(() => {
          setRefetch(Date.now());
        });
      })
      .catch(() => {
        toast.error("Email already in use");
      });
  };

  const handleToggleSignBtn = () => {
    setSignToggle(!signToggle);
  };

  const handleGoogleLogin = () => {
    loginInWithGoogle()
      .then(() => {
        toast.success("Google Login successful");
        navigate("/");
      })
      .catch(() => {
        toast.error("Google Login failed. Please try again");
      });
  };

  return (
    <div className="py-20 px-8 bg-gray-100 flex justify-center items-center">
    <div className="bg-white shadow-md rounded-lg p-8 w-[90%] max-w-3xl flex flex-col lg:flex-row-reverse items-center lg:items-start gap-8">
  {/* Lottie Animation */}
  <div className="w-full lg:w-1/2">
    <Lottie animationData={registerAnimation} loop autoplay />
  </div>

  {/* Registration Form */}
  <div className="w-full lg:w-1/2">
    <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
      Create an Account
    </h2>
    <form onSubmit={handleRegister}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Photo URL</label>
        <input
          type="url"
          name="photoURL"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter photo URL"
        />
      </div>

      <div className="mb-6 relative">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          type={signToggle ? "text" : "password"}
          name="password"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={handleToggleSignBtn}
          className="absolute right-3 top-[42px] text-gray-500 hover:text-indigo-600 transition"
        >
          {signToggle ? (
            <FaEyeSlash className="text-xl" />
          ) : (
            <IoEyeSharp className="text-xl" />
          )}
        </button>
      </div>

      {passwordError && (
        <span className="text-red-500 text-sm font-medium">{passwordError}</span>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
      >
        Register
      </button>
    </form>

    <div className="text-center text-gray-500 my-4">or register with</div>

    <div className="text-center">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 justify-center w-full py-2 px-4 border border-indigo-600 text-indigo-600 rounded-md font-semibold hover:bg-indigo-600 hover:text-white transition"
      >
        <FcGoogle className="text-xl" /> Google
      </button>
    </div>

    <p className="text-center text-sm mt-4 text-gray-600">
      Already have an account?{" "}
      <Link to="/login" className="text-indigo-600 font-medium hover:underline">
        Log In
      </Link>
    </p>
  </div>
</div>

    </div>
  );
};

export default Register;
