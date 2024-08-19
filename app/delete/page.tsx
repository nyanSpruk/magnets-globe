"use client";

import React, { useState, useEffect } from "react";
import {
  getCountryOccurrences,
  deleteCountryOccurrences,
} from "@/app/actions/country";
import { Button } from "@/components/ui/button";

interface CountryOccurrences {
  code: string;
  name: string;
  count: number;
}

export default function DeleteCountryPage() {
  const [countries, setCountries] = useState<CountryOccurrences[]>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<CountryOccurrences | null>(null);
  const [deleteCount, setDeleteCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const countryData = await getCountryOccurrences();
      setCountries(countryData);
    }
    fetchData();
  }, []);

  const handleCountrySelect = (code: string) => {
    const country = countries.find((country) => country.code === code);
    setSelectedCountry(country || null);
    setDeleteCount(0); // Reset delete count when a new country is selected
    setError(null); // Reset any error when a new country is selected
  };

  const handleDelete = async () => {
    if (
      selectedCountry &&
      deleteCount > 0 &&
      deleteCount <= selectedCountry.count
    ) {
      await deleteCountryOccurrences(selectedCountry.code, deleteCount);
      setDeleteCount(0);
      setSelectedCountry(null);
      // Refetch the data after deletion
      const updatedCountries = await getCountryOccurrences();
      setCountries(updatedCountries);
    } else {
      setError("Please enter a valid number of occurrences to delete.");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Delete Country Occurrences</h1>

      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Select a country:
        </label>
        <select
          id="country"
          onChange={(e) => handleCountrySelect(e.target.value)}
          value={selectedCountry?.code || ""}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="" disabled>
            Select a country...
          </option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name} ({country.count} occurrences)
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div>
          <label
            htmlFor="deleteCount"
            className="block text-sm font-medium text-gray-700"
          >
            How many occurrences do you want to delete?
          </label>
          <input
            type="number"
            id="deleteCount"
            min="1"
            max={selectedCountry.count}
            value={deleteCount}
            onChange={(e) => setDeleteCount(parseInt(e.target.value))}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}

      <Button
        onClick={handleDelete}
        disabled={
          !selectedCountry ||
          deleteCount <= 0 ||
          deleteCount > (selectedCountry?.count || 0)
        }
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Delete
      </Button>
    </div>
  );
}
