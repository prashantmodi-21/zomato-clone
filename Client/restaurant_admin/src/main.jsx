import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Login, Dashboard, Error, MenuList, AddMenuItem, UpdateMenuItem, OrdersList, UpdateOrder, Sales, ChgPassword} from "./index.js"
import { Provider } from 'react-redux';
import persistor, { store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {index: true, element: <Dashboard/>},
      {
        path: "/menu",
        element: <MenuList/>
      },
      {
        path: "/addmenuitem",
        element: <AddMenuItem/>
      },
      {
        path: "/updatemenuitem/:id",
        element: <UpdateMenuItem/>
      },
      {
        path: "/orders",
        element: <OrdersList/>
      },
      {
        path: "/updateorder/:id",
        element: <UpdateOrder/>
      },
      {
        path: "/sales",
        element: <Sales/>
      },
      {
        path: "/chgpass",
        element: <ChgPassword/>
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
      <PersistGate loading="null" persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
