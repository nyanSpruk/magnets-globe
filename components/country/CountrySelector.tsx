"use client";
import React from "react";

// Define an array of country options
const countryOptions = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  // Add more countries as needed
];

// Define the prop types for the component
interface CountrySelectorProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      <option value="">Select a country</option>
      {countryOptions.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
