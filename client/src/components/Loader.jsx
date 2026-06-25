import React from 'react'

// Full-screen spinner shown while the app checks whether a saved token is valid.
const Loader = () => {
  return (
    <div className='app-shell flex items-center justify-center h-screen'>
        <div className='size-12 border-3 border-green-500 border-t-transparent
        rounded-full animate-spin'>

        </div>
      
    </div>
  )
}

export default Loader
