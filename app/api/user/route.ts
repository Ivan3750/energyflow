import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/mongoose";
import User from "@/app/model/User";
import { getUserFromToken } from "@/app/lib/getUserFromToken";

// GET user profile
export async function GET(req: Request) {
  try {
    await dbConnect();
    const user = await getUserFromToken(req);
    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

// PATCH update user profile
export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const user = await getUserFromToken(req);
    const body = await req.json();

    const updated = await User.findByIdAndUpdate(
      user._id,
      { $set: body },
      { new: true }
    ).select("-password");

    return NextResponse.json({ success: true, user: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

// DELETE soft remove user
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const user = await getUserFromToken(req);

    await User.findByIdAndUpdate(user._id, { removed: true });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
