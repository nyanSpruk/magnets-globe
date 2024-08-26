"use server";

import prisma from "@/lib/prisma";
import { AllCountries, ICountry } from "@/types/country";
import { revalidatePath } from "next/cache";

export const addCountry = async (formData: FormData) => {
  await prisma.country.create({
    data: {
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      imageUrl: formData.get("imageUrl") as string,
    },
  });

  revalidatePath("/");
};

export const getAllCountries = async (): Promise<AllCountries[]> => {
  // Step 1: Fetch the grouped countries with counts
  const groupedCountries = await prisma.country.groupBy({
    by: ["code"], // Group by country code
    _count: {
      code: true, // Count occurrences of each code
    },
  });

  // Step 2: Fetch all countries and organize them into the desired structure
  const allCountries = await prisma.country.findMany();

  const result = groupedCountries.map((group) => {
    const occurrences = allCountries.filter(
      (country) => country.code === group.code
    );
    return {
      code: group.code,
      count: group._count.code,
      occurrences: occurrences, // Add all occurrences of the country code
    };
  });

  return result;
};

export const getCountryOccurrences = async () => {
  const groupedCountries = await prisma.country.groupBy({
    by: ["code", "name"],
    _count: {
      code: true,
    },
  });

  return groupedCountries.map((group) => ({
    code: group.code,
    name: group.name,
    count: group._count.code,
  }));
};

export const deleteCountryOccurrences = async (code: string, count: number) => {
  const countriesToDelete = await prisma.country.findMany({
    where: { code },
    take: count, // Limit the number of deletions
  });

  const idsToDelete = countriesToDelete.map((country) => country.id);

  await prisma.country.deleteMany({
    where: {
      id: {
        in: idsToDelete,
      },
    },
  });

  revalidatePath("/delete-country");
};

export const getCountriesWithImages = async (): Promise<ICountry[]> => {
  // Step 1: Group countries by code and count the occurrences of each code
  const groupedCountries = await prisma.country.groupBy({
    by: ["code"],
    _count: {
      code: true, // Count the number of occurrences for each country code
    },
  });

  // Step 2: Fetch countries grouped by code to get their names and imageUrls
  const allCountries = await prisma.country.findMany();

  // Step 3: Combine the grouped data with full country details
  const result = groupedCountries.map((group) => {
    const countriesWithImages = allCountries
      .filter((country) => country.code === group.code)
      .map((country) => ({
        imageUrl: country.imageUrl ?? "", // Convert null to an empty string
      }))
      .filter((country) => country.imageUrl !== ""); // Optionally filter out countries without images

    const countryName = allCountries.find(
      (country) => country.code === group.code
    )?.name;

    return {
      code: group.code,
      name: countryName || "",
      count: group._count.code,
      countries: countriesWithImages,
    };
  });

  return result;
};
