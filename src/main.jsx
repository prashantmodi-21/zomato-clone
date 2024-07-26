import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Provider} from "react-redux"
import {Login, RestaurantsList, AddRestaurants, UpdateRestaurants, AddUser, UpdateUser, UsersList, Revenue, Dashboard, Error} from "./index.js"
import { PersistGate } from 'redux-persist/integration/react';
import persistor, { store } from './redux/store.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {index: true, element: <Dashboard/>},
      {
        path: "/restaurants",
        element: <RestaurantsList/>
      },
      {
        path: "/addrestaurant",
        element: <AddRestaurants/>
      },
      {
        path: "/updaterestaurant/:id",
        element: <UpdateRestaurants/>
      },
      {
        path: "/users",
        element: <UsersList/>
      },
      {
        path: "/adduser",
        element: <AddUser/>
      },
      {
        path: "/updateuser/:id",
        element: <UpdateUser/>
      },
      {
        path: "/revenue",
        element: <Revenue/>
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
