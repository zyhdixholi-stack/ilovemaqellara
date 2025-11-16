
import { Language } from "../types";

export interface GenerateContentResult {
  text: string;
  sources?: { uri: string; title: string }[];
}

const API_ERROR_MESSAGE = "Pati një problem gjatë komunikimit me shërbimin e AI. Ju lutem provoni përsëri më vonë.";

export const generateContent = async (
    prompt: string, 
    useWebSearch: boolean = false,
    language: Language = 'standard'
): Promise<GenerateContentResult> => {
  try {
    // Thërret funksionin serverless në vend të API-t të Gemini direkt
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        useWebSearch,
        language,
      }),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return { text: errorData.text || API_ERROR_MESSAGE, sources: [] };
      } catch {
        return { text: API_ERROR_MESSAGE, sources: [] };
      }
    }

    const data: GenerateContentResult = await response.json();
    return data;

  } catch (error) {
    console.error("Problem gjatë thirrjes së Netlify function:", error);
    return { text: API_ERROR_MESSAGE, sources: [] };
  }
};
