import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThreeGridCol from "../../assets/Images/3gridcolumns.png";
import TwoGridCol from "../../assets/Images/2gridcolumns.png";
import { FadeLoader } from "react-spinners"; // Add this

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [layout, setLayout] = useState(3);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false); // loading state

  useEffect(() => {
    setIsSearching(true); // start loading
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/all-foods?available=true&sort=${sort}&search=${search}`
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setFoods(response.data);
        } else {
          setFoods([]);
        }
        setIsSearching(false); // stop loading
      })
      .catch(() => {
        setFoods([]);
        setIsSearching(false); // stop loading on error too
      });
  }, [sort, search]);

  return (
    <div className="pt-14 pb-24 w-[90%] mx-auto">
      <div className="w-full xl:container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-orange-600">
          Available Foods
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Total Foods Available:{" "}
          <span className="font-semibold text-orange-500">{foods.length}</span>
        </p>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
          {/* Search */}
          <div className="flex items-center gap-2 px-2 shadow-md">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food name"
              className="outline-none px-2 py-1 bg-transparent"
            />
            <button className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 cursor-pointer">
              Search
            </button>
          </div>

          {/* Sorting & Layout Toggle */}
          <div className="flex items-center gap-4">
            <select
              name="category"
              id="category"
              value={sort}
              className="border px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By Expired Date</option>
              <option value="asc">Ascending Order</option>
              <option value="dsc">Descending Order</option>
            </select>

            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={ThreeGridCol}
                alt="Three Column Layout"
                className={`w-10 h-10 rounded ${
                  layout === 3 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setLayout(3)}
              />
              <img
                src={TwoGridCol}
                alt="Two Column Layout"
                className={`w-8 h-8 rounded ${
                  layout === 2 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setLayout(2)}
              />
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {isSearching ? (
          <div className="flex justify-center items-center h-40">
            <FadeLoader color="#f97316" />
          </div>
        ) : (
          <div
            className={`grid sm:grid-cols-1 ${
              layout === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
            } gap-6`}
          >
            {foods.length > 0 ? (
              foods.map((food) => (
                <div
                  key={food._id}
                  className="rounded-lg shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300 bg-white"
                >
                  <img
                    src={food?.foodImg}
                    alt={food?.foodName || "food image"}
                    className="w-full h-64 object-cover rounded-md mb-5 hover:scale-105 transition-transform duration-300"
                  />
                  <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                      {food?.foodName}
                    </h2>
                    <p
                      className={`px-4 py-1 text-sm font-semibold rounded-full ${
                        food?.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : food?.status === "Expired"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {food?.status}
                    </p>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-3 text-gray-700">
                    <p>
                      <span className="font-semibold">Quantity:</span>{" "}
                      {food?.foodQuantity}
                    </p>
                    <p>
                      <span className="font-semibold">Expires on:</span>{" "}
                      {new Date(food?.expireDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Link to={`/food/${food?._id}`}>
                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-300 font-semibold">
                      View Details
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No available foods found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;
