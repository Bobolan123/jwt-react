  import { Navigate } from "react-router-dom";
  import { UserContext } from "../../context/UserContextHook";
  import { useContext, useEffect } from "react";

  const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext); 
    if (user && user.isAuthenticated === true) {
      return <>{children}</>; // Use {} to render the children component
    } else {
      return <Navigate to="/login" />;
    }

  };

  export default PrivateRoute