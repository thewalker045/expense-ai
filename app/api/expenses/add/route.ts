import { connectDB } from "@/lib/db"
import Expense from "@/models/Expense"
import { getUserFromToken } from "@/lib/auth"

export async function POST(req: Request) {
  await connectDB()

  try {
    const body = await req.json()
    const { title, amount, category } = body

    if (!title || amount === undefined || amount === null || !category) {
      return Response.json({ message: "All fields required" }, { status: 400 })
    }

    const user = getUserFromToken(req) as
      | { userId?: string; id?: string }
      | null
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    const expense = await Expense.create({
      title,
      amount: Number(amount),
      category,
      userId: user.userId || user.id
    })

    return Response.json({ success: true, expense })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error"
    return Response.json({ message }, { status: 500 })
  }
}

