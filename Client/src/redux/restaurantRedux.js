import { createSlice } from "@reduxjs/toolkit";

const restaurantRedux = createSlice({
    name: "Restaurant",
    initialState: {
        restaurants: [],
        isFetching: false,
        isError: false
    },
    reducers: {
        getRestaurantsStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        getRestaurantsSuccess: (state, action)=>{
            state.isFetching = false,
            state.restaurants = action.payload
        },
        getRestaurantsError: (state)=>{
            state.isFetching = false,
            state.isError = true
        }
    }
})

export const {getRestaurantsStart, getRestaurantsSuccess, getRestaurantsError} = restaurantRedux.actions
export default restaurantRedux.reducer