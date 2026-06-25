import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  Trash,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import {
  extractTextFromPDF,
  parseResumeWithAI,
} from "../utils/resumePDFParser";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  // Colors used for resume cards so each resume feels visually distinct.
  const colors = ["#9333ea", "#de7706", "#dc2626", "#0284c7", "#16a34a"];

  // Stores all resumes loaded from the backend for this user.
  const [allResumes, setallResumes] = useState([]);

  // Modal states decide which dialog is currently visible.
  const [ShowCreateResume, setShowCreateResume] = useState(false);
  const [ShowUploadResume, setShowUploadResume] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form states are reused by create, upload, and edit title dialogs.
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);

  // This id tells the edit dialog which resume title should be updated.
  const [editResumeId, setEditResumeId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Load resumes on component mount
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resume");
      setallResumes(data.resumes);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Create Resume handler
  const createResume = async (event) => {
    try {
      event.preventDefault();

      const { data } = await api.post("/api/resumes/create", { title }); // ✅ no headers needed

      setallResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (event) => {
  event.preventDefault();
  setIsLoading(true);

  try {
    if (!resume) {
      toast.error("Please upload a PDF");
      return;
    }
    if (!title) {
      toast.error("Please enter a resume title");
      return;
    }

    // Step 1: Create empty resume
    const loadingToast = toast.loading("Creating resume...");
    const { data: resumeData } = await api.post("/api/resumes/create", {
      title,
    });
    const resumeId = resumeData.resume._id;
    toast.dismiss(loadingToast);

    // Step 2: Extract text from PDF
    const extractToast = toast.loading("Extracting text from PDF...");
    const resumeText = await extractTextFromPDF(resume);
    toast.dismiss(extractToast);

    // Step 3: Parse with AI
    const parseToast = toast.loading("Parsing resume with AI...");
    const parsedResumeData = await parseResumeWithAI(resumeText, api);
    toast.dismiss(parseToast);

    // Step 4: Save parsed data
    const saveToast = toast.loading("Saving resume data...");
    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("removeBackground", false);
    formData.append("resumeData", JSON.stringify(parsedResumeData));

    await api.put("/api/resumes/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.dismiss(saveToast);
    toast.success("✨ Resume uploaded successfully!");
    
    setTitle("");
    setResume(null);
    setShowUploadResume(false);
    setallResumes((prev) => [...prev, resumeData.resume]);
    navigate(`/app/builder/${resumeId}`);

  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    console.error("Upload error:", error);
  } finally {
    setIsLoading(false);
  }
};
  // ✅ FIXED VERSION - Fetch existing data before updating
  const editTitle = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!title.trim()) {
        toast.error("Please enter a resume title");
        return;
      }

      // ✅ CRITICAL: Fetch existing resume data first
      const { data: existingResume } = await api.get(
        `/api/resumes/get/${editResumeId}`,
      );
      const existingData = existingResume.resume;

      // ✅ Merge: Keep all existing data, only update title
      const updatedData = {
        ...existingData,
        title: title,
      };

      // Make API call with complete data
      const formData = new FormData();
      formData.append("resumeId", editResumeId);
      formData.append("resumeData", JSON.stringify(updatedData));
      formData.append("removeBackground", false);

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update local state
      setallResumes((prev) =>
        prev.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume,
        ),
      );

      toast.success("Resume title updated successfully!");
      setShowEditModal(false);
      setEditResumeId("");
      setTitle("");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // Delete Resume handler
  const deleteResume = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this resume?",
    );
    if (!confirm) return;

    try {
      // First, delete from backend
      await api.delete(`/api/resumes/delete/${id}`);

      // Then update local state
      setallResumes((prev) => prev.filter((r) => r._id !== id && r.id !== id));
      toast.success("Resume deleted successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
      <p className="text-3xl font-semibold mb-8 bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
        Welcome, {user?.name}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-6">
        {/* Create Resume */}
        <button
          onClick={() => setShowCreateResume(true)}
          className="group soft-card w-full sm:w-48 h-48 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border-dashed hover:border-indigo-500 dark:text-slate-300"
        >
          <PlusIcon className="size-12 p-2.5 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-full group-hover:scale-110 transition-all duration-300" />

          <p className="font-medium group-hover:text-indigo-600 transition-all duration-300">
            Create Resume
          </p>
        </button>

        {/* Upload Existing Resume */}
        <button
          onClick={() => setShowUploadResume(true)}
          className="group soft-card w-full sm:w-48 h-48 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border-dashed hover:border-purple-500 dark:text-slate-300"
        >
          <UploadCloudIcon className="size-12 p-2.5 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-full group-hover:scale-110 transition-all duration-300" />

          <p className="font-medium group-hover:text-purple-600 transition-all duration-300">
            Upload Existing
          </p>
        </button>
      </div>

      <hr className="border-slate-200 my-8 max-w-[420px] dark:border-white/10" />

      {/* Resume Cards */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResumes.map((resume, index) => {
          // Rotate colors across cards
          const basecolor = colors[index % colors.length];

          return (
            <button
              key={resume.id || index}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-2 border group overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
              style={{
                background: `linear-gradient(135deg,${basecolor}10, ${basecolor}40)`,
                borderColor: basecolor + "40",
              }}
            >
              <FilePenLineIcon
                className="size-7 group-hover:scale-105 transition-all"
                style={{ color: basecolor }}
              />

              <p
                className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                style={{ color: basecolor }}
              >
                {resume.title}
              </p>

              <p
                className="absolute bottom-1 text-[11px] transition-all duration-300 px-2 text-center"
                style={{ color: basecolor + "90" }}
              >
                updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              {/* Edit/Delete Actions */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-1 right-1 group-hover:flex items-center hidden rounded-full bg-white/70 backdrop-blur dark:bg-slate-950/60"
              >
                <Trash
                  className="size-7 p-1.5 hover:bg-white/70 rounded text-slate-700 transition-colors dark:text-slate-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResume(resume._id || resume.id);
                  }}
                />

                <PencilIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditResumeId(resume._id || resume.id);
                    setTitle(resume.title);
                    setShowEditModal(true);
                  }}
                  className="size-7 p-1.5 hover:bg-white/70 rounded text-slate-700 transition-colors dark:text-slate-100"
                />
              </div>
            </button>
          );
        })}

        {/* Create Resume Modal */}
        {ShowCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center px-4"
          >
            {/* Prevent closing when clicking inside modal */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative glass-panel rounded-xl w-full max-w-sm p-6"
            >
              <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Create A Resume</h1>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* Upload Resume Modal */}
        {ShowUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center px-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative glass-panel rounded-xl w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Upload Resume</h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700 dark:text-slate-300"
                >
                  Select Resume File
                  <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-slate-400 rounded-md p-4 py-10 my-4 text-slate-400 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-green-700">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloudIcon className="size-14 stroke-1" />
                        <p>Upload Resume</p>
                      </>
                    )}
                  </div>
                </label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Upload Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResume(null);
                }}
              />
            </div>
          </form>
        )}

        {/* Edit Resume Title Modal */}
        {showEditModal && (
          <form
            onSubmit={editTitle}
            onClick={() => setShowEditModal(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center px-4"
          >
            {/* Prevent closing when clicking inside modal */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative glass-panel rounded-xl w-full max-w-sm p-6"
            >
              <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Edit Resume Title</h1>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowEditModal(false);
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
