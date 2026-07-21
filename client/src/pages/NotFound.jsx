import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">

      <div className="text-center max-w-lg">

        {/* 404 Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-200 p-6 rounded-full animate-bounce">
            <SearchX
              size={90}
              className="text-gray-600"
            />
          </div>
        </div>


        {/* 404 Text */}
        <h1 className="text-7xl font-extrabold text-gray-800 mb-4">
          404
        </h1>


        <h2 className="text-3xl font-bold text-gray-700 mb-3">
          Page Not Found
        </h2>


        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for does not exist
          or has been moved.
        </p>


        {/* Home Button */}
        <Link
          to="/"
          className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
        >
          🏠 Go Back Home
        </Link>


        {/* Footer */}
        <div className="mt-8 text-sm text-gray-400">
          🛍️ Continue exploring our premium products
        </div>

      </div>

    </div>
  );
};

export default NotFound;