import React, { useState, useEffect } from "react";
import Header from './Header.jsx'
import Footer from './Footer.jsx'
export default function EggClassification() {
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
      const response = await fetch("http://localhost:5010/api/upload", {
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
      const response = await fetch("http://localhost:5010/api/predictions");
      const results = await response.json();
      console.log(results);

      setPreviousResults(results);
    } catch (error) {
      console.error("Failed to fetch previous results:", error);
    }
  };

  return (
    <div>
      <Header/>
      <div
        className="relative flex items-center justify-center w-full h-64 bg-center bg-cover"
        style={{ backgroundImage: "url('/images/egg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative z-10 text-4xl font-bold text-center text-white">
          Egg Quality Detection
        </h1>
      </div>

      <div className="flex flex-col justify-around max-w-screen-xl px-4 mx-auto mt-8 md:flex-row md:px-8 lg:px-12">
        <div className="flex-1 mb-8 text-left md:mb-0">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            The Egg is Classified as <br />
            <span className="text-green-600">
              {response?.predictionResult?.predicted_class?.toUpperCase() ??
                "Waiting for Prediction"}
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 space-y-4">
          <div className="flex flex-col items-center justify-center space-x-0 sm:flex-row sm:space-x-6 md:space-x-8">
            <div className="flex flex-col items-center mx-auto">
              {image1 ? (
                <img
                  src={image1}
                  alt="Uploaded Image 1"
                  className="object-cover w-64 h-64 mb-4 border sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72 sm:mb-2"
                />
              ) : (
                <img
                  src="/images/egg-one.jpg"
                  alt="Uploaded Image 1"
                  className="object-cover w-64 h-64 mb-4 border sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72 sm:mb-2"
                />
              )}
              <label className="px-6 py-2 font-bold text-center bg-white border border-gray-400 rounded-md cursor-pointer">
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
            <div className="flex flex-col items-center mx-auto mt-4 sm:mt-0">
              {image2 ? (
                <img
                  src={image2}
                  alt="Uploaded Image 2"
                  className="object-cover w-64 h-64 mb-4 border sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72 sm:mb-2"
                />
              ) : (
                <img
                  src="/images/egg-two.jpg"
                  alt="Uploaded Image 1"
                  className="object-cover w-64 h-64 mb-4 border sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72 sm:mb-2"
                />
              )}
              <label className="px-6 py-2 font-bold text-center bg-white border border-gray-400 rounded-md cursor-pointer">
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
            className="px-6 py-2 mx-auto mt-4 font-bold bg-white border border-gray-400 rounded-md"
          >
            Analyze
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl px-4 mx-auto mt-10 mb-6 md:px-8 lg:px-12 xl:px-12 ">
        <h2 className="ml-1 text-xl font-bold sm:text-2xl md:text-3xl">
          Previous Results
        </h2>
      </div>

      <div className="grid justify-center max-w-screen-xl grid-cols-1 gap-4 px-4 pb-8 mx-auto mb-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 sm:gap-6 md:gap-8 md:px-8 lg:px-12">
        {previousResults.map((result) => (
          <div
            key={result._id}
            className="text-center" // Minimal styling for layout
          >
            <div className="flex flex-col items-center justify-around mb-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <img
                src={result.image1}
                alt="Previous Result Image 1"
                className="object-cover w-64 h-64 sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72"
              />
              <img
                src={result.image2}
                alt="Previous Result Image 2"
                className="object-cover w-64 h-64 sm:w-36 md:w-48 lg:w-48 xl:w-64 2xl:w-72 sm:h-36 md:h-48 lg:h-48 xl:h-64 2xl:h-72"
              />
            </div>
            <p className="text-sm font-bold sm:text-base md:text-lg">
              {result.result}
            </p>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}