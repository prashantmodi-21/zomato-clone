import { addUserFailed, addUserStart, addUserSuccess, deleteUserStart, deleteUserSuccess, getUserFailed, getUserStart, getUserSuccess, loginFailed, loginStart, loginSuccess, updateUserFailed, updateUserStart, updateUserSuccess, userAutoLogout } from "./userRedux"
import { publicMethod, userMethod } from "../requestMethod"
import { addRestaurantsFailed, addRestaurantsStart, addRestaurantsSuccess, deleteRestaurantsFailed, deleteRestaurantsStart, deleteRestaurantsSuccess, getRestaurantsFailed, getRestaurantsStart, getRestaurantsSuccess, updateRestaurantsFailed, updateRestaurantsStart, updateRestaurantsSuccess } from "./restaurantRedux"

export const loginUser = async(dispatch, user)=>{
    dispatch(loginStart())
    try {
        const res = await publicMethod.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailed())
    }
}

export const getRestaurants = async(dispatch)=>{
    dispatch(getRestaurantsStart())
    try {
        const res = await userMethod.get("/restaurant")
        dispatch(getRestaurantsSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
        dispatch(getRestaurantsFailed())
    }
}
export const deleteRestaurants = async(dispatch, restaurant)=>{
    dispatch(deleteRestaurantsStart())
    try {
        const res = await userMethod.delete(`/restaurant/${restaurant}`)
        dispatch(deleteRestaurantsSuccess(item))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
        dispatch(deleteRestaurantsFailed())
    }
}
export const addRestaurants = async(dispatch, restaurant)=>{
    dispatch(addRestaurantsStart())
    try {
        const res = await userMethod.post(`/restaurant`, restaurant)
        dispatch(addRestaurantsSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
        dispatch(addRestaurantsFailed())
    }
}
export const updateRestaurants = async(dispatch, restaurant)=>{
    dispatch(updateRestaurantsStart())
    try {
        const res = await userMethod.put(`/restaurant/${restaurant.id}`, restaurant)
        dispatch(updateRestaurantsSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
        dispatch(updateRestaurantsFailed())
    }
}

export const getUsers = async(dispatch)=>{
    dispatch(getUserStart())
    try {
        const res = await userMethod.get("/user")
        dispatch(getUserSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
        dispatch(getUserFailed())
    }
}

export const deleteUsers = async(dispatch, user)=>{
    dispatch(deleteUserStart())
    try {
        const res = await userMethod.delete(`/user/${user}`)
        dispatch(deleteUserSuccess(user))
    } catch (error) {
        
        dispatch(userAutoLogout())
    }
}

export const addUsers = async(dispatch, user)=>{
    dispatch(addUserStart())
    try {
        const res = await userMethod.post("/user", user)
        dispatch(addUserSuccess(res.data))
    } catch (error) {        
        dispatch(userAutoLogout())
        dispatch(addUserFailed())
    }
}

export const updateUser = async(dispatch, user) =>{
    dispatch(updateUserStart())
    try {
        const res = await userMethod.put(`/user/${user.id}`, user)
        dispatch(updateUserSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout())
        dispatch(updateUserFailed())
    }
}