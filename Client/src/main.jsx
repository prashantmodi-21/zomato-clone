import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Cart, Login, Register, RestaurantMenu, RestaurantsList, Home, Error, Order} from './index.js';
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import persistor, { store } from './redux/store.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "cart",
        element: <Cart/>
      },
      {
        path: "restaurants/:type",
        element: <RestaurantsList/>
      },
      {
        path: "restaurant/:id",
        element: <RestaurantMenu/>
      },
      {
        path: "order/:type",
        element: <Order/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
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
