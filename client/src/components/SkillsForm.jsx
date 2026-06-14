
import { Code2 } from "lucide-react";

const SkillsForm = ({ data, onChange }) => {

  const updateField = (field, value) => {
    onChange({
      ...data,
      [field]: value.split(",").map(item => item.trim()).filter(Boolean),
    });
  };

  return (
    <div className="space-y-6">

      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Code2 className="size-5" />
          Technical Skills
        </h3>

        <p className="text-sm text-gray-500">
          Enter skills separated by commas
        </p>
      </div>

      {/* Languages */}
      <div>
        <label className="block mb-2 font-medium text-sm text-gray-700">
          Programming Languages
        </label>

        <input
          type="text"
          value={data.languages?.join(", ") || ""}
          onChange={(e) =>
            updateField("languages", e.target.value)
          }
          placeholder="C++, Java, Python, JavaScript"
          className="w-full border rounded-lg p-3 text-sm focus:ring focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Frameworks */}
      <div>
        <label className="block mb-2 font-medium text-sm text-gray-700">
          Frameworks & Libraries
        </label>

        <input
          type="text"
          value={data.frameworks?.join(", ") || ""}
          onChange={(e) =>
            updateField("frameworks", e.target.value)
          }
          placeholder="React, Node.js, Express, Tailwind CSS"
          className="w-full border rounded-lg p-3 text-sm focus:ring focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Databases */}
      <div>
        <label className="block mb-2 font-medium text-sm text-gray-700">
          Databases
        </label>

        <input
          type="text"
          value={data.databases?.join(", ") || ""}
          onChange={(e) =>
            updateField("databases", e.target.value)
          }
          placeholder="MongoDB, MySQL, PostgreSQL"
          className="w-full border rounded-lg p-3 text-sm focus:ring focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Tools */}
      <div>
        <label className="block mb-2 font-medium text-sm text-gray-700">
          Tools & Platforms
        </label>

        <input
          type="text"
          value={data.tools?.join(", ") || ""}
          onChange={(e) =>
            updateField("tools", e.target.value)
          }
          placeholder="Git, GitHub, VS Code, Postman"
          className="w-full border rounded-lg p-3 text-sm focus:ring focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Core Subjects */}
      <div>
        <label className="block mb-2 font-medium text-sm text-gray-700">
          Core Subjects
        </label>

        <input
          type="text"
          value={data.coreSubjects?.join(", ") || ""}
          onChange={(e) =>
            updateField("coreSubjects", e.target.value)
          }
          placeholder="DBMS, OS, CN, OOPs"
          className="w-full border rounded-lg p-3 text-sm focus:ring focus:ring-blue-500 outline-none"
        />
      </div>

    </div>
  );
};

export default SkillsForm;