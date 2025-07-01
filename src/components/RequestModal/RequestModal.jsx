/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { useContext } from "react";
import Swal from "sweetalert2";
import useAxiosInstance from "../../CustomHooks/useAxiosInstance";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const RequestModal = ({ isOpen, onClose, food }) => {
  const { user, setLoading } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();

  if (!isOpen) return null;

  const currentDate = format(new Date(), "P");

  const {
    _id,
    foodImg,
    foodName,
    expireDate,
    Donator = { donatorName: "", donatorEmail: "" },
    location,
    additionalNotes,
  } = food || {};

  const handleRequestFood = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      food_name: foodName,
      food_image: foodImg,
      food_id: _id,
      Donator_name: Donator?.donatorName || "Unknown",
      Donator_email: Donator?.donatorEmail || "Unknown",
      user_email: user?.email,
      pickup_location: location,
      expire_date: expireDate,
      request_date: currentDate,
      additional_notes: e.target.additional_notes.value,
      status: "Requested",
    };

    try {
      const { data } = await axiosInstance.post(`/request-foods`, requestData);
      if (data.insertedId) {
        e.target.reset();
        Swal.fire({
          title: "Request Successful!",
          text: "Your food request has been submitted.",
          icon: "success",
          confirmButtonColor: "#f97316",
        });
        onClose();
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-h-[90vh] overflow-y-auto p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-orange-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Request This Food
        </h2>

        <form onSubmit={handleRequestFood} className="space-y-4">
          <InputField label="Food Name" value={foodName} name="food_name" />
          <InputField label="Food Image" value={foodImg} name="food_image" />
          <InputField label="Food ID" value={_id} name="food_id" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Donator Name"
              value={Donator?.donatorName || "Not Available"}
              name="Donator_name"
            />
            <InputField
              label="Donator Email"
              value={Donator?.donatorEmail || "Not Available"}
              name="Donator_email"
            />
          </div>

          <InputField
            label="Your Email"
            value={user?.email || "Not logged in"}
            name="user_email"
          />
          <InputField label="Pickup Location" value={location} name="pickup_location" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Expire Date" value={expireDate} name="expire_date" />
            <InputField label="Request Date" value={currentDate} name="request_date" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="additional_notes"
              defaultValue={additionalNotes}
              placeholder="Type any extra info..."
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, value, name }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      name={name}
      readOnly
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
    />
  </div>
);

export default RequestModal;
