import { useState } from "react";
import { StartupContext } from "./Startup.context";

function StartupProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <>
      <StartupContext.Provider value={{ token, setToken, handleLogout }}>
        {children}
      </StartupContext.Provider>
    </>
  );
}

export default StartupProvider;
