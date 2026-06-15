import React, { useState } from "react";
import { Briefcase, Plus, Trash2, Sparkles } from "lucide-react";

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // 🔑 Replace with your key

const enhanceBullet = async (bullet, context) => {
    const prompt = `You are an expert resume writer. Enhance the following resume bullet point for a ${context.role || "professional"} at ${context.company || "a company"}. 
Make it more impactful using strong action verbs, quantifiable results where possible, and concise language. 
Return ONLY the enhanced bullet point text, nothing else.

Bullet: "${bullet}"`;

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
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || bullet;
};

const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
};

const ExperienceForm = ({ data, onChange }) => {
    const [loadingStates, setLoadingStates] = useState({});

    const setLoading = (expIndex, bulletIndex, val) => {
        setLoadingStates((prev) => ({
            ...prev,
            [`${expIndex}-${bulletIndex}`]: val,
        }));
    };

    const isLoading = (expIndex, bulletIndex) =>
        !!loadingStates[`${expIndex}-${bulletIndex}`];

    const addExperience = () => {
        onChange([
            ...data,
            {
                company: "",
                role: "",
                location: "",
                startDate: "",
                endDate: "",
                isCurrent: false,
                description: [""],
            },
        ]);
    };

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index][field] = value;
        onChange(updated);
    };

    const removeExperience = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const addBullet = (expIndex) => {
        const updated = [...data];
        if (!Array.isArray(updated[expIndex].description)) {
            updated[expIndex].description = [updated[expIndex].description || ""];
        }
        updated[expIndex].description.push("");
        onChange(updated);
    };

    const updateBullet = (expIndex, bulletIndex, value) => {
        const updated = [...data];
        updated[expIndex].description[bulletIndex] = value;
        onChange(updated);
    };

    const removeBullet = (expIndex, bulletIndex) => {
        const updated = [...data];
        updated[expIndex].description = updated[expIndex].description.filter(
            (_, i) => i !== bulletIndex
        );
        onChange(updated);
    };

    const handleEnhanceBullet = async (expIndex, bulletIndex) => {
        const exp = data[expIndex];
        const bullet = exp.description[bulletIndex];
        if (!bullet?.trim()) return;

        setLoading(expIndex, bulletIndex, true);
        try {
            const enhanced = await enhanceBullet(bullet, {
                role: exp.role,
                company: exp.company,
            });
            updateBullet(expIndex, bulletIndex, enhanced);
        } catch (err) {
            console.error("AI enhance failed:", err);
        } finally {
            setLoading(expIndex, bulletIndex, false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <Briefcase className="size-5" />
                        Experience
                    </h3>
                    <p className="text-sm text-gray-500">
                        Add your internships, jobs, and work experience
                    </p>
                </div>
                <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus className="size-4" />
                    Add
                </button>
            </div>

            {data.map((exp, expIndex) => (
                <div
                    key={expIndex}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">
                            Experience #{expIndex + 1}
                        </h4>
                        {data.length > 1 && (
                            <button
                                onClick={() => removeExperience(expIndex)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        )}
                    </div>

                    <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => updateExperience(expIndex, "company", e.target.value)}
                        className="w-full border rounded-lg p-3 text-sm"
                    />

                    <input
                        type="text"
                        placeholder="Role / Position"
                        value={exp.role}
                        onChange={(e) => updateExperience(expIndex, "role", e.target.value)}
                        className="w-full border rounded-lg p-3 text-sm"
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) => updateExperience(expIndex, "location", e.target.value)}
                        className="w-full border rounded-lg p-3 text-sm"
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(expIndex, "startDate", e.target.value)}
                            className="border rounded-lg p-3 text-sm"
                        />
                        {!exp.isCurrent && (
                            <input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(expIndex, "endDate", e.target.value)}
                                className="border rounded-lg p-3 text-sm"
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={exp.isCurrent || false}
                            onChange={(e) => updateExperience(expIndex, "isCurrent", e.target.checked)}
                        />
                        <label className="text-sm text-gray-700">I currently work here</label>
                    </div>

                    {/* Description Bullets */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="font-medium text-sm">
                                Responsibilities / Achievements
                            </label>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => addBullet(expIndex)}
                                    className="text-blue-600 text-sm hover:text-blue-800 transition"
                                >
                                    + Add Bullet
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {(Array.isArray(exp.description)
                                ? exp.description
                                : [exp.description || ""]
                            ).map((bullet, bulletIndex) => (
                                <div
                                    key={bulletIndex}
                                    className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                                >
                                    {/* Textarea — no scrollbar, auto-grows */}
                                    <textarea
                                        rows={3}
                                        value={bullet}
                                        onChange={(e) => {
                                            autoResize(e);
                                            updateBullet(expIndex, bulletIndex, e.target.value);
                                        }}
                                        onFocus={autoResize}
                                        placeholder="Built a responsive web application using React and Node.js..."
                                        className="w-full px-3 pt-3 pb-2 text-sm bg-transparent border-none outline-none resize-none"
                                        style={{ overflow: "hidden", minHeight: "80px" }}
                                    />

                                    {/* Footer: AI Enhance left, Delete right */}
                                    <div className="flex justify-between items-center px-2 pb-2 pt-1 border-t border-gray-100">
                                        <button
                                            onClick={() => handleEnhanceBullet(expIndex, bulletIndex)}
                                            disabled={isLoading(expIndex, bulletIndex) || !bullet?.trim()}
                                            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            {isLoading(expIndex, bulletIndex) ? (
                                                <svg className="animate-spin size-3" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                            ) : (
                                                <Sparkles className="size-3" />
                                            )}
                                            {isLoading(expIndex, bulletIndex) ? "Enhancing..." : "AI Enhance"}
                                        </button>

                                        {exp.description.length > 1 && (
                                            <button
                                                onClick={() => removeBullet(expIndex, bulletIndex)}
                                                className="text-red-400 hover:text-red-600 transition"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExperienceForm;