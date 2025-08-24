import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET as string
const EXPIRES_IN = "7d"

interface JwtPayload {
  uid: string
  email: string
}

export function signJwt(payload: JwtPayload) {
  if (!SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables")
  }
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN })
}

export function verifyJwt(token: string) {
  if (!SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables")
  }
  return jwt.verify(token, SECRET) as JwtPayload
}
