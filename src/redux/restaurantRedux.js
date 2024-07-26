import { createSlice } from "@reduxjs/toolkit";

const restaurantRedux = createSlice({
    name: "restaurant",
    initialState: {
        restaurants: [],
        isFetching: false,
        isError: false,
    },
    reducers:{
        getRestaurantsStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        getRestaurantsSuccess: (state, action)=>{
            state.isFetching = false,
            state.restaurants = action.payload
        },
        getRestaurantsFailed: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        deleteRestaurantsStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        deleteRestaurantsSuccess: (state, action)=>{
            state.isFetching = false,
            state.restaurants.splice(state.restaurants.findIndex(item=> item._id === action.payload), 1)
        },
        deleteRestaurantsFailed: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        addRestaurantsStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        addRestaurantsSuccess: (state, action)=>{
            state.isFetching = false,
            state.restaurants.push(action.payload)
        },
        addRestaurantsFailed: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        updateRestaurantsStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        updateRestaurantsSuccess: (state, action)=>{
            state.isFetching = false,
            state.restaurants[state.restaurants.findIndex(item=> item._id === action.payload.id)] = action.payload
        },
        updateRestaurantsFailed: (state)=>{
            state.isFetching = false,
            state.isError = true
        }
    }
})

export const {getRestaurantsStart, getRestaurantsSuccess, getRestaurantsFailed, deleteRestaurantsStart, deleteRestaurantsSuccess, deleteRestaurantsFailed ,addRestaurantsStart, addRestaurantsSuccess, addRestaurantsFailed, updateRestaurantsStart, updateRestaurantsSuccess, updateRestaurantsFailed} = restaurantRedux.actions

export default restaurantRedux.reducer