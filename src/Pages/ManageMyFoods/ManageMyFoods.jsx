import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaBoxOpen } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosInstance from "../../CustomHooks/useAxiosInstance";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    manageMyFood();
  }, []);

  const manageMyFood = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/manage-my-foods?email=${user?.email}`
      );
      setMyFoods(data);
    } catch (error) {
      setMyFoods([]);
      console.error("Failed to fetch foods:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMyFoods = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/all-foods/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your food has been deleted.",
              icon: "success",
            });
            setMyFoods(myFoods.filter((food) => food._id !== id));
          }
        });
      }
    });
  };

  // Shimmer Skeleton Loader for table rows
  const SkeletonRow = () => (
    <tr className="animate-pulse odd:bg-orange-50 even:bg-white">
      <td className="px-4 py-3">
        <div className="w-14 h-14 rounded-md bg-gray-300"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-5 w-32 rounded bg-gray-300"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-5 w-20 rounded bg-gray-300"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-5 w-24 rounded bg-gray-300"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-5 w-40 rounded bg-gray-300"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-6 w-20 rounded bg-gray-300"></div>
      </td>
      <td className="px-4 py-3 flex space-x-3">
        <div className="h-8 w-24 rounded bg-gray-300"></div>
        <div className="h-8 w-24 rounded bg-gray-300"></div>
      </td>
    </tr>
  );

  return (
    <div className="mb-48">
      <div className="pt-10 pb-20 w-11/12 mx-auto xl:container">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
            Manage My Foods
          </h2>
          <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
            <table className="table-auto w-full min-w-[700px] text-left">
              <thead>
                <tr className="bg-orange-600 text-white uppercase tracking-wide">
                  <th className="px-5 py-3">Image</th>
                  <th className="px-5 py-3">Food Name</th>
                  <th className="px-5 py-3">Quantity</th>
                  <th className="px-5 py-3">Expired</th>
                  <th className="px-5 py-3">Pickup Location</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  // Show 5 skeleton rows
                  [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                ) : myFoods.length > 0 ? (
                  myFoods.map((food) => (
                    <tr
                      key={food._id}
                      className="odd:bg-orange-50 even:bg-white hover:bg-orange-100 transition-colors duration-200"
                    >
                      <td className="px-5 py-4">
                        <img
                          src={food?.foodImg}
                          alt="food image"
                          className="w-14 h-14 rounded-md object-cover"
                        />
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-800">
                        {food?.foodName}
                      </td>
                      <td className="px-5 py-4 text-gray-700">{food?.foodQuantity}</td>
                      <td className="px-5 py-4 text-gray-700">{food?.expireDate}</td>
                      <td className="px-5 py-4 text-gray-700">{food?.location}</td>
                      <td className="px-5 py-4">
                        <span className="inline-block bg-teal-200 text-teal-900 px-3 py-1 rounded-full text-sm font-medium select-none">
                          {food?.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 flex items-center space-x-3">
                        <Link to={`/updateFoods/${food._id}`}>
                          <button className="flex items-center space-x-2 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition duration-150">
                            <FaEdit /> <span>Update</span>
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteMyFoods(food._id)}
                          className="flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md shadow-md transition duration-150"
                        >
                          <FaTrash /> <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-20 text-center text-gray-500 select-none"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <FaBoxOpen className="text-6xl text-orange-300" />
                        <p className="text-xl font-semibold">No foods found.</p>
                        <Link
                          to="/add-food"
                          className="mt-2 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
                        >
                          Add New Food
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMyFoods;
