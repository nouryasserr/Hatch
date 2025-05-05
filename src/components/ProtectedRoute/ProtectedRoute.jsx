import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = true;
  if (token) {
    return children;
  } else {
    return <Navigate to="/Signin" />;
  }
}

export default ProtectedRoute;
