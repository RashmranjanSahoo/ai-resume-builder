const ai = require("../config/ai");

const enhanceContent = async (req, res) => {
  try {
    const { type, content } = req.body;

    let prompt = "";

    if (type === "summary") {
      prompt = `
      Rewrite this professional summary.
      ATS friendly.
      Professional tone.
      Maximum 80 words.

      ${content}
      `;
    }

    if (type === "experience") {
      prompt = `
      Convert this work experience into strong ATS-friendly bullet points.

      ${content}

      Return only bullet points.
      `;
    }

    if (type === "project") {
      prompt = `
      Improve this project description.

      ${content}

      Return 3-4 strong resume bullet points.
      `;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return res.status(200).json({
      result: response.text,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  enhanceContent,
};