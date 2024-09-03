"use client";
// components/GlobeComponent.tsx
import {
  GeoJsonData,
  GeoJsonCountryFeature,
  AllCountries,
} from "@/types/country";
import React, { useRef, useEffect, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { isMobile } from "react-device-detect";
import { cn } from "@/lib/utils";

interface GlobeVizProps {
  className?: string;
  countriesData: {
    allCountries: GeoJsonData;
    countriesInDatabase: AllCountries[];
  };
  onCountrySelectServerAction: (countryName: string) => void;
  isGlobeMoved: boolean;
}

const Globe2: React.FC<GlobeVizProps> = ({
  className,
  countriesData,
  onCountrySelectServerAction,
  isGlobeMoved,
}) => {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function getLabel(obj: object): string {
    const country = obj as GeoJsonCountryFeature;
    const name = country.properties.ADMIN;
    const prox = country.proximity;
    const dayColour = prox < 750_000 ? "gray-300" : "gray-900";
    const nightColour = "gray-300";

    const count =
      countriesData.countriesInDatabase.find(
        (c: AllCountries) => c.code === country.properties.ISO_A2
      )?.count ?? 0;
    const label = `<b class="text-${dayColour} dark:text-${nightColour}">${name} - number of magnets: ${count}</b>`;
    return label;
  }

  // Determine size and style based on isGlobeMoved and device type
  const size = isGlobeMoved ? 1200 : isMobile ? 320 : 800; // px on one side
  const extraStyle = {
    width: `${size}px`,
    height: `${size}px`,
    clipPath: `circle(${size / 2}px at ${size / 2}px ${size / 2}px)`,
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 3 });

      const controls = globeEl.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.75;

        // Define min and max zoom values
        const minZoom = 2;
        const maxZoom = 5;

        // Function to clamp zoom levels
        const clampZoom = () => {
          const pov = globeEl.current!.pointOfView();
          if (pov.altitude < minZoom) {
            globeEl.current!.pointOfView({ altitude: minZoom }, 0);
          } else if (pov.altitude > maxZoom) {
            globeEl.current!.pointOfView({ altitude: maxZoom }, 0);
          }
        };

        // Attach change event listener to controls
        controls.addEventListener("change", clampZoom);

        // Clean up event listener on component unmount
        return () => {
          controls.removeEventListener("change", clampZoom);
        };
      }
    }
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      const targetAltitude = isGlobeMoved ? 1.75 : 3;
      const currentPOV = globeEl.current.pointOfView();

      if (isGlobeMoved) {
        globeEl.current.controls().enableZoom = false;
      } else {
        globeEl.current.controls().enableZoom = true;
      }

      globeEl.current.pointOfView(
        {
          lat: currentPOV.lat,
          lng: currentPOV.lng,
          altitude: targetAltitude,
        },
        500 // duration in milliseconds for smooth transition
      );
    }
  }, [isGlobeMoved]);

  const handleCountryClick = async (obj: object) => {
    const country = obj as GeoJsonCountryFeature;
    console.log("Country clicked:", country);
    console.log("Country properties:", country.properties);
    console.log("Country geometry:", country.geometry);
    console.log("Country code:", country.properties.ADMIN);
    let h = await onCountrySelectServerAction(country.properties.ADMIN);
    console.log("Country code:", h);
  };

  return (
    <div
      ref={containerRef}
      className={cn("flex justify-center items-center", className)}
      style={{ width: dimensions.width, height: dimensions.height }} // Dynamic dimensions
    >
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        polygonsData={countriesData.allCountries.features}
        backgroundColor="rgba(0,0,0,0)"
        width={dimensions.width} // Pass updated dimensions to the globe
        height={dimensions.height} // Pass updated dimensions to the globe
        polygonCapColor={(obj: object) => {
          const feat = obj as GeoJsonCountryFeature;

          const countryInDatabase = countriesData.countriesInDatabase.some(
            (c: AllCountries) => c.code === feat.properties.ISO_A2
          );

          return countryInDatabase ? "steelblue" : "gray";
        }}
        polygonSideColor={() => "rgba(0, 0, 0, 0.5)"}
        polygonStrokeColor={() => "#111"}
        polygonLabel={getLabel}
        onPolygonClick={handleCountryClick}
        polygonsTransitionDuration={300}
        ref={globeEl as React.MutableRefObject<GlobeMethods | undefined>}
      />
    </div>
  );
};

export default Globe2;
