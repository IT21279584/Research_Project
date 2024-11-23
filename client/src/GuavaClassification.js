import React, { useState, useEffect } from "react";

export default function PlantDiseaseDetection() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image1File, setImage1File] = useState(null);
  const [image2File, setImage2File] = useState(null);
  const [response, setResponse] = useState(null);
  const [previousResults, setPreviousResults] = useState([]);

  useEffect(() => {
    fetchPreviousResults();
  }, []);

  const handleImageUpload = (event, setImage, setFile) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = async () => {
    const formData = new FormData();
    if (image1File) {
      formData.append("file1", image1File);
    }
    if (image2File) {
      formData.append("file2", image2File);
    }

    try {
      const response = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setResponse(result);
      fetchPreviousResults();
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const fetchPreviousResults = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/predictions");
      const results = await response.json();
      setPreviousResults(results);
    } catch (error) {
      console.error("Failed to fetch previous results:", error);
    }
  };

  return (
    <div>
      <div
        className="relative w-full h-36 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/Guava-1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-4xl font-bold text-white z-10 text-center">
          Rice Leaf Disease Detection
        </h1>
      </div>

      <div className="flex flex-col md:flex-row  justify-between mt-8 px-4 md:px-16">
        <div className="flex-1 text-left mb-8 md:mb-0">
          <h2 className="text-3xl font-bold">
            The Plant is Infected with -{" "}
            {response?.predictionResult?.predicted_class?.toUpperCase()}
          </h2>
          <p className="mt-4 text-sm md:text-base">
            By analyzing the image you have uploaded, the algorithm has
            identified that the plant is infected with the disease called Brown
            Spot.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-2 bg-green-500 text-white rounded-md font-bold hover:bg-green-600">
              Treatments
            </button>
            <button className="px-6 py-2 bg-white border border-gray-400 rounded-md font-bold">
              Read more
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col space-y-4 items-center justify-center">
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-8 items-center justify-center">
            <div className="flex flex-col items-center mx-auto">
              {image1 ? (
                <img
                  src={image1}
                  alt="Uploaded Image 1"
                  className="border border-red-500 w-72 h-72 object-cover mb-4 sm:mb-2"
                />
              ) : (
                <div className="w-72 h-72 border border-gray-300 flex items-center justify-center text-gray-400 mb-4 sm:mb-2">
                  No Image
                </div>
              )}
              <label className="px-6 py-2 bg-white border border-gray-400 rounded-md font-bold cursor-pointer text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, setImage1, setImage1File)
                  }
                  className="hidden"
                />
                Upload Image
              </label>
            </div>
            <div className="flex flex-col items-center mt-4 sm:mt-0 mx-auto">
              {image2 ? (
                <img
                  src={image2}
                  alt="Uploaded Image 2"
                  className="border border-red-500 w-72 h-72 object-cover mb-4 sm:mb-2"
                />
              ) : (
                <div className="w-72 h-72 border border-gray-300 flex items-center justify-center text-gray-400 mb-4 sm:mb-2">
                  No Image
                </div>
              )}
              <label className="px-6 py-2 bg-white border border-gray-400 rounded-md font-bold cursor-pointer text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, setImage2, setImage2File)
                  }
                  className="hidden"
                />
                Upload Image
              </label>
            </div>
          </div>
          <button
            onClick={handleAnalyzeClick}
            className="px-6 py-2 bg-white border border-gray-400 rounded-md font-bold mt-4 mx-auto"
          >
            Analyze
          </button>
        </div>
      </div>

      <div className="ml-4 md:ml-10 mt-10 mb-6">
        <h2 className="text-3xl font-semibold">Previous Results</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 justify-center mb-8 px-4">
        {previousResults.map((result) => (
          <div key={result._id} className="text-center p-4">
            <div className="flex flex-col sm:flex-row justify-around mb-4 space-y-4 sm:space-y-0">
              <img
                src={result.image1}
                alt="Previous Result Image 1"
                className="w-full sm:w-72 h-72 object-cover rounded-md shadow"
              />
              <img
                src={result.image2}
                alt="Previous Result Image 2"
                className="w-full sm:w-72 h-72 object-cover rounded-md shadow"
              />
            </div>
            <p className="font-bold text-lg">{result.predicted_class}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
