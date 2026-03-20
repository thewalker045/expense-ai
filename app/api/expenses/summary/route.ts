import { connectDB } from "@/lib/db"
import Expense from "@/models/Expense"
import { getUserFromToken } from "@/lib/auth"

export async function GET(req: Request) {
  await connectDB()

  try {
    console.log("i am executing 2");
    
    const user = getUserFromToken(req) as
      | { userId?: string; id?: string }
      | null

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    const expenses = await Expense.find({ userId: user.userId || user.id })

    const categoryWise: Record<string, number> = {}
    let total = 0

    expenses.forEach((ex) => {
      total += ex.amount
      if (!categoryWise[ex.category]) categoryWise[ex.category] = 0
      categoryWise[ex.category] += ex.amount
    })

    return Response.json({
      success: true,
      total,
      categoryWise
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error"
    return Response.json({ message }, { status: 500 })
  }
}

