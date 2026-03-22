import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const getJSON = async (data: string) => {
    console.log(data)
    try {
        const prompt = `
Extract expense details as JSON.

Return ONLY this format:
{"title":"Food","amount":500,"category":"Food"}

Input: "${data}"
`;

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0,
        });

        const text = response.choices[0]?.message?.content || "";

        console.log("RAW AI:", text);


        const match = text.match(/\{[\s\S]*\}/);

        if (!match) {
            console.log(" No JSON found");
            return null;
        }

        const jsonString = match[0];

        let parsed;

        try {
            parsed = JSON.parse(jsonString);
        } catch (err) {
            console.log("JSON parse failed:", jsonString);
            return null;
        }


        if (
            !parsed ||
            typeof parsed.amount !== "number" ||
            !parsed.title
        ) {
            console.log(" Invalid structure:", parsed);
            return null;
        }

        return parsed;

    } catch (error) {
        console.error("AI Error:", error);
        return null;
    }
};