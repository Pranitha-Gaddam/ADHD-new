import React, { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";

const AIResponse = ({prompt}) => {
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    const fetchAIResponse = async () => {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
        console.log("API Key:", apiKey); 
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: "I don't understand this question. Could you give me an example so I can visualize? It should be short in 1 sentence. This is the question: " + prompt,
        });
        setResponseText(response.text);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    };

    fetchAIResponse();
  }, []);

  return (
    <div>
      <p>{responseText || "Loading..."}</p>
    </div>
  );
};

export default AIResponse;