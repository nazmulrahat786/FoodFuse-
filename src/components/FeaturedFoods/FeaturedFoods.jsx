import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedFoods = () => {
  const fetchFeaturedFoods = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/featured-foods`
    );
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["featured-foods"],
    queryFn: fetchFeaturedFoods,
  });

  if (isLoading) {
    return (
      <div className="xl:container mx-auto pt-16 pb-14">
        <h2 className="text-2xl font-semibold text-center text-orange-600 border-2 border-orange-600 rounded-xl p-2 w-[90%] mx-auto">
          Featured Foods
        </h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg shadow-md p-6 flex flex-col animate-pulse bg-white"
            >
              <div className="w-full h-56 bg-gray-200 rounded-lg mb-5"></div>

              <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between gap-3 mb-6">
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                <div className="h-5 bg-gray-200 rounded w-2/3"></div>
              </div>

              <div className="h-12 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show top 8 foods sorted by quantity descending
  const foodsToShow =
    data
      ?.slice()
      .sort((a, b) => (b.foodQuantity || 0) - (a.foodQuantity || 0))
      .slice(0, 8) || [];

  return (
    <div className="xl:container mx-auto pt-16 pb-14 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-center text-orange-600 border-2 border-orange-600 rounded-xl p-3 max-w-xl mx-auto">
        Featured Foods
      </h2>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {foodsToShow.length > 0 ? (
          foodsToShow.map((food) => (
            <div
              key={food._id}
              className="rounded-lg shadow-md p-6 flex flex-col bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={food?.foodImg}
                alt={food?.foodName || "food"}
                className="w-full h-56 object-cover rounded-lg mb-5"
                loading="lazy"
              />

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {food?.foodName}
                </h2>
                <p
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    food?.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {food?.status}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row justify-between items-center gap-3 mb-6 text-gray-600 text-sm">
                <p>Quantity: <span className="font-medium">{food?.foodQuantity}</span></p>
                <p>
                  Expired Date:{" "}
                  <span className="font-medium">
                    {new Date(food?.expireDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </p>
              </div>

              <Link to={`/food/${food?._id}`} className="mt-auto">
                <button className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1">
                  View Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No featured foods found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeaturedFoods;
