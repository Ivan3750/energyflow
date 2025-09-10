import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/mongoose";
import Quote from "@/app/model/Quote";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en";

  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );

  const count = await Quote.countDocuments();
  if (count === 0) {
    return NextResponse.json({ error: "No quotes found" }, { status: 404 });
  }

  const index = dayOfYear % count;
  const quote = await Quote.findOne().skip(index);

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  return NextResponse.json({
    author: quote.author,
    quote: quote.quote[lang as keyof typeof quote.quote] || quote.quote.en,
  });
}
