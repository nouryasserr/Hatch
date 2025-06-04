import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { startupContext } from "../../context/Startup.context";

function GuestRoute({ children }) {
  let { token } = useContext(startupContext);
  if (!token) {
    return children;
  } else {
    return <Navigate to="/Startup/Overview" />;
  }
}

export default GuestRoute;
