import prisma from "@/lib/prisma";
import { Country } from "@prisma/client";
import { addCountry, getAllCountries } from "./actions/country";
import Image from "next/image";

export default async function HomePage() {
  const countriesObject = await getAllCountries();
  console.log(countriesObject);

  const countryOptions = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
  ];

  return (
    <div>
      <h1>Add a New Country</h1>
      {/* <AddCountryForm /> */}
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
      </ul>
    </div>
  );
}
