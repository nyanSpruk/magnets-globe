import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Country } from "@prisma/client";

// export async function GET() {
//   try {
//     // Fetch all countries
//     const countries = await prisma.country.findMany();

//     // Get the count of unique countries by ID
//     const count = countries.length;

//     return NextResponse.json({ countries, count }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch countries" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   const { code, imageUrl } = await request.json();

//   if (!code) {
//     return NextResponse.json({ error: "Code is required" }, { status: 400 });
//   }

//   const country: Country = await prisma.country.create({
//     data: {
//       code,
//       imageUrl,
//     },
//   });

//   return NextResponse.json(country, { status: 201 });
// }
