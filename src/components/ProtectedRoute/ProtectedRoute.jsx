import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/User.context";

function ProtectedRoute({ children }) {
  let { token } = useContext(UserContext);
  if (token) {
    return children;
  } else {
    return <Navigate to="/Signin" />;
  }
}

export default ProtectedRoute;
