import { createSlice } from "@reduxjs/toolkit";

const locationRedux = createSlice({
    name: "Location",
    initialState: {
        cities: [],
        selectedCity: null,
        isFetching: false,
        isError: false
    },
    reducers:{
        addCitiesStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        addCitiesSuccess: (state, action)=>{
            state.isFetching = false,
            state.cities = action.payload
            state.selectedLocation = null
        },
        addCitiesError: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        selectedLocation: (state, action)=>{
            state.selectedCity = action.payload
        }
    }
})

export const {addCitiesStart, addCitiesSuccess, addCitiesError, selectedLocation} = locationRedux.actions

export default locationRedux.reducer