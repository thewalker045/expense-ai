"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async () => {
        setLoading(true)

        try {
            await axios.post("/api/auth/signup",{
                email,password
            })
             router.push(`/verify-signup?email=${email}`)
        } catch (err:any) {
            alert(err.response?.data?.error || "Signup failed")
        }
        
        setLoading(false)
    }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-600">
  {/* Modern Glass Card */}
  <div className="bg-white/85 backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-white/30 space-y-8 transform transition-all">
    
    {/* Header Section */}
    <div className="text-center space-y-2">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
      </div>
      <h1 className="text-3xl font-black text-gray-800 tracking-tight">Create Account</h1>
      <p className="text-gray-500 text-sm">Join us today and start your journey.</p>
    </div>

    {/* Form Fields */}
    <div className="space-y-4">
      <div className="relative group">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full pl-4 pr-4 py-3.5 bg-white/50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 placeholder:text-gray-400"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative group">
        <input
          type="password"
          placeholder="Password"
          className="w-full pl-4 pr-4 py-3.5 bg-white/50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 placeholder:text-gray-400"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="pt-2">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          "Get Started"
        )}
      </button>
    </div>

    <p className="text-center text-sm text-gray-600">
      Already have an account?{" "}
      <button className="text-emerald-600 font-semibold hover:underline">Log in</button>
    </p>
  </div>
</div>
  )
}