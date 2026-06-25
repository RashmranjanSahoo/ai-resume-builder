import React from "react";
import { Award, Plus, Trash2 } from "lucide-react";

// Dynamic list editor for certifications, including issuer and optional proof link.
const CertificationsForm = ({ data = [], onChange }) => {
  const addCertification = () => {
    onChange([
      ...data,
      {
        title: "",
        issuer: "",
        link: "",
      },
    ]);
  };

  const updateCertification = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const removeCertification = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Award className="size-5" />
            Certifications
          </h3>
          <p className="text-sm text-gray-500">
            Add certifications, courses, and professional credentials
          </p>
        </div>

        <button
          onClick={addCertification}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {data.map((cert, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">
              Certification #{index + 1}
            </h4>

            {data.length > 1 && (
              <button
                onClick={() => removeCertification(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Certification Name"
            value={cert.title || ""}
            onChange={(e) =>
              updateCertification(index, "title", e.target.value)
            }
            className="w-full border rounded-lg p-3 text-sm"
          />

          <input
            type="text"
            placeholder="Issuing Organization"
            value={cert.issuer || ""}
            onChange={(e) =>
              updateCertification(index, "issuer", e.target.value)
            }
            className="w-full border rounded-lg p-3 text-sm"
          />

          <input
            type="url"
            placeholder="Certificate Link (Optional)"
            value={cert.link || ""}
            onChange={(e) =>
              updateCertification(index, "link", e.target.value)
            }
            className="w-full border rounded-lg p-3 text-sm"
          />
        </div>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-3">
            No certifications added yet
          </p>
          <button
            onClick={addCertification}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Plus className="size-4" />
            Add First Certification
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;
