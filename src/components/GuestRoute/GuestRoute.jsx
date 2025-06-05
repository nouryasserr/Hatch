import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { StartupContext } from "../../context/Startup.context";

function GuestRoute({ children }) {
  let { token } = useContext(StartupContext);
  if (token) {
    return <Navigate to="/Startup/Overview" replace />;
  }
  return children;
}

export default GuestRoute;
