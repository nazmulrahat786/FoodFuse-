import { useContext, useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import useAxiosInstance from "../../CustomHooks/useAxiosInstance";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [foodRequest, setFoodRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    requestMyFood();
  }, []);

  const requestMyFood = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/request-foods?email=${user?.email}`
      );
      setFoodRequest(data);
    } catch (error) {
      console.error("Failed to fetch food requests:", error);
      setFoodRequest([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Skeleton card while loading
  const SkeletonCard = () => (
    <div className="rounded-lg shadow-md p-6 animate-pulse bg-white">
      <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
      <div className="mt-3 w-16 h-6 bg-gray-300 rounded-full"></div>
    </div>
  );

  return (
    <div className="pt-8">
      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto pb-20 pt-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-orange-600">
          My Food Requests
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : foodRequest.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodRequest.map((food) => (
              <div
                key={food._id}
                className="relative rounded-lg shadow-lg p-6 bg-white transition-transform transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={food?.food_image}
                  alt="food image"
                  className="w-full h-60 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg lg:text-xl font-semibold mb-2 text-gray-800">
                  {food?.food_name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-bold">Donator Name:</span> {food.donator_name}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-bold">Pickup Location:</span> {food?.pickup_location}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-bold">Expired Date:</span> {food?.expire_date}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-bold">Request Date:</span> {food?.request_date}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-bold">Additional Notes:</span> {food?.additional_notes || "None"}
                </p>
                <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-semibold select-none">
                  {food?.status}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center text-gray-500">
            <FaBoxOpen className="text-7xl mb-6 text-orange-300" />
            <p className="text-xl font-semibold mb-3">No food requests found.</p>
            <p className="max-w-md">
              You haven’t made any food requests yet. Check out available foods and make your first request!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoodRequest;
