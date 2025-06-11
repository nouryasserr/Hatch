import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../../context/User.context";
import VisaLogo from "../../../assets/imgs/visa-card-logo.png";
import MastercardLogo from "../../../assets/imgs/Mastercard-Logo.png";
import PayPalLogo from "../../../assets/imgs/PayPal-Logo.png";
import Loader from "../../../components/Loader/Loader";

function Payment() {
  const { token } = useContext(UserContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa");
  const [planDetails, setPlanDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!token) {
        toast.error("Please login first");
        navigate("/Auth/Signin");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user/package-id`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          console.log("Setting plan details:", response.data.data);
          setPlanDetails({
            package_name: response.data.data.package_name,
            price: response.data.data.price,
            repayment_date: response.data.data.repayment_date,
            package_id: response.data.data.package_id,
          });
        } else {
          throw new Error(
            response.data.message || "Failed to fetch package details"
          );
        }
      } catch (err) {
        console.error("Full error object:", err);
        toast.error(
          err.response?.data?.message || "Failed to fetch package details"
        );
        console.error("Error fetching package details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [token, navigate]);

  useEffect(() => {
    console.log("Current planDetails state:", planDetails);
  }, [planDetails]);

  const paymentMethods = [
    {
      id: "visa",
      name: "Visa",
      logo: VisaLogo,
      identifier: "**** **** **** 4242",
      connected: true,
    },
    {
      id: "mastercard",
      name: "Mastercard",
      logo: MastercardLogo,
      identifier: "**** **** **** 5555",
      connected: true,
    },
    {
      id: "paypal",
      name: "PayPal",
      logo: PayPalLogo,
      identifier: "user@example.com",
      connected: true,
    },
  ];

  const handleConfirmPayment = async () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/Auth/Signin");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/pay-package",
        {
          payment_method: selectedPaymentMethod,
          package_id: planDetails?.package_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Payment confirmed successfully!");
        navigate("/user/dashboard");
      } else {
        throw new Error(response.data.message || "Payment failed");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to process payment. Please try again."
      );
      console.error("Payment error:", err);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div>
        <h1 className="text-2xl xs:text-4xl">payment for selected plan</h1>
        <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
          complete your payment to activate your subscription.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl xs:text-2xl mb-4">selected plan summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-lightgray">plan</span>
            <span>{planDetails?.package_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lightgray">price</span>
            <span>{planDetails?.price} egp</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lightgray">repayment date</span>
            <span>
              {new Date(planDetails?.repayment_date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl xs:text-2xl mb-4">payment details</h2>
        <p className="text-lightgray text-xs xs:text-sm mb-4">
          choose your payment method and fill in your info.
        </p>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                selectedPaymentMethod === method.id
                  ? "border-primary bg-gray-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedPaymentMethod(method.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {selectedPaymentMethod === method.id && (
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  )}
                </div>
                <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center p-2">
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-lightgray">{method.identifier}</p>
                </div>
              </div>
              <span className="text-sm text-green-500">connected</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleConfirmPayment}
          className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          confirm payment
        </button>
        <p className="text-center text-lightgray text-sm mt-2">
          you'll receive an invoice once the payment is processed
        </p>
      </div>
    </div>
  );
}

export default Payment;
