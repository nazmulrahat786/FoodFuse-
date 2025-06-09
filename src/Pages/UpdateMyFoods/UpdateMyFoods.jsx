import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosInstance from "../../CustomHooks/useAxiosInstance";

const UpdateMyFoods = () => {
  const axiosInstance = useAxiosInstance();
  const [food, setFood] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      handleUpdateData();
    }
  }, [id]);
  const handleUpdateData = () => {
    axiosInstance.get(`/all-foods/${id}`).then((response) => {
      setFood(response.data);
    });
  };

  const handleUpdateForm = (e) => {
    e.preventDefault();
    const foodName = e.target.foodName.value;
    const foodImg = e.target.foodImage.value;
    const foodQuantity = parseInt(e.target.foodQuantity.value);
    const location = e.target.pickupLocation.value;
    const expireDate = e.target.expireDate.value;
    const additionalNotes = e.target.additionalNotes.value;
    const updateData = {
      foodName,
      foodImg,
      foodQuantity,
      location,
      expireDate,
      additionalNotes,
    };

    axiosInstance.patch(`/all-foods/${id}`, updateData).then((res) => {
      if (res.data.modifiedCount >= 0) {
        Swal.fire({
          title: "Updated Successfully",
          text: "Your food details have been updated!",
          icon: "success",
        });
        navigate("/manageMyFoods");
      }
    });
  };
  return (
    <div className="pb-20 pt-10">
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
            Update Food Details
          </h2>
          <form className="space-y-4" onSubmit={handleUpdateForm}>
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="foodName"
              >
                Food Name
              </label>
              <input
                type="text"
                defaultValue={food?.foodName}
                name="foodName"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="foodImage"
              >
                Food Image URL
              </label>
              <input
                type="url"
                defaultValue={food?.foodImg}
                name="foodImage"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="foodQuantity"
              >
                Food Quantity
              </label>
              <input
                type="text"
                defaultValue={food?.foodQuantity}
                name="foodQuantity"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="pickupLocation"
              >
                Pickup Location
              </label>
              <input
                type="text"
                defaultValue={food?.location}
                name="pickupLocation"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="expireDate"
              >
                Expire Date
              </label>
              <input
                type="text"
                defaultValue={food?.expireDate}
                name="expireDate"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="additionalNotes"
              >
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                defaultValue={food?.additionalNotes}
                name="additionalNotes"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              >
                Update Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMyFoods;
