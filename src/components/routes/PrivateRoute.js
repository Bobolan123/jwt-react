import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("account");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (isAuthenticated) {
    return <>{children}</>; // Use {} to render the children component
  }
  
};
