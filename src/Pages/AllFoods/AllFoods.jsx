import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for routing

const PAGE_SIZE = 8;

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const API_URL =
    import.meta.env.VITE_BASE_URL || "https://food-server-chi.vercel.app";

  const getTimestampFromObjectId = (id) =>
    parseInt(id.substring(0, 8), 16) * 1000;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`${API_URL}/all-foods`);
        if (!res.ok) throw new Error("Failed to fetch food items");
        const data = await res.json();
        const sorted = data.sort(
          (a, b) =>
            getTimestampFromObjectId(b._id) - getTimestampFromObjectId(a._id)
        );
        setFoods(sorted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [API_URL]);

  const filteredFoods = useMemo(() => {
    let filtered = foods;
    if (filter !== "all") {
      filtered = filtered.filter(
        (f) => f.status.toLowerCase() === filter.toLowerCase()
      );
    }
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.foodName.toLowerCase().includes(term) ||
          f.location.toLowerCase().includes(term) ||
          (f.donator?.donatorName?.toLowerCase().includes(term) ?? false)
      );
    }
    return filtered;
  }, [foods, filter, searchTerm]);

  const pageCount = Math.ceil(filteredFoods.length / PAGE_SIZE);
  const currentFoods = filteredFoods.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

if (loading) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
        All Food Items
      </h1>
      <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-orange-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3">Expire Date</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Donator</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(8)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                {[...Array(8)].map((__, j) => (
                  <td key={j} className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


  if (error)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold pt-4 mb-6 text-center text-orange-600">
        All Food Items
      </h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex space-x-3">
          {["all", "available", "requested"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                filter === f
                  ? "bg-orange-600 text-white shadow"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-200"
              }`}
              aria-pressed={filter === f}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          {filter !== "all" && (
            <button
              onClick={() => setFilter("all")}
              className="px-3 py-2 rounded-full font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Clear filter"
              title="Clear filter"
            >
              ✕
            </button>
          )}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="search"
            placeholder="Search by name, location, donator..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Search food items"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {filteredFoods.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          No food items found.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border border-gray-300 shadow-sm">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-orange-100 text-left text-sm font-semibold text-gray-700">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Image</th>
                  <th className="px-4 py-3 whitespace-nowrap">Name</th>
                  <th className="px-4 py-3 whitespace-nowrap text-center">
                    Qty
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">Expire Date</th>
                  <th className="px-4 py-3 whitespace-nowrap">Location</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 whitespace-nowrap">Donator</th>
                  <th className="px-4 py-3 whitespace-nowrap text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-gray-800 text-sm">
                {currentFoods.map((food) => (
                  <tr
                    key={food._id}
                    className="hover:bg-orange-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <img
                        src={food.foodImg}
                        alt={food.foodName}
                        className="w-12 h-12 rounded-full object-cover"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">
                      {food.foodName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      {food.foodQuantity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {food.expireDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {food.location}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          food.status.toLowerCase() === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {food.status.toLowerCase() === "available" ? (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                        {food.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {food.donator ? (
                        <div className="flex items-center space-x-3">
                          <img
                            src={food.donator.donatorImage}
                            alt={food.donator.donatorName || "Donator"}
                            className="w-10 h-10 rounded-full object-cover"
                            loading="lazy"
                          />
                          <span className="font-medium text-gray-900">
                            {food.donator.donatorName || "Anonymous"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">Anonymous</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <Link
                        to={`/food/${food?._id}`}
                        className="text-sm px-3 py-1 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-150"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pageCount > 1 && (
            <nav
              className="mt-6 flex justify-center space-x-2"
              aria-label="Pagination"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Prev
              </button>
              {[...Array(pageCount)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      currentPage === page
                        ? "bg-orange-600 text-white"
                        : "bg-white hover:bg-orange-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(pageCount, p + 1))
                }
                disabled={currentPage === pageCount}
                className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default AllFoods;
