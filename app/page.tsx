import {
  addCountry,
  getAllCountries,
  getCountriesWithImages,
} from "./actions/country";
import fs from "fs";
import path from "path";
import { GlobeComponent } from "@/components/globe/Globe";
import { AllCountries, GeoJsonCountryFeature } from "@/types/country";
import SearchCountry from "@/components/custom_ui/SearchCountry";
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

  const searchCountriesData = await getCountriesWithImages();
  console.log(searchCountriesData);

  return (
    <div className="flex h-screen items-center justify-center gap-16 bg-[url('https://unpkg.com/three-globe@2.31.1/example/img/night-sky.png')]">
      <GlobeComponent countriesData={countriesData} />
      <SearchCountry allCountries={searchCountriesData} />
    </div>
  );
}
