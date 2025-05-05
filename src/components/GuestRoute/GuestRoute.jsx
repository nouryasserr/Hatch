import { Navigate } from "react-router-dom";

function GuestRoute({ children }) {
  const token = true;
  if (!token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default GuestRoute;
