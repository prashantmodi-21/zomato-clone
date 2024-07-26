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
        getMenuError: (state)=>{
            state.isFetching = false,
            state.isError = true
        }
    }
})

export const {getMenuStart, getMenuSuccess, getMenuError} = menuRedux.actions

export default menuRedux.reducer