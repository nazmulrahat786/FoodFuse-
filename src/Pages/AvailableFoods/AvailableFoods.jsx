import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Heroicons SVG for grid layouts (imported inline)
const FourGridIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ThreeGridIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="18" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const TwoGridIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="18" />
    <rect x="14" y="3" width="7" height="18" />
  </svg>
);

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [layout, setLayout] = useState(4); // default 4 columns
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);
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
        setIsSearching(false);
      })
      .catch(() => {
        setFoods([]);
        setIsSearching(false);
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

            <div className="flex items-center gap-4 cursor-pointer">
              {/* 4 Columns */}
              <FourGridIcon
                className={`w-8 h-8 rounded p-1 ${
                  layout === 4
                    ? "text-orange-600 bg-orange-100"
                    : "text-gray-400 hover:text-orange-600 hover:bg-orange-100"
                }`}
                onClick={() => setLayout(4)}
              />
              {/* 3 Columns */}
              <ThreeGridIcon
                className={`w-8 h-8 rounded p-1 ${
                  layout === 3
                    ? "text-orange-600 bg-orange-100"
                    : "text-gray-400 hover:text-orange-600 hover:bg-orange-100"
                }`}
                onClick={() => setLayout(3)}
              />
              {/* 2 Columns */}
              <TwoGridIcon
                className={`w-8 h-8 rounded p-1 ${
                  layout === 2
                    ? "text-orange-600 bg-orange-100"
                    : "text-gray-400 hover:text-orange-600 hover:bg-orange-100"
                }`}
                onClick={() => setLayout(2)}
              />
            </div>
          </div>
        </div>

        {/* Loading Skeleton UI */}
        {isSearching ? (
          <div
            className={`grid sm:grid-cols-1 ${
              layout === 4
                ? "lg:grid-cols-4"
                : layout === 3
                ? "lg:grid-cols-3"
                : "lg:grid-cols-2"
            } gap-6`}
          >
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="rounded-lg shadow-md p-6 flex flex-col bg-white animate-pulse"
                style={{ minHeight: "460px" }}
              >
                <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="h-12 bg-gray-300 rounded w-full mt-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`grid sm:grid-cols-1 ${
              layout === 4
                ? "lg:grid-cols-4"
                : layout === 3
                ? "lg:grid-cols-3"
                : "lg:grid-cols-2"
            } gap-6`}
          >
            {foods.length > 0 ? (
              foods.map((food) => (
                <div
                  key={food._id}
                  className="rounded-lg shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300 bg-white"
                  style={{ minHeight: "460px" }} // fixed height for equal size cards
                >
                  <img
                    src={food?.foodImg}
                    alt={food?.foodName || "food image"}
                    className="w-full h-48 object-cover rounded-md mb-4 hover:scale-105 transition-transform duration-300"
                  />
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {food?.foodName}
                  </h2>
                  <p className="text-gray-600 flex-grow mb-4 line-clamp-3">
                    {food?.shortDescription ||
                      "No description available for this food item."}
                  </p>
                  <Link to={`/food/${food?._id}`}>
                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-300 font-semibold">
                      See More
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
