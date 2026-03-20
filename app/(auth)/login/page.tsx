"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)

    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      })

      localStorage.setItem("token",res.data.token)

      router.push("/dashboard")
    } catch (err: any) {
      alert(err.response?.data?.error || "Login failed")
    }

    setLoading(false)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
  {/* Glassmorphism Card */}
  <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-white/20 space-y-6">
    
    {/* Header */}
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        Welcome Back
      </h1>
      <p className="text-sm text-gray-500">Enter your details to access your account</p>
    </div>

    {/* Input Group */}
    <div className="space-y-4">
      <div className="group">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="group">
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>

    {/* Login Button */}
    <button
      onClick={handleLogin}
      disabled={loading}
      className="w-full relative group overflow-hidden bg-gray-900 text-white p-3 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-70"
    >
      <span className="relative z-10">
        {loading ? "Verifying..." : "Sign In"}
      </span>
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>

    {/* Footer Links */}
    <div className="text-center pt-2">
      <a href="#" className="text-xs text-gray-500 hover:text-purple-600 transition-colors">
        Forgot your password?
      </a>
    </div>
  </div>
</div>
  )
}