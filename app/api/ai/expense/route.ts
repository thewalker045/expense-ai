import { getJSON } from "@/lib/ainew";
import { getUserFromToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Expense from "@/models/Expense";
export async function POST(req: Request) {
    try {
        await connectDB();
        const decoded = await getUserFromToken(req)

        const body = await req.text();
        console.log(body);


        const newdata = await getJSON(body);

        console.log("AI OUTPUT:", newdata);

        if (!newdata) {
            return Response.json({
                success: false,
                message: "AI parsing failed",
            });
        }
        const expense = await Expense.create({
  ...newdata,
  userId: decoded!.userId
});

        return Response.json({
            success: true,
            expense,
        });

    } catch (error: any) {
        console.error(" ERROR:", error.message);
        console.error(error);

        return Response.json({
            success: false,
            message: "AI failed",
            error: error.message,
        });
    }
}