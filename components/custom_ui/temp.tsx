// components/ClientComponent.tsx

"use client"; // Mark this component as a Client Component

import { useState, useEffect } from "react";
import { GlobeComponent } from "@/components/globe/Globe";
import { AllCountries, GeoJsonCountryFeature } from "@/types/country";
import { SearchCountry } from "./SearchCountry";

interface GeoJsonData {
  type: string;
  features: GeoJsonCountryFeature[];
}

interface ClientComponentProps {
  countriesData: {
    allCountries: GeoJsonData;
    countriesInDatabase: AllCountries[];
  };
}

export const ClientComponent: React.FC<ClientComponentProps> = ({
  countriesData,
}) => {
  const [filteredCountries, setFilteredCountries] =
    useState<GeoJsonData | null>(null);

  const handleSearch = (query: string) => {
    if (query === "") {
      setFilteredCountries(null);
    } else {
      const filtered = {
        ...countriesData.allCountries,
        features: countriesData.allCountries.features.filter((country) =>
          country.properties.name.toLowerCase().includes(query.toLowerCase())
        ),
      };
      setFilteredCountries(filtered);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-8">
      <SearchCountry onSearch={handleSearch} /> {/* Search Component */}
      <GlobeComponent
        countriesData={filteredCountries || countriesData.allCountries}
      />{" "}
      {/* Globe Component */}
    </div>
  );
};
