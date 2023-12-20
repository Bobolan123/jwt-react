import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContextHook";
import { useContext } from "react";

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("account");
  const {user} = useContext(UserContext)
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (isAuthenticated) {
    return <>{children}</>; // Use {} to render the children component
  }
};
