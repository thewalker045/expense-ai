"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"

export default function VerifySignup() {
  const params = useSearchParams()
  const email = params.get("email")
  const [otp, setOtp] = useState("")
  const router = useRouter()

  const handleVerify = async () => {
    try {
      await axios.post("/api/auth/verify-signup", {
        email,
        otp,
      })

      alert("Signup successful")
      router.push("/login")
    } catch (err: any) {
      alert(err.response?.data?.error || "Invalid OTP")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-tr from-slate-900 via-blue-900 to-indigo-900">
  {/* Security-Focused Card */}
  <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-sm border border-white/10 space-y-8">
    
    {/* Icon & Header */}
    <div className="text-center space-y-3">
      <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Verify Identity</h1>
      <p className="text-sm text-gray-500 leading-relaxed px-4">
        We've sent a 6-digit code to your email. Please enter it below.
      </p>
    </div>

    {/* OTP Input Field */}
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          maxLength={6}
          placeholder="0 0 0 0 0 0"
          className="w-full text-center text-3xl font-mono tracking-[0.75em] p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 placeholder:text-gray-300 placeholder:tracking-normal"
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      {/* Action Button */}
      <button
        onClick={handleVerify}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all duration-300 active:scale-[0.98] hover:-translate-y-0.5"
      >
        Verify Code
      </button>
    </div>

    {/* Resend Logic */}
    <div className="text-center space-y-4">
      <p className="text-sm text-gray-500">
        Didn't receive the code?{" "}
        <button className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
          Resend
        </button>
      </p>
      
      <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1 mx-auto transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to login
      </button>
    </div>
  </div>
</div>
  )
}