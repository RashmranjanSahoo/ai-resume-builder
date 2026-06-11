import { Check, Palette } from 'lucide-react';
import React, { useState } from 'react'

const ColorPicker = ({selectedColor,onChange}) => {
    const colors = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Navy", value: "#1E3A8A" },
  { name: "Indigo", value: "#4F46E5" },
  { name: "Purple", value: "#7C3AED" },
  { name: "Teal", value: "#0F766E" },
  { name: "Emerald", value: "#059669" },
  { name: "Green", value: "#16A34A" },
  { name: "Orange", value: "#EA580C" },
  { name: "Red", value: "#DC2626" },
  { name: "Rose", value: "#E11D48" },
  { name: "Slate", value: "#475569" },
  { name: "Charcoal", value: "#374151" },
  { name: "Black", value: "#111827" }
];

const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='relative'>
        <button onClick={()=>setIsOpen(!isOpen)}
            className='flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100
            ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Palette size={16}/><span className='max-sm:hidden'>Accent</span>
        </button>
        {isOpen && (
            <div className='grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm'>
              {colors.map((color)=>(
                  <div key={color.value} className='relative cursor-pointer group flex flex-col' onClick={()=>{onChange(color.value);setIsOpen(false)}}>
                      <div className='w-12 h-12 rounded-full border-2 border-tyransparent group-hover:border-black/25 transition-colors' style={{backgroundColor:color.value}}>

                      </div>
                      {selectedColor === color.value && (
                        <div className='absolute top-0 left-0 right-0 botoom-4.5 flex items-center justiy-center'>
                            <Check className='size-5 text-white'/>
                        </div>
                      )}
                      <p className='text-xs text-center mt-1 text-gray-600'>{color.name}</p>
                  </div>
              ))}
            </div>
        )}
    </div>
  )
}

export default ColorPicker
