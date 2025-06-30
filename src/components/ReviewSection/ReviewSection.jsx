import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Sara Johnson",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text:
      "FoodFuse helped me donate leftover food easily. It feels great to contribute and see people benefit directly. Truly a life-changing platform!",
  },
  {
    id: 2,
    name: "Mark Thompson",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    text:
      "A wonderful initiative that connects donors and recipients efficiently. The community feel is heartwarming, and the process is seamless.",
  },
  {
    id: 3,
    name: "Priya Patel",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    text:
      "Thanks to FoodFuse, I was able to donate food regularly and reduce waste. It’s an amazing way to give back and help others.",
  },
];

const ReviewSection = () => {
  return (
    <section className=" py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-extrabold text-orange-600 mb-4">
          What Our Community Says
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Hear from people who’ve experienced the power of FoodFuse firsthand.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {reviews.map(({ id, name, photo, rating, text }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <img
                src={photo}
                alt={name}
                className="w-14 h-14 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg text-orange-600">{name}</h3>
                <div className="flex text-yellow-400">
                  {[...Array(rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 flex-grow">"{text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
