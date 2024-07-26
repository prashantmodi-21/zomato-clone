import { createSlice } from "@reduxjs/toolkit";

const cartRedux = createSlice({
    name: "Cart",
    initialState: {
        cartItems: [],
        total: 0,
        isFetching: false,
        isError: false
    },
    reducers: {
        getCartStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        getCartSuccess: (state, action)=>{
            state.isFetching = false,
            state.cartItems = action.payload?.items
            state.total = action.payload?.total
        },
        getCartError: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        addToCartStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        addToCartSuccess: (state, action)=>{
            state.isFetching = false,
            state.cartItems.push(action.payload)
            state.total += action.payload.amount
        },
        addToCartError: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        updateCartStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        updateCartSuccess: (state, action)=>{
            state.isFetching = false,
            state.cartItems[state.cartItems.findIndex(item=> item.dishId === action.payload.dishId)] = {dishId: action.payload.dishId, qty: action.payload.qty, amount: action.payload.price * action.payload.qty}
            state.total = action.payload.total
        },
        updateCartError: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        deleteCartStart: (state)=>{
            state.isFetching = true,
            state.isError = false
        },
        deleteCartSuccess: (state, action)=>{
            state.isFetching = false,
            state.cartItems.splice(state.cartItems.findIndex(item=> item.dishId === action.payload.dishId), 1)
            state.total -= action.payload.price 
        },
        deleteCartError: (state)=>{
            state.isFetching = false,
            state.isError = true
        },
        addItemsFetching: (state, action)=>{
            state.isFetching = true,
            state.isError = false
        },
        addItemsSuccess: (state, action)=>{
            state.isFetching = false,
            state.cartItems = action.payload.items,
            state.total = action.payload.total
        },
        addItemsError: (state, action)=>{
            state.isFetching = false,
            state.isError = true
        },
        clearCart: (state)=>{
            state.isFetching = false,
            state.cartItems = []
            state.total = 0
        }
    }
})

export const {getCartStart, getCartSuccess, getCartError, addToCartStart, addToCartSuccess, addToCartError, updateCartStart, updateCartSuccess, updateCartError, deleteCartStart, deleteCartSuccess, deleteCartError, addItemsSuccess, addItemsFetching, addItemsError, clearCart} = cartRedux.actions

export default cartRedux.reducer