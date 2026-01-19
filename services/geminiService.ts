
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

// Always use the process.env.API_KEY directly as a named parameter in the constructor
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSustainabilityAudit = async (products: Product[]) => {
  try {
    const productSummary = products.map(p => ({
      name: p.name,
      category: p.category,
      packaging: p.packaging,
      ecoScore: p.ecoScore,
      carbon: p.carbonFootprint
    }));

    // Use ai.models.generateContent with the appropriate model name
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a sustainability audit for my retail shop. Here is the current inventory: ${JSON.stringify(productSummary)}. 
      Please provide: 
      1. A summary of the shop's overall environmental performance.
      2. Specific suggestions to improve the average ecoScore.
      3. Identify which products are 'high-risk' for waste or carbon footprint.
      4. Suggest 3 sustainable alternatives for the high-risk items.
      Return the response in a structured JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            highRiskProducts: { type: Type.ARRAY, items: { type: Type.STRING } },
            alternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  replacement: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ['original', 'replacement', 'reason']
              }
            }
          },
          required: ['summary', 'suggestions', 'highRiskProducts', 'alternatives']
        }
      }
    });

    // Extract text directly from the response.text property
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Sustainability Audit Error:", error);
    return null;
  }
};

export const getSalesInsights = async (transactions: any[], products: Product[]) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Analyze these recent sales: ${JSON.stringify(transactions.slice(-10))}. 
            Context products: ${JSON.stringify(products)}. 
            Identify trends and suggest one "Product of the Week" based on sustainability and demand. 
            Keep it brief.`,
        });
        // Accessing response.text property directly
        return response.text;
    } catch (e) {
        return "Unable to generate insights at this time.";
    }
}
