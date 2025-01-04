import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import rice from "./assets/rice.png";

const DiagnosisResult = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-10 mx-auto my-10 sm:px-12 lg:px-20">
        {/* Diagnosis Result Section */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-lg font-bold">Diagnosis Result</h2>
          <div className="flex items-center">
            <img
              src={rice} // Replace with actual image URL
              alt="Brown Spot"
              className="object-cover rounded-lg h-36 w-36"
            />
            <div className="ml-6">
              <h3 className="text-xl font-semibold">Leaf Blast</h3>
              <p className="text-gray-500">Fungus disease</p>
            </div>
          </div>
        </div>

        {/* Recommended Treatments Section */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-lg font-bold">Recommended Treatments</h2>
          <div className="p-4 mb-6 text-orange-700 bg-orange-100 rounded-md">
            <p className="text-sm">
              ⚠️ Select and apply <strong>ONLY ONE</strong> of the treatment
              methods to your crops. Don't apply multiple methods; it will be{" "}
              <strong>HARMFUL</strong> to your crops.
            </p>
          </div>
          <div className="space-y-6">
            {[
              "Hexaconazole 10.0%, Tricyclazole 45.0% WG",
              "Tricyclazole 75.0% WP",
              "Picoxystrobin 6.78%, Tricyclazole 20.33% SC",
              "Propiconazole 10.7%, Tricyclazole 34.2% SE",
              "Edifenphos 50.0% EC",
              "Tebuconazole 14.4%, Tricyclazole 18.0% SC",
              "Azoxystrobin 16.7%, Tricyclazole 33.3% SC",
              "Azoxystrobin 10.0%, Fipronil 5.0% SC",
            ].map((treatment, index) => (
              <div
                key={index}
                className="flex items-center p-6 transition bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full">
                  <span className="text-lg font-semibold">🧴</span>
                </div>
                <div className="ml-6">
                  <p className="text-sm text-gray-500">Fungicide</p>
                  <h3 className="font-medium text-md">{treatment}</h3>
                </div>
                <button className="ml-auto text-2xl font-semibold text-green-500 ">
                  &gt;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiagnosisResult;
