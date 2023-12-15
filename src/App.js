import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Navigate from "./components/Nav/Nav.js";
import UserLogin from "./components/Login/Login.js";
import Home from "./components/Home.js";
import Register from "./components/register/Register.js";
import { ToastContainer } from "react-toastify";
import Users from "./components/ManageUsers/Users.js";
import { PrivateRoute } from "./components/routes/PrivateRoute.js";

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
    element: <PrivateRoute><Users /></PrivateRoute>,
  },
  {
    path: "/projects",
    element: <PrivateRoute><Users /></PrivateRoute>,
  },
]);

function App() {
  // const [account, setAccount] = useState({})
  // useEffect(() => {
  //   let session = sessionStorage.getItem("account");
  //   if (session) {
  //     setAccount(JSON.parse(session))
  //   }
  // })
  return (
    <div className="app-container">
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
    </div>
  );
}

export default App;
