import React from 'react'

const Banner = () => {
  return (
    <div>
        {/* Small announcement strip at the top of the landing page. */}
        <div className="w-full py-2.5 font-medium text-sm text-green-900 text-center bg-linear-to-r from-[#ABFF7E] to-[#FDFEFF] dark:from-green-500/30 dark:to-slate-950 dark:text-green-100">
            <p><span className="px-3 py-1 rounded-lg text-white bg-green-600 mr-2">New</span>AI Feature Added</p>
        </div>
    </div>
  )
}

export default Banner
