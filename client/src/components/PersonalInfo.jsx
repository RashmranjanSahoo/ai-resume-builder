import { User, Mail, Phone, Globe, MapPin, Image } from "lucide-react";
import { Link } from "lucide-react";
import { GitBranch } from "lucide-react";
import React from "react";

// Edits the candidate's identity, links, contact details, and profile image.
const PersonalInfo = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    if (field === "phone") {
      // Strip all non-digits
      const digits = value.replace(/\D/g, "");

      // Remove leading 91 if user typed country code manually
      const coreDigits = digits.startsWith("91") ? digits.slice(2) : digits;

      // Cap at 10 digits
      const trimmed = coreDigits.slice(0, 10);

      // Only prepend +91- if there's any digit typed
      const formatted = trimmed.length > 0 ? "+91-" + trimmed : "";

      onChange({ ...data, [field]: formatted });
      return;
    }
    if (field === "linkedin" || field === "github" || field === "portfolio") {
      onChange({ ...data, [field]: value }); // store as-is while typing
      return;
    }

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
    },
    { key: "email", label: "Email", icon: Mail, type: "email", required: true },
    {
      key: "phone",
      label: "Phone",
      icon: Phone,
      type: "text",
      required: true,
      placeholder: "+91-XXXXXXXXXX",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: Link,
      type: "text",
      placeholder: "linkedin.com/in/username",
    },
    {
      key: "github",
      label: "GitHub",
      icon: GitBranch,
      type: "text",
      placeholder: "github.com/username",
    },
    {
      key: "portfolio",
      label: "Portfolio",
      icon: Globe,
      type: "text",
      placeholder: "yourportfolio.com",
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
      placeholder: "Bhubaneswar, India",
      required: true,
    },
  ];

  const isPhoneInvalid = (val) => val && val !== "+91-" && val.length !== 14;

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
      </div>

      {fields.map((field) => {
        const Icon = field.icon;
        const phoneInvalid =
          field.key === "phone" && isPhoneInvalid(data["phone"]);

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
              onBlur={(e) => {
                {
                  /* 👈 add here */
                }
                if (["linkedin", "github", "portfolio"].includes(field.key)) {
                  const val = e.target.value;
                  if (
                    val &&
                    !val.startsWith("http://") &&
                    !val.startsWith("https://")
                  ) {
                    handleChange(field.key, "https://" + val);
                  }
                }
              }}
              className={`mt-1 w-full px-3 py-2 border rounded-lg focus:ring outline-none transition-colors text-sm ${
                phoneInvalid
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              placeholder={
                field.placeholder || `Enter your ${field.label.toLowerCase()}`
              }
              required={field.required}
            />

            {phoneInvalid && (
              <p className="text-xs text-red-500 mt-1">
                Enter a valid 10-digit number (e.g. +91-XXXXXXXXXX)
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfo;
