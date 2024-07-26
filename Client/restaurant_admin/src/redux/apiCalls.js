import { publicMethod, userMethod } from "../../requestMethod"
import { addMenuError, addMenuStart, addMenuSuccess, deleteMenuError, deleteMenuStart, deleteMenuSuccess, getMenuError, getMenuStart, getMenuSuccess, updateMenuError, updateMenuStart, updateMenuSuccess } from "./menuRedux"
import { getOrdersError, getOrdersStart, getOrdersSuccess, updateOrdersError, updateOrdersStart, updateOrdersSuccess } from "./ordersRedux"
import { loginError, loginStart, loginSuccess, userAutoLogout } from "./userRedux"


export const userLogin = async(dispatch, user)=>{
    dispatch(loginStart())
    try {
        const res = await publicMethod.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginError())
    }
}

export const getOrders = async(dispatch, user)=>{
    dispatch(getOrdersStart())
    try {
        const res = await userMethod.get(`/order/restaurant/${user}`)
        dispatch(getOrdersSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout)
        dispatch(getOrdersError())
    }
}

export const updateStatus = async(dispatch, order)=>{
    dispatch(updateOrdersStart())
    try {
      const res = await userMethod.put(`/order/restaurant/${order.id}`, order)
      dispatch(updateOrdersSuccess(res.data))
    } catch (error) {
      console.log(error)
        dispatch(userAutoLogout)
      dispatch(updateOrdersError())
    }
  }

  export const getMenu = async(dispatch, restaurant)=>{
    dispatch(getMenuStart())
    try {
        const res = await userMethod.get(`/menu/${restaurant}`)
        dispatch(getMenuSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout)
        dispatch(getMenuError())
    }
  }
  export const deleteMenu = async(dispatch, restaurant)=>{
    dispatch(deleteMenuStart())
    try {
        const res = await userMethod.delete(`/menu/${restaurant}`)
        dispatch(deleteMenuSuccess(restaurant))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout)
        dispatch(deleteMenuError())
    }
  }
  export const addMenuItem = async(dispatch, menuItem)=>{
    dispatch(addMenuStart())
    try {
        const res = await userMethod.post(`/menu`, menuItem)
        dispatch(addMenuSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout)
        dispatch(addMenuError())
    }
  }
  export const updateMenuItem = async(dispatch, menuItem)=>{
    dispatch(updateMenuStart())
    try {
        const res = await userMethod.put(`/menu/${menuItem.id}`, menuItem)
        dispatch(updateMenuSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(userAutoLogout)
        dispatch(updateMenuError())
    }
  }