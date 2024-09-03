"use client"; // This directive indicates that this component is a client-side component

import React, { useState } from "react";
import { AllCountries, GeoJsonCountryFeature } from "@/types/country";
import Globe2 from "@/components/globe/Globe2";
import Navbar from "@/components/custom_ui/Navbar";
import AnimatedDiv from "@/components/custom_ui/AnimatedDiv";
import AboutPanel from "./AboutPanel";
import { getCountryByName } from "@/app/actions/country";
import { motion } from "framer-motion"; // Import Framer Motion

interface GeoJsonData {
  type: string;
  features: GeoJsonCountryFeature[];
}

interface HomePageClientProps {
  countriesData: {
    allCountries: GeoJsonData;
    countriesInDatabase: AllCountries[];
  };
}

const HomePageClient: React.FC<HomePageClientProps> = ({ countriesData }) => {
  const [isAboutVisible, setAboutVisible] = useState(false); // State to manage info panel visibility
  const [isGlobeMoved, setGlobeMoved] = useState(false); // State to manage globe position

  // Function to handle "About the project" click
  const handleAboutClick = () => {
    setAboutVisible(!isAboutVisible);
    setGlobeMoved(!isGlobeMoved);
  };

  const onHomeClick = () => {
    setAboutVisible(false);
    setGlobeMoved(false);
  };

  return (
    <>
      <Navbar onHomeClick={onHomeClick} onAboutClick={handleAboutClick} />
      <motion.div
        className={`max-w-5xl h-screen relative flex items-center justify-center gap-16`}
        initial={{ x: 0, y: 0 }} // Initial position
        animate={{
          x: isGlobeMoved ? "60%" : "0%",
          y: isGlobeMoved ? "15%" : "0%",
        }} // Animate based on state
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          when: "beforeChildren", // Ensure the parent animation occurs before child animations
        }}
      >
        <AnimatedDiv>
          <Globe2
            onCountrySelectServerAction={getCountryByName}
            countriesData={countriesData}
            isGlobeMoved={isGlobeMoved}
          />
        </AnimatedDiv>
        <AboutPanel isVisible={isAboutVisible} />
      </motion.div>
    </>
  );
};

export default HomePageClient;

// <div className="h-screen relative">
// <Navbar onHomeClick={onHomeClick} onAboutClick={handleAboutClick} />
// <div className="flex justify-center items-center bg-[url('https://unpkg.com/three-globe@2.31.1/example/img/night-sky.png')] h-full">
//   <motion.div
//     className={`max-w-5xl relative flex items-center justify-center gap-16`} // Make parent relative
//     initial={{ x: 0 }} // Initial position
//     animate={{ x: isGlobeMoved ? "20%" : "0%" }} // Animate based on state
//     transition={{ type: "spring", stiffness: 100, damping: 20 }} // Smooth spring animation
//   >
//     <AnimatedDiv>
//       <div className=" m-0">
//         <Globe2
//           onCountrySelectServerAction={getCountryByName}
//           countriesData={countriesData}
//           isGlobeMoved={isGlobeMoved}
//         />
//       </div>
//     </AnimatedDiv>
//     {/* Render the InfoPanel as a floating card */}
//     <AboutPanel isVisible={isAboutVisible} />
//   </motion.div>
// </div>
// </div>
