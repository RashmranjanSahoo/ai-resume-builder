import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  Share2Icon,
} from "lucide-react";
import {
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Code2,
  Trophy,
  Award,
  Star,
  BookOpen,
} from "lucide-react";
import PersonalInfo from "../components/PersonalInfo";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import EducationForm from "../components/EducationForm";
import ExperienceForm from "../components/ExperienceForm";
import ProjectsForm from "../components/ProjectsForm";
import AchievementsForm from "../components/AchievementsForm";
import ExtraCurricularForm from "../components/ExtraCurricularForm";
import CertificationForm from "../components/CertificationForm";
import SkillsForm from "../components/SkillsForm";
import PositionForm from "../components/PositionForm";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",

    // Header Section
    personal_info: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      portfolio: "",
      location: "",
      image: null,
    },

    // Education
    education: [
      {
        institute: "",
        degree: "",
        cgpa: "",
        startYear: "",
        endYear: "",
        description: [""],
      },
    ],

    // Experience
    experience: [
      {
        company: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: [],
      },
    ],

    // Projects
    projects: [
      {
        title: "",
        github: "",
        liveLink: "",
        techStack: [],
        description: [],
        date: "",
      },
    ],

    // Achievements
    achievements: [
      {
        title: "",
        description: "",
        link: "",
      },
    ],

    // Technical Skills
    skills: {
      languages: [],
      frameworks: [],
      databases: [],
      tools: [],
      coreSubjects: [],
    },

    // Positions of Responsibility
    positionsOfResponsibility: [
      {
        title: "",
        organization: "",
        description: "",
      },
    ],

    // Extra Curricular Activities
    extracurricularActivities: [
      {
        activity: "",
        description: "",
      },
    ],

    // Certifications
    certifications: [
      {
        title: "",
        issuer: "",
        link: "",
      },
    ],

    // Professional Summary (optional)
    professional_summary: "",

    // Template
    template: "nit-trichy",

    // Settings
    accent_color: "#3B82F6",
    public: false,

    createdAt: "",
    updatedAt: "",
  });

  // Replace loadExistingResume with this
  const loadExistingResume = async () => {
  try {
    const { data } = await api.get(`/api/resumes/get/${resumeId}`);
    const resume = data.resume;
    const nested = resume.resumeData || {};

    // ✅ Merge DB data with initial state as fallback
    setResumeData((prev) => ({
      ...prev,           // initial state as base (all empty fields)
      ...resume,         // top level fields (title, template, accent_color, public)
      ...nested,         // nested resumeData fields (personal_info, education etc)
    }));

    document.title = resume.title;

  } catch (error) {
    console.log("Failed to load resume:", error.message);
  }
};


  useEffect(() => {
    loadExistingResume();
  }, []);

  const [ActiveSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    {
      id: "personal_info",
      name: "Personal Info",
      icon: User,
    },

    ...(resumeData.template !== "nit-trichy"
      ? [
          {
            id: "summary",
            name: "Professional Summary",
            icon: BookOpen,
          },
        ]
      : []),

    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
    },
    {
      id: "experience",
      name: "Experience",
      icon: Briefcase,
    },
    {
      id: "projects",
      name: "Projects",
      icon: FolderGit2,
    },
    {
      id: "skills",
      name: "Technical Skills",
      icon: Code2,
    },
    {
      id: "achievements",
      name: "Achievements",
      icon: Trophy,
    },
    {
      id: "positionsOfResponsibility",
      name: "Positions of Responsibility",
      icon: Star,
    },
    {
      id: "extracurricularActivities",
      name: "Extra Curricular",
      icon: BookOpen,
    },
    {
      id: "certifications",
      name: "Certifications",
      icon: Award,
    },
  ];

  const ActiveSection = sections?.[ActiveSectionIndex] || sections[0];

  const changeResumeVisibility = async () => {
    const updated = { ...resumeData, public: !resumeData.public };
    setResumeData(updated);

    // Save visibility change to DB immediately
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updated));
      formData.append("removeBackground", false);
      await api.put("/api/resumes/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(
        updated.public ? "Resume is now public" : "Resume is now private",
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else alert("share not supported on this browser");
  };

  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
  try {
    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("removeBackground", removeBackground);

    const resumeDataCopy = { ...resumeData };
    if (resumeData.personal_info?.image instanceof File) {
      formData.append("image", resumeData.personal_info.image);
      resumeDataCopy.personal_info = {
        ...resumeData.personal_info,
        image: null,
      };
    }

    formData.append("resumeData", JSON.stringify(resumeDataCopy));

    const { data } = await api.put("/api/resumes/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // ✅ Flatten after save too
    const resume = data.resume;
    const flat = { ...resume, ...(resume.resumeData || {}) };
    setResumeData(flat);
    toast.success("Resume saved!");

  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeft className="size-4" />
          Back To DashBoard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/*Left panel form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/*Progress bar using ActiveSectionindex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                style={{
                  width: `${(ActiveSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />
              {/*Section Navigation*/}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center">
                  {ActiveSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0),
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-l text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={ActiveSectionIndex === 0}
                    >
                      {" "}
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1),
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-l text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${ActiveSectionIndex === sections.length - 1 && "opacity-50"}`}
                    disabled={ActiveSectionIndex === sections.length - 1}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
              {/*form content */}
              <div className="space-y-6">
                {ActiveSection.id === "personal_info" &&
                  resumeData.personal_info && (
                    <PersonalInfo
                      data={resumeData.personal_info}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal_info: data,
                        }))
                      }
                      removeBackground={removeBackground}
                      setRemoveBackground={setRemoveBackground}
                    />
                  )}
                {ActiveSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {ActiveSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {ActiveSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {ActiveSection.id === "projects" && (
                  <ProjectsForm
                    data={resumeData.projects}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        projects: data,
                      }))
                    }
                  />
                )}

                {ActiveSection.id === "skills" && (
  <SkillsForm
    data={resumeData.skills || {  // ✅ fallback if skills is undefined
      languages: [],
      frameworks: [],
      databases: [],
      tools: [],
      coreSubjects: [],
    }}
    onChange={(data) =>
      setResumeData((prev) => ({ ...prev, skills: data }))
    }
  />
)}

                {ActiveSection.id === "achievements" && (
                  <AchievementsForm
                    data={resumeData.achievements}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        achievements: data,
                      }))
                    }
                  />
                )}

                {ActiveSection.id === "positionsOfResponsibility" && (
                  <PositionForm
                    data={resumeData.positionsOfResponsibility}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        positionsOfResponsibility: data,
                      }))
                    }
                  />
                )}

                {ActiveSection.id === "extracurricularActivities" && (
                  <ExtraCurricularForm
                    data={resumeData.extracurricularActivities}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        extracurricularActivities: data,
                      }))
                    }
                  />
                )}

                {ActiveSection.id === "certifications" && (
                  <CertificationForm
                    data={resumeData.certifications}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        certifications: data,
                      }))
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/*Right panel form */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 
                  rounded-lg ring-blue-300 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}
                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200
                text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? "public" : "private"}
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600
                rounded-lg ring-green-300 hover:ring transition-colors"
                >
                  <DownloadIcon className="size-4" />
                  Download
                </button>
                <button
                  onClick={saveResume}
                  className="flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                >
                  Save
                </button>
              </div>
              {/*---Buttons---*/}
            </div>
            {/*---Resume-Preview---*/}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
