const OurApp = () => {
  return (
    <section
      className="flex flex-col md:flex-row items-center justify-between px-8 lg:px-16 py-12"
      style={{
        backgroundColor: "#663dff",
        backgroundImage:
          "linear-gradient(319deg, #663dff 0%, #aa00ff 37%, #cc4499 100%)",
      }}
    >
      {/* App Visual */}
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <img
          src="https://i.postimg.cc/W17nfMmr/Chat-GPT-Image-Jun-7-2025-02-34-26-PM.png"
          alt="Food delivery illustration"
          className="w-80 md:w-[400px] rounded-xl shadow-2xl"
        />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 max-w-xl text-white">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Download the <span className="text-yellow-300">FoodFuse</span> App!
        </h2>
        <p className="text-lg mb-6">
          Join the movement to fight hunger in your community. With the
          FoodFuse app, you can easily share, donate, or request meals—making
          a real impact from your phone.
        </p>

        <div className="flex gap-4 flex-wrap">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-12"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurApp;
