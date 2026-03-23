"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import ExpenseChart from "@/components/ChartsandBars"

export default function AddExpense() {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleAdd = async () => {
    console.log("CLICKED")

    if (!title || !amount || !category) {
      alert("All fields are required")
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem("token")

      console.log("TOKEN:", token)

      const res = await axios.post(
        "/api/expenses/add",
        {
          title,
          amount: Number(amount),
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log("SUCCESS:", res.data)
      router.push("/dashboard")
    } catch (err: any) {
      console.log("ERROR:", err.response?.data || err.message)
      alert(err.response?.data?.message || "Failed to add expense")
    } finally {
      setLoading(false)
    }
  }

  return (
   <div className="flex h-screen items-center justify-center bg-[#05070a] px-4">
  {/* Glow Effect behind the card */}
  <div className="absolute w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full" />

  <div className="relative bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/10 space-y-8">
    
    {/* Header with AI Toggle */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Add Expense</h1>
        <p className="text-xs text-slate-400">Manual entry or AI scan</p>
      </div>
      <button className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400 hover:bg-indigo-500/20 transition-all group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
        </svg>
      </button>
    </div>

    {/* Form Section */}
    <div className="space-y-5">
      {/* Amount Field - Highlighted */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-500">$</span>
        <input
          type="number"
          placeholder="0.00"
          className="w-full pl-10 pr-4 py-6 bg-white/5 border border-white/10 rounded-3xl text-3xl font-bold text-white outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-700"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Title Field */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-400 ml-2 uppercase tracking-wider">Description</label>
        <input
          type="text"
          placeholder="e.g., Weekly Groceries"
          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Category Field */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-400 ml-2 uppercase tracking-wider">Category</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Food, Travel, Rent..."
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-indigo-500/20 text-[10px] text-indigo-400 font-bold border border-indigo-500/30">
            AI SUGGESTED
          </div>
        </div>
      </div>
    </div>

    {/* Submit Button */}
    <button
      onClick={handleAdd}
      disabled={loading}
      className="w-full group relative overflow-hidden bg-white text-black py-5 rounded-3xl font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all active:scale-[0.98] disabled:opacity-50"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity" />
      <span className="relative">
        {loading ? "Syncing with Cloud..." : "Confirm Expense"}
      </span>
    </button>

    {/* Quick Tip */}
    <p className="text-center text-[11px] text-slate-500 italic">
      "AI Tip: You've already spent 80% of your Food budget this month."
    </p>
  </div>
</div>
  )
}