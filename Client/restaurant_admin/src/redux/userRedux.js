import { createSlice } from "@reduxjs/toolkit"

const userRedux = createSlice({
    name: "Admin",
    initialState: {
        user: null,
        isFetching: false,
        isError: false
    },
    reducers : {
        loginStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        loginSuccess: (state, action)=>{
            state.isFetching = false,
            state.user = action.payload
        },
        loginError: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        logoutSuccess: (state)=>{
            state.isFetching = false
            state.user = null
        },
        userAutoLogout: (state)=>{
            state.currentUser = null,
            state.loginTime = null
        }
    }
})

export const {loginStart, loginSuccess, loginError, logoutSuccess, userAutoLogout} = userRedux.actions

export default userRedux.reducer