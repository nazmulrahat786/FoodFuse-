const About = () => {
  return (
    <section
      aria-labelledby="about-heading"
      className="bg-orange-50 my-10 py-20 px-6"
    >
      <div className="xl:container mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center">
        {/* Image section */}
        <div>
          <img
            src="https://i.pinimg.com/736x/73/ec/70/73ec706c100a7ebeb7decf1c506d984c.jpg"
            alt="Volunteers distributing donated food"
            className="rounded-2xl shadow-lg w-full object-cover h-[420px]"
            loading="lazy"
          />
        </div>

        {/* Content section */}
        <div>
          <h2
            id="about-heading"
            className="text-4xl font-extrabold text-orange-600 mb-6"
          >
            <samp className="text-balance">About </samp>
            FoodFuse
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            <strong>FoodFuse</strong> is a food donation platform that bridges
            the gap between surplus and scarcity. We empower people to donate
            excess food and help those who need it most—building a community
            where no meal goes to waste.
          </p>
          <p className="text-gray-600 mb-6">
            Whether you're a household, restaurant, or charity, you can
            contribute to reducing food waste, feeding the hungry, and creating
            positive change in your community.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full mb-4">
                <svg
                  className="w-6 h-6"
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
              </div>
              <h3 className="font-semibold text-orange-600 text-lg mb-1">
                Donate Surplus
              </h3>
              <p className="text-sm text-gray-600">
                Share leftover food with those in need — safely and quickly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h2l1 2h13l1-2h2m-2 4h2v6H3v-6h2m5-6v6m4-6v6"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-orange-600 text-lg mb-1">
                Reduce Waste
              </h3>
              <p className="text-sm text-gray-600">
                Prevent edible food from ending up in landfills.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 16h10M5 12h14"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-orange-600 text-lg mb-1">
                Empower Communities
              </h3>
              <p className="text-sm text-gray-600">
                Build bridges between donors, volunteers, and families in need.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
