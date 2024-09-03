"use client";

import {
  GeoJsonData,
  GeoJsonCountryFeature,
  AllCountries,
} from "@/types/country";
import Globe, { GlobeMethods } from "react-globe.gl";
import { isMobile } from "react-device-detect";
import { useEffect, useRef } from "react";

interface GlobeVizProps {
  countriesData: {
    allCountries: GeoJsonData;
    countriesInDatabase: AllCountries[];
  };
}

export const GlobeComponent: React.FC<GlobeVizProps> = ({ countriesData }) => {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  useEffect(() => {
    if (globeEl.current) {
      // Set the initial point of view
      globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 2 });

      // Enable auto-rotation using the controls object
      const controls = globeEl.current.controls();
      if (controls) {
        controls.autoRotate = true; // Enable auto-rotation
        controls.autoRotateSpeed = 1.0; // Optional: set rotation speed
      }
    }
  }, []);
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
  const size = isMobile ? 320 : 720; // px on one side
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
        // backgroundImageUrl={"//unpkg.com/three-globe/example/img/night-sky.png"}
        backgroundColor="rgba(0,0,0,0)"
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
        polygonsTransitionDuration={300}
      />
    </div>
  );
};
