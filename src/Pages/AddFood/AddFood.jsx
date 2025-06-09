import { format } from "date-fns";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosInstance from "../../CustomHooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FadeLoader } from "react-spinners";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AddFood = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (foodData) => {
      await axiosInstance.post("/all-foods", foodData);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Food Added Successfully",
        text: "You have Added Food Successfully!",
        icon: "success",
      });
    },
  });

  // handle Add Food Function
  const handleAddFood = async (e) => {
    e.preventDefault();
    const form = e.target;

    const foodName = form.foodName.value;
    const foodImg = form.photo.value;
    const foodQuantity = parseInt(form.foodQuantity.value);
    const location = form.pickupLocation.value;
    const expireDate = format(new Date(startDate), "P");
    const status = form.status.value;
    const additionalNotes = form.additionalNotes.value;

    // Add Food Data
    const addFoodData = {
      foodName,
      foodImg,
      foodQuantity,
      location,
      expireDate,
      additionalNotes,
      status,
      donator: {
        donatorImage: user?.photoURL,
        donatorName: user?.displayName,
        donatorEmail: user?.email,
      },
    };

    await mutateAsync(addFoodData);

    // Reset form and date picker after success
    form.reset();
    setStartDate(new Date());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FadeLoader color="#ff3131" loading={true} />
      </div>
    );
  }

  return (
    <div>
      <div className="py-20 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-orange-500 text-center mb-6 border-2 border-orange-600 rounded-xl p-2">
            Add Food
          </h2>
          <form className="space-y-6" onSubmit={handleAddFood}>
            {/* food name & image div */}
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              {/* Food Name */}
              <div className="w-full">
                <label
                  htmlFor="foodName"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Food Name
                </label>
                <input
                  type="text"
                  name="foodName"
                  placeholder="Enter food name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              {/* Food Image */}
              <div className="w-full">
                <label
                  htmlFor="foodImage"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Food Image URL
                </label>
                <input
                  type="url"
                  name="photo"
                  placeholder="Enter image URL"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* Food quantity and location div */}
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              {/* Food Quantity */}
              <div className="w-full">
                <label
                  htmlFor="foodQuantity"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Food Quantity
                </label>
                <input
                  type="number"
                  name="foodQuantity"
                  placeholder="Enter quantity"
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              {/* Pickup Location */}
              <div className="w-full">
                <label
                  htmlFor="pickupLocation"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  placeholder="Enter pickup location"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* expired date & Food Status */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              {/* Expired Date */}
              <div className="w-full">
                <label
                  htmlFor="expireDate"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Expired Date
                </label>

                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="w-80 lg:w-88 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              {/* Food Status */}
              <div className="w-full">
                <label
                  htmlFor="expireDate"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Food Status
                </label>
                <input
                  defaultValue="Available"
                  readOnly
                  name="status"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              {/* Additional Notes */}
              <div className="w-full">
                <label
                  htmlFor="additionalNotes"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  placeholder="Enter any additional notes"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                ></textarea>
              </div>

              {/* Donator Info */}
              <div className="flex items-center space-x-4 mt-6 bg-gray-50 p-4 rounded-lg shadow-md w-full max-w-sm">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Donator Profile"
                    className="w-16 h-16 rounded-full border-2 border-orange-500 shadow-lg object-cover"
                  />
                )}
                <div>
                  <p className="text-lg font-semibold text-orange-600">
                    {user?.displayName || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user?.email || "No Email"}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-medium py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              Add Food
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
