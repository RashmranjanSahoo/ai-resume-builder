import React from "react";
import { Plus, Trash2, GraduationCap } from "lucide-react";

const EducationForm = ({ data, onChange }) => {

  const addEducation = () => {
    onChange([
      ...data,
      {
        institute: "",
        degree: "",
        cgpa: "",
        startYear: "",
        endYear: "",
      },
    ]);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <GraduationCap className="size-5" />
            Education
          </h3>
          <p className="text-sm text-gray-500">
            Add your educational qualifications
          </p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {data.map((edu, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">
              Education #{index + 1}
            </h4>

            {data.length > 1 && (
              <button
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Institute Name"
            value={edu.institute}
            onChange={(e) =>
              updateEducation(index, "institute", e.target.value)
            }
            className="w-full border rounded-lg p-3 text-sm"
          />

          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) =>
              updateEducation(index, "degree", e.target.value)
            }
            className="w-full border rounded-lg p-3 text-sm"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Start Year"
              value={edu.startYear}
              onChange={(e) =>
                updateEducation(index, "startYear", e.target.value)
              }
              className="border rounded-lg p-3 text-sm"
            />

            <input
              type="text"
              placeholder="End Year"
              value={edu.endYear}
              onChange={(e) =>
                updateEducation(index, "endYear", e.target.value)
              }
              className="border rounded-lg p-3 text-sm"
            />
          </div>

          <input
            type="text"
            placeholder="CGPA / Percentage"
            value={edu.cgpa}
            onChange={(e) =>
              updateEducation(index, "cgpa", e.target.value)
            }
            className="w-full border rounded-lg p-3 text-sm"
          />
        </div>
      ))}
    </div>
  );
};

export default EducationForm;