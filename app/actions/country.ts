import prisma from "@/lib/prisma";
import { AllCountries } from "@/types/country";
import { revalidatePath } from "next/cache";

export const addCountry = async (formData: FormData) => {
  "use server";

  await prisma.country.create({
    data: {
      code: formData.get("code") as string,
      imageUrl: formData.get("imageUrl") as string,
    },
  });

  revalidatePath("/");
};

export const getAllCountries = async (): Promise<AllCountries[]> => {
  "use server";

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
