// pages/index.tsx

import { getAllCountries, getCountryByName } from "./actions/country";
import fs from "fs";
import path from "path";
import { AllCountries, GeoJsonCountryFeature } from "@/types/country";
import dynamic from "next/dynamic";
import BlurOverlay from "@/components/custom_ui/BlurOverlay";
import Globe2 from "@/components/globe/Globe2";
import Navbar from "@/components/custom_ui/Navbar";

// Lazy load the client component
const HomePageClient = dynamic(
  () => import("../components/custom_ui/HomePageClient"),
  {
    ssr: false, // Ensure this is a client-side component
  }
);

interface GeoJsonData {
  type: string;
  features: GeoJsonCountryFeature[];
}

const fetchCountriesData = async (): Promise<{
  allCountries: GeoJsonData;
  countriesInDatabase: AllCountries[];
}> => {
  const countriesInDatabase = await getAllCountries();

  const filePath = path.join(
    process.cwd(),
    "public",
    "datasets",
    "ne_110m_admin_0_countries.geojson"
  );
  const fileContents = fs.readFileSync(filePath, "utf8");
  const allCountries: GeoJsonData = JSON.parse(fileContents);

  return { allCountries, countriesInDatabase };
};

export default async function HomePage() {
  const countriesData = await fetchCountriesData();

  return (
    <BlurOverlay>
      <div className="flex justify-center items-center text-white bg-black h-screen overflow-hidden bg-[url('https://unpkg.com/three-globe@2.31.1/example/img/night-sky.png')] bg-cover bg-center">
        <div className="flex justify-center items-center max-w-screen-lg h-screen ">
          <HomePageClient countriesData={countriesData} />
        </div>
      </div>
    </BlurOverlay>
  );
}

// <BlurOverlay>
//   <div className="bg-[url('https://unpkg.com/three-globe@2.31.1/example/img/night-sky.png')] bg-cover bg-center  min-h-screen">
//     {/* Outer div to set full width and background */}
//     <div className="flex justify-center items-center min-h-screen">
//       {/* Centered container with max width */}
//       <div className="max-w-5xl">
//         <HomePageClient countriesData={countriesData} />
//       </div>
//     </div>
//   </div>
// </BlurOverlay>
