import { useNavigate } from "react-router-dom";
import DeliveryAddress from "../../../components/DeliveryAddress/DeliveryAddress";
import visalogo from "../../../assets/imgs/visa-card-logo.png";
import Invoice from "../../../components/Invoice/Invoice";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";

function Checkout() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!phoneNumber || phoneNumber.length !== 11) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (paymentMethod === "visa") {
      if (!cardNumber || cardNumber.length !== 16) {
        toast.error("Please enter a valid card number");
        return;
      }
      if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
        toast.error("Please enter a valid expiry date (MM/YY)");
        return;
      }
      if (!cvv || cvv.length !== 3) {
        toast.error("Please enter a valid CVV");
        return;
      }
    }

    setIsLoading(true);
    const toastId = toast.loading("Processing your order...");

    try {
      const requestData = {
        address_id: selectedAddress.id.toString(),
        second_phone: phoneNumber,
        payment_method: paymentMethod,
      };

      if (paymentMethod === "visa") {
        requestData.card_number = cardNumber;
        requestData.expiry_date = expiryDate;
        requestData.cvv = cvv;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/orders/place",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Order placed successfully!");
        navigate("/User/UserAccount");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      console.error("Error response:", error.response?.data);

      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        if (validationErrors) {
          Object.values(validationErrors).forEach((error) => {
            toast.error(error[0]);
          });
        } else {
          toast.error(
            error.response?.data?.message || "Please check your order details"
          );
        }
      } else {
        toast.error(error.response?.data?.message || "Failed to place order");
      }
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="px-6 lg:px-12 my-4 w-full lg:w-3/5">
          <div className="mb-4">
            <h3 className="text-3xl pb-2">checkout</h3>
            <p className="text-xs text-zinc-400">
              choose delivery address, phone number and payment method
            </p>
          </div>
          <hr className="mb-4" />
          <DeliveryAddress onAddressSelect={handleAddressSelect} />
          <div className="mb-6">
            <h4 className="text-2xl mb-4">phone number</h4>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              pattern="[0-9]{11}"
              maxLength="11"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <div>
              <h4 className="text-2xl">payment method</h4>
              <div className="flex border-b py-4 justify-between items-center">
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="appearance-none w-5 h-5 border checked:border-4 border-black rounded-full checked:bg-white checked:ring-4 checked:ring-white checked:ring-offset-2 checked:ring-offset-black"
                  />
                  <i className="fa-solid fa-hand-holding-dollar bg-slate-100 p-4 rounded"></i>
                  <div>
                    <h6 className="text-xl">cash on delivery</h6>
                  </div>
                </div>
              </div>
              <div className="flex py-4 justify-between items-center">
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="visa"
                    checked={paymentMethod === "visa"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="appearance-none w-5 h-5 border checked:border-4 border-black rounded-full checked:bg-white checked:ring-4 checked:ring-white checked:ring-offset-2 checked:ring-offset-black"
                  />
                  <div className="bg-slate-100 px-2 py-5 rounded w-12">
                    <img src={visalogo} alt="visalogo" />
                  </div>
                  <div>
                    <h6 className="text-xl">visa</h6>
                  </div>
                </div>
              </div>
              {paymentMethod === "visa" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      maxLength="16"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      maxLength="5"
                      value={expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2);
                        }
                        setExpiryDate(value);
                      }}
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      maxLength="3"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={isLoading}
            className={`w-full py-3 rounded-full text-white transition duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black border border-black hover:bg-white hover:text-black transition duration-300 ease-in-out"
            }`}
          >
            {isLoading ? "Processing..." : "Place Order"}
          </button>
        </div>
        <div className="grow w-full lg:w-fit">
          <Invoice />
        </div>
      </div>
    </>
  );
}

export default Checkout;
