import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
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
    },

    // Education
    education: [
      {
        institute: "",
        degree: "",
        cgpa: "",
        startYear: "",
        endYear: "",
        coursework: [],
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
  })

  const loadExistingResume = async ()=>{
    const resume = dummyResumeData.find(resume=> resume._id === resumeId);
    if(resume){
      setResumeData(resume)
      document.title=resume.title
    }
  }

  useEffect(()=>{
    loadExistingResume()
  },[])
 
  const [ActiveSectionIndex, setActiveSectionIndex] = useState(0);
  const [RemoveBackground, setRemoveBackground] = useState(false);
  
  const sections = [
  {
    id: "personal_info",
    name: "Personal Info",
    icon: User,
  },
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

const ActiveSection=sections[ActiveSectionIndex]

  return (
    <div>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
        <ArrowLeft className="size-4"/>Back To DashBoard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
          <div className='grid lg:grid-cols-12 gap-8'>
            {/*Left panel form */}
            <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
               <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
                  {/*Progress bar using ActiveSectionindex */}
                  <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
                  <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000' style={{width :`${ActiveSectionIndex * 100 / (sections.length -1)}%`}}/>
                   {/*Section Navigation*/}
                   <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                    <div></div>
                    <div className='flex items-center'>
                      {ActiveSectionIndex !==0 && (
                        <button onClick={()=> setActiveSectionIndex((prevIndex)=>Math.max(prevIndex-1,0))} className='flex items-center gap-1 p-3 rounded-l text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all' disabled={ActiveSectionIndex===0}> <ChevronLeft className='size-4'/></button>

                      )}
                      <button onClick={()=> setActiveSectionIndex((prevIndex)=>Math.min(prevIndex+1,sections.length-1))} className={`flex items-center gap-1 p-3 rounded-l text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${ActiveSectionIndex === sections.length - 1 && 'opacity-50'}`} disabled={ActiveSectionIndex===sections.length -1}>Next<ChevronRight className='size-4'/></button>
                    </div>
                   </div>
               </div>
            </div>

            {/*Right panel form */}
            <div></div>

          </div>
      </div>
    </div>
  )
}

export default ResumeBuilder