import { createSlice } from "@reduxjs/toolkit";


const menuRedux = createSlice({
    name: "Menu",
    initialState: {
        menuItems: [],
        isFetching: false,
        isError: false
    },
    reducers: {
        getMenuStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        getMenuSuccess: (state, action)=>{
            state.isFetching = false,
            state.menuItems = action.payload
        },
        getMenuError : (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        deleteMenuStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        deleteMenuSuccess: (state, action)=>{
            state.isFetching = false,
            state.menuItems.splice(state.menuItems.findIndex(item=> item._id === action.payload), 1)
        },
        deleteMenuError : (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        addMenuStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        addMenuSuccess: (state, action)=>{
            state.isFetching = false,
            state.menuItems.push(action.payload)
        },
        addMenuError : (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        updateMenuStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        updateMenuSuccess: (state, action)=>{
            state.isFetching = false,
            state.menuItems[state.menuItems.findIndex(item=> item._id === action.payload._id)] = action.payload
        },
        updateMenuError : (state)=>{
            state.isFetching = false,
            state.isError = true
        }
    }
})

export const {getMenuStart, getMenuSuccess, getMenuError, deleteMenuStart, deleteMenuSuccess, deleteMenuError, addMenuStart, addMenuSuccess, addMenuError, updateMenuStart, updateMenuSuccess, updateMenuError} = menuRedux.actions

export default menuRedux.reducer