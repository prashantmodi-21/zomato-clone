import { createSlice } from "@reduxjs/toolkit" 

export const cartRedux = createSlice({
    name: "User",
    initialState: {
        currentUser: null,
        users: [],
        isFetching: false,
        isError: false
    },
    reducers: {
        loginStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        loginSuccess: (state, action)=>{
            state.currentUser = action.payload,
            state.isFetching = false
        },
        loginFailed: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        logoutSuccess: (state)=>{
            state.isFetching = false,
            state.currentUser = null
        },
        getUserStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        getUserSuccess: (state, action)=>{
            state.users = action.payload
            state.isFetching = false
        },
        getUserFailed: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        addUserStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        addUserSuccess: (state, action)=>{
            state.users.push(action.payload)
            state.isFetching = false
        },
        addUserFailed: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        deleteUserStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        deleteUserSuccess: (state, action)=>{
            state.users.splice(state.users.findIndex(item=> item._id === action.payload), 1)
            state.isFetching = false
        },
        deleteUserFailed: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        updateUserStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        updateUserSuccess: (state, action)=>{
            state.users[state.users.findIndex(item=> item._id === action.payload.id)] = action.payload
            state.isFetching = false
        },
        updateUserFailed: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        userAutoLogout: (state)=>{
            state.currentUser = null,
            state.loginTime = null
        }
    }
})

export const{loginStart, loginSuccess, loginFailed, addUserStart, addUserSuccess, addUserFailed, deleteUserStart, deleteUserSuccess, deleteUserFailed, updateUserStart, updateUserSuccess, updateUserFailed, getUserStart, getUserSuccess, getUserFailed, logoutSuccess, userAutoLogout} = cartRedux.actions

export default cartRedux.reducer