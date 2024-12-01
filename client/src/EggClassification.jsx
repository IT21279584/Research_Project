import React, { useState, useEffect } from 'react';

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
      formData.append('file1', image1File);
    }
    if (image2File) {
      formData.append('file2', image2File);
    }

    try {
      const response = await fetch('http://localhost:5010/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setResponse(result);
      fetchPreviousResults();
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const fetchPreviousResults = async () => {
    try {
      const response = await fetch('http://localhost:5010/api/predictions');
      const results = await response.json();
      setPreviousResults(results);
    } catch (error) {
      console.error('Failed to fetch previous results:', error);
    }
  };

  return (
    <div>
      <div className="relative flex items-center justify-center w-full bg-center bg-cover h-36" style={{ backgroundImage: "url('/images/Brown-eggs.jpg.webp')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative z-10 text-4xl font-bold text-center text-white">Egg Quality Detection</h1>
      </div>
      
      <div className="flex flex-col justify-between px-4 mt-8 md:flex-row md:px-16">
        <div className="flex-1 mb-8 text-left md:mb-0">
          <h2 className="text-3xl font-bold">
            The Egg Quality is - {response?.predictionResult?.result?.toUpperCase()}
          </h2>
          <p className="mt-4 text-sm md:text-base">
          By analyzing the image you have uploaded, the algorithm has detected signs of potential disease affecting your tomato fruit.
          </p>
          <div className="flex flex-col mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600">Treatments</button>
            <button className="px-6 py-2 font-bold bg-white border border-gray-400 rounded-md">Read more</button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 space-y-4">
          <div className="flex flex-col items-center justify-center space-x-0 sm:flex-row sm:space-x-8">
            <div className="flex flex-col items-center mx-auto">
              {image1 ? (
                <img src={image1} alt="Uploaded Image 1" className="object-cover mb-4 border border-red-500 w-72 h-72 sm:mb-2"/>
              ) : (
                <div className="flex items-center justify-center mb-4 text-gray-400 border border-gray-300 w-72 h-72 sm:mb-2">No Image</div>
              )}
              <label className="px-6 py-2 font-bold text-center bg-white border border-gray-400 rounded-md cursor-pointer">
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImage1, setImage1File)} className="hidden"/>
                Upload Image
              </label>
            </div>
            <div className="flex flex-col items-center mx-auto mt-4 sm:mt-0">
              {image2 ? (
                <img src={image2} alt="Uploaded Image 2" className="object-cover mb-4 border border-red-500 w-72 h-72 sm:mb-2"/>
              ) : (
                <div className="flex items-center justify-center mb-4 text-gray-400 border border-gray-300 w-72 h-72 sm:mb-2">No Image</div>
              )}
              <label className="px-6 py-2 font-bold text-center bg-white border border-gray-400 rounded-md cursor-pointer">
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImage2, setImage2File)} className="hidden"/>
                Upload Image
              </label>
            </div>
          </div>
          <button onClick={handleAnalyzeClick} className="px-6 py-2 mx-auto mt-4 font-bold bg-white border border-gray-400 rounded-md">Analyze</button>
        </div>

      </div>

      <div className="mt-10 mb-6 ml-4 md:ml-10">
        <h2 className="text-3xl font-semibold">Previous Results</h2>
      </div>

      <div className="grid justify-center grid-cols-1 gap-4 px-4 mb-8 sm:grid-cols-2 md:grid-cols-2">
        {previousResults.map(result => (
          <div key={result._id} className="p-4 text-center">
            <div className="flex flex-col justify-around mb-4 space-y-4 sm:flex-row sm:space-y-0">
              <img src={result.image1} alt="Previous Result Image 1" className="object-cover w-full rounded-md shadow sm:w-72 h-72"/>
              <img src={result.image2} alt="Previous Result Image 2" className="object-cover w-full rounded-md shadow sm:w-72 h-72"/>
            </div>
            <p className="text-lg font-bold">{result.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
