import { useContext, useState, useEffect } from "react";
import { UserProfileContext } from "./UserProfile.context";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

function UserProfileProvider({ children }) {
  const { token, handleLogout } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    if (!token) {
      setUserProfile(null);
    }
  }, [token]);
  async function getUserProfile() {
    if (!token) {
      setUserProfile(null);
      return;
    }
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/user/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.request(options);
      if (data.success) {
        setUserProfile(data.data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setUserProfile(null);
        return;
      }
      console.error(error);
      toast.error("Failed to fetch user profile.");
    }
  }

  async function deleteAccount() {
    const toastId = toast.loading("Deleting account...");
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/user/profile",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.request(options);
      if (data.success) {
        toast.success("Account deleted successfully");
        handleLogout();
      } else {
        toast.error("Failed to delete account");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
        return;
      }
      const errorMessage =
        error.response?.data?.message || "Failed to delete account";
      toast.error(errorMessage);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        getUserProfile,
        deleteAccount,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export default UserProfileProvider;
