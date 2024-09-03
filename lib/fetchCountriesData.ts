// src/pages/api/countriesData.ts

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { getAllCountries } from "@/app/actions/country";
import { AllCountries, GeoJsonCountryFeature } from "@/types/country";

interface GeoJsonData {
  type: string;
  features: GeoJsonCountryFeature[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const countriesInDatabase: AllCountries[] = await getAllCountries();

    const filePath = path.join(
      process.cwd(),
      "public",
      "datasets",
      "ne_110m_admin_0_countries.geojson"
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    const allCountries: GeoJsonData = JSON.parse(fileContents);

    res.status(200).json({ allCountries, countriesInDatabase });
  } catch (error) {
    res.status(500).json({ error: "Error reading country data" });
  }
}
