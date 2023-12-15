import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import './Nav.scss'

function Navigate(props) {
  return (
    <div>
      <div className="topnav">
        <NavLink activeClassName="active" to="/" exact>
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/users">
          Users
        </NavLink>
        <NavLink activeClassName="active" to="/projects">
          Projects
        </NavLink>
        <NavLink activeClassName="active" to="/about">
          About
        </NavLink>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}

export default Navigate;
