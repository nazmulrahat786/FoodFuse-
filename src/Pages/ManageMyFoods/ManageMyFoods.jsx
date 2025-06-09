import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosInstance from "../../CustomHooks/useAxiosInstance";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const axiosInstance = useAxiosInstance();
  useEffect(() => {
    manageMyFood();
  }, []);

  const manageMyFood = async () => {
    const { data } = await axiosInstance.get(
      `/manage-my-foods?email=${user?.email}`
    );
    setMyFoods(data);
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
  return (
    <div className="mb-96">
      <div className="pt-10 pb-20 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="max-w-7xl mx-auto bg-white shadow-sm  rounded-lg p-5">
          <h2 className="text-2xl font-bold text-orange-600 mb-5 text-center">
            Manage My Foods
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Food Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Expired</th>
                  <th className="px-4 py-2">Pickup Location</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myFoods.map((food) => (
                  <tr
                    key={food._id}
                    className="odd:bg-orange-100 even:bg-white"
                  >
                    <td className="px-4 py-2">
                      <img
                        src={food?.foodImg}
                        alt="food image"
                        className="w-12 lg:w-16 h-12 lg:h-16 rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2">{food?.foodName}</td>
                    <td className="px-4 py-2">{food?.foodQuantity}</td>
                    <td className="px-4 py-2">{food?.expireDate}</td>
                    <td className="px-4 py-2">{food?.location}</td>
                    <td className="px-4 py-2 ">
                      <span className="bg-teal-200">{food?.status}</span>
                    </td>
                    <td className="px-4 py-5 flex items-end space-x-3">
                      <Link to={`/updateFoods/${food._id}`}>
                        <button className="text-white bg-green-800 hover:bg-green-600 px-3 py-1 lg:py-2 rounded-md flex items-center cursor-pointer">
                          <FaEdit className="mr-2" /> Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteMyFoods(food._id)}
                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 lg:py-2 rounded-md flex items-center cursor-pointer"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMyFoods;
