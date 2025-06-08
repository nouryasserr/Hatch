import { useState } from "react";
import { FactoryContext } from "./Factory.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function FactoryProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("factoryToken"));
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("factoryToken");
    setToken(null);
    toast.success("Logged out successfully");
    navigate("/Factory/FactoryLogin");
  }

  return (
    <FactoryContext.Provider value={{ token, setToken, handleLogout }}>
      {children}
    </FactoryContext.Provider>
  );
}
