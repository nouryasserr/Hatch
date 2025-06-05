import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StartupContext } from "../../context/Startup.context";

function ProtectedRoute({ children }) {
  let { token } = useContext(StartupContext);
  if (token) {
    return children;
  } else {
    return <Navigate to="/Startup/Login" />;
  }
}

export default ProtectedRoute;
