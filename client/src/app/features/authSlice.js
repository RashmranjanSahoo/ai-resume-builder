import { createSlice } from "@reduxjs/toolkit";

// Redux keeps authentication available to every page without prop drilling.
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,
        user: null,
        loading: true,
    },
    reducers: {
        // Save the logged-in user and token after register/login succeeds.
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token);
        },
        // Clear auth data when the user logs out.
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
        setLoading: (state, action) => {  // ✅ unchanged
            state.loading = action.payload;
        },
    },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
