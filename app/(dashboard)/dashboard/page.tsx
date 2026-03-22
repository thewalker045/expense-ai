"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [insights, setInsights] = useState("")
  const [loading, setLoading] = useState(false)

  const [aiInput, setAiInput] = useState("")
  const [aiLoading, setAiLoading] = useState(false)

  const router = useRouter()

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        data: { id },
      })

      fetchExpenses()
    } catch (error) {
      console.log(error)
    }
  }

  const handleAIExpense = async () => {
    if (!aiInput) return

    try {
      setAiLoading(true)

      const res = await axios.post(
        "/api/ai/expense",
        aiInput,
        {
          headers: getHeaders(),
        }
      )

      console.log("AI Saved:", res.data)

      setAiInput("")
      fetchExpenses()
    } catch (err) {
      console.log(err)
    } finally {
      setAiLoading(false)
    }
  }

  const fetchInsights = async () => {
    setLoading(true)

    try {
      const summaryRes = await axios.get("/api/expenses/summary", {
        headers: getHeaders(),
      })

      const aiRes = await axios.post(
        "/api/ai/insights",
        summaryRes.data
      )

      setInsights(aiRes.data.insights)
    } catch (err: any) {
      const data = err?.response?.data
      const details = data?.details

      const message =
        details?.message ??
        details ??
        data?.message ??
        err?.message ??
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

        {/* ✅ Header */}
        <header className="flex justify-between items-end">
          <div>
            <p className="text-indigo-400 text-sm uppercase tracking-widest">
              Overview
            </p>
            <h1 className="text-4xl font-extrabold text-white">
              Dashboard
            </h1>
          </div>

          <button
            onClick={() => router.push("/add-expense")}
            className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all"
          >
            + Add Expense
          </button>
        </header>

        {/* 🔥 AI INPUT SECTION */}
        <section className="bg-[#0d1117] border border-white/10 p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Add Expense with AI
          </h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. I spent 200 on food"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              className="flex-1 bg-black/30 border border-white/10 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={handleAIExpense}
              disabled={aiLoading}
              className="bg-indigo-500 px-5 py-2 rounded-xl font-bold hover:scale-105 transition duration-300 disabled:opacity-50"
            >
              {aiLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </section>

        {/* 🤖 AI Insights */}
        <section className="bg-[#0d1117] border border-white/10 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">
              AI Financial Insights
            </h2>

            <button
              onClick={fetchInsights}
              className="text-indigo-400 text-sm"
            >
              {loading ? "Analyzing..." : "Refresh"}
            </button>
          </div>

          <div className="min-h-[60px]">
            {insights ? (
              <p className="italic text-slate-300">"{insights}"</p>
            ) : (
              <p className="text-slate-500 text-sm">
                Click refresh to get insights
              </p>
            )}
          </div>
        </section>

        {/* 💰 Expense List */}
        <section className="space-y-4">
          {expenses.length === 0 ? (
            <p className="text-slate-500 text-center">
              No expenses yet
            </p>
          ) : (
            expenses.map((exp) => (
              <div
                key={exp._id}
                className="flex justify-between items-center bg-white/5 p-4 rounded-xl"
              >
                <div>
                  <p className="font-bold text-white">{exp.title}</p>
                  <p className="text-xs text-slate-400">
                    {exp.category}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold">₹{exp.amount}</p>

                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="text-red-400 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

      </div>
    </div>
  )
}