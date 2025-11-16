
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Language } from "../types";

export interface GenerateContentResult {
  text: string;
  sources?: { uri: string; title: string }[];
}


export const generateContent = async (
    prompt: string, 
    useWebSearch: boolean = false,
    language: Language = 'standard'
): Promise<GenerateContentResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

    const dialectInstruction = language === 'dibran'
      ? "Përdor dialektin Dibran në përgjigjen tënde, duke përdorur fjalë dhe shprehje karakteristike të kësaj zone."
      : "Përgjigju në gjuhën standarde shqipe.";

    const config: any = {
        systemInstruction: `You are a helpful assistant for an app promoting a region in Albania. Your tone should be positive, engaging, and informative. ${dialectInstruction}`,
        temperature: 0.7,
    };

    if (useWebSearch) {
        config.tools = [{googleSearch: {}}];
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
      .filter((source, index, self) => 
        index === self.findIndex((s) => s.uri === source.uri)
      ) as { uri: string; title: string }[] || [];

    return { 
      text: response.text,
      sources: sources
    };
    
  } catch (error) {
    console.error("Problem gjatë thirrjes së Gemini API:", error);
    return { text: "Pati një problem gjatë komunikimit me shërbimin e AI. Ju lutem provoni përsëri më vonë." };
  }
};