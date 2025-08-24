import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/app/lib/mongoose"
import User from "@/app/model/User"
import bcrypt from "bcryptjs"
import { signJwt } from "@/app/lib/auth"


export async function POST(req: NextRequest) {
try {
await dbConnect()
const { email, password } = await req.json()


if (!email || !password) {
return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
}


const user = await User.findOne({ email })
if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })


const ok = await bcrypt.compare(password, user.password)
if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })


const token = signJwt({ uid: user._id.toString(), email: user.email })
const res = NextResponse.json({ user: { id: user._id, email: user.email, name: user.name } })
res.cookies.set("token", token, {
httpOnly: true,
sameSite: "lax",
secure: process.env.NODE_ENV === "production",
path: "/",
maxAge: 60 * 60 * 24 * 7,
})
return res
} catch (e) {
console.error(e)
return NextResponse.json({ error: "Server error" }, { status: 500 })
}
}