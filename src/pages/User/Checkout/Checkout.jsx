import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import OrderSummary from "../../../components/OrderSummary/OrderSummary";
import DeliveryAddress from "../../../components/DeliveryAddress/DeliveryAddress";
import paypallogo from "../../../assets/imgs/PayPal-Logo.png";
import visalogo from "../../../assets/imgs/visa-card-logo.png";
import masterlogo from "../../../assets/imgs/Mastercard-Logo.png";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import SlimilarProducts from "../../../components/SimilarProducts/SlimilarProducts";

function Checkout() {
  const [productsData, setProductsData] = useState(null);
  async function getProducts() {
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/general/products",
        method: "GET",
      };
      let { data } = await axios.request(options);
      setProductsData(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="px-6 lg:px-12 my-4 sm:my-12 w-full lg:w-3/5">
          <div className="mb-4">
            <h3 className="text-3xl pb-2">checkout</h3>
            <p className="text-xs text-zinc-400">
              choose delivery address and payment method
            </p>
          </div>
          <hr className="mb-4" />
          <DeliveryAddress />
          <div className="mb-6">
            <div>
              <h4 className="text-2xl">payment method</h4>
              <div className="flex border-b py-4 justify-between items-center">
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="payment"
                    className="appearance-none w-5 h-5 border checked:border-4 border-black rounded-full checked:bg-white checked:ring-4 checked:ring-white checked:ring-offset-2 checked:ring-offset-black"
                  />
                  <i className="fa-solid fa-hand-holding-dollar bg-slate-100 p-4 rounded"></i>
                  <h6 className="text-xl">cod (cash on delivery)</h6>
                </div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <div className="flex border-b py-4 justify-between items-center">
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="payment"
                    className="appearance-none w-5 h-5 border checked:border-4 border-black rounded-full checked:bg-white checked:ring-4 checked:ring-white checked:ring-offset-2 checked:ring-offset-black"
                  />
                  <div className="bg-slate-100 p-4 rounded w-12">
                    <img src={paypallogo} alt="paypallogo" />
                  </div>
                  <div>
                    <h6 className="text-xl">paypal</h6>
                    <p className="text-xs text-zinc-400">ziadamr@gmail.com</p>
                  </div>
                </div>
                <p>connected</p>
              </div>
              <div className="flex border-b py-4 justify-between items-center">
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="payment"
                    className="appearance-none w-5 h-5 border checked:border-4 border-black rounded-full checked:bg-white checked:ring-4 checked:ring-white checked:ring-offset-2 checked:ring-offset-black"
                  />
                  <div className="bg-slate-100 px-2 py-5 rounded w-12">
                    <img src={visalogo} alt="visalogo" />
                  </div>
                  <div>
                    <h6 className="text-xl">visa</h6>
                    <p className="text-xs text-zinc-400">**** **** **** 2947</p>
                  </div>
                </div>
                <p>connected</p>
              </div>
              <div className="flex justify-between py-4 items-center">
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="payment"
                    className="appearance-none w-5 h-5 border checked:border-4 border-black rounded-full checked:bg-white checked:ring-4 checked:ring-white checked:ring-offset-2 checked:ring-offset-black"
                  />
                  <div className="bg-slate-100 px-2 py-4 rounded w-12">
                    <img src={masterlogo} alt="masterlogo" />
                  </div>
                  <div>
                    <h6 className="text-xl">mastercard</h6>
                    <p className="text-xs text-zinc-400">**** **** **** 8730</p>
                  </div>
                </div>
                <p>connected</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grow w-full lg:w-fit">
          <OrderSummary />
        </div>
      </div>
      <div className="px-6 lg:px-12 pt-16 ">
        <div className="pb-4 flex justify-between">
          <h4 className="text-3xl">similar products</h4>
          <NavLink
            to="/FreshDrops"
            className={"underline hover:no-underline text-nowrap"}
          >
            view all
          </NavLink>
        </div>
        <div className="pb-12">
          {!productsData ? (
            <Loader />
          ) : (
            <SlimilarProducts productsData={productsData} />
          )}
        </div>
      </div>
    </>
  );
}

export default Checkout;
