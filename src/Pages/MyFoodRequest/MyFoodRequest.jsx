import { useContext, useEffect, useState } from "react";
import useAxiosInstance from "../../CustomHooks/useAxiosInstance";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [foodRequest, setFoodRequest] = useState([]);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    requestMyFood();
  }, []);
  const requestMyFood = async () => {
    const { data } = await axiosInstance.get(
      `/request-foods?email=${user?.email}`
    );
    setFoodRequest(data);
  };

  return (
    <div>
      <div className="w-11/12 md:w-11/12 lg:11/12  xl:container mx-auto pb-20 pt-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-orange-600">
          My Food Requests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodRequest.map((food) => (
            <div
              key={food._id}
              className="relative  rounded-lg  shadow-md p-6 transform transition-transform hover:scale-105"
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
                <span className="font-bold">Donator Name:</span>{" "}
                {food.donator_name}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-bold">Pickup Location:</span>{" "}
                {food?.pickup_location}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-bold">Expired Date:</span>{" "}
                {food?.expire_date}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-bold">Request Date:</span>{" "}
                {food?.request_date}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Additional Notes:</span>{" "}
                {food?.additional_notes}
              </p>
              <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                {food?.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFoodRequest;
