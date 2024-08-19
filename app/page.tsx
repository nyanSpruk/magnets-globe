import { addCountry, getAllCountries } from "./actions/country";
import fs from "fs";
import path from "path";
import { GlobeComponent } from "@/components/globe/Globe";
import { CountryForm } from "@/components/custom_ui/CountryForm";
import { AllCountries, GeoJsonCountryFeature } from "@/types/country";

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

  return (
    <div className="flex items-center justify-center gap-8">
      <div>
        <GlobeComponent countriesData={countriesData} />
      </div>

      <div>
        <CountryForm onSubmit={addCountry} />
      </div>
    </div>
  );
}
