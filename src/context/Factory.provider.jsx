import { useState } from "react";
import { FactoryContext } from "./Factory.context";

export default function FactoryProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("factoryToken"));

  function handleLogout() {
    localStorage.removeItem("factoryToken");
    setToken(null);
  }

  return (
    <FactoryContext.Provider value={{ token, setToken, handleLogout }}>
      {children}
    </FactoryContext.Provider>
  );
}
