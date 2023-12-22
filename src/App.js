import React, { useEffect, useState, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigate from "./components/Nav/Nav.js";
import UserLogin from "./components/Login/Login.js";
import Register from "./components/register/Register.js";
import { ToastContainer } from "react-toastify";
import Users from "./components/ManageUsers/Users.js";
import PrivateRoute from "./components/routes/PrivateRoute.js";
import { UserContext } from "./context/UserContextHook.js";
import { RevolvingDot } from "react-loader-spinner";
import "./App.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate></Navigate>,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/users",
    element: (
      <PrivateRoute>
        <Users />
      </PrivateRoute>
    ),
  },
  {
    path: "/projects",
    element: (
      <PrivateRoute>
        <Users />
      </PrivateRoute>
    ),
  },
]);

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="app-container">
      {user && user.isLoading ? (
        <div className="loading-container">
          <RevolvingDot
          radius="45"
          strokeWidth="5"
          color="red"
          secondaryColor='green'
          ariaLabel="revolving-dot-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          />
          <div>Loading data ...</div>
      </div>
      ) : (
        <>
          <RouterProvider router={router} />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </>
      )}
    </div>
  );
}

export default App;
