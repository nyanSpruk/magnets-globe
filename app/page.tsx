import { getAllCountries } from "./actions/country";
import fs from "fs";
import path from "path";
import { GlobeComponent } from "@/components/globe/Globe";

import { AllCountries, GeoJsonCountryFeature } from "@/types/country";

interface GeoJsonData {
  type: string;
  features: GeoJsonCountryFeature[];
}

const fetchCountriesData = async (): Promise<{
  allCountries: GeoJsonData;
  countriesInDatabase: AllCountries[];
}> => {
  // Fetch your country data from the database
  const countriesInDatabase = await getAllCountries();

  // Load the GeoJSON data from the local file
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
  // const countriesObject = await getAllCountries();
  const countriesData = await fetchCountriesData();

  const countryOptions = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
  ];

  return (
    <div>
      <GlobeComponent countriesData={countriesData} />
      {/* <h1>Country List</h1>
      }
      {/* <h1>Add a New Country</h1>
      <form action={addCountry}>
        <div>
          <label htmlFor="code">Country Code:</label>
          <select name="code">
            <option value="">Select a country</option>
            {countryOptions.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="imageUrl">Image URL (optional):</label>
          <input type="text" id="imageUrl" name="imageUrl" />
        </div>

        <button>Add Country</button>
      </form>
      <h2>Country List</h2>
      <ul>
        {countriesObject.map((country) => (
          <li key={country.code}>
            <strong>{country.code} </strong> (Number of occurances:{" "}
            {country.count})
            <ul>
              {country.occurrences.map((country) => (
                <li key={country.id}>
                  <Image
                    src={
                      country.imageUrl ||
                      "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
                    }
                    alt={`Flag of ${country.code}`}
                    width={50}
                    height={50}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
