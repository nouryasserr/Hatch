import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";

function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setToken } = useContext(UserContext);

  useEffect(() => {
    const code = searchParams.get("code");

    async function handleGoogleCallback() {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/auth/google/callback?code=${code}`
        );

        if (data.success && data.data?.token) {
          localStorage.setItem("userToken", data.data.token);
          setToken(data.data.token);
          toast.success("Logged in successfully with Google!");
          setTimeout(() => {
            navigate("/User");
          }, 1000);
        } else {
          toast.error("Failed to complete Google login");
          navigate("/Auth/Signin");
        }
      } catch (error) {
        console.error("Google callback error:", error);
        toast.error(
          error.response?.data?.message || "Failed to complete Google login"
        );
        navigate("/Auth/Signin");
      }
    }

    if (code) {
      handleGoogleCallback();
    } else {
      toast.error("Invalid callback from Google");
      navigate("/Auth/Signin");
    }
  }, [searchParams, navigate, setToken]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl mb-4">Completing Google Sign In...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto"></div>
      </div>
    </div>
  );
}

export default GoogleCallback;
