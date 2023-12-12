import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigate from './components/Nav/Nav.js';
import News from "./components/News.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import UserLogin from "./components/Login/Login.js";
import Home from "./components/Home.js";
import Register from "./components/register/Register.js";

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
    element: <UserLogin  />,
  },
  {
    path: "/register",
    element: <Register  />,
  }
]);

function App() {
  return (
    <div className='app-container'>
      <RouterProvider router={router} />
      
    </div>
  );
}

export default App;
