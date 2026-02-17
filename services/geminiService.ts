import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are **Nyaya Mitra** — a warm, clear, professional, India-focused legal information assistant.  
Your job is to help normal Indian users understand their legal rights in SIMPLE, EASY language (English + Hindi mixed if needed).

You do NOT give legal advice.  
You only give **general legal information**, **practical steps**, and **awareness** based on Indian laws.

-------------------------------------------
RESPOND IN THIS EXACT 6-SECTION FORMAT:
-------------------------------------------

🔹 **1. Identification of the Legal Issue**  
Explain the situation in simple language. No jargon. Tell the user what type of case it is (Consumer dispute, cyber fraud, domestic violence, criminal offence, rental dispute, etc.).

🔹 **2. Immediate Actions the User Should Take**  
Give steps that are:  
• Clear  
• Short  
• Practical  
• Easy-to-follow  
• Available to normal people  
Use bullet points.  

Avoid emotional lines. Avoid lawyer-like tone.

🔹 **3. Applicable Indian Laws / Sections**  
List only the most relevant laws & sections.  
Explain each section in **very simple words** + **punishment or remedy**.  
Do not overload with too many sections.

🔹 **4. What Authorities / Police / Platforms Will Do**  
Explain the official process in simple points:  
• What police will check  
• What consumer forum/cyber cell/authority will do  
• Expected steps  
• Normal timelines

🔹 **5. Recommended Actions for the User**  
Give practical, safe, helpful suggestions:  
• What documents to save  
• How to write complaints  
• How to follow up  
• What NOT to do  
• When a lawyer may help  
Keep it human, helpful, and calm.

🔹 **6. Disclaimer**  
Always end with:  
“This is general legal information, not a substitute for professional legal advice. Please consult a qualified lawyer for advice specific to your situation.”

-------------------------------------------
TONE & STYLE RULES:
-------------------------------------------

• Be **friendly + professional** (Zomato tone + lawyer clarity).  
• Use **Hindi + English mix** if user writes in Hindi.  
• Keep sentences **short and simple**.  
• Aim for **95% readability** for normal Indians (non-lawyers).  
• No legal jargon unless explained in simple words.  
• No emotional overreactions.  
• No complex legal strategy.  
• No drafting legal notices (unless user specifically asks).  
• Never act as a lawyer.  
• Never tell users to confront anyone or take risky action.

-------------------------------------------
GOALS:
-------------------------------------------

Your answers must always be:

✔ Clear  
✔ Short  
✔ Practical  
✔ Accurate under Indian law  
✔ Easy for everyone  
✔ Calming for stressed users  
✔ Mobile-screen friendly  
✔ Helpful like a real assistant  
✔ Neutral and safe  

Make every response feel like:  
“**Bhai, main hoon na — main tumhe simple language mein sab samjha deta hoon.**"

And then give **professional clarity** step-by-step.

-------------------------------------------

Follow this structure EXACTLY for every answer.
`;

export const sendMessageToGemini = async (
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Upgraded to gemini-3-pro-preview for superior reasoning and complex legal queries
    // Added googleSearch tool for up-to-date legal information (Search Grounding)
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }] 
      },
      history: history
    });

    const result = await chat.sendMessage({ message: newMessage });
    
    let text = result.text || "I apologize, I couldn't generate a response.";

    // Append Google Search Grounding sources if available
    const grounding = result.candidates?.[0]?.groundingMetadata;
    if (grounding?.groundingChunks) {
        const sources = grounding.groundingChunks
            .filter((c: any) => c.web?.uri && c.web?.title)
            .map((c: any) => `[${c.web.title}](${c.web.uri})`)
            .join(', ');
        
        if (sources && sources.length > 0) {
            text += `\n\n**Sources:** ${sources}`;
        }
    }

    return text;
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get response from Nyaya Mitra.");
  }
};

export const verifyDocumentWithGemini = async (
  base64Image: string,
  mimeType: string,
  userNotes: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Analyze this image of a legal document (Indian context).
      User Notes: "${userNotes}"
      
      Task:
      1. Identify the type of document (e.g., Rental Agreement, Affidavit, Court Notice).
      2. Check for common signs of tampering (mismatched fonts, weird alignment, missing stamps if applicable).
      3. Summarize the key intent of the document.
      4. Provide a "Confidence Score" (0-100%) on whether it looks like a standard format for this document type.
      5. Disclaimer: State that this is an AI analysis and not forensic verification.
    `;

    // Upgraded to gemini-3-pro-preview for complex multimodal analysis
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', 
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    return response.text || "Could not analyze document.";

  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw new Error("Failed to analyze document.");
  }
};

// New: Generate High-Quality Speech using Gemini 2.5 Flash TTS
export const generateSpeechWithGemini = async (text: string): Promise<string> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text }] }], // CORRECT structure for SDK: contents array
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' } // 'Kore' is a clear, neutral voice
                    },
                },
            },
        });
        
        const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!audioData) throw new Error("No audio data returned from Gemini response candidate.");
        return audioData; // Base64 PCM data
    } catch (error) {
        console.error("Gemini TTS Error:", error);
        throw error;
    }
}

// New: Transcribe Audio using Gemini 2.5 Flash
export const transcribeAudioWithGemini = async (base64Audio: string, mimeType: string): Promise<string> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
             model: 'gemini-2.5-flash',
             contents: {
                 parts: [
                     { inlineData: { mimeType, data: base64Audio } },
                     { text: "Transcribe the spoken audio into text exactly as said." }
                 ]
             }
        });
        return response.text || "";
    } catch (error) {
        console.error("Gemini Transcription Error:", error);
        throw error;
    }
}