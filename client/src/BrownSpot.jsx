import React from "react";
import rice from "../src/assets/rice.png";
import Header from "./Header";
import Footer from "./Footer";
import backgroundImage from "./assets/background.jpg"; // Import the background image

const BrownSpot = () => {
  return (
    <div className="min-h-screen ">
      <Header />
      <div
        className="flex items-center justify-center w-full h-56 mb-8 bg-center bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="p-4 text-4xl font-bold text-white bg-opacity-50 rounded-lg">
          Rice Leaf Disease Detection
        </h2>
      </div>

      <div className="max-w-6xl p-6 mx-auto bg-white rounded-lg">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-6 lg:flex-row">
          <div className="lg:w-2/3">
            <h1 className="mb-4 text-3xl font-bold ">BROWN SPOT</h1>
            <p className="mb-4 leading-relaxed text-gray-700">
              Brown spot has been historically largely ignored as one of the
              most common and most damaging rice diseases. Brown spot is a
              fungal disease that infects the coleoptile, leaves, leaf sheath,
              panicle branches, glumes, and spikelets. Its most observable
              damage is the numerous big spots on the leaves which can kill the
              whole leaf. When infection occurs in the seed, unfilled grains or
              spotted or discolored seeds are formed.
            </p>
            <br></br>
            <h3 class="flex items-center gap-2">
              For more details
              <svg
                class="w-6 h-6 text-gray-800 dark:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                />
              </svg>
            </h3>
            <a
              href="https://plantix.net/en/library/plant-diseases/100064/brown-spot-of-rice/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              https://plantix.net/en/library/plant-diseases/100064/brown-spot-of-rice
            </a>
          </div>
          <div className="pl-24 lg:w-1/3">
            <img
              src={rice}
              alt="Brown spot on rice leaves"
              className="w-full rounded-lg h-78"
            />
          </div>
        </div>

        {/* Identification Section */}
        {/* Identification Section */}
        <div className="mt-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            How to identify
          </h2>
          <ul className="pl-10 space-y-2 text-gray-700 list-disc">
            <li>
              Infected seedlings have small, circular, yellow brown or brown
              lesions that may girdle the coleoptile and distort primary and
              secondary leaves.
            </li>
            <li>
              Starting at tillering stage, lesions can be observed on the
              leaves. They are initially small, circular, and dark brown to
              purple-brown.
            </li>
            <li>
              Fully developed lesions are circular to oval with a light brown to
              gray center, surrounded by a reddish brown margin caused by the
              fungi.
            </li>
          </ul>

          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
            <img
              src={rice}
              alt="Brown spot on rice leaves"
              className="object-cover w-full h-auto px-20 py-10 rounded-lg aspect-square"
            />

            <img
              src={rice}
              alt="Brown spot on rice leaves"
              className="object-cover w-full h-auto px-20 py-10 rounded-lg aspect-square"
            />
          </div>
          <p className="mt-4 text-gray-700">
            Lesions on leaf sheaths are similar to those on the leaves. Infected
            glumes and panicle branches have dark brown to black oval spots or
            discoloration on the entire surface. Spikelets can also be infected.
            Infection of florets leads to incomplete or disrupted grain filling
            and a reduction in grain quality. The disease-causing fungi can also
            penetrate grains, causing 'pecky rice,' a term used to describe
            spotting and discoloration of grains.
          </p>
          <p className="mt-4 text-gray-700">
            On susceptible varieties, lesions are 5-14 mm long which can cause
            leaves to wilt. On resistant varieties, the lesions are brown and
            pinhead-sized.
          </p>
          <p className="mt-4 text-gray-700">
            In certain rice varieties, brown spot lesions can be mistaken for
            blast lesions. To confirm, check if spots are circular, brownish,
            and have a gray center surrounded by a reddish margin.
          </p>
        </div>

        {/* Recommendations Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Recommendations
          </h2>
          <div className="p-4 bg-green-200 rounded">
            <p className="mt-2 text-gray-700">
              <strong>Organic Control</strong> <br></br>To be sure that the
              seeds are not contaminated, a seed bath in hot water (53-54&deg;C)
              for 10 - 12 minutes is recommended. To improve the results, place
              the seeds for 8 hours in cold water before the hot water
              treatment.
            </p>
            <br></br>
            <p className="mt-2 text-gray-700">
              <strong>Chemical Control</strong>
              <br></br> Always consider an integrated approach with both
              preventive measures and biological treatments if available. The
              best way to prevent the disease is to use fungicides (e.g.,
              iprodione, propiconazole, azoxystrobin, trifloxystrobin) as seed
              treatments.
            </p>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex items-center justify-between mt-8">
          <a href="#" className="text-blue-500 underline">
            Go for treatment plans
          </a>
          <a
            href="#"
            className="px-4 py-2 text-white transition bg-green-500 rounded hover:bg-green-600"
          >
            Download for more details
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrownSpot;
