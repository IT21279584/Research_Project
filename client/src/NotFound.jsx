import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const NotFound = () => {
  return (
    <div className="font-archivo">
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md p-8 mx-auto text-center bg-white rounded-lg shadow-lg">
          <h1 className="font-extrabold text-green-800 text-9xl">404</h1>
          <p className="mt-4 text-2xl font-semibold text-gray-700">
            Oops! The page you are looking for doesn't exist.
          </p>
          <p className="mt-2 text-lg text-gray-500">
            It seems like the page you're trying to reach is either missing or
            has been moved.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2 mt-6 text-lg font-medium text-white transition-colors bg-green-800 rounded-lg hover:bg-green-600"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
