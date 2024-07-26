import { createSlice } from "@reduxjs/toolkit"

const orderRedux = createSlice({
    name: "Order",
    initialState: {
        orders: [],
        isFetching: false,
        isError: false
    },
    reducers: {
        getOrdersStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        getOrdersSuccess: (state, action)=>{
            state.isFetching = false,
            state.orders = action.payload
        },
        getOrdersError: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        updateOrdersStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        updateOrdersSuccess: (state, action)=>{
            state.isFetching = false,
            state.orders[state.orders.findIndex(item=> item._id === action.payload._id)] = action.payload
        },
        updateOrdersError: (state)=>{
            state.isFetching = false,
            state.isError = true
        }
    }
})

export const {getOrdersStart, getOrdersSuccess, getOrdersError, updateOrdersStart, updateOrdersSuccess, updateOrdersError} = orderRedux.actions

export default orderRedux.reducer