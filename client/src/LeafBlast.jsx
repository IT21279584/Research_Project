import React from "react";
import rice from "../src/assets/rice.png";
import Header from "./Header";
import Footer from "./Footer";
import backgroundImage from "./assets/background.jpg"; // Import the background image

const LeafBlast = () => {
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
            <h1 className="mb-4 text-3xl font-bold ">LEAF BLAST</h1>
            <p className="mb-4 leading-relaxed text-gray-700">
              Blast is caused by the fungus Magnaporthe oryzae. Blast can occur
              wherever blast spores are present. It occurs in areas with low
              soil moisture, frequent and prolonged periods of rain showers, and
              cool temperatures in the daytime. In upland rice, large day-night
              temperature differences that cause dew formation on leaves and
              overall cooler temperatures favor the development of the disease.
              Rice can have blasts in all growth stages. However, leaf blast
              incidence tends to lessen as plants mature and develop adult plant
              resistance to the disease.
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
              href="https://doa.gov.lk/rrdi_ricediseases_riceblast/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              https://doa.gov.lk/rrdi_ricediseases_riceblast
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
              Initial symptoms appear as white to gray-green lesions or spots,
              with dark green borders.
            </li>
            <li>
              Older lesions on the leaves are elliptical or spindle-shaped and
              whitish to gray centers with red to brownish or necrotic border.
            </li>
            <li>
              Some resemble diamond shape, wide in the center and pointed toward
              either end.
            </li>
            <li>
              Lesions can enlarge and coalesce, growing together, to kill the
              entire leaves.
            </li>
          </ul><br></br>
          <p>Blast lesions can commonly be confused with Brown Spot lesions.</p>
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
            Leaf blast lesions are usually elongated and pointed at each end,
            while brown spot lesions tend to be rounder, brown in color and have
            a yellow halo surrounding the lesion.
          </p>
          <p className="mt-4 text-gray-700">
            Rice blast is one of the most destructive diseases of rice. A leaf
            blast infection can kill seedlings or plants up to the tillering
            stage. At later growth stages, a severe leaf blast infection reduces
            leaf area for grain fill, reducing grain yield.
          </p>
          <p className="mt-4 text-gray-700">
            Leaf blast can kill rice plants at seedling stage and cause yield
            losses in cases of severe infection.
          </p>
        </div>

        {/* Recommendations Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Recommendations
          </h2>
          <div className="p-4 bg-green-200 rounded">
            <p className="mt-2 text-gray-700">
              <strong>Organic Control</strong> <br></br>To this day, no
              effective biological control of the disease is commercially
              available. Experiments are ongoing to test the viability of
              products based on Streptomyces or Pseudomonas bacteria on the
              fungus and the incidence/spread of the disease.
            </p>
            <br></br>
            <p className="mt-2 text-gray-700">
              <strong>Chemical Control</strong>
              <br></br>Always consider an integrated approach with preventive
              measures together with biological treatments if available. Seed
              treatment with thiram is effective against the disease. Fungicides
              containing azoxystrobin, or active ingredients of the family of
              triazoles or strobilurins can also be sprayed at nursery,
              tillering and panicle emergence stages to control rice blast. One
              or two fungicide applications at heading can be effective in
              controlling the disease.
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

export default LeafBlast;
