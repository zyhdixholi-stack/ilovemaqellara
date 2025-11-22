import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const handler = async (event: any, context: any) => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prompt, useWebSearch = false, language = 'standard' } = JSON.parse(event.body);
    // Aksesojmë çelësin API në mënyrë indirekte për të shmangur zëvendësimin gjatë ndërtimit
    const apiKey = process.env['API_KEY'];

    if (!apiKey) {
        const errorResponse = { text: "Ndjesë, funksionaliteti i asistentit virtual (AI) është çaktivizuar për momentin sepse çelësi API mungon në server." };
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(errorResponse)
        };
    }

    const ai = new GoogleGenAI({ apiKey });

    const dialectInstruction = language === 'dibran'
      ? "Përdor dialektin Dibran në përgjigjen tënde, duke përdorur fjalë dhe shprehje karakteristike të kësaj zone."
      : "Përgjigju në gjuhën standarde shqipe.";

    const config: any = {
      systemInstruction: `You are a helpful assistant for an app promoting a region in Albania. Your tone should be positive, engaging, and informative. ${dialectInstruction}`,
      temperature: 0.7,
    };

    if (useWebSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config,
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter(Boolean)
      .map((web: any) => ({ uri: web.uri, title: web.title }))
      .filter((source: any, index: number, self: any[]) => 
        index === self.findIndex((s) => s.uri === source.uri)
      ) || [];

    const result = { 
      text: response.text,
      sources: sources
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result)
    };
    
  } catch (error) {
    console.error("Error in Netlify function:", error);
    const errorResponse = { text: "Pati një problem gjatë komunikimit me shërbimin e AI. Ju lutem provoni përsëri më vonë." };
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(errorResponse)
    };
  }
};