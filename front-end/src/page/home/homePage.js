import React from "react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-200">
      {" "}
      {/* Ensure the outer div spans full height */}
      <div className="home-page-outer-grid-layout grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-6xl max-h-8xl mx-auto">
        {/* App Introduction */}
        <div className="app-introduction col-span-1 md:col-span-2 lg:col-span-2 bg-blue-600 rounded-md shadow-lg min-h-[300px]">
          <div className="m-11">
            <h1 className="text-4xl font-bold text-white">
              Welcome to the app
            </h1>
            <p className="mt-3 text-sm text-white">
              TechBench allows you to easily test and monitor the performance of
              your computer's key components, including CPU, GPU, memory,
              storage, and more. With detailed benchmarks and system insights,
              it helps you evaluate your system's capabilities for gaming,
              development, or everyday use.
            </p>
            <p className="inline-block mt-3 px-4 py-2 border-2 border-white text-white rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-300">
              Discover TechBench
            </p>
          </div>
        </div>

        {/* Account Signup/Login */}
        <div className="account-signup-login col-span-1 md:col-span-1 lg:col-span-1 bg-white p-6 rounded-md shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">Account</h1>
          <p className="mt-4 text-gray-600">
            Create an account or log in to start testing your system's
            performance.
          </p>
        </div>

        {/* Browse CPU Result */}
        <div className="browse-cpu-result col-span-1 md:col-span-1 lg:col-span-1 bg-white p-6 rounded-md shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">CPU Result</h1>
          <p className="mt-4 text-gray-600">
            View detailed benchmarks of your CPU performance here.
          </p>
        </div>

        {/* Browse GPU Result */}
        <div className="browse-gpu-result col-span-1 md:col-span-1 lg:col-span-1 bg-white p-6 rounded-md shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">GPU Result</h1>
          <p className="mt-4 text-gray-600">
            Explore the results of your GPU's performance benchmarks.
          </p>
        </div>

        {/* Benchmark Chart */}
        <div className="benchmark-chart col-span-1 md:col-span-2 lg:col-span-1 bg-white p-6 rounded-md shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">
            Benchmark Results
          </h1>
          <p className="mt-4 text-gray-600">
            Check out the detailed benchmark charts for your system's
            capabilities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
