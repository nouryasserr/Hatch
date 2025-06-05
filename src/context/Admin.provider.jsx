import { useState } from "react";
import { AdminContext } from "./Admin.context";

export default function AdminProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));

  function handleLogout() {
    localStorage.removeItem("adminToken");
    setToken(null);
  }

  return (
    <AdminContext.Provider value={{ token, setToken, handleLogout }}>
      {children}
    </AdminContext.Provider>
  );
}
