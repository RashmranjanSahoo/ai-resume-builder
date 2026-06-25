import * as pdfjsLib from "pdfjs-dist";

// ✅ FIX: Use a working CDN or local path
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

/**
 * Extract text from PDF file
 */
// Reads each page of the uploaded PDF and joins all text into one string.
export const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = "";
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => item.str || "")
        .join(" ");
      fullText += pageText + "\n";
    }
    
    return fullText.trim();
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    throw new Error("Failed to extract text from PDF. Make sure the file is a valid PDF.");
  }
};

/**
 * Parse resume text with AI
 */
// Sends the raw PDF text to the backend AI endpoint and expects structured JSON back.
export const parseResumeWithAI = async (resumeText, apiCall) => {
  try {
    const prompt = `You are a resume parser. Extract and structure the following resume text into a JSON object with this exact structure. Return ONLY valid JSON, no markdown:

{
  "personal_info": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "linkedin": "string",
    "github": "string",
    "portfolio": "string",
    "location": "string"
  },
  "professional_summary": "string",
  "education": [{"institute": "string", "degree": "string", "cgpa": "string", "startYear": "string", "endYear": "string", "description": ["string"]}],
  "experience": [{"company": "string", "role": "string", "location": "string", "startDate": "string", "endDate": "string", "isCurrent": false, "description": ["string"]}],
  "projects": [{"title": "string", "github": "string", "liveLink": "string", "techStack": ["string"], "description": ["string"], "date": "string"}],
  "achievements": [{"title": "string", "description": "string", "link": "string"}],
  "skills": {"languages": ["string"], "frameworks": ["string"], "databases": ["string"], "tools": ["string"], "coreSubjects": ["string"]},
  "certifications": [{"title": "string", "issuer": "string", "link": "string"}],
  "extracurricularActivities": [{"activity": "string", "description": "string"}],
  "positionsOfResponsibility": [{"title": "string", "organization": "string", "description": "string"}]
}

Resume Text:
${resumeText}`;

    const { data } = await apiCall.post("/api/ai/enhance", {
      type: "resume-parse",
      content: prompt,
    });

    // Parse AI response
    const parsedData = JSON.parse(data.result);
    return parsedData;
  } catch (error) {
    console.error("Error parsing resume:", error);
    throw new Error("Failed to parse resume data with AI");
  }
};

export default {
  extractTextFromPDF,
  parseResumeWithAI,
};
