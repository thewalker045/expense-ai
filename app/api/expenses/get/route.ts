import { connectDB } from "@/lib/db"
import Expense from "@/models/Expense"
import { getUserFromToken } from "@/lib/auth"

export async function GET(req: Request) {
  await connectDB()

  try {
    const user = getUserFromToken(req) as
      | { userId?: string; id?: string }
      | null

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    const expenses = await Expense.find({ userId: user.userId || user.id }).sort({
      date: -1
    })
    return Response.json(expenses)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error"
    return Response.json({ message }, { status: 500 })
  }
}

