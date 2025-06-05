import { useState } from "react";
import { StartupContext } from "./Startup.context";

export default function StartupProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("startupToken"));

  function handleLogout() {
    localStorage.removeItem("startupToken");
    setToken(null);
  }

  return (
    <StartupContext.Provider value={{ token, setToken, handleLogout }}>
      {children}
    </StartupContext.Provider>
  );
}
