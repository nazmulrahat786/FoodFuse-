import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-center px-6">
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404 error illustration"
        className="w-72 md:w-96 mb-8"
      />
      <h1 className="text-5xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 max-w-md">
        Oops! It looks like you’ve taken a wrong turn. Don’t worry — let’s get you back to the homepage.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
