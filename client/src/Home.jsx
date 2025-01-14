import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import follow from "./assets/follow.png";
import rice from "./assets/rice.jpg";
import soybean from "./assets/soybean-corn.jpg";
import fruit from "./assets/fruits.jpg";
import egg from "./assets/egg.jpg";
import slide_one from "./assets/slide-one.jpg"
import slide_two from "./assets/slide-two.jpg";
import slide_three from "./assets/slide-three.jpg";
import farmer_one from "./assets/farmer-one.png";
import farmer_two from "./assets/farmer-two.jpg";
import farmer_three from "./assets/farmer-three.jpg";
import news_one from "./assets/news-one.jpg";
import news_two from "./assets/news-two.jpg";
import news_three from "./assets/news-three.jpg";
import news_four from "./assets/news-four.jpg";
import news_five from "./assets/news-five.jpg";
import Footer from "./Footer";
import Header from "./Header";


const Home = () => {
  const slides = [
    {
      image: slide_one,
      title: "Expand Your Farming",
      description:
        "Are you looking for a technology revolution for enhancing your farming experience? Unlock your modern farming with the latest technology.",
    },
    {
      image: slide_two,
      title: "Advanced Farming Solutions",
      description:
        "Revolutionize your farming experience with state-of-the-art tools and expert guidance.",
    },
    {
      image: slide_three,
      title: "Grow More with Technology",
      description:
        "Embrace the future of farming and maximize your crop yield with ease.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slides every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
    
    
    
const newsItems = [
  {
    title: "Turkey: A Large scale greenhouse tomato crop",
    time: "4 min read",
    image: news_one,
  },
  {
    title: "Indonesia: Reported rice leaf disease outbreak",
    time: "5 min read",
    image: news_two,
  },
  {
    title: "Israel: Smart farming used for large scale farms",
    time: "3 min read",
    image: news_three,
  },
  {
    title: "Germany: Advances in crop technology",
    time: "4 min read",
    image: news_four,
  },
  {
    title: "Brazil: Coffee farming transformation",
    time: "6 min read",
    image: news_five,
  },
];

const farmersFeedback = [
  {
    name: "James Scott",
    feedback:
      "This service has enabled us to run our farm more efficiently by automating many of our farm's tasks.",
    image: farmer_one,
  },
  {
    name: "Chris Edward",
    feedback:
      "This service has enabled us to run our farm more efficiently by automating many of our farm's tasks.",
    image: farmer_two,
  },
  {
    name: "Sam Rogers",
    feedback:
      "This service has enabled us to run our farm more efficiently by automating many of our farm's tasks.",
    image: farmer_three,
  },
  {
    name: "Emily Brown",
    feedback:
      "Using this service, we’ve achieved higher efficiency and productivity on our farm.",
    image: farmer_one,
  },
  {
    name: "Michael Lee",
    feedback:
      "This has transformed the way we work on our farm, making it easier and faster.",
    image: farmer_two,
  },
];

const [newsIndex, setNewsIndex] = useState(0);
const [feedbackIndex, setFeedbackIndex] = useState(0);


 const rightScrollRef = useRef(null);
 const cardRefs = useRef(newsItems.map(() => React.createRef()));
 const leftSideRef = useRef(null);
 const rightSideRef = useRef(null);

 // Dynamically adjust the height of the right side to match the left side
 useEffect(() => {
   if (leftSideRef.current && rightSideRef.current) {
     const leftHeight = leftSideRef.current.offsetHeight;
     rightSideRef.current.style.height = `${leftHeight}px`; // Ensure right side matches left side height
   }
 }, [newsIndex]); // Run when the newsIndex changes

 const nextNews = () => {
   setNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
   setTimeout(() => {
     cardRefs.current[newsIndex + 1]?.current?.scrollIntoView({
       behavior: "smooth",
       block: "center",
     });
   }, 200); // Delay for smooth transition
 };

 const prevNews = () => {
   setNewsIndex(
     (prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length
   );
   setTimeout(() => {
     cardRefs.current[newsIndex - 1]?.current?.scrollIntoView({
       behavior: "smooth",
       block: "center",
     });
   }, 200); // Delay for smooth transition
 };


const nextFeedback = () => {
  setFeedbackIndex((prevIndex) =>
    prevIndex < farmersFeedback.length - 3 ? prevIndex + 1 : 0
  );
};

const prevFeedback = () => {
  setFeedbackIndex((prevIndex) =>
    prevIndex > 0 ? prevIndex - 1 : farmersFeedback.length - 3
  );
};

  return (
    <div className="font-archivo">
      <Header />
      {/* Hero Section - Slideshow */}
      <section className="relative bg-cover bg-center h-[80vh]">
        <div
          className="absolute inset-0 transition-all duration-500 bg-center bg-cover"
          style={{
            backgroundImage: `url('${slides[currentSlide].image}')`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40">
            <div className="absolute text-left text-white bottom-8 left-8">
              <h1 className="mb-4 font-bold text-7xl">
                {slides[currentSlide].title}
              </h1>
              <p className="mb-6 text-lg">{slides[currentSlide].description}</p>
              <button className="px-4 py-2 text-black bg-white rounded-lg shadow-md">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Dots for Slide Indicators */}
        <div className="absolute flex space-x-2 bottom-4 right-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </section>
      <section className="py-8 bg-gray-100">
        <div className="max-w-full px-4 mx-auto sm:px-6 lg:px-24">
          <h1 className="mb-8 text-4xl font-bold text-left">Our Services</h1>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Service 1 */}
            <div className="text-left bg-white rounded-lg shadow-md">
              <img
                src={rice}
                alt="Rice Diseases"
                className="object-cover w-full mb-4 rounded-t-lg h-96"
              />
              <h3 className="p-6 mb-2 text-4xl font-semibold">
                Rice <br /> Diseases
              </h3>
              <p className="px-6 mb-4 text-gray-600">
                Detect rice leaf diseases and find treatments under proper
                guidance.
              </p>
              <div className="p-6 mt-auto">
                <button
                  className="w-full px-4 py-2 mt-12 text-green-800 bg-white border-2 border-green-800 rounded-lg"
                  onClick={() => navigate("/rice-prediction")}
                >
                  Get Started
                </button>
              </div>
            </div>
            {/* Service 2 */}
            <div className="text-left bg-white rounded-lg shadow-md">
              <img
                src={soybean}
                alt="Corn & Soy Seeds"
                className="object-cover w-full mb-4 rounded-t-lg h-96"
              />
              <h3 className="p-6 mb-2 text-4xl font-semibold font-archivo">
                Corn & Soya Seeds
              </h3>
              <p className="px-6 mb-4 text-gray-600">
                Quality assessment of corn seeds & soya beans seeds for better
                farming.
              </p>

              <div className="p-6 mt-auto">
                <button className="w-full px-4 py-2 mt-6 text-green-800 bg-white border-2 border-green-800 rounded-lg">
                  Get Started
                </button>
              </div>
            </div>
            {/* Service 3 */}
            <div className="text-left bg-white rounded-lg shadow-md">
              <img
                src={fruit}
                alt="Fruits & Vegetables"
                className="object-cover w-full mb-4 rounded-t-lg h-96"
              />
              <h3 className="p-6 mb-2 text-4xl font-semibold">
                Fruits & Vegetables
              </h3>
              <p className="px-6 mb-4 text-gray-600">
                Quality assessment of fruits and vegetables for better after
                crop classification.
              </p>
              <div className="p-6 mt-auto">
                <button className="w-full px-4 py-2 mt-6 text-green-800 bg-white border-2 border-green-800 rounded-lg">
                  Get Started
                </button>
              </div>
            </div>
            {/* Service 4 */}
            <div className="flex flex-col justify-between h-full text-left bg-white rounded-lg shadow-md ">
              <div className="w-full overflow-hidden rounded-t-lg h-96">
                <img
                  src={egg}
                  alt="Eggs"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="p-6 mb-2 text-4xl font-semibold">Eggs</h3>
              <p className="px-6 pt-12 mb-4 text-gray-600">
                Quality assessment of eggs for better classification for
                marketing purposes.
              </p>
              <div className="p-6 mt-auto">
                <button
                  className="w-full px-4 py-2 text-green-800 bg-white border-2 border-green-800 rounded-lg"
                  onClick={() => navigate("/egg-classification")}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News and Stories Section */}
      <section className="px-24 py-12 bg-gray-100">
        <div className="flex items-center justify-between gap-8">
          {/* Left side: Title */}
          <h2 className="text-4xl font-bold">Latest News & Stories</h2>

          {/* Arrows on the right, aligned with the title */}
          <div className="flex mx-8 space-x-4">
            <button
              className="flex items-center justify-center w-10 h-10 text-green-500 border border-green-500 rounded-full hover:bg-green-100"
              onClick={prevNews}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded-full hover:bg-green-600"
              onClick={nextNews}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-8 mt-6 lg:flex-row">
          {/* Left side: Displaying the large selected news item */}
          <div className="flex flex-col flex-1">
            <div className="flex-grow p-6 bg-white rounded-lg shadow-lg">
              <img
                src={newsItems[newsIndex].image}
                alt={newsItems[newsIndex].title}
                className="object-cover w-full mb-4 rounded-lg h-[400px]"
              />
              <h3 className="text-xl font-semibold">
                {newsItems[newsIndex].title}
              </h3>
              <p className="text-gray-600">{newsItems[newsIndex].time}</p>
            </div>
          </div>

          {/* Right side: List of smaller news items */}
          <div
            className="relative flex flex-col flex-1"
            style={{ minHeight: "450px" }} // Ensure right side has the same height as the left side
          >
            <div
              className="flex flex-col space-y-4 overflow-hidden"
              ref={rightScrollRef}
              style={{
                scrollBehavior: "smooth",
                maxHeight: "500px", // Ensure the right side has the same height as the left side
              }}
            >
              {newsItems.map((item, index) => (
                <div
                  key={index}
                  ref={cardRefs.current[index]}
                  className={`transition-all duration-300 ease-in-out flex-shrink-0 ${
                    index === newsIndex
                      ? "border-4 border-green-500" // Highlight the active news
                      : "border"
                  }`}
                  onClick={() => setNewsIndex(index)} // Set clicked item as active
                >
                  <div
                    className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
                    style={{
                      opacity: index === newsIndex ? 1 : 0.6,
                    }}
                  >
                    {/* Increased card height */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-24 h-24 mb-4" // Adjusted height of images in the right cards
                    />
                    {/* Text content (title and time) aligned to the right of the image */}
                    <div className="text-left">
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <p className="text-gray-500">{item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Farmers Are Saying Section */}
      <section className="py-16">
        <h1 className="mb-12 text-4xl font-bold text-center">
          What Farmers Are Saying
        </h1>
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            className="flex items-center justify-center w-10 h-10 text-green-500 border border-green-500 rounded-full hover:bg-green-100"
            onClick={prevFeedback}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Feedback Section */}
          <div className="flex w-full px-4 space-x-8 overflow-hidden lg:w-3/4">
            {farmersFeedback
              .slice(feedbackIndex, feedbackIndex + 3)
              .map((farmer, index) => (
                <div
                  key={index}
                  className="flex-1 max-w-sm p-6 text-center bg-white rounded-lg shadow-md"
                >
                  <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="w-32 h-32 mx-auto mb-4 rounded-full lg:w-40 lg:h-40"
                  />
                  <h3 className="text-lg font-semibold lg:text-xl">
                    {farmer.name}
                  </h3>
                  <p className="italic text-gray-600">"{farmer.feedback}"</p>
                </div>
              ))}
          </div>

          {/* Right Arrow */}
          <button
            className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded-full hover:bg-green-600"
            onClick={nextFeedback}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Left Section */}
          <div className="flex-1 px-20 space-y-4 text-center lg:ml-12 lg:text-left">
            <h2 className="text-5xl font-bold">Follow us</h2>
            <p className="text-gray-600">@pokebarboston</p>
            <p className="text-gray-600">
              To stay updated with the latest news, promotions, and offerings
              from the serene escapes, make sure to follow our social media
              accounts. Don’t miss out on any updates!
            </p>
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 lg:justify-start">
              <a href="#" className="pr-4 text-blue-500">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="#" className="pr-4 text-blue-400">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="#" className="pr-4 text-black">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href="#" className="text-red-600">
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1">
            <img
              src={follow}
              alt="Follow Us"
              className="object-cover w-full h-full lg:h-auto"
              style={{ marginRight: "0", marginLeft: "auto" }}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
