const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

/**
 * Calls Gemini to rewrite a Sakhi decision in a farmer-friendly way.
 * Gemini is NOT allowed to change the decision.
 */
export const callGemini = async ({ contextGraph, decision }) => {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key missing");
  }

  const prompt = `
You are an agricultural assistant helping Indian farmers.

IMPORTANT RULES:
- Do NOT change the decision.
- Do NOT add new advice.
- Do NOT contradict the decision.
- Do NOT add uncertainty or alternatives.

Your task:
Rewrite the given decision in a clear, friendly, farmer-understandable way.

Context:
${JSON.stringify(contextGraph, null, 2)}

Decision:
"${decision}"

Return ONLY the rewritten decision text.
`;

  const response = await fetch(
    `${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Gemini API call failed");
  }

  const data = await response.json();

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Invalid Gemini response");
  }

  return text.trim();
};
