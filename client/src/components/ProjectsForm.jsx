import React, { useState } from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import api from "../configs/api";

const autoResize = (e) => {
  e.target.style.height = "auto";
  e.target.style.height = e.target.scrollHeight + "px";
};

const ProjectsForm = ({ data = [], onChange }) => {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (projectIndex, bulletIndex, val) => {
    setLoadingStates((prev) => ({
      ...prev,
      [`${projectIndex}-${bulletIndex}`]: val,
    }));
  };

  const isLoading = (projectIndex, bulletIndex) =>
    !!loadingStates[`${projectIndex}-${bulletIndex}`];

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
    updated[projectIndex].description = updated[
      projectIndex
    ].description.filter((_, i) => i !== bulletIndex);
    onChange(updated);
  };

  // ✅ New version - calls your backend
  const handleEnhanceBullet = async (projectIndex, bulletIndex) => {
  const project = data[projectIndex];
  const bullet = project.description[bulletIndex];
  if (!bullet?.trim()) return;

  setLoading(projectIndex, bulletIndex, true);
  try {
    const { data: aiData } = await api.post("/api/ai/enhance", {
      type: "project",
      content: `Project: ${project.title}. Tech: ${project.techStack?.join(", ")}. Bullet: ${bullet}`,
    });
    updateBullet(projectIndex, bulletIndex, aiData.result);
  } catch (err) {
    console.error("AI enhance failed:", err);
  } finally {
    setLoading(projectIndex, bulletIndex, false);
  }
};

  return (
    <div className="space-y-6">
      {data.map((project, projectIndex) => (
        <div
          key={projectIndex}
          className="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">
              Project {projectIndex + 1}
            </h3>
            {data.length > 1 && (
              <button
                onClick={() => removeProject(projectIndex)}
                className="text-red-500 hover:text-red-700 transition"
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
              updateProject(projectIndex, "title", e.target.value)
            }
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="GitHub Link"
            value={project.github}
            onChange={(e) =>
              updateProject(projectIndex, "github", e.target.value)
            }
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Tech Stack (React, Node.js, MongoDB)"
            value={project.techStack?.join(", ") || ""}
            onChange={(e) =>
              updateProject(
                projectIndex,
                "techStack",
                e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Date (June 2025)"
            value={project.date}
            onChange={(e) =>
              updateProject(projectIndex, "date", e.target.value)
            }
            className="w-full border rounded-lg p-2"
          />

          {/* Description Bullets */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium text-sm">Description Points</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addBullet(projectIndex)}
                  className="text-blue-600 text-sm hover:text-blue-800 transition"
                >
                  + Add Bullet
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {(Array.isArray(project.description)
                ? project.description
                : [project.description || ""]
              ).map((point, bulletIndex) => (
                <div
                  key={bulletIndex}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Textarea — no scrollbar, auto-grows */}
                  <textarea
                    rows={3}
                    value={point}
                    onChange={(e) => {
                      autoResize(e);
                      updateBullet(projectIndex, bulletIndex, e.target.value);
                    }}
                    onFocus={autoResize}
                    placeholder="Achievement / Feature"
                    className="w-full px-3 pt-3 pb-2 text-sm bg-transparent border-none outline-none resize-none"
                    style={{ overflow: "hidden", minHeight: "80px" }}
                  />

                  {/* Footer: AI Enhance left, Delete right */}
                  <div className="flex justify-between items-center px-2 pb-2 pt-1 border-t border-gray-100">
                    <button
                      onClick={() =>
                        handleEnhanceBullet(projectIndex, bulletIndex)
                      }
                      disabled={
                        isLoading(projectIndex, bulletIndex) || !point?.trim()
                      }
                      className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isLoading(projectIndex, bulletIndex) ? (
                        <svg
                          className="animate-spin size-3"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                      ) : (
                        <Sparkles className="size-3" />
                      )}
                      {isLoading(projectIndex, bulletIndex)
                        ? "Enhancing..."
                        : "AI Enhance"}
                    </button>

                    {project.description.length > 1 && (
                      <button
                        onClick={() => removeBullet(projectIndex, bulletIndex)}
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

      <button
        onClick={addProject}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <Plus size={16} />
        Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;
