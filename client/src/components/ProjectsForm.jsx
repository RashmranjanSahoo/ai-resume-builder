import React from "react";
import { Plus, Trash2 } from "lucide-react";

const ProjectsForm = ({
    data = [],
    onChange,
}) => {
    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index][field] = value;
        onChange(updated);
    };

    const addProject = () => {
        onChange([
            ...data,
            {
                title: "",
                github: "",
                techStack: [],
                description: [""],
                date: "",
            },
        ]);
    };

    const removeProject = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const addBullet = (projectIndex) => {
    const updated = [...data];

    if (!Array.isArray(updated[projectIndex].description)) {
        updated[projectIndex].description = [
            updated[projectIndex].description || "",
        ];
    }

    updated[projectIndex].description.push("");
    onChange(updated);
};

    const updateBullet = (projectIndex, bulletIndex, value) => {
    const updated = [...data];

    if (!Array.isArray(updated[projectIndex].description)) {
        updated[projectIndex].description = [
            updated[projectIndex].description || "",
        ];
    }

    updated[projectIndex].description[bulletIndex] = value;
    onChange(updated);
};

   const removeBullet = (projectIndex, bulletIndex) => {
    const updated = [...data];

    if (!Array.isArray(updated[projectIndex].description)) {
        updated[projectIndex].description = [
            updated[projectIndex].description || "",
        ];
    }

    updated[projectIndex].description =
        updated[projectIndex].description.filter(
            (_, i) => i !== bulletIndex
        );

    onChange(updated);
};

    return (<div className="space-y-6">
        {data.map((project, index) => (<div
            key={index}
            className="border border-gray-200 rounded-lg p-4 space-y-4"
        > <div className="flex justify-between items-center"> <h3 className="font-semibold text-lg">
            Project {index + 1} </h3>

                ```
                {data.length > 1 && (
                    <button
                        onClick={() => removeProject(index)}
                        className="text-red-500"
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>

            <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) =>
                    updateProject(index, "title", e.target.value)
                }
                className="w-full border rounded-lg p-2"
            />

            <input
                type="text"
                placeholder="GitHub Link"
                value={project.github}
                onChange={(e) =>
                    updateProject(index, "github", e.target.value)
                }
                className="w-full border rounded-lg p-2"
            />

            <input
                type="text"
                placeholder="Tech Stack (React, Node.js, MongoDB)"
                value={project.techStack?.join(", ") || ""}
                onChange={(e) =>
                    updateProject(
                        index,
                        "techStack",
                        e.target.value
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean)
                    )
                }
                className="w-full border rounded-lg p-2"
            />

            <input
                type="text"
                placeholder="Date (June 2025)"
                value={project.date}
                onChange={(e) =>
                    updateProject(index, "date", e.target.value)
                }
                className="w-full border rounded-lg p-2"
            />

            <div>
                <label className="font-medium text-sm">
                    Description Points
                </label>

                <div className="space-y-2 mt-2">
                    {(Array.isArray(project.description)
                        ? project.description
                        : [project.description || ""]).map(
                            (point, bulletIndex) => (<div
                                key={bulletIndex}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={point}
                                    placeholder="Achievement / Feature"
                                    onChange={(e) =>
                                        updateBullet(
                                            index,
                                            bulletIndex,
                                            e.target.value
                                        )
                                    }
                                    className="flex-1 border rounded-lg p-2"
                                />

                                <button
                                    onClick={() =>
                                        removeBullet(index, bulletIndex)
                                    }
                                    className="text-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            ))}
                </div>

                <button
                    onClick={() => addBullet(index)}
                    className="mt-2 text-blue-600 text-sm"
                >
                    + Add Bullet Point
                </button>
            </div>
        </div>
        ))}

        <button
            onClick={addProject}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
            <Plus size={16} />
            Add Project
        </button>
    </div>


    );
};

export default ProjectsForm;
