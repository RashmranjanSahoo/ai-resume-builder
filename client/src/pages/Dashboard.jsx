import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  Trash,
  UploadCloudIcon,
  XIcon,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  // Colors used for resume cards
  const colors = ['#9333ea', '#de7706', '#dc2626', '#0284c7', '#16a34a']

  // Stores all resumes
  const [allResumes, setallResumes] = useState([])

  // Modal states
  const [ShowCreateResume, setShowCreateResume] = useState(false)
  const [ShowUploadResume, setShowUploadResume] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)

  // For future edit functionality
  const [editResumeId, setEditResumeId] = useState('')

  const navigate = useNavigate()

  // Load resumes on component mount
  const loadAllResumes = async () => {
    setallResumes(dummyResumeData)
  }

  // Create Resume handler
  const createResume = async (event) => {
    event.preventDefault()

    setShowCreateResume(false)

    // Replace with API call later
    navigate('/app/builder/resume123')
  }

  // Upload Resume handler
  const uploadResume = async (event) => {
    event.preventDefault()

    setShowUploadResume(false)

    // Replace with upload API later
    navigate('/app/builder/resume123')
  }

  const editTitle = async (event) => {
    event.preventDefault()

    // API call later

    setShowEditModal(false)
    setEditResumeId('')
    setTitle('')
  }

  // Delete Resume handler
  const deleteResume = (id) => {
    // Replace with API call later
    const confirm=window.confirm('Are You sure to delete this resume?')
    if(confirm)setallResumes(prev => prev.filter(r => r._id !== id && r.id !== id))
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
      <p className="text-2xl font-medium mb-8 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent">
        Welcome, Joe Doe
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-6">
        {/* Create Resume */}
        <button
          onClick={() => setShowCreateResume(true)}
          className="group w-full sm:w-48 h-48 bg-white flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-dashed border-slate-300 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <PlusIcon className="size-12 p-2.5 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-full group-hover:scale-110 transition-all duration-300" />

          <p className="font-medium group-hover:text-indigo-600 transition-all duration-300">
            Create Resume
          </p>
        </button>

        {/* Upload Existing Resume */}
        <button
          onClick={() => setShowUploadResume(true)}
          className="group w-full sm:w-48 h-48 bg-white flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-dashed border-slate-300 hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <UploadCloudIcon className="size-12 p-2.5 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-full group-hover:scale-110 transition-all duration-300" />

          <p className="font-medium group-hover:text-purple-600 transition-all duration-300">
            Upload Existing
          </p>
        </button>
      </div>

      <hr className="border-slate-500 my-8 max-w-[420px]" />

      {/* Resume Cards */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResumes.map((resume, index) => {
          // Rotate colors across cards
          const basecolor = colors[index % colors.length]

          return (
            <button key={resume.id || index} onClick={() => navigate(`/app/builder/${resume._id}`)}

              className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                background: `linear-gradient(135deg,${basecolor}10, ${basecolor}40)`,
                borderColor: basecolor + '40',
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
                style={{ color: basecolor + '90' }}
              >
                updated on{' '}
                {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              {/* Edit/Delete Actions */}
              <div onClick={(e) => e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                <Trash className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResume(resume._id || resume.id);
                  }} />

                <PencilIcon onClick={(e) => {
                  e.stopPropagation();
                  setEditResumeId(resume._id || resume.id);
                  setTitle(resume.title);
                  setShowEditModal(true);
                }}
                  className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
              </div>
            </button>
          )
        })}

        {/* Create Resume Modal */}
        {ShowCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            {/* Prevent closing when clicking inside modal */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h1 className="text-xl font-bold mb-4">
                Create A Resume
              </h1>

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
                  setShowCreateResume(false)
                  setTitle('')
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
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                Upload Resume
              </h2>

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
                  className="block text-sm text-slate-700"
                >
                  Select Resume File

                  <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-slate-400 rounded-md p-4 py-10 my-4 text-slate-400 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-green-700">
                        {resume.name}
                      </p>
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
                  setShowUploadResume(false)
                  setTitle('')
                  setResume(null)
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
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            {/* Prevent closing when clicking inside modal */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h1 className="text-xl font-bold mb-4">
                Edit Resume Title
              </h1>

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
                  setShowEditModal(false)
                  setEditResumeId('')
                  setTitle('')
                }}
              />
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default Dashboard