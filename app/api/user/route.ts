import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserFromToken } from "@/app/lib/getUserFromToken";

export async function GET(req: Request) {
  try {
    const user = await getUserFromToken(req) 

    return NextResponse.json(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        weight: user.weight,
        height: user.height,
        sex: user.sex,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getUserFromToken();
    const data = await req.json();

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);
    await user.save();

    return NextResponse.json(
      { message: "Profile updated", user },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}
