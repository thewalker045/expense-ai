"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null) // ✅ update UI immediately
    router.push("/login")
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black text-white">
      <h1
        className="text-lg font-bold cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        ExpenseAI
      </h1>

      <div className="space-x-4">
        {token ? (
          <>
            <button onClick={() => router.push("/dashboard")}>
              Dashboard
            </button>

            <button onClick={() => router.push("/add-expense")}>
              Add Expense
            </button>

            <button
              onClick={handleLogout}
              className="bg-white text-black px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => router.push("/login")}>
              Login
            </button>

            <button onClick={() => router.push("/signup")}>
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  )
}