import React from "react";
import { Plus, Trash2, Star } from "lucide-react";

const PositionsOfResponsibilityForm = ({
  data = [],
  onChange,
}) => {
  const updatePOR = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const addPOR = () => {
    onChange([
      ...data,
      {
        title: "",
        organization: "",
        description: [""],
      },
    ]);
  };

  const removePOR = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const addBullet = (porIndex) => {
    const updated = [...data];

    if (!Array.isArray(updated[porIndex].description)) {
      updated[porIndex].description = [];
    }

    updated[porIndex].description.push("");
    onChange(updated);
  };

  const updateBullet = (
    porIndex,
    bulletIndex,
    value
  ) => {
    const updated = [...data];

    if (!Array.isArray(updated[porIndex].description)) {
      updated[porIndex].description = [];
    }

    updated[porIndex].description[bulletIndex] = value;

    onChange(updated);
  };

  const removeBullet = (
    porIndex,
    bulletIndex
  ) => {
    const updated = [...data];

    if (!Array.isArray(updated[porIndex].description)) {
      updated[porIndex].description = [];
    }

    updated[porIndex].description =
      updated[porIndex].description.filter(
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
            <Star className="size-5" />
            Positions of Responsibility
          </h3>
          <p className="text-sm text-gray-500">
            Add leadership roles, committees, and responsibilities
          </p>
        </div>

        <button
          onClick={addPOR}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {data.map((por, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">
              Position #{index + 1}
            </h4>

            {data.length > 1 && (
              <button
                onClick={() => removePOR(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Position Title"
            value={por.title || ""}
            onChange={(e) =>
              updatePOR(
                index,
                "title",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3 text-sm"
          />

          <input
            type="text"
            placeholder="Organization"
            value={por.organization || ""}
            onChange={(e) =>
              updatePOR(
                index,
                "organization",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3 text-sm"
          />

          {/* Description */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="font-medium text-sm">
                Responsibilities
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
              {(Array.isArray(por.description)
                ? por.description
                : []
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
                    placeholder="Led a team of 50 students and organized university events..."
                    className="flex-1 border rounded-lg p-3 text-sm resize-none"
                  />

                  {(Array.isArray(
                    por.description
                  )
                    ? por.description.length
                    : 0) > 1 && (
                    <button
                      onClick={() =>
                        removeBullet(
                          index,
                          bulletIndex
                        )
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

export default PositionsOfResponsibilityForm;