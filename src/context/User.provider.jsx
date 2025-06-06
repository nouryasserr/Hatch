import { useState } from "react";
import axios from "axios";
import { UserContext } from "./User.context";
import toast from "react-hot-toast";

function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  async function handleLogout() {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setToken(null);
      localStorage.removeItem("userToken");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  }

  return (
    <>
      <UserContext.Provider value={{ token, setToken, handleLogout }}>
        {children}
      </UserContext.Provider>
    </>
  );
}

export default UserProvider;
