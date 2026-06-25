import { Sparkles } from "lucide-react";
import React, { useState } from "react";

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // 🔑 Replace with your key

// Single-field editor for the resume summary shown near the top of templates.
const ProfessionalSummaryForm = ({ data, onChange }) => {
    const [loading, setLoading] = useState(false);

    const handleAIEnhance = async () => {
        if (!data?.trim()) return;
        setLoading(true);
        try {
            const prompt = `You are an expert resume writer. Enhance the following professional summary to make it more compelling, concise, and impactful. Use strong language that highlights key strengths and career objectives. Return ONLY the enhanced summary text, nothing else.

Summary: "${data}"`;

            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                    }),
                }
            );
            const result = await res.json();
            const enhanced =
                result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            if (enhanced) onChange(enhanced);
        } catch (err) {
            console.error("AI enhance failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        Professional Summary
                    </h3>
                    <p className="text-sm text-gray-500">
                        Add a summary for your resume here
                    </p>
                </div>
                <button
                    onClick={handleAIEnhance}
                    disabled={loading || !data?.trim()}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    ) : (
                        <Sparkles className="size-4" />
                    )}
                    {loading ? "Enhancing..." : "AI Enhance"}
                </button>
            </div>

            <div className="mt-6">
                <textarea
                    value={data || ""}
                    rows={7}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-3 px-4 mt-4 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    placeholder="Write a compelling professional summary that highlights your key strengths and career objectives"
                />
                <p className="text-sm text-gray-500 mt-1">
                    Tip: Keep it concise (3–4 sentences) and focus on your most relevant achievements and skills.
                </p>
            </div>
        </div>
    );
};

export default ProfessionalSummaryForm;
