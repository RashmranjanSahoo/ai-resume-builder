import { Sparkle } from 'lucide-react'
import React from 'react'

const ProfessionalSummaryForm = ({data,onChange,setResumeData}) => {
  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                    Professional Summary
                </h3>
                <p className='text-sm text-gray-500'>Add summary for your resume here</p>
            </div>
            <button className='flex items-center gap-2 px-3 py-1 text-sm bg-puerple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disables:opacity-50'>
                <Sparkle className='size-4'/> AI Enhance
            </button>
        </div>
        <div className='mt-6'>
            <textarea value={data || ""} rows={7} onChange={(e)=>onChange(e.target.value)} className='w-full p-3 px-4 mt-4 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500
             focus:border-blue-500 outline-none transition-colors resize-none' 
             placeholder='write a compelling professional summary tat highlights your key and strengths and career objectives'/>

             <p>Tip: Keep it concise(3-4 sentences) and focus on 
                your most relevant achievements and skills</p>
        </div>
      
    </div>
  )
}

export default ProfessionalSummaryForm
