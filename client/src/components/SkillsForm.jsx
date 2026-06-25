import { useState, useEffect } from "react";
import { Code2 } from "lucide-react";

// Groups skills by category so templates can render them in a clean structure.
const SkillsForm = ({ data, onChange }) => {
  const safeData = {
    languages: [],
    frameworks: [],
    databases: [],
    tools: [],
    coreSubjects: [],
    ...data,
  };

  // Store raw input strings locally so commas don't get eaten mid-type
  const [raw, setRaw] = useState({
    languages: safeData.languages.join(", "),
    frameworks: safeData.frameworks.join(", "),
    databases: safeData.databases.join(", "),
    tools: safeData.tools.join(", "),
    coreSubjects: safeData.coreSubjects.join(", "),
  });

  // Sync if parent data changes externally (e.g. on load)
  useEffect(() => {
    setRaw({
      languages: safeData.languages.join(", "),
      frameworks: safeData.frameworks.join(", "),
      databases: safeData.databases.join(", "),
      tools: safeData.tools.join(", "),
      coreSubjects: safeData.coreSubjects.join(", "),
    });
  }, [data]);

  const handleChange = (field, value) => {
    setRaw(prev => ({ ...prev, [field]: value }));
  };

  // Only parse and push to parent when user leaves the field
  const handleBlur = (field, value) => {
    onChange({
      ...safeData,
      [field]: value.split(",").map(item => item.trim()).filter(Boolean),
    });
  };

  const fields = [
    { key: "languages", label: "Programming Languages", placeholder: "C++, Java, Python, JavaScript" },
    { key: "frameworks", label: "Frameworks & Libraries", placeholder: "React, Node.js, Express, Tailwind CSS" },
    { key: "databases", label: "Databases", placeholder: "MongoDB, MySQL, PostgreSQL" },
    { key: "tools", label: "Tools & Platforms", placeholder: "Git, GitHub, VS Code, Postman" },
    { key: "coreSubjects", label: "Core Subjects", placeholder: "DBMS, OS, CN, OOPs" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Code2 className="size-5" />
          Technical Skills
        </h3>
        <p className="text-sm text-gray-500">Enter skills separated by commas</p>
      </div>

      {fields.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label className="block mb-2 font-medium text-sm text-gray-700">{label}</label>
          <input
            type="text"
            value={raw[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            onBlur={(e) => handleBlur(key, e.target.value)}
            placeholder={placeholder}
            className="w-full border rounded-lg p-3 text-sm focus:ring focus:ring-blue-500 outline-none"
          />
        </div>
      ))}
    </div>
  );
};

export default SkillsForm
