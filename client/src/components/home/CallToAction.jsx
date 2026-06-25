import React from 'react'
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
        <div id='cta' className='border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-28 dark:border-white/10'>
            {/* CTA keeps the same link target, but gives the landing page a stronger finish. */}
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full dark:border-white/10">
                <p className="text-xl font-medium max-w-md text-slate-800 dark:text-slate-100">Build a Professional Resume That helps You Stand Out And Get Hired</p>
                <Link to="/app?state=register" className="flex items-center gap-2 rounded py-3 px-8 bg-green-600 hover:bg-green-700 transition text-white shadow-lg shadow-green-500/20">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}

export default CallToAction
