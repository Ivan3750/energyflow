import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/mongoose";
import User from "@/app/model/User";
import bcrypt from "bcryptjs";
import { signJwt } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash, name });
    const token = signJwt({ uid: user._id.toString(), email: user.email });

    const res = NextResponse.json(
      {
        user: { id: user._id, email: user.email, name: user.name },
        token
      },
      { status: 201 }
    );


    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
