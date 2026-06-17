const ai = require("../config/ai");

const enhanceContent = async (req, res) => {
  try {
    const { type, content } = req.body;

    if (!type || !content) {
      return res.status(400).json({
        message: "type and content are required",
      });
    }

    let prompt = "";

    if (type === "experience") {
      prompt = `Rewrite this work experience bullet point to be stronger and more impactful. Use one strong action verb. Be concise. Return ONLY the improved sentence, no bullets, no numbering, no markdown.
Content: ${content}`;

    } else if (type === "project") {
      prompt = `Improve this project bullet point. Make it more impactful with strong action verbs. Return ONLY the improved sentence, no bullets, no numbering, no markdown, no bold text.
Content: ${content}`;

    } else if (type === "summary") {
      prompt = `Rewrite this professional summary. Make it ATS friendly and professional. Maximum 80 words. Return ONLY plain text, no markdown, no bullet points.
Content: ${content}`;
    } else {
      return res.status(400).json({
        message: "Invalid type. Use summary, experience, or project",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    // ✅ SAFE GEMINI RESPONSE HANDLING
    const result = response.text
      .replace(/\*\*/g, '')     // remove **bold**
      .replace(/\*/g, '')       // remove *italic*  
      .replace(/#{1,6}\s/g, '') // remove ### headings
      .replace(/^\d+\.\s/gm, '') // remove "1. 2. 3." numbering
      .replace(/^-\s/gm, '')    // remove "- " bullet dashes
      .trim();

    return res.status(200).json({ result });
  } catch (error) {
    console.error("FULL ERROR:", JSON.stringify(error, null, 2));
    console.error("MESSAGE:", error.message);

    return res.status(500).json({
      message: error.message || "AI generation failed",
      detail: error?.errorDetails || error?.status || "unknown"
    });
  }
};

module.exports = {
  enhanceContent,
};
