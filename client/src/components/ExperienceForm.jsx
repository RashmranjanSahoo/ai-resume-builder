import React from "react";
import { Briefcase, Plus, Trash2 } from "lucide-react";

const ExperienceForm = ({ data, onChange }) => {
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
            updated[expIndex].description = [
                updated[expIndex].description || "",
            ];
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
        updated[expIndex].description =
            updated[expIndex].description.filter(
                (_, i) => i !== bulletIndex
            );
        onChange(updated);
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

            {data.map((exp, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">
                            Experience #{index + 1}
                        </h4>

                        {data.length > 1 && (
                            <button
                                onClick={() => removeExperience(index)}
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
                        onChange={(e) =>
                            updateExperience(index, "company", e.target.value)
                        }
                        className="w-full border rounded-lg p-3 text-sm"
                    />

                    <input
                        type="text"
                        placeholder="Role / Position"
                        value={exp.role}
                        onChange={(e) =>
                            updateExperience(index, "role", e.target.value)
                        }
                        className="w-full border rounded-lg p-3 text-sm"
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) =>
                            updateExperience(index, "location", e.target.value)
                        }
                        className="w-full border rounded-lg p-3 text-sm"
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) =>
                                updateExperience(index, "startDate", e.target.value)
                            }
                            className="border rounded-lg p-3 text-sm"
                        />

                        {!exp.isCurrent && (
                            <input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) =>
                                    updateExperience(index, "endDate", e.target.value)
                                }
                                className="border rounded-lg p-3 text-sm"
                            />
                        )}
                    </div>
                    {/*currently working */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={exp.isCurrent || false}
                            onChange={(e) =>
                                updateExperience(index, "isCurrent", e.target.checked)
                            }
                        />
                        <label className="text-sm text-gray-700">
                            I currently work here
                        </label>
                    </div>
                    {/* Description Bullets */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="font-medium text-sm">
                                Responsibilities / Achievements
                            </label>

                            <button
                                type="button"
                                onClick={() => addBullet(index)}
                                className="text-blue-600 text-sm"
                            >
                                + Add Bullet
                            </button>
                        </div>

                        <div className="space-y-3">
                            {(Array.isArray(exp.description)
                                ? exp.description
                                : [exp.description || ""]
                            ).map((bullet, bulletIndex) => (
                                <div
                                    key={bulletIndex}
                                    className="flex gap-2 items-start"
                                >
                                    <textarea
                                        rows={2}
                                        value={bullet}
                                        onChange={(e) =>
                                            updateBullet(
                                                index,
                                                bulletIndex,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Built a responsive web application using React and Node.js..."
                                        className="flex-1 border rounded-lg p-3 text-sm resize-none"
                                    />

                                    {exp.description.length > 1 && (
                                        <button
                                            onClick={() =>
                                                removeBullet(index, bulletIndex)
                                            }
                                            className="text-red-500 mt-2"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    )}
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