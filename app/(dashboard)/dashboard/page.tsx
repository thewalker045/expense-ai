"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [insights, setInsights] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}` 
  })

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses/get", {
        headers: getHeaders(),
      })

      setExpenses(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/api/expenses/delete", {
        headers: getHeaders(),
        data: { id }
      })

      fetchExpenses()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchInsights = async () => {
    setLoading(true)

    try {
      const summaryRes = await axios.get("/api/expenses/summary", {
        headers: getHeaders()
      })
      console.log("i am executing")

      const aiRes = await axios.post(
        "/api/ai/insights",
        summaryRes.data
      )

      setInsights(aiRes.data.insights)
    } catch (err) {
      // Surface backend details to the user (instead of leaving old insights).
      const data = (err as any)?.response?.data
      const details = data?.details

      const message =
        details?.message ??
        details ??
        data?.message ??
        (err as any)?.message ??
        "AI insights failed"

      console.log(err)
      setInsights(String(message))
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  return (
   <div className="min-h-screen bg-[#05070a] text-slate-200 p-6 md:p-10">
  <div className="max-w-4xl mx-auto space-y-10">
    
    {/* ✅ Header Section */}
    <header className="flex justify-between items-end">
      <div>
        <p className="text-indigo-400 font-medium text-sm mb-1 uppercase tracking-widest">Overview</p>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Dashboard</h1>
      </div>
      <button
        onClick={() => router.push("/add-expense")}
        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all"
      >
        <span className="text-xl">+</span> Add Expense
      </button>
    </header>

    {/* 🤖 AI Insights Card (Bento Style) */}
    <section className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      <div className="relative bg-[#0d1117] border border-white/10 p-8 rounded-[2rem] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 22.5l-.394-1.933a2.25 2.25 0 0 0-1.64-1.64l-1.933-.394 1.933-.394a2.25 2.25 0 0 0 1.64-1.64l.394-1.933.394 1.933a2.25 2.25 0 0 0 1.64 1.64l1.933.394-1.933.394a2.25 2.25 0 0 0-1.64 1.64l-.394 1.933Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">AI Financial Insights</h2>
          </div>
          <button
            onClick={fetchInsights}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest border-b border-indigo-400/30 pb-1 transition-all"
          >
            {loading ? "Analyzing Pattern..." : "Refresh Magic"}
          </button>
        </div>

        <div className="min-h-[80px] flex items-center">
          {insights ? (
            <p className="text-slate-300 leading-relaxed italic">"{insights}"</p>
          ) : (
            <p className="text-slate-500 text-sm">Tap 'Refresh Magic' to let the AI analyze your spending habits.</p>
          )}
        </div>
      </div>
    </section>

    {/* 💰 Expense List Section */}
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-400 flex items-center gap-2">
          Your Expenses
          <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full">{expenses.length}</span>
        </h2>
      </div>

      <div className="grid gap-3">
        {expenses.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2rem]">
            <p className="text-slate-600">No transactions recorded yet.</p>
          </div>
        ) : (
          expenses.map((exp) => (
            <div
              key={exp._id}
              className="group flex justify-between items-center p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {/* Simple Logic: If category contains 'food' show burger, etc. */}
                  {exp.category?.toLowerCase().includes('food') ? '🍔' : '💸'}
                </div>
                <div>
                  <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">{exp.title}</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    {exp.category} • Today
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <p className="text-lg font-mono font-bold text-white">₹{exp.amount}</p>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 transition-all"
                  aria-label="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  </div>
</div>
  )
}