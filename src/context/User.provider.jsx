import { useState } from "react";
import { UserContext } from "./User.context";

function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("userToken");
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
