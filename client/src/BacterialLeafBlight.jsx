import React from "react";
import rice from "../src/assets/rice.png";
import Header from "./Header";
import Footer from "./Footer";
import backgroundImage from "./assets/background.jpg"; // Import the background image

const BacterialLeafBlight = () => {
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
            <h1 className="mb-4 text-3xl font-bold ">BACTERIAL LEAF BLIGHT</h1>
            <p className="mb-4 leading-relaxed text-gray-700">
              he disease is most likely to develop in areas that have weeds and
              stubbles of infected plants. It can occur in both tropical and
              temperate environments, particularly in irrigated and rainfed
              lowland areas. In general, the disease favors temperatures at
              25−34°C, with relative humidity above 70%.It is commonly observed
              when strong winds and continuous heavy rains occur, allowing the
              disease-causing bacteria to easily spread through ooze droplets on
              lesions of infected plants. Bacterial blight can be severe in
              susceptible rice varieties under high nitrogen fertilization.
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
              href="https://doa.gov.lk/rrdi_ricediseases_bacterialleafblight/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              https://doa.gov.lk/rrdi_ricediseases_bacterialleafblight
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
              On older plants, lesions usually develop as water-soaked to
              yellow-orange stripes on leaf blades or leaf tips or on
              mechanically injured parts of leaves. Lesions have a wavy margin
              and progress toward the leaf base.
            </li>
            <li>
              On young lesions, bacterial ooze resembling a milky dew drop can
              be observed early in the morning. The bacterial ooze later on
              dries up and becomes small yellowish beads underneath the leaf.
            </li>
            <li>
              Old lesions turn yellow to grayish white with black dots due to
              the growth of various saprophytic fungi. On severely infected
              leaves, lesions may extend to the leaf sheath.
            </li>
          </ul>
          <br></br>
          <p>
            Check for wilting and yellowing of leaves, or wilting of seedlings
            (also called kresek).{" "}
          </p>
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
            On seedlings, infected leaves turn grayish green and roll up. As the
            disease progresses, the leaves turn yellow to straw-colored and
            wilt, leading whole seedlings to dry up and die.
          </p>
          <p className="mt-4 text-gray-700">
            Kresek on seedlings may sometimes be confused with early rice stem
            borer damage.
          </p>
          <p className="mt-4 text-gray-700">
            To distinguish kresek symptoms from stem borer damage, squeeze the
            lower end of infected seedlings between the fingers. Kresek symptoms
            should show yellowish bacterial ooze coming out of the cut ends.
            Unlike plants infested with stem borer, rice plants with kresek are
            not easily pulled out from soil.
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
              biological products are commercially available to the control
              bacterial blight in rice. The application of products based on
              copper can help to alleviate or reduce the symptoms but will not
              control the disease.
            </p>
            <br></br>
            <p className="mt-2 text-gray-700">
              <strong>Chemical Control</strong>
              <br></br>Always consider an integrated approach with preventive
              measures and biological treatments if available. To combat
              bacterial blight, the treatment of seeds with an authorized
              antibiotic plus copper oxychloride or copper sulfate has been
              recommended. The use of antibiotics is severely restricted in some
              countries, so please check the measures in force in your country.
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

export default BacterialLeafBlight;
