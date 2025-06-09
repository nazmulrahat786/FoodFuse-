import { useEffect, useState } from "react";
import RequestModal from "../../components/RequestModal/RequestModal";
import { useParams } from "react-router-dom";
import useAxiosInstance from "../../CustomHooks/useAxiosInstance";

const DetailsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [food, setFood] = useState({});
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();
  useEffect(() => {
    handleFoodDetail();
  }, []);

  const handleFoodDetail = () => {
    axiosInstance.get(`/all-foods/${id}`).then((response) => {
      setFood(response.data);
    });
  };
  const {
    foodImg,
    foodName,
    expireDate,
    donator,
    foodQuantity,
    location,
    status,
    additionalNotes,
  } = food || {};
  return (
    <div className="pt-10 pb-20">
      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="max-w-[90%] flex flex-col lg:flex-row justify-center items-center gap-4 mx-auto bg-white shadow-md rounded-lg overflow-hidden ">
          {/* Food Image */}
          <div className="relative w-full h-72 lg:h-96">
            <img
              src={foodImg}
              alt={foodName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="p-8 w-full">
            <h2 className="text-2xl font-bold text-orange-700 mb-6">
              {foodName}
            </h2>
            <div className=" flex flex-col space-y-4">
              {/* Food Details */}
              <div className="space-y-2">
                <div className="flex flex-col lg:flex-row justify-between items-start space-y-2">
                  <p>
                    <span className="font-semibold ">Quantity:</span>{" "}
                    {foodQuantity}
                  </p>
                  <p>
                    <span className="font-semibold ">Food Status:</span>{" "}
                    <span className="bg-teal-200 rounded-xl px-2">
                      {status}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-start space-y-2">
                  <p>
                    <span className="font-semibold ">Pickup Location:</span>{" "}
                    {location}
                  </p>
                  <p>
                    <span className="font-semibold ">Expired Date:</span>{" "}
                    {expireDate}
                  </p>
                </div>
                <p>
                  <span className="font-semibold ">Additional Notes:</span>{" "}
                  {additionalNotes}
                </p>
              </div>

              {/* Donator Information */}
              <div className="bg-orange-50 p-6 rounded-lg shadow-md flex flex-col items-start space-y-4">
                <h3 className="text-lg text-center font-bold text-orange-600">
                  Donator Information
                </h3>
                <div className="flex gap-2 items-center">
                  <img
                    src={donator?.donatorImage}
                    alt=""
                    className="w-16 h-16 rounded-full border-2 border-orange-500"
                  />
                  <div className="text-left">
                    <p>
                      <span className="font-semibold text-gray-700">Name:</span>{" "}
                      {donator?.donatorName}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Email:
                      </span>{" "}
                      {donator?.donatorEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Food Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded shadow-lg transform transition-transform hover:scale-105 mt-6 cursor-pointer"
            >
              Request Food
            </button>
          </div>
        </div>
      </div>

      <RequestModal
        isOpen={isModalOpen}
        food={{ ...food, Donator: food.donator }}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DetailsPage;
