import mongoose from "mongoose"


const MONGODB_URI = process.env.MONGODB_URI!


if (!MONGODB_URI) throw new Error("MONGODB_URI is not set")

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached = (global as any).mongoose as Cached;


if (!cached) {
cached = (global as any).mongoose = { conn: null, promise: null }
}


export async function dbConnect() {
if (cached.conn) return cached.conn
if (!cached.promise) {
cached.promise = mongoose.connect(MONGODB_URI, { dbName: MONGODB_URI.split("/").pop()?.split("?")[0] }).then((m) => m)
}
cached.conn = await cached.promise
return cached.conn
}
