import React, { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";

const AIResponse = ({prompt}) => {
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    const fetchAIResponse = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: "AIzaSyAt5YGTs6AIHGKEwRJ13msihynp5W1h6P4" });
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