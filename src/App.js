import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigate from "./components/Nav/Nav.js";
import News from "./components/News.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import UserLogin from "./components/Login/Login.js";
import Home from "./components/Home.js";
import Register from "./components/register/Register.js";
import { ToastContainer } from "react-toastify";
import Users from "./components/ManageUsers/Users.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate></Navigate>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <News />,
      },
    ],
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
    element: <Users />,
  },
]);

function App() {
  const [account, setAccount] = useState({})
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session))
    }

  })
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
