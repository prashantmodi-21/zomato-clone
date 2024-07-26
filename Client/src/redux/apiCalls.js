import { publicMethod, userMethod } from "../requestMethod"
import { addItemsError, addItemsFetching, addItemsSuccess, addToCartError, addToCartStart, addToCartSuccess, clearCart, deleteCartError, deleteCartStart, deleteCartSuccess, getCartError, getCartStart, getCartSuccess, updateCartError, updateCartStart, updateCartSuccess } from "./cartRedux"
import { getMenuError, getMenuStart, getMenuSuccess } from "./menuRedux"
import { getRestaurantsError, getRestaurantsStart, getRestaurantsSuccess } from "./restaurantRedux"
import { addUserFailed, addUserStart, addUserSuccess, loginFailed, loginStart, loginSuccess, userAutoLogout } from "./userRedux"

export const userLogin = async(dispatch, user)=>{
    dispatch(loginStart())
    try {
        if(user.userId.length > 4 && user.password.length > 5){
            const res = await publicMethod.post("/auth/login", user)
            dispatch(loginSuccess(res.data))
        }else{
            console.log("Enter Valid Values")
            dispatch(loginFailed())
        }
    } catch (error) {
        console.log(error)
        dispatch(loginFailed())
    }
}

export const addUser = async(dispatch, user)=>{
    dispatch(addUserStart())
    try {
        if(user.username.length > 4 && user.name.length > 4 && user.email.length > 9 && user.phone.length > 9 && user.password.length > 5){
            const res = await publicMethod.post("/auth/register", user)
            dispatch(addUserSuccess(user))
        }else{
            console.log("Fields Value Missing")
            dispatch(addUserFailed())
        }
    } catch (error) {
        console.log(error)
        dispatch(addUserFailed())
    }
}

export const getRestaurants = async(dispatch)=>{
    dispatch(getRestaurantsStart())
    try {
        const res = await publicMethod.get("/restaurant")
        dispatch(getRestaurantsSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(getRestaurantsError())
    }
}

export const getAllMenuItems = async(dispatch)=>{
    dispatch(getMenuStart())
    try {
        const res = await publicMethod.get(`/menu`)
        dispatch(getMenuSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(getMenuError())
    }
}

export const getMenuItems = async(dispatch, restaurant)=>{
    dispatch(getMenuStart())
    try {
        const res = await publicMethod.get(`/menu/${restaurant}`)
        dispatch(getMenuSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(getMenuError())
    }
}

export const getCartItems = async(dispatch, user)=>{
    dispatch(getCartStart())
    try {
        const res = await userMethod.get(`/cart/${user}`)
        res.data[0] && dispatch(getCartSuccess(res.data[0]))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
        dispatch(getCartError())
    }
}

export const addCartItems = async(dispatch, user, cart)=>{
    dispatch(addToCartStart())
    try {
        const res = await userMethod.post(`/cart/${user}`, cart)
        dispatch(addToCartSuccess(cart.items))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
        dispatch(addToCartError(error))
    }
}

export const deleteCart = async(dispatch, user)=>{
    try {
        const res = await userMethod.delete(`/cart/${user}`)
        dispatch(clearCart())
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
    }
}

export const updateCartItems = async(dispatch, user, item)=>{
    dispatch(updateCartStart())
    try {
        const res = await userMethod.put(`/cart/${user}`, item)
        dispatch(updateCartSuccess(item))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
        dispatch(updateCartError(error))
    }
}

export const deleteCartItems = async(dispatch, user, item)=>{
    dispatch(deleteCartStart())
    try {
        const res = await userMethod.put(`/cart/delete/${user}`, item)
        dispatch(deleteCartSuccess(item))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
        dispatch(deleteCartError(error))
    }
}

export const addItemsToCart = async(dispatch, user, item)=>{
    dispatch(addItemsFetching())
    try {
        const res = await userMethod.post(`/cart/add/${user}`, item)
        const {items, total} = res.data
        dispatch(addItemsSuccess({items, total}))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
        dispatch(addItemsError())
    }
}