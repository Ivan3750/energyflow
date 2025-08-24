"use client"
import { useState } from "react"
import Link from "next/link"

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/auth/${mode === "register" ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ...(mode === "register" ? { name } : {}) }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")

      window.location.href = "/dashboard"
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 font-[DM_Sans]">
      <div className="w-full max-w-md rounded-2xl border bg-white shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {mode === "register" ? "Create an Account" : "Welcome Back"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name (optional)</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560] transition"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560] transition"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560] transition"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#5F6560] text-white py-2 font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Please wait…" : mode === "register" ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          {mode === "register" ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="underline text-[#5F6560]">
                Log In
              </Link>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <Link href="/register" className="underline text-[#5F6560]">
                Sign Up
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
