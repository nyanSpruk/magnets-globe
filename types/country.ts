import { Country } from "@prisma/client";

// types/country.ts
export interface GeoJsonCountryFeature {
  type: string;
  properties: {
    ADMIN: string; // Country name
    ISO_A2: string; // ISO Alpha-2 code
    GDP_MD_EST: number; // GDP estimate in millions of dollars
    POP_EST: number; // Population estimate
  };
  proximity: number;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

export interface GeoJsonData {
  type: string;
  features: GeoJsonCountryFeature[];
}

export interface AllCountries {
  code: string;
  count: number;
  occurrences: Country[];
}

export interface CountryData {
  imageUrl: string;
}

export interface ICountry {
  code: string;
  name: string;
  count: number;
  countries: CountryData[];
}
