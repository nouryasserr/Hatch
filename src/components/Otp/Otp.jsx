import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Otp({ onClose, email }) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP code");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Verifying OTP...");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/verify-otp",
        {
          otp_code: otp,
          email: email,
        }
      );

      if (response.data.success) {
        toast.success("Email verified successfully!");
        onClose();
        navigate("/Auth/Signin");
      } else {
        toast.error("Invalid OTP code");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to verify OTP";
      toast.error(errorMessage);
    } finally {
      toast.dismiss(toastId);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blackmuted bg-opacity-70">
      <div className="w-11/12 xs:w-96 md:w-1/2 lg:w-1/3 bg-white shadow-lg">
        <div className="flex items-center justify-between py-4 px-4 xs:px-6">
          <h4 className="text-base xs:text-xl">otp verification</h4>
          <button onClick={onClose} disabled={isLoading}>
            <i className="fa-solid fa-xmark text-lightblack"></i>
          </button>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="px-4 xs:px-6 py-2 xs:py-4">
            <h5 className="pb-2 text-sm xs:text-lg font-light">
              we've sent a 6-digit code to your email. please enter it below to
              continue
            </h5>
            <input
              type="text"
              autoComplete="off"
              name="otp"
              placeholder="enter verification code"
              className="py-1 xs:py-2 px-2 xs:px-3 placeholder:text-xs placeholder:text-black w-full border border-blackmuted rounded-sm"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={isLoading}
              maxLength={6}
            />
          </div>
          <div className="px-4 xs:px-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full my-4 bg-black border border-black rounded-full font-extralight text-sm text-white p-2 hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "verifying..." : "verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Otp;
