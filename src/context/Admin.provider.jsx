import { useState } from "react";
import { AdminContext } from "./Admin.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("adminToken");
    setToken(null);
    toast.success("Logged out successfully");
    navigate("/Admin/AdminLogin");
  }

  return (
    <AdminContext.Provider value={{ token, setToken, handleLogout }}>
      {children}
    </AdminContext.Provider>
  );
}
