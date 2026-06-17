import { User, Mail, Phone, Globe, MapPin, Image } from "lucide-react";
import { Link } from "lucide-react";
import { GitBranch } from "lucide-react";
import React from "react";

const PersonalInfo = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };
  const imageUrl =
    data?.image instanceof File
      ? URL.createObjectURL(data.image)
      : data?.image || null;

  const fields = [
    {
      key: "fullName",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
      section: "personal_info",
    },
    {
      key: "email",
      label: "Email",
      icon: Mail,
      type: "email",
      required: true,
      section: "personal_info",
    },
    {
      key: "phone",
      label: "Phone",
      icon: Phone,
      type: "text",
      required: false,
      section: "personal_info",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: Link,
      type: "text",
      placeholder: "linkedin.com/in/username",
      required: false,
      section: "personal_info",
    },
    {
      key: "github",
      label: "GitHub",
      icon: GitBranch,
      type: "text",
      placeholder: "github.com/username",
      required: false,
      section: "personal_info",
    },
    {
      key: "portfolio",
      label: "Portfolio",
      icon: Globe,
      type: "text",
      placeholder: "yourportfolio.com",
      required: false,
      section: "personal_info",
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
      placeholder: "Bhubaneswar, India",
      required: false,
      section: "personal_info",
    },
  ];
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get started with personal information
      </p>
      <div className="flex items-center gap-2">
        <label>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="user-image"
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80 transition"
            />
          ) : (
            <div className="inline-flex items-center gap-2 mt-5 text-slate-600 cursor-pointer">
              <User className="size-10 p-2.5 border rounded-full" />
              Upload User Image
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>
        {(data.image instanceof File || typeof data.image === "string") &&
          data.image && (
            <div className="flex flex-col gap-1 pl-4 text-sm">
              <p>Remove Background</p>
              <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={() => setRemoveBackground((prev) => !prev)}
                  checked={removeBackground}
                />
                <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
              </label>
            </div>
          )}
      </div>
      {fields.map((field) => {
        const Icon = field.icon;

        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              {Icon && <Icon className="size-4" />}
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              placeholder={
                field.placeholder || `Enter your ${field.label.toLowerCase()}`
              }
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfo;
