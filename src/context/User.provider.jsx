import { useState, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./User.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const navigate = useNavigate();

  const cleanupUserData = useCallback(() => {
    setToken(null);
    localStorage.removeItem("userToken");
    // Clear any other user-related data from localStorage
    localStorage.removeItem("selectedAddress");
  }, []);

  async function handleLogout() {
    try {
      if (token) {
        await axios.post(
          "http://127.0.0.1:8000/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      cleanupUserData();
      toast.success("Logged out successfully");
      navigate("/Auth/Signin");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still cleanup and navigate even if API call fails
      cleanupUserData();
      navigate("/Auth/Signin");
    }
  }

  return (
    <UserContext.Provider value={{ token, setToken, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
