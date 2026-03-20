// lib/ai.ts
import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export const getInsights = async (data: any) => {
  const prompt = `
    You are a smart financial assistant for a college student

    Total spendings: ${data.total}
    
    Category breakdown:
    ${JSON.stringify(data.categoryWise)}

    Give:
    1. 3 insights about spendings
    2. 2 bad habits
    3. 2 saving tips

    Keep it short, practical, and friendly.
  `

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }]
  })

  return response.choices[0].message.content
}