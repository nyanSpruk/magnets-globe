"use client";

import {
  GeoJsonData,
  GeoJsonCountryFeature,
  AllCountries,
} from "@/types/country";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
// import Globe from "react-globe.gl";

interface GlobeVizProps {
  countriesData: {
    allCountries: GeoJsonData;
    countriesInDatabase: AllCountries[];
  };
}
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export const GlobeComponent: React.FC<GlobeVizProps> = ({ countriesData }) => {
  function getLabel(obj: object): string {
    const country = obj as GeoJsonCountryFeature;
    const name = country.properties.ADMIN;
    const prox = country.proximity;
    const dayColour = prox < 750_000 ? "gray-300" : "gray-900";
    const nightColour = "gray-300";
    // from countriesData try and find in the database and save the count
    const count =
      countriesData.countriesInDatabase.find(
        (c: AllCountries) => c.code === country.properties.ISO_A2
      )?.count ?? 0;
    const label = `<b class="text-${dayColour} dark:text-${nightColour}">${name} - number of magnets: ${count}</b>`;
    return label;
  }

  // Globe size settings
  const size = isMobile ? 320 : 1080; // px on one side
  const extraStyle = {
    width: `${size}px`,
    clipPath: `circle(${size / 2}px at ${size / 2}px ${size / 2}px)`,
  };

  return (
    <div style={extraStyle}>
      <Globe
        width={size}
        height={size}
        globeImageUrl={"//unpkg.com/three-globe/example/img/earth-day.jpg"}
        backgroundImageUrl={"//unpkg.com/three-globe/example/img/night-sky.png"}
        polygonsData={countriesData.allCountries.features}
        polygonCapColor={(obj: object) => {
          const feat = obj as GeoJsonCountryFeature; // Type assertion

          // Check if the current country is in the database
          const countryInDatabase = countriesData.countriesInDatabase.some(
            (c: AllCountries) => c.code === feat.properties.ISO_A2
          );

          return countryInDatabase ? "steelblue" : "gray";
        }}
        polygonSideColor={() => "rgba(0, 0, 0, 0.5)"}
        polygonStrokeColor={() => "#111"}
        polygonLabel={getLabel}
        // onPolygonHover={(
        //   polygon: object | null,
        //   prevPolygon: object | null
        // ) => {
        //   return {
        //     polygonAltitude: (d: GeoJsonCountryFeature) =>
        //       d === polygon ? 0.12 : 0.06,
        //     polygonCapColor: (d: GeoJsonCountryFeature) =>
        //       d === polygon
        //         ? "steelblue"
        //         : countriesData.countriesInDatabase.includes(
        //             d.properties.ISO_A2
        //           )
        //         ? "red"
        //         : "gray",
        //   };
        // }}
        polygonsTransitionDuration={300}
      />
    </div>
  );
};
