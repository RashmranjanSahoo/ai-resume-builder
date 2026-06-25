
import { configureStore } from "@reduxjs/toolkit"
import authReducer from './features/authSlice'

// Central Redux store; add more feature reducers here as the app grows.
const store= configureStore({
    reducer : {
        auth: authReducer
        
    }
})

export default store
