import React, { useState, useEffect } from "react";

export default function TomatoClassification() {
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
        style={{ backgroundImage: "url('/images/Brown-eggs.jpg.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-4xl font-bold text-white z-10 text-center">
          Tomato Quality Classification
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-around mt-8 px-4 md:px-8 lg:px-12 max-w-screen-xl mx-auto">
        <div className="flex-1 text-left mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            The Tomato is Classified as <br />
            <span className="text-green-600">
              {response?.predictionResult?.predicted_class?.toUpperCase() ??
                "Waiting for Prediction"}
            </span>
          </h1>
        </div>

        <div className="flex flex-1 flex-col space-y-4 items-center justify-center">
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-6 md:space-x-8 items-center justify-center">
            <div className="flex flex-col items-center mx-auto">
              {image1 ? (
                <img
                  src={image1}
                  alt="Uploaded Image 1"
                  className="border w-64 sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 h-64 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72 object-cover mb-4 sm:mb-2"
                />
              ) : (
                <img
                  src="/images/not_damaged_7.jpg"
                  alt="Uploaded Image 1"
                  className="border w-64 sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 h-64 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72 object-cover mb-4 sm:mb-2"
                />
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
                  className="border w-64 sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 h-64 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72 object-cover mb-4 sm:mb-2"
                />
              ) : (
                <img
                  src="/images/thumb (10).jpg"
                  alt="Uploaded Image 1"
                  className="border w-64 sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 h-64 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72 object-cover mb-4 sm:mb-2"
                />
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

      <div className="mt-10 mb-6 max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 xl:px-12 ">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold ml-1">
          Previous Results
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 justify-center mb-8 px-4 md:px-8 lg:px-12 max-w-screen-xl mx-auto">
        {previousResults.map((result) => (
          <div
            key={result._id}
            className="text-center p-4 border rounded-md shadow-md"
          >
            <div className="flex flex-col sm:flex-row justify-around items-center mb-4 space-y-4 sm:space-y-0">
              <img
                src={result.image1}
                alt="Previous Result Image 1"
                className="w-64 sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 h-64 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72 object-cover rounded-md shadow"
              />
              <img
                src={result.image2}
                alt="Previous Result Image 2"
                className="w-64 sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 h-64 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72 object-cover rounded-md shadow"
              />
            </div>
            <p className="font-bold text-sm sm:text-base md:text-lg">
              {result.result}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
