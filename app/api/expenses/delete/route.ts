import { connectDB } from "@/lib/db"
import Expense from "@/models/Expense"
import { getUserFromToken } from "@/lib/auth"

export async function DELETE(req: Request) {
  await connectDB()

  try {
    const user = getUserFromToken(req) as
      | { userId?: string; id?: string }
      | null

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await req.json()

    await Expense.findOneAndDelete({
      _id: id,
      userId: user.userId || user.id
    })

    return Response.json({ message: "Deleted successfully" })
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : "Server error"
    return Response.json({ error }, { status: 500 })
  }
}

