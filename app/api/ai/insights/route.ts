import { getInsights } from "@/lib/ai"

export async function POST(req: Request) {
    try {
        const data = await req.json()

        const insights = await getInsights(data)

        return Response.json({ insights })
    } catch (err: unknown) {
        console.error("AI insights error:", err)

        const error = err as any
        const message =
            err instanceof Error ? err.message : "AI failed (unknown error)"

        return Response.json(
            {
                success: false,
                message: "AI failed",
                details: {
                    message,
                    status: error?.status,
                    statusText: error?.statusText
                }
            },
            { status: 500 }
        )
    }
}