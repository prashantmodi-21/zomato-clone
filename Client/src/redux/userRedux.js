import { createSlice } from "@reduxjs/toolkit" 

const userRedux = createSlice({
    name: "User",
    initialState: {
        currentUser: null,
        isFetching: false,
        isError: false,
        loginTime: null
    },
    reducers: {
        loginStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        loginSuccess: (state, action)=>{
            state.currentUser = action.payload,
            state.isFetching = false,
            state.loginTime =  Date.now()
        },
        loginFailed: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        logoutSuccess: (state)=>{
            state.isFetching = false,
            state.currentUser = null
        },
        addUserStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        addUserSuccess: (state, action)=>{
            state.currentUser = action.payload,
            state.isFetching = false
        },
        addUserFailed: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        userAutoLogout: (state)=>{
            state.currentUser = null,
            state.loginTime = null
        }
        
    }
})

export const{loginStart, loginSuccess, loginFailed, logoutSuccess, addUserStart, addUserSuccess, addUserFailed, userAutoLogout} = userRedux.actions

export default userRedux.reducer