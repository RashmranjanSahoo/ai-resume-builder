import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import {Toaster} from 'react-hot-toast'
import ThemeToggle from './components/ThemeToggle'

const App = () => {

  const dispatch = useDispatch();

  // On refresh, rebuild the Redux auth state from the saved JWT token.
  const getUserData =async ()=>{
    const token = localStorage.getItem('token')
    try {
      if(token){
        // ✅ After
        const {data} = await api.get('/api/users/data')
        if(data.user){
          dispatch(login({token, user:data.user}))
        }
        dispatch(setLoading(false))
      }else{
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message);
      
      
    }
  }

  useEffect(()=>{
   getUserData()
  },[]);

  return (
    <>
    <ThemeToggle/>
    <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='app' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='builder/:resumeId' element={<ResumeBuilder/>}/>
        </Route>
        <Route path='view/:resumeId' element={<Preview/>}/>
      </Routes>
    </>
  )
}

export default App
