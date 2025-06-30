import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Spring Food Drive 2025",
    date: "2025-04-15",
    location: "Community Center, Downtown",
    description:
      "Join us for our annual Spring Food Drive to collect and distribute surplus food to families in need.",
    details:
      "This is our biggest food drive of the year! Volunteers and donors come together to collect, sort, and deliver food donations. Everyone is welcome to join — bring your friends and family. Refreshments will be provided. Location: Community Center, Downtown. Date & Time: April 15, 9AM to 5PM.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Neighborhood Meal Sharing",
    date: "2025-05-05",
    location: "City Park Pavilion",
    description:
      "A community event where donors and recipients come together to share meals and stories.",
    details:
      "This event encourages building connections between donors and recipients through shared meals. It’s a relaxed gathering with live music, storytelling, and food tasting. Location: City Park Pavilion. Date & Time: May 5, 12PM to 4PM.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Summer Awareness Campaign",
    date: "2025-06-20",
    location: "Online & Local Markets",
    description:
      "Help us spread the word about food waste reduction and how FoodFuse is making an impact.",
    details:
      "Our Summer Awareness Campaign focuses on educating the community about food waste and donation. Includes workshops, social media challenges, and market booths. Join us online or visit local markets for fun activities! Runs June 20 to July 31.",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80",
  },
];

const UpcomingEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <section className=" py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-extrabold text-orange-600 mb-4">
            Upcoming Events & Campaigns
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Be a part of our community initiatives. Check out upcoming events and get involved!
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => openModal(event)}
            >
              <div>
                <h3 className="text-xl font-semibold text-orange-600 mb-2">{event.title}</h3>
                <p className="text-gray-600 font-medium mb-1">
                  <time dateTime={event.date}>
                    {new Date(event.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  {" • "} {event.location}
                </p>
                <p className="text-gray-700 mb-6">{event.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(event);
                }}
                className="mt-auto bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition-colors duration-300"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0  mx-3 bg-opacity-30 flex justify-center items-center z-50"
          style={{ backdropFilter: "blur(6px)" }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full p-6 md:p-8 relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute  top-0.5 right-2.5 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Recommended Image */}
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />

            <h3 className="text-2xl font-bold text-orange-600 mb-4">{selectedEvent.title}</h3>
            <p className="text-gray-600 font-medium mb-2">
              <time dateTime={selectedEvent.date}>
                {new Date(selectedEvent.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {" • "} {selectedEvent.location}
            </p>
            <p className="text-gray-700 whitespace-pre-line">{selectedEvent.details}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingEvents;
