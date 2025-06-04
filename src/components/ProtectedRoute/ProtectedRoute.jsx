import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { startupContext } from "../../context/Startup.context";

function ProtectedRoute({ children }) {
  let { token } = useContext(startupContext);
  if (token) {
    return children;
  } else {
    return <Navigate to="/Startup/Login" />;
  }
}

export default ProtectedRoute;
