import React from "react";
import { BookOpen, Plus, Trash2 } from "lucide-react";

// Captures extra-curricular activities that can strengthen a student resume.
const ExtraCurricularForm = ({
  data = [],
  onChange,
}) => {
  const addActivity = () => {
    onChange([
      ...data,
      {
        activity: "",
        description: "",
      },
    ]);
  };

  const updateActivity = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const removeActivity = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <BookOpen className="size-5" />
            Extra Curricular Activities
          </h3>
          <p className="text-sm text-gray-500">
            Add sports, volunteering, clubs, competitions and other activities
          </p>
        </div>

        <button
          onClick={addActivity}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {data.map((activity, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium">
              Activity #{index + 1}
            </h4>

            {data.length > 1 && (
              <button
                onClick={() => removeActivity(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Activity Name"
            value={activity.activity || ""}
            onChange={(e) =>
              updateActivity(
                index,
                "activity",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3 text-sm"
          />

          <textarea
            rows={3}
            placeholder="Description"
            value={activity.description || ""}
            onChange={(e) =>
              updateActivity(
                index,
                "description",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3 text-sm resize-none"
          />
        </div>
      ))}
    </div>
  );
};

export default ExtraCurricularForm;
