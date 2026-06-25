import React from "react";
import { Trophy, Plus, Trash2 } from "lucide-react";

// Dynamic list editor for achievement entries in the resume.
const AchievementsForm = ({ data = [], onChange }) => {
    const addAchievement = () => {
        onChange([
            ...data,
            {
                title: "",
                description: "",
                link: "",
            },
        ]);
    };

    const updateAchievement = (index, field, value) => {
        const updated = [...data];
        updated[index][field] = value;
        onChange(updated);
    };

    const removeAchievement = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (<div className="space-y-6">
        {/* Header */} <div className="flex justify-between items-center"> <div> <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900"> <Trophy className="size-5" />
            Achievements </h3> <p className="text-sm text-gray-500">
                Showcase awards, rankings, competitions, scholarships, and notable accomplishments. </p> </div>

            
            <button
                onClick={addAchievement}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                <Plus className="size-4" />
                Add
            </button>
        </div>

        {data.map((achievement, index) => (
            <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4"
            >
                <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-700">
                        Achievement #{index + 1}
                    </h4>

                    {data.length > 1 && (
                        <button
                            onClick={() => removeAchievement(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="size-4" />
                        </button>
                    )}
                </div>

                <input
                    type="text"
                    placeholder="Achievement Title"
                    value={achievement.title || ""}
                    onChange={(e) =>
                        updateAchievement(index, "title", e.target.value)
                    }
                    className="w-full border rounded-lg p-3 text-sm"
                />

                <textarea
                    rows={3}
                    placeholder="Describe your achievement..."
                    value={achievement.description || ""}
                    onChange={(e) =>
                        updateAchievement(index, "description", e.target.value)
                    }
                    className="w-full border rounded-lg p-3 text-sm resize-none"
                />

                <input
                    type="url"
                    placeholder="Proof / Certificate Link (Optional)"
                    value={achievement.link || ""}
                    onChange={(e) =>
                        updateAchievement(index, "link", e.target.value)
                    }
                    className="w-full border rounded-lg p-3 text-sm"
                />
            </div>
        ))}
    </div>


    );
};

export default AchievementsForm;
