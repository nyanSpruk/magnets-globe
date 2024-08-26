"use client";
// components/SearchComponent.tsx
import React, { useState } from "react";
import Fuse from "fuse.js";
import { ICountry, CountryData } from "@/types/country";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button"; // Assuming you have a Button component in your UI library
import { Label } from "../ui/label";

interface SearchComponentProps {
  allCountries: ICountry[];
}

const SearchComponent: React.FC<SearchComponentProps> = ({ allCountries }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ICountry[]>([]);

  // Initialize Fuse.js with options
  const fuse = new Fuse<ICountry>(allCountries, {
    keys: ["code", "name", "countries.imageUrl"], // Adjust keys to match ICountry structure
    threshold: 0.3, // Lower threshold for stricter matches
  });

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]); // Clear results if query is less than 2 characters
    } else {
      const fuzzyResults = fuse.search(value);
      setResults(fuzzyResults.map((result) => result.item));
    }
  };

  // Handle button click
  const handleButtonClick = (country: ICountry) => {
    console.log("Country Data:", country);
  };

  return (
    <div className="w-80 h-[45rem] flex flex-col gap-4 items-center justify-start">
      <Label className="text-white">Search Magnets</Label>
      <Input
        placeholder="Search magnets..."
        value={query}
        onChange={handleSearch}
        className="w-full mb-4"
      />
      <ScrollArea className="max-h-80 w-full">
        <ul className="w-full space-y-4">
          {results.map((item, index) => (
            <li
              key={index}
              className="p-4 border rounded-md shadow-md bg-white"
            >
              <h2 className="font-bold text-lg mb-2">{item.name}</h2>
              <p className="mb-2">Magnets: {item.count}</p>
              <ul className="mb-4">
                {item.countries.map((country: CountryData, countryIndex) => (
                  <li key={countryIndex} className="mb-2">
                    {country.imageUrl ? (
                      <img
                        src={country.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <span>No Image Available</span>
                    )}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleButtonClick(item)}
                className="w-full bg-blue-500 text-white py-2 rounded-3xl"
              >
                Show Country Data
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default SearchComponent;
