import jwt from "jsonwebtoken";
import User from "@/app/model/User";
import { dbConnect } from "@/app/lib/mongoose";

export async function getUserFromToken(req?: Request) {
  await dbConnect();

  let token: string | undefined;

  if (req) {
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  if (!token) throw new Error("No token provided");

  let payload: any;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    throw new Error("Invalid or expired token");
  }
  const user = await User.findById(payload.uid);
  if (!user) throw new Error("User not found");

  return user;
}
