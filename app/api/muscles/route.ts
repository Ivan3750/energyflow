import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/mongoose";
import Muscle from "@/app/model/Muscle";

export async function GET(request: Request) {
  await dbConnect();

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const perPage = parseInt(url.searchParams.get("perPage") || "50");
  const lang = (url.searchParams.get("lang") || "en") as "en" | "ua" | "pl";

  const skip = (page - 1) * perPage;
  const total = await Muscle.countDocuments();
  const muscles = await Muscle.find().skip(skip).limit(perPage);

  const results = muscles.map((muscle) => ({
    name: muscle.translations[lang],
    filter: muscle.filter[lang],
    imgUrl: muscle.imgUrl,
  }));

  return NextResponse.json({
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
    results,
  });
}
